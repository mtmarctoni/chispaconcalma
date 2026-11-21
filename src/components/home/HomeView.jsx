import { Fragment } from 'react';
import SectionInicio from './SectionInicio.jsx';
import SectionProblem from './SectionProblem.jsx';
import SectionNegocios from './SectionNegocios.jsx';
import SectionChispaCalma from './SectionChispaCalma.jsx';
import SectionApproach from './SectionApproach.jsx';
import SectionServicios from './SectionServicios.jsx';
import SectionMetodo from './SectionMetodo.jsx';
import SectionTest from './SectionTest.jsx';
import SectionPasos from './SectionPasos.jsx';
import SectionFormatos from './SectionFormatos.jsx';
import SectionTestimonials from './SectionTestimonials.jsx';
import SectionSobreMi from './SectionSobreMi.jsx';
import SectionRecursos from './SectionRecursos.jsx';
import SectionFaq from './SectionFaq.jsx';
import SectionContacto from './SectionContacto.jsx';

export default function HomeView({ v }) {
  return (
    <div
      className={v.rootCls}
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: '#1A1A1A',
        background: '#F9F8F3',
        width: '100%',
        overflowX: 'clip',
        position: 'relative',
      }}
      data-canvas-width={'1440'}
      data-hydrated={v.hydrated ? 'true' : 'false'}
      data-canvas-height={'8000'}
      data-document-role={'page'}
      data-label={'Web — Inicio'}
    >
      {v.showConfetti && (
        <>
          <div className={'confetti'} aria-hidden={'true'}>
            {v.confetti.map((p, index) => (
              <Fragment key={index}>
                <svg
                  className={'cf'}
                  width={p.size}
                  height={p.size}
                  viewBox={'0 0 40 40'}
                  style={{
                    left: p.left + '%',
                    '--dx': p.dx + 'px',
                    '--rot': p.rot + 'deg',
                    '--dur': p.dur + 's',
                    '--delay': p.delay + 's',
                  }}
                >
                  <path
                    d={p.d}
                    fill={p.fill}
                    stroke={p.stroke}
                    strokeWidth={'4.5'}
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                  ></path>
                </svg>
              </Fragment>
            ))}
            {v.showDoll && (
              <>
                <div className={'doll'}>
                  <span className={'doll-say'}>{'¡yupiii!'}</span>
                  <svg
                    width={'100'}
                    height={'140'}
                    viewBox={'0 0 100 140'}
                    style={{ overflow: 'visible' }}
                  >
                    <ellipse
                      className={'doll-shadow'}
                      cx={'50'}
                      cy={'134'}
                      rx={'16'}
                      ry={'3'}
                      fill={'#1A1A1A'}
                      opacity={'.15'}
                    ></ellipse>
                    <g className={'doll-body'}>
                      <g className={'arm-up a2'}>
                        <path
                          d={'M55 63 L66 47'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'9'}
                          strokeLinecap={'round'}
                        ></path>
                        <path
                          d={'M55 63 L66 47'}
                          stroke={'#FCEFB4'}
                          strokeWidth={'6'}
                          strokeLinecap={'round'}
                        ></path>
                        <circle
                          cx={'66'}
                          cy={'44'}
                          r={'3.3'}
                          fill={'#F2C9A8'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'1.2'}
                        ></circle>
                      </g>
                      <g className={'leg l2'}>
                        <path
                          d={'M53 96 L56 121'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'6.5'}
                          strokeLinecap={'round'}
                        ></path>
                        <ellipse
                          cx={'53'}
                          cy={'124'}
                          rx={'7'}
                          ry={'3.4'}
                          fill={'#F4C4CF'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'1.3'}
                        ></ellipse>
                      </g>
                      <g className={'leg l1'}>
                        <path
                          d={'M47 96 L43 121'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'6.5'}
                          strokeLinecap={'round'}
                        ></path>
                        <ellipse
                          cx={'40'}
                          cy={'124'}
                          rx={'7'}
                          ry={'3.4'}
                          fill={'#F4C4CF'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'1.3'}
                        ></ellipse>
                      </g>
                      <path
                        d={
                          'M41 61 C43 55 58 55 60 61 L63 95 C55 99.5 45 99.5 38 95 Z'
                        }
                        fill={'#FCEFB4'}
                        stroke={'#1A1A1A'}
                        strokeWidth={'1.6'}
                        strokeLinejoin={'round'}
                      ></path>
                      <path
                        d={'M39.5 91 C46 94 55 94 61.5 91'}
                        stroke={'#1A1A1A'}
                        strokeWidth={'1'}
                        fill={'none'}
                        opacity={'.5'}
                      ></path>
                      <rect
                        x={'47'}
                        y={'50'}
                        width={'7'}
                        height={'8'}
                        rx={'2'}
                        fill={'#E9BC98'}
                      ></rect>
                      <path
                        d={
                          'M55 28 C66 30 68 44 64 54 C62 56 59 56 58 54 C60 46 59 38 55 34 Z'
                        }
                        fill={'#1A1A1A'}
                      ></path>
                      <circle
                        cx={'58'}
                        cy={'17'}
                        r={'8'}
                        fill={'#1A1A1A'}
                      ></circle>
                      <path
                        d={
                          'M50 23 C41 23 36 30 36 37 C34.5 38.5 34 40 35.5 41 C36 46 40 51 47 52 C54 52.5 60 47 61 39 C62 30 57 23 50 23 Z'
                        }
                        fill={'#F2C9A8'}
                      ></path>
                      <path
                        d={
                          'M36.5 33 C37 24 45 20 52 20.5 C60 21 64 27 63 35 C60 31 56 29.5 52 30 C47 30.5 41 31 36.5 33 Z'
                        }
                        fill={'#1A1A1A'}
                      ></path>
                      <path
                        d={'M63 33 C64 40 63 46 60 50'}
                        stroke={'#1A1A1A'}
                        strokeWidth={'2.6'}
                        fill={'none'}
                        strokeLinecap={'round'}
                      ></path>
                      <path
                        d={
                          'M62 14 L63.3 17.4 L66.8 18.6 L63.3 19.8 L62 23.2 L60.7 19.8 L57.2 18.6 L60.7 17.4 Z'
                        }
                        fill={'#FCEFB4'}
                        stroke={'#1A1A1A'}
                        strokeWidth={'.6'}
                      ></path>
                      <ellipse
                        cx={'42.5'}
                        cy={'38'}
                        rx={'1.8'}
                        ry={'2.3'}
                        fill={'#1A1A1A'}
                      ></ellipse>
                      <circle
                        cx={'42'}
                        cy={'37.2'}
                        r={'.55'}
                        fill={'#FFFFFF'}
                      ></circle>
                      <circle
                        cx={'46'}
                        cy={'44'}
                        r={'2.6'}
                        fill={'#F4C4CF'}
                        opacity={'.85'}
                      ></circle>
                      <path
                        d={'M37.5 45.5 C39.5 48.5 42.5 48.5 44 46.5'}
                        stroke={'#1A1A1A'}
                        strokeWidth={'1.4'}
                        fill={'#E07A93'}
                        strokeLinecap={'round'}
                      ></path>
                      <g className={'arm-up a1'}>
                        <path
                          d={'M44 65 L28 57'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'9'}
                          strokeLinecap={'round'}
                        ></path>
                        <path
                          d={'M44 65 L28 57'}
                          stroke={'#FCEFB4'}
                          strokeWidth={'6'}
                          strokeLinecap={'round'}
                        ></path>
                        <circle
                          cx={'26.5'}
                          cy={'56.5'}
                          r={'3.3'}
                          fill={'#F2C9A8'}
                          stroke={'#1A1A1A'}
                          strokeWidth={'1.2'}
                        ></circle>
                      </g>
                    </g>
                  </svg>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {v.introShow && (
        <>
          <span
            id={'intro-chispa'}
            className={'intro-word'}
            aria-hidden={'true'}
            style={{ transform: v.introTransform }}
          >
            {'chispa'}
          </span>
        </>
      )}
      {v.showToast && (
        <>
          <div
            className={'toast'}
            role={'status'}
            style={{
              background: '#FCEFB4',
              border: '2px solid #1A1A1A',
              borderRadius: '20px',
              padding: '12px 26px',
              fontFamily: "'Gochi Hand', cursive",
              fontSize: '32px',
            }}
          >
            {'¿Más chispa?'}
          </div>
        </>
      )}
      {v.typeOpen && (
        <>
          <div
            className={'breath-overlay'}
            role={'dialog'}
            aria-modal={'true'}
            aria-label={v.pop.name}
            onClick={v.closeType}
          >
            <div
              onClick={v.stopProp}
              style={{
                position: 'relative',
                maxWidth: '520px',
                width: 'calc(100% - 48px)',
                background: v.pop.bg,
                border: '2px solid #1A1A1A',
                borderRadius: '32px',
                padding: '36px 32px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 24px 50px rgba(26,26,26,.18)',
              }}
            >
              <button
                type={'button'}
                onClick={v.closeType}
                aria-label={'Cerrar'}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '2px solid #1A1A1A',
                  background: '#F9F8F3',
                  font: 'inherit',
                  fontSize: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: '#1A1A1A',
                }}
              >
                {'✕'}
              </button>
              <span
                style={{
                  fontFamily: "'Gochi Hand', cursive",
                  fontSize: '24px',
                  color: '#5B4A99',
                }}
              >
                {'tipo de chispa'}
              </span>
              <h3
                style={{
                  margin: '0',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '800',
                  fontSize: '30px',
                  lineHeight: '1.1',
                  paddingRight: '40px',
                }}
              >
                {v.pop.name}
              </h3>
              <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.6' }}>
                <strong>{'Así es esta chispa.'}</strong>
                {' ' + v.pop.chaos}
              </p>
              <div
                style={{
                  background: '#1A1A1A',
                  color: '#F9F8F3',
                  borderRadius: '20px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Gochi Hand', cursive",
                    fontSize: '22px',
                    color: '#FCEFB4',
                  }}
                >
                  {'su calma'}
                </span>
                <span style={{ fontSize: '17px', lineHeight: '1.55' }}>
                  {v.pop.calm}
                </span>
              </div>
              <a
                className={'btn'}
                href={'#test'}
                onClick={v.closeType}
                style={{
                  alignSelf: 'flex-start',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '16px',
                  color: '#1A1A1A',
                }}
              >
                {'¿Es la tuya? Haz el test ↓'}
              </a>
            </div>
          </div>
        </>
      )}
      {v.breathOn && (
        <>
          <div
            role={'dialog'}
            aria-modal={'true'}
            aria-label={'Respira conmigo'}
            className={'breath-overlay'}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '28px',
                textAlign: 'center',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Gochi Hand', cursive",
                  fontSize: '30px',
                  color: '#5B4A99',
                }}
              >
                {v.breathKicker}
              </span>
              <div
                style={{
                  position: 'relative',
                  width: '260px',
                  height: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className={'breath-ring'} aria-hidden={'true'}></div>
                <div className={'breath-circle'} aria-hidden={'true'}></div>
                <span
                  aria-live={'polite'}
                  style={{
                    position: 'relative',
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: '600',
                    fontSize: '30px',
                  }}
                >
                  {v.breathWord}
                </span>
              </div>
              <span
                style={{
                  fontSize: '17px',
                  maxWidth: '360px',
                  lineHeight: '1.5',
                }}
              >
                {v.breathHint}
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <button
                  type={'button'}
                  onClick={v.endBreath}
                  style={{
                    font: 'inherit',
                    fontWeight: '700',
                    fontSize: '16px',
                    background: '#1A1A1A',
                    color: '#F9F8F3',
                    border: '0',
                    borderRadius: '999px',
                    padding: '14px 24px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >
                  {'Ya estoy en calma'}
                </button>
                <button
                  type={'button'}
                  onClick={v.closeBreath}
                  style={{
                    font: 'inherit',
                    fontWeight: '700',
                    fontSize: '16px',
                    background: 'none',
                    border: '2px solid #1A1A1A',
                    borderRadius: '999px',
                    padding: '12px 22px',
                    minHeight: '48px',
                    cursor: 'pointer',
                    color: '#1A1A1A',
                  }}
                >
                  {'Cerrar'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {v.showWa && (
        <>
          <a
            className={'btn to-top wa-btn'}
            href={'mailto:hola@chispaconcalma.com'}
            target={'_blank'}
            rel={'noopener'}
            aria-label={'Escríbeme por email'}
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#1A1A1A',
              color: '#F9F8F3',
              padding: '8px 18px 8px 8px',
              borderRadius: '999px',
              minHeight: '56px',
              boxSizing: 'border-box',
              fontWeight: '700',
              fontSize: '15px',
            }}
          >
            <span
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#9EE0D6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width={'26'}
                height={'26'}
                viewBox={'0 0 24 24'}
                aria-hidden={'true'}
              >
                <path
                  d={'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z'}
                  fill={'none'}
                  stroke={'#1A1A1A'}
                  strokeWidth={'1.8'}
                  strokeLinejoin={'round'}
                ></path>
                <path
                  d={
                    'M9.2 8.3c.2-.4.5-.4.8-.4l.6.1c.2.1.3.3.4.5l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.2.1.4.2.5.4l.1.6c0 .3 0 .6-.4.8-.5.3-1.2.5-1.9.3-2.6-.7-4.6-2.7-5.3-5.3-.2-.7 0-1.4.3-1.9z'
                  }
                  fill={'#1A1A1A'}
                ></path>
              </svg>
            </span>
            {'\n      Escríbeme\n    '}
          </a>
        </>
      )}
      {v.showCursor && (
        <>
          <div
            className={'star-cursor'}
            aria-hidden={'true'}
            style={{ transform: 'translate(' + v.cx + 'px, ' + v.cy + 'px)' }}
          >
            <svg width={'26'} height={'26'} viewBox={'0 0 40 40'}>
              <path
                d={'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'}
                fill={v.tone}
                stroke={'#1A1A1A'}
                strokeWidth={'2'}
                strokeLinejoin={'round'}
              ></path>
            </svg>
          </div>
        </>
      )}

      <header className={v.hdrCls}>
        <nav
          className={'nav'}
          aria-label={'Principal'}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '32px',
            paddingRight: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <a
            href={'#inicio'}
            onClick={v.logoClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#1A1A1A',
            }}
          >
            <svg
              width={'34'}
              height={'34'}
              viewBox={'0 0 40 40'}
              aria-hidden={'true'}
            >
              <circle cx={'20'} cy={'20'} r={'20'} fill={'#FCEFB4'}></circle>
              <g
                style={{
                  transform: 'rotate(' + v.logoRot + 'deg)',
                  transformOrigin: '20px 20px',
                }}
              >
                <path
                  d={
                    'M20 6 L23.2 16.8 L34 20 L23.2 23.2 L20 34 L16.8 23.2 L6 20 L16.8 16.8 Z'
                  }
                  fill={'#1A1A1A'}
                ></path>
              </g>
            </svg>
            <span
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '600',
                fontSize: '18px',
                letterSpacing: '-0.01em',
              }}
            >
              {'Chispa '}
              <span style={{ fontWeight: '400' }}>{'con'}</span>
              {' Calma'}
            </span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type={'button'}
              className={v.burgerCls}
              onClick={v.toggleMenu}
              aria-label={v.menuLabel}
              aria-expanded={v.menuExpanded}
              aria-controls={'menu-panel'}
              disabled={!v.hydrated}
            >
              <span className={'bg-line l1'}></span>
              <span className={'bg-line l2'}></span>
              <span className={'bg-line l3'}></span>
            </button>
          </div>
        </nav>
      </header>
      <nav
        id={'menu-panel'}
        className={v.menuCls}
        aria-label={'Menú'}
        inert={!v.menuOpen}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '110px 32px 90px',
          }}
        >
          <a
            className={'menu-link'}
            href={'#inicio'}
            onClick={v.closeMenu}
            style={{ transitionDelay: '0.12s' }}
          >
            {'Inicio'}
          </a>
          <a
            className={'menu-link'}
            href={'#servicios'}
            onClick={v.closeMenu}
            style={{ transitionDelay: '0.17s' }}
          >
            {'Servicios'}
          </a>
          <a
            className={'menu-link'}
            href={'#metodo'}
            onClick={v.closeMenu}
            style={{ transitionDelay: '0.22s' }}
          >
            {'Cómo trabajo'}
          </a>
          <a
            className={'menu-link'}
            href={'#test'}
            onClick={v.closeMenu}
            style={{ transitionDelay: '0.27s' }}
          >
            {'¿Qué chispa eres?'}
          </a>
          <a
            className={'menu-link'}
            href={'#recursos'}
            onClick={v.closeMenu}
            style={{ transitionDelay: '0.32s' }}
          >
            {'Recursos'}
          </a>
          <a
            className={'menu-link'}
            href={'#sobre-mi'}
            onClick={v.goAboutMenu}
            style={{ transitionDelay: '0.37s' }}
          >
            {'Sobre mí'}
          </a>
          <a
            className={'menu-link'}
            href={'#contacto'}
            onClick={v.closeMenu}
            style={{ transitionDelay: '0.42s' }}
          >
            {'Contacto'}
          </a>
        </div>
        <span
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '32px',
            textAlign: 'center',
            fontFamily: "'Gochi Hand', cursive",
            fontSize: '26px',
            color: '#5B4A99',
          }}
        >
          {'respira, vamos por partes'}
        </span>
      </nav>

      <SectionInicio v={v} />

      <div
        className={'ribbon-wrap'}
        role={'img'}
        aria-label={
          'Sistemas digitales, project management, diseño web y asistencia digital'
        }
        style={{ margin: '0 0 8px' }}
      >
        <div className={'ribbon'} aria-hidden={'true'}>
          <svg
            viewBox={'0 -30 1440 260'}
            width={'1440'}
            height={'260'}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              display: 'block',
            }}
          >
            <path
              d={
                'M-240 110 C 180 10, 420 20, 720 105 C 1020 190, 1320 20, 1680 120'
              }
              fill={'none'}
              stroke={'#F4C4CF'}
              strokeWidth={'54'}
            ></path>
          </svg>
          {v.rbChars3.map((c, index) => (
            <Fragment key={index}>
              <span
                className={'rb-ch rb-ch3'}
                style={{
                  offsetDistance: c.pct + '%',
                  animationDelay: c.delay + 's',
                  color: c.color,
                }}
              >
                {c.ch}
              </span>
            </Fragment>
          ))}
          <div className={'rb-measure'}>
            {v.rbUnit3.map((m, index) => (
              <Fragment key={index}>
                <span className={'rb-m3'}>{m.ch}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <SectionProblem v={v} />

      <SectionNegocios v={v} />

      <SectionChispaCalma v={v} />

      <SectionApproach v={v} />

      <div
        role={'img'}
        aria-label={'Chispa para las ideas, calma para crecer'}
        style={{
          position: 'relative',
          margin: '8px -3% 56px',
          height: '150px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '10px',
            zIndex: '1',
          }}
        >
          <div
            className={'band band-ltr'}
            style={{
              overflow: 'hidden',
              background: '#1A1A1A',
              color: '#F9F8F3',
              padding: '14px 0',
            }}
          >
            <div className={'marquee-track'} aria-hidden={'true'}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CHISPA PARA LAS IDEAS'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#FCEFB4'}
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '62px',
            zIndex: '2',
            transform: 'rotate(-4deg)',
            transformOrigin: 'right center',
          }}
        >
          <div
            className={'band'}
            style={{
              overflow: 'hidden',
              background: '#C9B8F0',
              color: '#1A1A1A',
              padding: '14px 0',
            }}
          >
            <div className={'marquee-track'} aria-hidden={'true'}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '22px',
                  paddingRight: '22px',
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {'CALMA PARA CRECER'}
                <svg width={'20'} height={'20'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F9F8F3'}
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionServicios v={v} />

      <SectionMetodo v={v} />

      <SectionTest v={v} />

      <SectionPasos v={v} />

      <SectionFormatos v={v} />
      <div
        id={'rb2'}
        className={'ribbon-wrap'}
        role={'img'}
        aria-label={'Delega, respira y repite'}
        style={{ margin: '0 0 8px' }}
      >
        <div className={'ribbon'} aria-hidden={'true'}>
          <svg
            viewBox={'0 -30 1440 260'}
            width={'1440'}
            height={'260'}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              display: 'block',
            }}
          >
            <path
              d={'M-240 110 C 120 210, 420 40, 720 125 S 1260 220, 1680 120'}
              fill={'none'}
              stroke={'#9EE0D6'}
              strokeWidth={'54'}
            ></path>
          </svg>
          {v.rbChars2.map((c, index) => (
            <Fragment key={index}>
              <span
                className={'rb-ch rb-ch2'}
                style={{
                  offsetDistance: c.pct + '%',
                  animationDelay: c.delay + 's',
                  color: c.color,
                }}
              >
                {c.ch}
              </span>
            </Fragment>
          ))}
          <div className={'rb-measure'}>
            {v.rbUnit2.map((m, index) => (
              <Fragment key={index}>
                <span className={'rb-m2'}>{m.ch}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <SectionTestimonials v={v} />

      <SectionSobreMi v={v} />

      <SectionRecursos v={v} />

      <SectionFaq v={v} />

      <SectionContacto v={v} />

      <footer style={{ borderTop: '1px solid #E8E5DA' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '15px',
          }}
        >
          <span
            style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: '600' }}
          >
            {'Chispa '}
            <span style={{ fontWeight: '400' }}>{'con'}</span>
            {' Calma'}
          </span>
          <a
            href={'https://instagram.com/chispaconcalma'}
            style={{ fontWeight: '700' }}
          >
            {'@chispaconcalma'}
          </a>
        </div>
      </footer>
    </div>
  );
}
