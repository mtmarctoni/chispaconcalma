import { Component } from 'react';
import HomeView from './HomeView.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hydrated: false,
      count: 37,
      typedN: 0,
      y: 0,
      mapPct: 100,
      flipped: {},
      qi: 0,
      answers: [],
      phrase: 0,
      cx: -100,
      cy: -100,
      tone: '#FCEFB4',
      cursor: false,
      anim: false,
      mode: 'chispa',
      sent: {},
      toast: false,
      confetti: false,
      intro: 'off',
      introTransform: 'translate(-50%, -50%)',
      ideaPhase: 'hidden',
      ideaOff: {},
      laptop: false,
      stage: 'idle',
    };
    this.ideaData = [
      {
        id: 'p1',
        kind: 'postit',
        label: '¡IDEA!',
        bg: '#FCEFB4',
        left: 8,
        top: 10,
        rot: -8,
      },
      {
        id: 'w1',
        kind: 'wa',
        from: 'Clienta',
        label: '¿Para cuándo la web?',
        time: '23:47',
        left: 33,
        top: 8,
        rot: 3,
      },
      {
        id: 'p2',
        kind: 'postit',
        label: 'lanzar curso',
        bg: '#F4C4CF',
        left: 58,
        top: 12,
        rot: -4,
      },
      {
        id: 'd1',
        kind: 'doodle',
        w: 70,
        h: 70,
        vb: '0 0 24 24',
        d: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
        fill: '#FCEFB4',
        color: '#1A1A1A',
        sw: 1.4,
        left: 77,
        top: 9,
        rot: 10,
      },
      {
        id: 'w2',
        kind: 'wa',
        from: 'Proveedor',
        label: 'Te mando el presupuesto',
        time: '09:12',
        left: 89,
        top: 26,
        rot: -3,
      },
      {
        id: 'n1',
        kind: 'note',
        label: 'to-do:\n1. todo\n2. más todo',
        left: 13,
        top: 37,
        rot: 4,
      },
      {
        id: 'd2',
        kind: 'doodle',
        w: 80,
        h: 80,
        vb: '0 0 60 60',
        d: 'M30 30 a3 3 0 1 1 6 0 a8 8 0 1 1 -14 0 a13 13 0 1 1 22 0 a18 18 0 1 1 -30 0',
        fill: 'none',
        color: '#C9B8F0',
        sw: 4,
        left: 35,
        top: 36,
        rot: 0,
      },
      {
        id: 'p3',
        kind: 'postit',
        label: 'web nueva',
        bg: '#9EE0D6',
        left: 51,
        top: 40,
        rot: 6,
      },
      {
        id: 't1',
        kind: 'tab',
        label: '37 pestañas abiertas',
        left: 72,
        top: 44,
        rot: -2,
      },
      { id: 'a1', kind: 'audio', time: '4:32', left: 13, top: 62, rot: 2 },
      {
        id: 'p4',
        kind: 'postit',
        label: '¿newsletter?',
        bg: '#D9CCF5',
        left: 33,
        top: 64,
        rot: -6,
      },
      {
        id: 'd3',
        kind: 'doodle',
        w: 56,
        h: 56,
        vb: '0 0 40 40',
        d: 'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z',
        fill: '#F4C4CF',
        color: '#1A1A1A',
        sw: 1.5,
        left: 48,
        top: 66,
        rot: 14,
      },
      {
        id: 'p5',
        kind: 'postit',
        label: 'facturas!!',
        bg: '#FCEFB4',
        left: 62,
        top: 68,
        rot: 5,
      },
      {
        id: 'w3',
        kind: 'wa',
        from: 'Mamá',
        label: '¿Tienes 5 min?',
        time: '18:03',
        left: 85,
        top: 64,
        rot: 3,
      },
      {
        id: 'd4',
        kind: 'doodle',
        w: 120,
        h: 60,
        vb: '0 0 120 60',
        d: 'M6 50 C30 10 60 10 70 30 S96 52 110 18 M110 18 l-12 2 M110 18 l2 12',
        fill: 'none',
        color: '#1A1A1A',
        sw: 3,
        left: 14,
        top: 88,
        rot: -10,
      },
      {
        id: 'p6',
        kind: 'postit',
        label: 'reels',
        bg: '#F4C4CF',
        left: 36,
        top: 88,
        rot: 7,
      },
      {
        id: 'n2',
        kind: 'note',
        label: 'post del martes\n(¿o miércoles?)',
        left: 56,
        top: 90,
        rot: -3,
      },
      {
        id: 'd5',
        kind: 'doodle',
        w: 120,
        h: 30,
        vb: '0 0 120 30',
        d: 'M4 22 L16 8 L28 22 L40 8 L52 22 L64 8 L76 22 L88 8 L100 22 L112 8',
        fill: 'none',
        color: '#9EE0D6',
        sw: 4,
        left: 77,
        top: 86,
        rot: 0,
      },
      {
        id: 'd6',
        kind: 'doodle',
        w: 90,
        h: 56,
        vb: '0 0 80 50',
        d: 'M20 42 a12 12 0 0 1 0-24 a16 16 0 0 1 30-6 a12 12 0 0 1 14 14 a10 10 0 0 1 -2 16 Z',
        fill: '#F9F8F3',
        color: '#1A1A1A',
        sw: 2.5,
        left: 92,
        top: 90,
        rot: 4,
      },
    ];
    this.clicks = [];
    this.full = 'Respira.\nVamos por partes.';
    this.timers = [];
  }

  motionOn() {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return (this.props.motion ?? true) && !reduced;
  }

  componentDidMount() {
    this.setState({ hydrated: true });
    this.onKeyDown = (event) => {
      const dialog = document.querySelector('[role="dialog"]');
      if (event.key === 'Escape') {
        if (dialog) {
          clearInterval(this.breathIv);
          this.setState({ breath: false, typePop: null });
        } else if (this.state.menu) {
          this.setState({ menu: false }, () =>
            document.querySelector('[aria-controls="menu-panel"]')?.focus(),
          );
        }
      }
      if (dialog && event.key === 'Tab') {
        const focusable = [
          ...dialog.querySelectorAll('button, a[href], input, [tabindex="0"]'),
        ];
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', this.onKeyDown);
    // Navigation is functional state, not animation: keep it with reduced motion.
    this.onScroll = () => {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = null;
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 800;
        const method = document.getElementById('metodo');
        let mapPct = 100;
        if (method && this.motionOn()) {
          const rect = method.getBoundingClientRect();
          mapPct = Math.round(
            Math.max(
              0,
              Math.min(1, (vh * 0.85 - rect.top) / (rect.height * 0.75)),
            ) * 100,
          );
        }
        this.setState({ y, mapPct });
        if (
          y > 20 &&
          (this.state.intro === 'big' || this.state.intro === 'moving')
        ) {
          this.setState({ intro: 'done' });
        }
      });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
    this.onScroll();
    const phrases = 6;
    this.setState({ phrase: Math.floor(Math.random() * phrases) });
    const measureRibbon = () => {
      const els = document.querySelectorAll('.rb-m');
      if (!els.length) return;
      const w = Array.prototype.map.call(
        els,
        (el) => el.getBoundingClientRect().width,
      );
      if (w.every((x) => x > 0)) this.setState({ rbW: w });
      const els4 = document.querySelectorAll('.rb-m4');
      const w4 = Array.prototype.map.call(
        els4,
        (el) => el.getBoundingClientRect().width,
      );
      if (w4.length && w4.every((x) => x > 0)) this.setState({ rbW4: w4 });
      const els3 = document.querySelectorAll('.rb-m3');
      const w3 = Array.prototype.map.call(
        els3,
        (el) => el.getBoundingClientRect().width,
      );
      if (w3.length && w3.every((x) => x > 0)) this.setState({ rbW3: w3 });
      const els2 = document.querySelectorAll('.rb-m2');
      const w2 = Array.prototype.map.call(
        els2,
        (el) => el.getBoundingClientRect().width,
      );
      if (w2.length && w2.every((x) => x > 0)) this.setState({ rbW2: w2 });
    };
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(measureRibbon);
    else setTimeout(measureRibbon, 800);
    this.timers.push(setTimeout(measureRibbon, 1500));
    if (!this.motionOn()) {
      this.setState({ count: 1, typedN: this.full.length });
      return;
    }

    // Entrada: «chispa» en grande + confeti → se encoge y se coloca en el titular
    const withIntro = (window.scrollY || 0) < 60;
    if (withIntro) {
      this.setState({ intro: 'big', introTransform: 'translate(-50%, -50%)' });
      this.timers.push(setTimeout(() => this.launchConfetti(true), 350));
      this.timers.push(
        setTimeout(() => {
          if (this.state.intro !== 'big') return;
          const o = document.getElementById('intro-chispa');
          const t = document.getElementById('hero-chispa');
          if (!o || !t) {
            this.setState({ intro: 'done' });
            return;
          }
          const a = o.getBoundingClientRect();
          const b = t.getBoundingClientRect();
          const k = b.width / a.width;
          const dx = b.left + b.width / 2 - (a.left + a.width / 2);
          const dy = b.top + b.height / 2 - (a.top + a.height / 2);
          this.setState({
            intro: 'moving',
            introTransform:
              'translate(calc(-50% + ' +
              Math.round(dx) +
              'px), calc(-50% + ' +
              Math.round(dy) +
              'px)) scale(' +
              k.toFixed(3) +
              ')',
          });
        }, 1900),
      );
      this.timers.push(
        setTimeout(() => this.setState({ intro: 'done' }), 2950),
      );
    }
    const after = withIntro ? 2700 : 0;

    // Contador de pestañas 37 → 1
    this.timers.push(setTimeout(() => this.startCount(), after + 700));

    // Al volver a subir, todo vuelve al inicio
    const hero = document.getElementById('inicio');
    const stage = document.getElementById('chispa-calma');
    const about = document.getElementById('sobre-mi');
    if ('IntersectionObserver' in window && (hero || stage)) {
      this.io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.target === hero) {
              if (!e.isIntersecting) {
                clearInterval(this.countIv);
                this.setState({ count: 37 });
                this.heroLeft = true;
              } else if (this.heroLeft) {
                this.heroLeft = false;
                this.startCount();
              }
            }
            if (e.target === about)
              this.setState({ aboutPlay: e.isIntersecting });
            if (
              e.target === stage &&
              !e.isIntersecting &&
              this.state.stage !== 'idle'
            ) {
              this.busy = false;
              this.setState({
                stage: 'idle',
                ideaPhase: 'hidden',
                ideaOff: {},
                laptop: false,
              });
            }
          });
        },
        { threshold: 0 },
      );
      if (hero) this.io2.observe(hero);
      if (stage) this.io2.observe(stage);
      if (about) this.io2.observe(about);
    }

    // Nota a mano que se escribe sola
    this.timers.push(
      setTimeout(() => {
        const iv = setInterval(() => {
          this.setState((s) => {
            if (s.typedN >= this.full.length) {
              clearInterval(iv);
              return null;
            }
            return { typedN: s.typedN + 1 };
          });
        }, 70);
        this.timers.push(iv);
      }, after + 400),
    );

    // Cinta curva: mide una vuelta del texto para que el bucle no salte
    this.timers.push(
      setTimeout(() => {
        const t = document.getElementById('curve-text');
        if (t && t.getComputedTextLength) {
          const total = t.getComputedTextLength();
          if (total > 0) this.setState({ curveUnit: Math.round(total / 8) });
        }
      }, 600),
    );

    // La cinta Delega · Respira · Repite empieza por «Delega» cada vez que entra en pantalla
    const rb2 = document.getElementById('rb2');
    if (rb2 && 'IntersectionObserver' in window) {
      this.io3 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              rb2.classList.add('rb-reset');
              void rb2.offsetWidth;
              rb2.classList.remove('rb-reset');
            }
          });
        },
        { threshold: 0 },
      );
      this.io3.observe(rb2);
    }

    // Apariciones suaves
    const els = document.querySelectorAll('.reveal');
    if (els.length && 'IntersectionObserver' in window) {
      this.io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('in');
            else e.target.classList.remove('in');
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );
      els.forEach((el) => this.io.observe(el));
      this.setState({ anim: true });
    }

    // Puntero estrella (solo con ratón)
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      this.onMove = (e) => {
        const x = e.clientX,
          yy = e.clientY;
        if (this.mraf) return;
        this.mraf = requestAnimationFrame(() => {
          this.mraf = null;
          let tone = this.state.tone;
          const secs = document.querySelectorAll('[data-tone]');
          for (let i = 0; i < secs.length; i++) {
            const r = secs[i].getBoundingClientRect();
            if (yy >= r.top && yy <= r.bottom) {
              tone = secs[i].getAttribute('data-tone');
              break;
            }
          }
          this.setState({ cx: x + 14, cy: yy + 14, tone, cursor: true });
        });
      };
      this.onLeave = () => this.setState({ cursor: false });
      window.addEventListener('mousemove', this.onMove, { passive: true });
      document.addEventListener('mouseleave', this.onLeave);
    }
  }

  componentDidUpdate(_props, previous) {
    const wasOpen = !!(previous.breath || previous.typePop);
    const isOpen = !!(this.state.breath || this.state.typePop);
    if (wasOpen === isOpen) return;
    if (isOpen) {
      this.returnFocus = document.activeElement;
      const dialog = document.querySelector('[role="dialog"]');
      this.inertSiblings = [...dialog.parentElement.children].filter(
        (element) => element !== dialog && !element.inert,
      );
      this.inertSiblings.forEach((element) => {
        element.inert = true;
      });
      this.previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.querySelector('button, a[href]')?.focus();
    } else {
      this.inertSiblings?.forEach((element) => {
        element.inert = false;
      });
      document.body.style.overflow = this.previousOverflow || '';
      this.returnFocus?.focus();
    }
  }

  measureTo(targetId) {
    const t = document.getElementById(targetId);
    if (!t) return null;
    const r = t.getBoundingClientRect();
    const cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    const off = {};
    for (const d of this.ideaData) {
      const el = document.getElementById('idea-' + d.id);
      if (!el) return null;
      const a = el.getBoundingClientRect();
      off[d.id] = {
        dx: Math.round(cx - (a.left + a.width / 2)),
        dy: Math.round(cy - (a.top + a.height / 2)),
      };
    }
    return off;
  }

  toChispa() {
    if (this.busy || this.state.stage === 'chaos') return;
    this.busy = true;
    const done = () => {
      this.busy = false;
    };
    if (this.state.stage === 'idle') {
      const off = this.measureTo('stage-origin') || {};
      this.setState({ ideaPhase: 'gather', ideaOff: off }, () => {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.setState({ stage: 'chaos', ideaPhase: 'chaos' });
            this.launchConfetti();
            this.timers.push(setTimeout(done, 900));
          }),
        );
      });
    } else {
      this.setState({ stage: 'chaos', laptop: false });
      this.timers.push(
        setTimeout(() => {
          this.setState({ ideaPhase: 'chaos' });
          this.launchConfetti();
          this.timers.push(setTimeout(done, 900));
        }, 250),
      );
    }
  }

  toCalma() {
    if (this.busy || this.state.stage === 'order') return;
    if (this.state.stage === 'idle') {
      this.toChispa();
      this.timers.push(setTimeout(() => this.toCalma(), 1600));
      return;
    }
    this.busy = true;
    this.setState({ confetti: false });
    const off = this.measureTo('laptop-screen') || {};
    this.setState({
      ideaPhase: 'packed',
      ideaOff: off,
      laptop: true,
      stage: 'order',
    });
    this.timers.push(
      setTimeout(() => {
        this.busy = false;
      }, 1150),
    );
  }

  startBreathing() {
    clearInterval(this.breathIv);
    this.setState({ breath: true, inhale: true, cycle: 1, breathDone: false });
    let ticks = 0;
    this.breathIv = setInterval(() => {
      ticks += 1;
      if (ticks >= 6) {
        clearInterval(this.breathIv);
        this.setState({ breathDone: true });
        this.timers.push(setTimeout(() => this.finishBreathing(), 1800));
        return;
      }
      this.setState((st) => ({
        inhale: !st.inhale,
        cycle: Math.floor(ticks / 2) + 1,
      }));
    }, 4000);
    this.timers.push(this.breathIv);
  }

  finishBreathing() {
    clearInterval(this.breathIv);
    this.setState({ breath: false });
  }

  rbTokens4() {
    if (this._rbTok4) return this._rbTok4;
    const out = [];
    ['CALMA PARA CRECER'].forEach(() => {
      out.push({ ch: '\u00a0', gap: true });
      out.push({ ch: '✦', star: '#F9F8F3' });
      out.push({ ch: '\u00a0', gap: true });
      for (const ch of 'CALMA PARA CRECER')
        out.push({ ch: ch === ' ' ? '\u00a0' : ch });
    });
    this._rbTok4 = out;
    return out;
  }

  rbTokens3() {
    if (this._rbTok3) return this._rbTok3;
    const out = [];
    const stars = ['#1A1A1A', '#F9F8F3', '#1A1A1A', '#F9F8F3'];
    [
      'SISTEMAS DIGITALES',
      'PROJECT MANAGEMENT',
      'DISEÑO WEB',
      'ASISTENCIA DIGITAL',
    ].forEach((ph, i) => {
      out.push({ ch: '\u00a0', gap: true });
      out.push({ ch: '✦', star: stars[i] });
      out.push({ ch: '\u00a0', gap: true });
      for (const ch of ph) out.push({ ch: ch === ' ' ? '\u00a0' : ch });
    });
    this._rbTok3 = out;
    return out;
  }

  rbTokens2() {
    if (this._rbTok2) return this._rbTok2;
    const out = [];
    const stars = ['#1A1A1A', '#F4C4CF', '#F9F8F3'];
    ['DELEGA', 'RESPIRA', 'REPITE'].forEach((ph, i) => {
      out.push({ ch: '\u00a0', gap: true });
      out.push({ ch: '✦', star: stars[i] });
      out.push({ ch: '\u00a0', gap: true });
      for (const ch of ph) out.push({ ch });
    });
    this._rbTok2 = out;
    return out;
  }

  rbTokens() {
    if (this._rbTok) return this._rbTok;
    const out = [];
    const stars = ['#FCEFB4'];
    ['CHISPA PARA LAS IDEAS'].forEach((ph, i) => {
      out.push({ ch: '\u00a0', gap: true });
      out.push({ ch: '✦', star: stars[i] });
      out.push({ ch: '\u00a0', gap: true });
      for (const ch of ph) out.push({ ch: ch === ' ' ? '\u00a0' : ch });
    });
    this._rbTok = out;
    return out;
  }

  rbChars(widths, tok, color, reverse, startAt) {
    tok = tok || this.rbTokens();
    color = color || '#F9F8F3';
    const est = (t) => (t.gap ? 10 : t.ch === '\u00a0' ? 6 : t.star ? 17 : 14);
    const w = tok.map((t, i) => (widths && widths[i]) || est(t));
    const track = 1;
    const pos = [];
    let x = 0;
    for (let i = 0; i < tok.length; i++) {
      pos.push(x + w[i] / 2);
      x += w[i] + track;
    }
    const unit = x,
      reps = Math.max(1, Math.round(1940 / unit)),
      total = unit * reps,
      D = 26;
    const out = [];
    for (let u = 0; u < reps; u++) {
      tok.forEach((t, i) => {
        if (t.ch === '\u00a0') return;
        let p = (u * unit + pos[i]) / total;
        if (startAt != null) {
          const first = tok.findIndex(
            (t) => !t.gap && !t.star && t.ch !== '\u00a0',
          );
          p = (((p - pos[first] / total + startAt) % 1) + 1) % 1;
        }
        out.push({
          ch: t.ch,
          pct: (p * 100).toFixed(3),
          delay: (-(reverse ? 1 - p : p) * D).toFixed(3),
          color: t.star || color,
        });
      });
    }
    return out;
  }

  startCount() {
    clearInterval(this.countIv);
    this.setState({ count: 37 });
    this.countIv = setInterval(() => {
      this.setState((s) => {
        if (s.count <= 1) {
          clearInterval(this.countIv);
          return null;
        }
        return { count: s.count - 1 };
      });
    }, 55);
    this.timers.push(this.countIv);
  }

  launchConfetti(withDoll) {
    if (!this.motionOn() || this.state.mode === 'calma') return;
    clearTimeout(this.cfOff);
    this.setState({ confetti: false, doll: !!withDoll });
    this.timers.push(setTimeout(() => this.setState({ confetti: true }), 30));
    this.cfOff = setTimeout(() => this.setState({ confetti: false }), 7200);
    this.timers.push(this.cfOff);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    cancelAnimationFrame(this.raf);
    cancelAnimationFrame(this.mraf);
    this.inertSiblings?.forEach((element) => {
      element.inert = false;
    });
    this.timers.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    if (this.onScroll) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }
    if (this.onMove) window.removeEventListener('mousemove', this.onMove);
    if (this.onLeave) document.removeEventListener('mouseleave', this.onLeave);
    if (this.io) this.io.disconnect();
    if (this.io2) this.io2.disconnect();
    if (this.io3) this.io3.disconnect();
  }

  renderVals() {
    const s = this.state;
    const motion = this.props.motion ?? true;

    const stepData = [
      [
        'Suelta',
        'Sacamos todo lo que llevas dentro: ideas, tareas, pendientes y dudas.',
      ],
      ['Mira', 'Observamos cómo trabajas de verdad, sin juicios ni manuales.'],
      [
        'Nombra',
        'Ponemos nombre a tu tipo de chispa y a lo que de verdad la frena.',
      ],
      [
        'Elige',
        'Priorizamos con el Filtro Chispa-Calma: qué se queda, qué espera y qué sobra.',
      ],
      ['Camina', 'Montamos el sistema y avanzamos paso a paso, a tu ritmo.'],
    ];
    const steps = stepData.map((d, i) => ({
      n: i + 1,
      title: d[0],
      text: d[1],
      cls: s.mapPct >= ((i + 0.5) / 5) * 100 ? 'step on' : 'step',
    }));

    const typeData = [
      {
        id: 'col',
        name: 'El Coleccionista',
        bg: '#FCEFB4',
        chaos:
          'Lo guarda todo: ideas, enlaces, cursos, capturas, notas de voz… Le encanta aprender y no quiere que nada se pierda. El problema es que está todo repartido y, cuando lo necesita, no lo encuentra.',
        calm: 'Un único lugar donde cada idea tiene su casa y sabes exactamente dónde buscar.',
      },
      {
        id: 'emp',
        name: 'El Empezador Serial',
        bg: '#9EE0D6',
        chaos:
          'Se enciende con cada proyecto nuevo. Arrancar le da energía, pero a mitad de camino aparece otra idea más brillante y lo anterior se queda a medias.',
        calm: 'Ver de un vistazo qué está en marcha, qué toca cerrar y cuándo empezar lo siguiente.',
      },
      {
        id: 'per',
        name: 'El Perfeccionista Paralizado',
        bg: '#F4C4CF',
        chaos:
          'Quiere que todo quede impecable. Le da tantas vueltas a cada detalle que muchas ideas buenas nunca llegan a ver la luz.',
        calm: 'Pasos pequeños, fechas claras y «hecho» antes que «perfecto».',
      },
      {
        id: 'mal',
        name: 'El Malabarista',
        bg: '#D9CCF5',
        chaos:
          'Sostiene clientes, redes, facturas, mensajes y mil cosas a la vez. Brilla haciéndolo todo, pero vive con la sensación de que algo se le va a caer.',
        calm: 'Un sistema que reparte, prioriza y te avisa, para que no tengas que sostenerlo todo en la cabeza.',
      },
    ];
    const types = typeData.map((t) => {
      const on = !!s.flipped[t.id];
      return {
        ...t,
        cls: on ? 'flip is-flipped' : 'flip',
        pressed: on ? 'true' : 'false',
        toggle: () =>
          this.setState((st) => ({
            flipped: { ...st.flipped, [t.id]: !st.flipped[t.id] },
          })),
        show: () => this.setState({ typePop: t.id }),
      };
    });

    const questions = [
      {
        text: 'Cuando se te ocurre una idea nueva…',
        options: [
          ['La guardo en algún sitio (luego ya veré dónde).', 'col'],
          ['¡La empiezo ya mismo!', 'emp'],
          ['Le doy vueltas hasta que esté perfecta.', 'per'],
          ['La sumo a las otras veinte cosas que llevo.', 'mal'],
        ],
      },
      {
        text: 'Tu escritorio digital ahora mismo es…',
        options: [
          ['Mil carpetas, capturas y enlaces guardados.', 'col'],
          ['Un cementerio de proyectos a medias.', 'emp'],
          ['Un borrador eterno que nunca publico.', 'per'],
          ['40 pestañas y tres chats sonando.', 'mal'],
        ],
      },
      {
        text: 'Lo que más te frena es…',
        options: [
          ['No encontrar lo que sé que tengo.', 'col'],
          ['Aburrirme antes de terminar.', 'emp'],
          ['Que nunca está lo bastante bien.', 'per'],
          ['No llegar a todo.', 'mal'],
        ],
      },
    ];
    const quizDone = s.qi >= questions.length;
    const qd = questions[Math.min(s.qi, questions.length - 1)];
    const q = {
      text: qd.text,
      options: qd.options.map((o) => ({
        label: o[0],
        pick: () =>
          this.setState((st) => ({
            answers: [...st.answers, o[1]],
            qi: st.qi + 1,
          })),
      })),
    };
    const dots = questions.map((_, i) => ({
      bg: i < s.qi ? '#1A1A1A' : i === s.qi ? '#5B4A99' : '#D9CCF5',
    }));
    let result = typeData[0];
    if (quizDone) {
      const tally = {};
      let best = null,
        bestN = 0;
      s.answers.forEach((a) => {
        tally[a] = (tally[a] || 0) + 1;
        if (tally[a] >= bestN) {
          bestN = tally[a];
          best = a;
        }
      });
      result = typeData.find((t) => t.id === best) || typeData[0];
    }
    const resultHref =
      'mailto:hola@chispaconcalma.com?subject=' +
      encodeURIComponent('Mi chispa es ' + result.name);

    if (!this.confettiPieces) {
      let seed = 7;
      const rnd = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      const colors = [
        '#9EE0D6',
        '#F4C4CF',
        '#C9B8F0',
        '#F5DF7A',
        '#7FD3C7',
        '#EBA9B9',
      ];
      // Formas Memphis: triángulo, medio círculo, cuarto de círculo, círculo, zigzag, onda y rectángulo
      const shapes = [
        { d: 'M20 5 L36 34 L4 34 Z', solid: true },
        { d: 'M4 28 A16 16 0 0 1 36 28 Z', solid: true },
        { d: 'M6 34 L6 8 A26 26 0 0 1 32 34 Z', solid: true },
        { d: 'M20 8 A12 12 0 1 1 19.99 8 Z', solid: true },
        { d: 'M14 4 L26 4 L26 36 L14 36 Z', solid: true },
        { d: 'M3 26 L10 14 L17 26 L24 14 L31 26 L37 16', solid: false },
        { d: 'M3 20 C8 8 14 8 20 20 S32 32 37 20', solid: false },
      ];
      this.confettiPieces = Array.from({ length: 80 }, () => {
        const sh = shapes[Math.floor(rnd() * shapes.length)];
        const color = colors[Math.floor(rnd() * colors.length)];
        return {
          left: Math.round(rnd() * 1000) / 10,
          size: (sh.solid ? 16 : 26) + Math.round(rnd() * 12),
          d: sh.d,
          fill: sh.solid ? color : 'none',
          stroke: sh.solid ? 'none' : color,
          dx: Math.round((rnd() - 0.5) * 240),
          rot: Math.round((rnd() - 0.5) * 1080),
          dur: Math.round((2.6 + rnd() * 2) * 10) / 10,
          delay: Math.round(rnd() * 0.9 * 100) / 100,
        };
      });
    }

    const phrases = [
      'Chispa para las ideas. Calma para crecer.',
      '¿Más chispa?',
      'Respira. Ya casi está.',
      'Bajando las ideas a tierra.',
      'Una pestaña menos. Bien.',
      'Tu chispa, con estructura.',
    ];

    const calma = s.mode === 'calma';
    const guideData = [
      {
        id: 'banco',
        group: 'chispa',
        tag: 'Próximamente',
        bg: '#F4C4CF',
        title: 'Banco de ideas para cuando te quedas en blanco',
        text: 'Preguntas y ejercicios cortos para desbloquearte y volver a tener ideas.',
        cta: 'Avísame cuando salga',
        thanks: '¡Te aviso en cuanto esté!',
      },
      {
        id: 'rutina',
        group: 'chispa',
        tag: 'Próximamente',
        bg: '#D9CCF5',
        title: 'Rutina de chispa',
        text: 'Pequeños hábitos para entrenar tu creatividad cada semana.',
        cta: 'Avísame cuando salga',
        thanks: '¡Te aviso en cuanto esté!',
      },
      {
        id: 'brain',
        group: 'calma',
        tag: 'Guía · 16 páginas',
        bg: '#FCEFB4',
        title: 'Mi Brain Dump',
        text: 'Saca todo lo que llevas en la cabeza, ordénalo, prioriza y pasa a la acción. El método que uso yo cuando tengo 37 pestañas abiertas.',
        cta: 'Quiero la guía',
        thanks: '¡Hecho! Mira tu correo ✓',
      },
      {
        id: 'limite',
        group: 'calma',
        tag: 'Guía · 16 páginas',
        bg: '#F4C4CF',
        title: 'Para no llegar al límite',
        text: 'Señales, pausas y pequeños hábitos para trabajar con energía sin acabar quemada por el camino.',
        cta: 'Quiero la guía',
        thanks: '¡Hecho! Mira tu correo ✓',
      },
      {
        id: 'pausa',
        group: 'calma',
        tag: 'Ahora mismo',
        bg: '#FCEFB4',
        title: 'Pausa de un minuto',
        text: 'Tres respiraciones guiadas para recuperar el foco antes de seguir. Sin email, sin nada: solo respira.',
        breath: true,
      },
    ];
    const mkGuide = (g) => ({
      ...g,
      inputId: 'email-' + g.id,
      isBreath: !!g.breath,
      open: !g.breath && !s.sent[g.id],
      sent: !g.breath && !!s.sent[g.id],
      submit: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.setState((st) => ({ sent: { ...st.sent, [g.id]: true } }));
      },
    });
    const guidesChispa = guideData
      .filter((g) => g.group === 'chispa')
      .map(mkGuide);
    const guidesCalma = guideData
      .filter((g) => g.group === 'calma')
      .map(mkGuide);

    return {
      hydrated: s.hydrated,
      rootCls: calma
        ? 'calma-mode'
        : (motion && s.anim ? 'anim' : '') +
          (motion && (s.intro === 'big' || s.intro === 'moving')
            ? ' intro-on'
            : ''),
      introShow:
        motion && !calma && (s.intro === 'big' || s.intro === 'moving'),
      introTransform:
        s.intro === 'moving' ? s.introTransform : 'translate(-50%, -50%)',
      rbUnit: this.rbTokens().map((t) => ({ ch: t.ch })),
      rbChars: this.rbChars(s.rbW),
      rbUnit2: this.rbTokens2().map((t) => ({ ch: t.ch })),
      rbUnit3: this.rbTokens3().map((t) => ({ ch: t.ch })),
      rbUnit4: this.rbTokens4().map((t) => ({ ch: t.ch })),
      rbChars4: this.rbChars(s.rbW4, this.rbTokens4(), '#1A1A1A', true),
      rbChars3: this.rbChars(s.rbW3, this.rbTokens3(), '#1A1A1A'),
      rbChars2: this.rbChars(s.rbW2, this.rbTokens2(), '#1A1A1A', true, 0.15),
      curveText: Array.from(
        { length: 8 },
        () =>
          'Chispa para las ideas\u00a0\u00a0✦\u00a0\u00a0Calma para crecer\u00a0\u00a0✦\u00a0\u00a0',
      ).join(''),
      curveOffset: '0',
      curveMove: motion && !!s.curveUnit,
      curveTo: motion ? '-' + (s.curveUnit || 980) : '0',
      curveDur: Math.round((s.curveUnit || 800) / 45) + 's',
      marquee: Array.from({ length: 24 }, (_, i) => ({
        word: ['Chispa para tus ideas', 'Calma para crecer'][i % 2],
        color: ['#FCEFB4', '#9EE0D6', '#F4C4CF'][i % 3],
      })),
      marqueeAlt: Array.from({ length: 24 }, (_, i) => ({
        word: ['Delega', 'Respira', 'Repite'][i % 3],
        color: ['#1A1A1A', '#F9F8F3', '#F4C4CF'][i % 3],
      })),
      chispaPressed: s.stage === 'chaos' ? 'true' : 'false',
      calmaPressed: s.stage === 'order' ? 'true' : 'false',
      stageIdle: s.stage === 'idle',
      showCalmBtn: s.stage === 'chaos',
      showReplay: s.stage === 'order',
      setChispa: () => this.toChispa(),
      setCalma: () => this.toCalma(),
      ideas: this.ideaData.map((d, i) => {
        const ph = s.ideaPhase;
        const off = s.ideaOff[d.id] || { dx: 0, dy: 0 };
        let tf = 'none',
          op = 1;
        if (ph === 'hidden') {
          tf = 'scale(.2)';
          op = 0;
        } else if (ph === 'gather' || ph === 'packed') {
          tf = 'translate(' + off.dx + 'px, ' + off.dy + 'px) scale(.15)';
          op = 0;
        }
        return {
          ...d,
          domId: 'idea-' + d.id,
          isPostit: d.kind === 'postit',
          isWa: d.kind === 'wa',
          isAudio: d.kind === 'audio',
          isNote: d.kind === 'note',
          isTab: d.kind === 'tab',
          isDoodle: d.kind === 'doodle',
          tf,
          op,
          delay:
            ph === 'packed' ? (i * 0.035).toFixed(2) : (i * 0.045).toFixed(2),
        };
      }),
      ideasCls:
        'ideas' +
        (s.ideaPhase === 'gather' || s.ideaPhase === 'hidden' ? ' no-tr' : '') +
        (s.ideaPhase === 'packed' ? ' packing' : ''),
      showCalmHint: s.hero === 'chaos',
      textCls:
        'hero-col' +
        (s.hero === 'chaos' || s.hero === 'prep' ? ' soft-off' : ''),
      photoColCls:
        'hero-col intro-hide' + (s.hero === 'chaos' ? ' soft-off' : ''),
      leftFlex:
        s.hero === 'prep' || s.hero === 'order' ? '1 1 380px' : '999 1 520px',
      rightFlex:
        s.hero === 'prep' || s.hero === 'order' ? '1 1 560px' : '1 1 380px',
      laptopCls: s.laptop ? 'laptop on' : 'laptop',
      hammockCls: s.stage === 'order' ? 'hammock on' : 'hammock',
      photoCls:
        s.hero === 'prep' || s.hero === 'order'
          ? 'photo-arch off'
          : 'photo-arch',
      logoClick: () => {
        const now = Date.now();
        this.clicks = this.clicks.filter((t) => now - t < 2500).concat(now);
        if (this.clicks.length >= 5 && !calma && this.motionOn()) {
          this.clicks = [];
          this.launchConfetti();
          this.setState({ toast: false }, () => this.setState({ toast: true }));
          clearTimeout(this.toastOff);
          this.toastOff = setTimeout(
            () => this.setState({ toast: false }),
            2700,
          );
          this.timers.push(this.toastOff);
        }
      },
      showToast: !calma && s.toast,
      showTop: s.y > 700 && !s.breath,
      showWa: !s.breath && s.intro !== 'big' && s.intro !== 'moving',
      breathOn: !!s.breath,
      breathWord: s.breathDone ? 'Ya está' : s.inhale ? 'Inhala' : 'Exhala',
      breathKicker: s.breathDone
        ? 'vuelves a la calma'
        : 'respira conmigo · ' + (s.cycle || 1) + ' de 3',
      breathHint: s.breathDone
        ? 'Ahora sí, seguimos con calma.'
        : s.inhale
          ? 'Llena los pulmones despacio mientras el círculo crece.'
          : 'Suelta el aire poco a poco mientras el círculo se hace pequeño.',
      startBreath: () => this.startBreathing(),
      endBreath: () => this.finishBreathing(),
      closeBreath: () => {
        clearInterval(this.breathIv);
        this.setState({ breath: false });
      },
      svcs: [
        {
          id: 'org',
          name: 'Organización y sistemas digitales',
          bg: '#9EE0D6',
          short:
            'Pongo orden en tus herramientas, archivos y procesos para que tu negocio funcione sin depender de tu memoria.',
          items: [
            'Diagnóstico de cómo trabajas hoy',
            'Orden de archivos, carpetas y documentos',
            'Diseño de tu sistema de tareas y procesos',
            'Montaje en la herramienta que mejor te encaje (Notion, Trello, Asana, ClickUp…)',
            'Guía de uso y acompañamiento para que lo uses de verdad',
          ],
          is_org: true,
          is_pm: false,
          is_web: false,
          is_asis: false,
        },
        {
          id: 'pm',
          name: 'Project Management Digital',
          bg: '#FCEFB4',
          short:
            'Coordino tus proyectos y lanzamientos —tareas, plazos y personas— para que las ideas lleguen a la meta.',
          items: [
            'Plan del proyecto o lanzamiento: fases, tareas y plazos',
            'Coordinación de personas y proveedores',
            'Seguimiento semanal y control de fechas',
            'Reuniones de avance con resumen claro',
            'Cierre del proyecto y aprendizajes para el siguiente',
          ],
          is_org: false,
          is_pm: true,
          is_web: false,
          is_asis: false,
        },
        {
          id: 'web',
          name: 'Diseño web',
          bg: '#F4C4CF',
          short:
            'Webs claras y con tu personalidad, con reservas y pagos, para que te encuentren y te contraten.',
          items: [
            'Web de 3–4 páginas con tu personalidad',
            'Página de reservas y pasarela de pago',
            'Estructura y textos pensados para que te contraten',
            'Adaptada a móvil desde el principio',
            'Lo más interactivo, a medida de tu proyecto',
          ],
          is_org: false,
          is_pm: false,
          is_web: true,
          is_asis: false,
        },
        {
          id: 'asis',
          name: 'Asistencia y soporte digital',
          bg: '#D9CCF5',
          short:
            'Me encargo de las tareas que te roban el día: gestiones, correos, agenda y pequeños marrones digitales.',
          items: [
            'Gestión de correo y agenda',
            'Gestiones y trámites del día a día',
            'Orden de documentos y facturas',
            'Esas pequeñas tareas digitales que te roban tiempo',
            'Apoyo puntual o acompañamiento mensual',
          ],
          is_org: false,
          is_pm: false,
          is_web: false,
          is_asis: true,
        },
      ].map((d, idx) => {
        const on = !!(s.openSvc || {})[d.id];
        const pin = d.id === 'web' ? '#9EE0D6' : '#F4C4CF';
        return {
          ...d,
          pin,
          top: 110 + idx * 26,
          cls: on ? 'svc is-open' : 'svc',
          expanded: on ? 'true' : 'false',
          toggle: () =>
            this.setState((st) => ({
              openSvc: {
                ...(st.openSvc || {}),
                [d.id]: !(st.openSvc || {})[d.id],
              },
            })),
          list: d.items.map((t, i) => ({
            t,
            delay: (0.55 + i * 0.22).toFixed(2) + 's',
          })),
        };
      }),
      guidesChispa,
      guidesCalma,
      hdrCls: s.y > 40 ? 'hdr small' : 'hdr',
      logoRot: Math.round((s.y * 0.25) % 360),
      tabsLabel:
        s.count > 1
          ? s.count + ' pestañas abiertas → 1 plan'
          : '1 pestaña. 1 plan. Calma.',
      typed: this.full.slice(0, s.typedN),
      typing: s.typedN < this.full.length,
      mapPct: s.mapPct,
      steps,
      types,
      quizOpen: !quizDone,
      typeOpen: !!s.typePop,
      aboutCls: s.aboutPlay ? 'about play' : 'about',
      menuOpen: !!s.menu,
      menuCls: s.menu ? 'menu-panel open' : 'menu-panel',
      burgerCls: s.menu ? 'burger open' : 'burger',
      menuLabel: s.menu ? 'Cerrar menú' : 'Abrir menú',
      menuExpanded: s.menu ? 'true' : 'false',
      toggleMenu: () => this.setState((st) => ({ menu: !st.menu })),
      closeMenu: () => this.setState({ menu: false }),
      goAboutMenu: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.setState({ menu: false, aboutPlay: false });
        const el = document.getElementById('sobre-mi');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.timers.push(
          setTimeout(() => this.setState({ aboutPlay: true }), 700),
        );
      },
      goAbout: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const el = document.getElementById('sobre-mi');
        this.setState({ aboutPlay: false });
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.timers.push(
          setTimeout(() => this.setState({ aboutPlay: true }), 650),
        );
      },
      pop: typeData.find((t) => t.id === s.typePop) || typeData[0],
      closeType: () => this.setState({ typePop: null }),
      stopProp: (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
      },
      quizDone,
      qNum: Math.min(s.qi + 1, questions.length),
      q,
      dots,
      result,
      resultHref,
      restart: () => this.setState({ qi: 0, answers: [] }),
      phrase: phrases[s.phrase % phrases.length],
      showConfetti: motion && !calma && !!s.confetti,
      confetti: this.confettiPieces,
      showDoll: false,
      showCursor: motion && !calma && s.cursor,
      cx: s.cx,
      cy: s.cy,
      tone: s.tone,
    };
  }

  render() {
    return <HomeView v={this.renderVals()} />;
  }
}
