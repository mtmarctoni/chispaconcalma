import { Fragment } from 'react';

export default function SectionMetodo({ v }) {
  return (
    <section
      id={'metodo'}
      data-tone={'#9EE0D6'}
      style={{
        background:
          'linear-gradient(to bottom, #F9F8F3 0px, #DDF3EF 180px, #DDF3EF calc(100% - 180px), #F9F8F3 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <div
          className={'reveal'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxWidth: '760px',
          }}
        >
          <span
            style={{
              fontFamily: "'Gochi Hand', cursive",
              fontSize: '28px',
              color: '#5B4A99',
            }}
          >
            {'mi método'}
          </span>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            {'Bajando las ideas '}
            <span
              className={'tint'}
              style={{
                background: '#F4C4CF',
                padding: '0 10px',
                borderRadius: '12px',
              }}
            >
              {'a tierra'}
            </span>
            {'.'}
          </h2>
          <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.55' }}>
            {
              'En eso te ayudo: que lo que hoy es una chispa en tu cabeza mañana sea un plan con pasos, fechas y calma. Lo hago con '
            }
            <strong>{'El Mapa Chispa-Calma'}</strong>
            {
              ', cinco pasos para pasar de «tengo de todo en la cabeza» a «sé exactamente qué toca hoy».'
            }
          </p>
        </div>
        <div className={'metodo-map reveal'}>
          <div className={'mp-map'}>
            <svg
              className={'mp-path'}
              width={'1100'}
              height={'360'}
              viewBox={'0 0 1100 360'}
              aria-hidden={'true'}
            >
              <path
                d={
                  'M40 300 C 180 300, 200 80, 330 90 S 480 300, 600 260 S 760 60, 860 110 S 1000 280, 1060 200'
                }
                fill={'none'}
                stroke={'#1A1A1A'}
                strokeWidth={'3'}
                strokeDasharray={'2 12'}
                strokeLinecap={'round'}
              ></path>
            </svg>
            <svg
              className={'mp-pin'}
              viewBox={'0 0 40 40'}
              style={{
                left: '78px',
                top: '294px',
                animation: 'mppin0 12.0s linear infinite',
              }}
              aria-hidden={'true'}
            >
              <path
                d={'M21 22 L29 36'}
                stroke={'#8A8A8A'}
                strokeWidth={'2.4'}
                strokeLinecap={'round'}
              ></path>
              <circle
                cx={'19'}
                cy={'17'}
                r={'11'}
                fill={'#F5DF7A'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.6'}
              ></circle>
              <ellipse
                cx={'15'}
                cy={'12.5'}
                rx={'3'}
                ry={'2'}
                fill={'#FFFFFF'}
                opacity={'.7'}
              ></ellipse>
            </svg>
            <svg
              className={'mp-pin'}
              viewBox={'0 0 40 40'}
              style={{
                left: '301px',
                top: '92px',
                animation: 'mppin1 12.0s linear infinite',
              }}
              aria-hidden={'true'}
            >
              <path
                d={'M21 22 L29 36'}
                stroke={'#8A8A8A'}
                strokeWidth={'2.4'}
                strokeLinecap={'round'}
              ></path>
              <circle
                cx={'19'}
                cy={'17'}
                r={'11'}
                fill={'#9EE0D6'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.6'}
              ></circle>
              <ellipse
                cx={'15'}
                cy={'12.5'}
                rx={'3'}
                ry={'2'}
                fill={'#FFFFFF'}
                opacity={'.7'}
              ></ellipse>
            </svg>
            <svg
              className={'mp-pin'}
              viewBox={'0 0 40 40'}
              style={{
                left: '530px',
                top: '255px',
                animation: 'mppin2 12.0s linear infinite',
              }}
              aria-hidden={'true'}
            >
              <path
                d={'M21 22 L29 36'}
                stroke={'#8A8A8A'}
                strokeWidth={'2.4'}
                strokeLinecap={'round'}
              ></path>
              <circle
                cx={'19'}
                cy={'17'}
                r={'11'}
                fill={'#F4C4CF'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.6'}
              ></circle>
              <ellipse
                cx={'15'}
                cy={'12.5'}
                rx={'3'}
                ry={'2'}
                fill={'#FFFFFF'}
                opacity={'.7'}
              ></ellipse>
            </svg>
            <svg
              className={'mp-pin'}
              viewBox={'0 0 40 40'}
              style={{
                left: '771px',
                top: '121px',
                animation: 'mppin3 12.0s linear infinite',
              }}
              aria-hidden={'true'}
            >
              <path
                d={'M21 22 L29 36'}
                stroke={'#8A8A8A'}
                strokeWidth={'2.4'}
                strokeLinecap={'round'}
              ></path>
              <circle
                cx={'19'}
                cy={'17'}
                r={'11'}
                fill={'#D9CCF5'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.6'}
              ></circle>
              <ellipse
                cx={'15'}
                cy={'12.5'}
                rx={'3'}
                ry={'2'}
                fill={'#FFFFFF'}
                opacity={'.7'}
              ></ellipse>
            </svg>
            <svg
              className={'mp-pin'}
              viewBox={'0 0 40 40'}
              style={{
                left: '1031px',
                top: '225px',
                animation: 'mppin4 12.0s linear infinite',
              }}
              aria-hidden={'true'}
            >
              <path
                d={'M21 22 L29 36'}
                stroke={'#8A8A8A'}
                strokeWidth={'2.4'}
                strokeLinecap={'round'}
              ></path>
              <circle
                cx={'19'}
                cy={'17'}
                r={'11'}
                fill={'#F5DF7A'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.6'}
              ></circle>
              <ellipse
                cx={'15'}
                cy={'12.5'}
                rx={'3'}
                ry={'2'}
                fill={'#FFFFFF'}
                opacity={'.7'}
              ></ellipse>
            </svg>
            <div
              className={'mp-lbl'}
              style={{
                left: '110px',
                top: '144px',
                animation: 'mplb0 12.0s linear infinite',
              }}
            >
              <span
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '16px',
                }}
              >
                <span
                  style={{
                    background: '#FCEFB4',
                    padding: '0 6px',
                    borderRadius: '6px',
                  }}
                >
                  {'1'}
                </span>
                {' Suelta'}
              </span>
              <span>
                {
                  'Sacamos todo lo que llevas dentro: ideas, tareas, pendientes y dudas.'
                }
              </span>
            </div>
            <div
              className={'mp-lbl'}
              style={{
                left: '301px',
                top: '110px',
                animation: 'mplb1 12.0s linear infinite',
              }}
            >
              <span
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '16px',
                }}
              >
                <span
                  style={{
                    background: '#9EE0D6',
                    padding: '0 6px',
                    borderRadius: '6px',
                  }}
                >
                  {'2'}
                </span>
                {' Mira'}
              </span>
              <span>
                {'Observamos cómo trabajas de verdad, sin juicios ni manuales.'}
              </span>
            </div>
            <div
              className={'mp-lbl'}
              style={{
                left: '530px',
                top: '105px',
                animation: 'mplb2 12.0s linear infinite',
              }}
            >
              <span
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '16px',
                }}
              >
                <span
                  style={{
                    background: '#F4C4CF',
                    padding: '0 6px',
                    borderRadius: '6px',
                  }}
                >
                  {'3'}
                </span>
                {' Nombra'}
              </span>
              <span>
                {
                  'Ponemos nombre a tu tipo de chispa y a lo que de verdad la frena.'
                }
              </span>
            </div>
            <div
              className={'mp-lbl'}
              style={{
                left: '771px',
                top: '139px',
                animation: 'mplb3 12.0s linear infinite',
              }}
            >
              <span
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '16px',
                }}
              >
                <span
                  style={{
                    background: '#D9CCF5',
                    padding: '0 6px',
                    borderRadius: '6px',
                  }}
                >
                  {'4'}
                </span>
                {' Elige'}
              </span>
              <span>
                {
                  'Priorizamos con el Filtro Chispa-Calma: qué se queda, qué espera y qué sobra.'
                }
              </span>
            </div>
            <div
              className={'mp-lbl'}
              style={{
                left: '990px',
                top: '75px',
                animation: 'mplb4 12.0s linear infinite',
              }}
            >
              <span
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '16px',
                }}
              >
                <span
                  style={{
                    background: '#FCEFB4',
                    padding: '0 6px',
                    borderRadius: '6px',
                  }}
                >
                  {'5'}
                </span>
                {' Camina'}
              </span>
              <span>
                {'Montamos el sistema y avanzamos paso a paso, a tu ritmo.'}
              </span>
            </div>
            <span
              className={'mp-walker'}
              aria-hidden={'true'}
              style={{ margin: '-20px 0 0 -20px' }}
            >
              <svg
                width={'40'}
                height={'40'}
                viewBox={'0 0 40 40'}
                aria-hidden={'true'}
              >
                <path
                  d={'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'}
                  fill={'#FCEFB4'}
                  stroke={'#1A1A1A'}
                  strokeWidth={'2'}
                  strokeLinejoin={'round'}
                ></path>
              </svg>
            </span>
            <span
              className={'mp-goal'}
              style={{ animation: 'mpgoal 12.0s linear infinite' }}
            >
              {'calma ✓'}
            </span>
          </div>
        </div>
        <div
          className={'metodo-list'}
          style={{ flexDirection: 'column', gap: '24px' }}
        >
          <div
            className={'reveal land'}
            aria-hidden={'true'}
            style={{
              position: 'relative',
              height: '64px',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <div
              className={'ground'}
              style={{
                width: '100%',
                height: '4px',
                borderRadius: '4px',
                background: '#B6E6DE',
                marginBottom: '12px',
              }}
            ></div>
            <div
              className={'map-fill'}
              style={{
                position: 'absolute',
                left: '0',
                bottom: '12px',
                height: '4px',
                borderRadius: '4px',
                background: '#1A1A1A',
                width: v.mapPct + '%',
              }}
            ></div>
            <span
              style={{
                position: 'absolute',
                bottom: '0',
                left: 'calc(' + v.mapPct + '% - 14px)',
                width: '28px',
                height: '28px',
              }}
            >
              <svg
                className={'drop-star'}
                width={'28'}
                height={'28'}
                viewBox={'0 0 40 40'}
                style={{ display: 'block' }}
              >
                <path
                  d={'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'}
                  fill={'#FCEFB4'}
                  stroke={'#1A1A1A'}
                  strokeWidth={'2.5'}
                  strokeLinejoin={'round'}
                ></path>
              </svg>
            </span>
            <span
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                fontFamily: "'Gochi Hand', cursive",
                fontSize: '22px',
                color: '#5B4A99',
              }}
            >
              {'aterrizaje suave'}
            </span>
          </div>
          <ol
            style={{
              listStyle: 'none',
              margin: '0',
              padding: '0',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '16px',
            }}
          >
            {v.steps.map((s, index) => (
              <Fragment key={index}>
                <li
                  className={s.cls}
                  style={{
                    background: '#F9F8F3',
                    borderRadius: '24px',
                    padding: '26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <span
                    className={'step-num'}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '2px solid #1A1A1A',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: '600',
                    }}
                  >
                    {s.n}
                  </span>
                  <h3
                    style={{
                      margin: '0',
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: '600',
                      fontSize: '22px',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{ margin: '0', fontSize: '16px', lineHeight: '1.5' }}
                  >
                    {s.text}
                  </p>
                </li>
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
