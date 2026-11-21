#!/usr/bin/env python3
"""One-time migration of the owner's exported bundle to editable React/Astro source.

Not part of normal builds. Refuses to overwrite the migrated components.
Usage: python3 scripts/import-prototype.py 'path/to/export.html'
"""
import base64
import gzip
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.request import urlopen


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.kind = None
        self.buffer = []
        self.scripts = {}

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.kind = dict(attrs).get("type", "runtime")
            self.buffer = []

    def handle_data(self, text):
        if self.kind:
            self.buffer.append(text)

    def handle_endtag(self, tag):
        if tag == "script" and self.kind:
            self.scripts[self.kind] = "".join(self.buffer)
            self.kind = None


VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = ["root", {}, []]
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = [tag, dict(attrs), []]
        self.stack[-1][2].append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self.stack[-1][0] != tag:
            raise ValueError(f"Unbalanced template: {tag}, open {self.stack[-1][0]}")
        self.stack.pop()

    def handle_data(self, text):
        self.stack[-1][2].append(text)


def js(value):
    return json.dumps(value, ensure_ascii=False)


def expression(value, locals_):
    value = value.strip()
    if value in ("true", "false", "null") or re.match(r"^\d+$", value):
        return value
    first = value.split(".")[0]
    return value if first in locals_ else "v." + value


def dynamic(value, locals_):
    parts = re.split(r"{{(.*?)}}", value)
    if len(parts) == 3 and not parts[0] and not parts[2]:
        return expression(parts[1], locals_)
    return " + ".join(
        expression(part, locals_) if i % 2 else js(part)
        for i, part in enumerate(parts) if part
    ) or '""'


CAMEL = {"class": "className", "for": "htmlFor", "tabindex": "tabIndex",
         "sc-camel-on-click": "onClick", "sc-camel-on-submit": "onSubmit",
         "sc-camel-view-box": "viewBox"}


def camel(name):
    if name.startswith("--") or name.startswith(("aria-", "data-")):
        return name
    return re.sub(r"-([a-z])", lambda m: m[1].upper(), name)


def render(node, locals_=()):
    if isinstance(node, str):
        return "{" + dynamic(node, locals_) + "}" if node.strip() else "\n"
    tag, attrs, children = node
    body = lambda scope: "".join(render(child, scope) for child in children)
    if tag == "sc-if":
        cond = dynamic(attrs["value"], locals_)
        return "{" + cond + " && <>" + body(locals_) + "</>}"
    if tag == "sc-for":
        local = attrs["as"]
        items = dynamic(attrs["list"], locals_)
        return "{" + items + ".map((" + local + ", index) => <Fragment key={index}>" + body((*locals_, local)) + "</Fragment>)}"
    rendered = []
    for name, value in attrs.items():
        if name.startswith("hint-"):
            continue
        name = CAMEL.get(name, camel(name))
        if name == "style":
            rules = []
            for rule in value.split(";"):
                if ":" not in rule:
                    continue
                key, val = rule.split(":", 1)
                rules.append(js(camel(key.strip())) + ": " + dynamic(val.strip(), locals_))
            rendered.append("style={{" + ", ".join(rules) + "}}")
        elif value is None or name in ("required", "disabled", "multiple", "open"):
            rendered.append(name + "={true}")
        else:
            rendered.append(name + "={" + dynamic(value, locals_) + "}")
    opening = "<" + tag + (" " if rendered else "") + " ".join(rendered)
    if tag in VOID:
        return opening + " />"
    return opening + ">" + body(locals_) + "</" + tag + ">"


def main():
    target = Path("src/components/home")
    if target.exists():
        raise SystemExit("Migrated source already exists; edit it directly, do not re-import.")
    source = Path(sys.argv[1])
    outer = Scripts()
    outer.feed(source.read_text())
    manifest = json.loads(outer.scripts["__bundler/manifest"])
    template = json.loads(outer.scripts["__bundler/template"])
    assets = Path("public/assets")
    assets.mkdir(parents=True, exist_ok=True)
    for uuid, item in manifest.items():
        suffix = {"image/png": ".png", "font/woff2": ".woff2"}.get(item["mime"])
        if not suffix:
            continue
        data = base64.b64decode(item["data"])
        if item["compressed"]:
            data = gzip.decompress(data)
        name = "portrait.png" if suffix == ".png" else uuid + suffix
        (assets / name).write_bytes(data)
        template = template.replace(uuid, "/assets/" + name)

    styles = re.findall(r"<style[^>]*>(.*?)</style>", template, re.S)
    css = "\n".join(styles)
    # Self-host every remaining reference font; no Google/CDN requests at runtime.
    for url in set(re.findall(r"https://fonts\.gstatic\.com/[^)\s]+", css)):
        name = "font-" + hashlib.sha256(url.encode()).hexdigest()[:12] + ".woff2"
        (assets / name).write_bytes(urlopen(url, timeout=30).read())
        css = css.replace(url, "/assets/" + name)
    Path("src/styles").mkdir(parents=True, exist_ok=True)
    Path("src/styles/reference.css").write_text(css)

    script = re.search(r'<script type="text/x-dc"[^>]*>(.*?)</script>', template, re.S)[1]
    script = script.replace("class Component extends DCLogic", "export default class Home extends Component")
    markup = template.split("</helmet>", 1)[1].split("</x-dc>", 1)[0]
    markup = markup.replace("https://wa.me/[TU-NUMERO]", "mailto:hola@chispaconcalma.com")
    markup = markup.replace("Escríbeme por WhatsApp", "Escríbeme por email").replace("      WhatsApp", "      Escríbeme")
    markup = markup.replace(
        "Déjame tu email y te lo envío. Sin spam: solo chispa útil de vez en cuando.",
        "Las descargas por email todavía no están disponibles. Mientras tanto, puedes probar la pausa de un minuto.")
    markup = re.sub(
        r'<sc-if value="{{g.open}}"[^>]*>.*?</sc-if>',
        '<sc-if value="{{g.open}}"><p style="font-size: 15px; line-height: 1.5">Próximamente. Las descargas todavía no están disponibles.</p></sc-if>',
        markup, flags=re.S)
    markup = re.sub(r'<sc-if value="{{g.sent}}"[^>]*>.*?</sc-if>', "", markup, flags=re.S)
    # The square brackets in two resource names/descriptions are draft notation.
    script = re.sub(r"'\[([^\]\n]+)\]'", lambda m: "'" + m[1] + "'", script)
    tree = Tree()
    tree.feed(markup)
    if len(tree.stack) != 1:
        raise ValueError("Unclosed reference markup")
    root = next(n for n in tree.root[2] if isinstance(n, list))
    target.mkdir(parents=True)
    imports = []
    components = []
    for index, child in enumerate(root[2]):
        if not isinstance(child, list) or child[0] != "section":
            components.append(render(child))
            continue
        identifier = child[1].get("id", f"section-{index}")
        name = "Section" + "".join(p.capitalize() for p in identifier.split("-"))
        imports.append(f'import {name} from "./{name}.jsx";')
        (target / (name + ".jsx")).write_text(
            'import { Fragment } from "react";\n\n'
            + f"export default function {name}({{ v }}) {{\n  return (\n"
            + render(child) + "\n  );\n}\n")
        components.append(f"<{name} v={{v}} />")
    root[2] = []
    wrapper = render(root)
    wrapper = wrapper.replace("></div>", ">" + "".join(components) + "</div>")
    (target / "HomeView.jsx").write_text(
        'import { Fragment } from "react";\n' + "\n".join(imports)
        + '\n\nexport default function HomeView({ v }) {\n  return (\n'
        + wrapper + "\n  );\n}\n")
    script = script.rstrip()
    script = script[:-1] + "\n  render() {\n    return <HomeView v={this.renderVals()} />;\n  }\n}\n"
    (target / "Home.jsx").write_text(
        'import { Component } from "react";\nimport HomeView from "./HomeView.jsx";\n\n' + script)
    print(f"Migrated {len(imports)} sections, reference CSS, interaction logic and local assets.")


if __name__ == "__main__":
    main()
