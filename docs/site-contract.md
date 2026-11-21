# Website editing and behavior contract

## Design source

The owner's export, `Web Chispa con Calma – Web — Inicio.html`, is the reference.
It was unpacked into ordinary source files, without retaining its artifact runtime
or bundled React copies. The original local file remains under ignored `data/`;
fresh clones do not need it.

Astro prerenders the page. `Home.jsx` is a React island hydrated on page load:
its class-based state logic preserves the prototype's interactive experience.
`HomeView.jsx` composes navigation, overlays, decorative ribbons and sections.
Each section has a separate editable JSX file; no new page should be made as an
artifact, iframe or giant HTML string.

## File map

| File | Responsibility |
| --- | --- |
| `src/pages/index.astro` | Document, metadata, noindex and island |
| `src/components/home/Home.jsx` | State, content arrays, quiz scoring, timers and events |
| `src/components/home/HomeView.jsx` | Composition, header/menu, overlays, ribbons and footer |
| `SectionInicio.jsx` | Hero and portrait |
| `SectionProblem.jsx`, `SectionNegocios.jsx` | Problem and audience |
| `SectionChispaCalma.jsx`, `SectionApproach.jsx` | Interactive chaos-to-calm scene and approach |
| `SectionServicios.jsx` | Expandable service cards |
| `SectionMetodo.jsx`, `SectionPasos.jsx` | Method and getting started |
| `SectionTest.jsx` | Three-question quiz |
| `SectionFormatos.jsx` | Ways of working together |
| `SectionTestimonials.jsx`, `SectionSobreMi.jsx` | Testimonials and biography |
| `SectionRecursos.jsx` | Resource cards and breathing trigger |
| `SectionFaq.jsx`, `SectionContacto.jsx` | FAQ and contact |
| `src/styles/reference.css` | Extracted reference styling and local font faces |
| `src/styles/site.css` | Deliberate migration/accessibility corrections |
| `public/assets/` | Local reference portrait and fonts |

Section files above are relative to `src/components/home/`.

## Visual language

- Warm paper `#F9F8F3`, ink `#1A1A1A`, yellow `#FCEFB4`, mint `#9EE0D6`,
  pink `#F4C4CF`, lavender `#D9CCF5`, purple accent `#5B4A99`.
- DM Sans body; Unbounded headings; Erica One "chispa/calma" display words;
  Gochi Hand handwritten annotations. Fonts are self-hosted.
- Rounded cards, outlined illustrations, paper/sticky-note motifs, playful curved
  ribbons, generous vertical spacing. Preserve rather than redesign by default.
- Original layout uses content-box sizing in many places. Do not introduce a
  universal border-box reset without a visual comparison: it changes reference
  widths and heading wraps.
- Check 1440px desktop, 390px mobile and 320px narrow screens. A root overflow clip
  does not prove children fit: inspect actual card and control boundaries.

## Behavior to preserve

- Navigation opens/closes, navigates to real section anchors, closes on Escape;
  hidden links are inert.
- Hero intro, count-down, ribbons and scroll reveals preserve the owner's motion
  design. Reduced motion leaves content readable and navigation functional.
- Chaos/calm scene can be started, organized and replayed.
- Services expand and collapse without losing headings.
- Quiz advances through three questions, derives a type, offers email contact and
  restarts. Four spark-type cards retain their explanatory interaction.
- Breathing exercise opens, guides three cycles and can be closed. Dialogs receive
  focus, trap Tab, close on Escape and restore their trigger.
- FAQs use native details/summary controls.
- Contact uses `mailto:hola@chispaconcalma.com`; Instagram points to the owner.

## Deliberate prototype differences / outstanding business content

- WhatsApp number was a placeholder: floating contact uses email until configured.
- Resource forms simulated successful delivery. They have been replaced with honest
  "not available yet" copy and do not collect emails. Breathing works locally.
- Draft brackets around resource titles/descriptions were removed.
- Testimonial text is preserved from the prototype, NOT independently verified.
  Developer/owner must confirm authenticity and publication permission before launch.
- Font/image publication rights and contact address ownership require owner review
  before launch. Do not treat inclusion in the export as legal clearance.
- Small-screen clipping and keyboard/reduced-motion defects may be corrected without
  changing the visual identity.
- Staging is deliberately noindex. Production metadata, legal notices and backend
  integrations are not complete.

`scripts/import-prototype.py` is migration provenance, not a normal editing tool.
It refuses to overwrite migrated source. Subsequent accessibility and responsive
fixes live in the source and are not reproduced by re-importing.
