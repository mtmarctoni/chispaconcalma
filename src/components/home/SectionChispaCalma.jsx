import { Fragment } from 'react';

export default function SectionChispaCalma({ v }) {
  return (
    <section
      id={'chispa-calma'}
      data-tone={'#D9CCF5'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 32px 96px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      <div
        className={'reveal'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '640px',
          }}
        >
          <span
            style={{
              fontFamily: "'Gochi Hand', cursive",
              fontSize: '28px',
              color: '#5B4A99',
            }}
          >
            {'pruébalo'}
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
            {'Tu cabeza con '}
            <span
              style={{
                fontFamily: "'Erica One', sans-serif",
                fontWeight: '400',
                background: '#FCEFB4',
                padding: '0 10px',
                borderRadius: '12px',
              }}
            >
              {'chispa'}
            </span>
            {'… y con '}
            <span
              style={{
                fontFamily: "'Erica One', sans-serif",
                fontWeight: '400',
                background: '#9EE0D6',
                padding: '0 10px',
                borderRadius: '12px',
              }}
            >
              {'calma'}
            </span>
            {'.'}
          </h2>
        </div>
      </div>
      <div
        id={'stage'}
        className={'reveal'}
        style={{
          position: 'relative',
          height: 'clamp(560px, 52vw, 680px)',
          border: '2px solid #1A1A1A',
          borderRadius: '40px',
          backgroundColor: '#FFFFFF',
          backgroundImage: 'radial-gradient(#E3DFD2 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          overflow: 'hidden',
        }}
      >
        {v.stageIdle && (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                textAlign: 'center',
                padding: '24px',
              }}
            >
              <svg
                width={'64'}
                height={'64'}
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
              <span
                style={{
                  fontFamily: "'Gochi Hand', cursive",
                  fontSize: '32px',
                }}
              >
                {'Aquí cabe todo lo que tienes en la cabeza.'}
              </span>
              <button
                type={'button'}
                className={'btn cc-big'}
                onClick={v.setChispa}
                style={{
                  font: 'inherit',
                  fontFamily: "'Erica One', sans-serif",
                  fontSize: '30px',
                  color: '#1A1A1A',
                  background: '#FCEFB4',
                  border: '2px solid #1A1A1A',
                  borderRadius: '999px',
                  padding: '12px 34px',
                  minHeight: '56px',
                  cursor: 'pointer',
                }}
              >
                {'Chispa'}
              </button>
            </div>
          </>
        )}
        {v.showCalmBtn && (
          <>
            <button
              type={'button'}
              className={'btn calm-hint'}
              onClick={v.setCalma}
              style={{
                position: 'absolute',
                left: '0',
                right: '0',
                margin: '0 auto',
                width: 'max-content',
                bottom: '24px',
                zIndex: '4',
                font: 'inherit',
                fontWeight: '700',
                fontSize: '18px',
                background: '#1A1A1A',
                color: '#F9F8F3',
                border: '0',
                borderRadius: '999px',
                padding: '16px 30px',
                minHeight: '52px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <svg
                width={'22'}
                height={'22'}
                viewBox={'0 0 40 40'}
                aria-hidden={'true'}
              >
                <path
                  d={'M4 26 C10 14 16 14 20 22 S30 30 36 18'}
                  fill={'none'}
                  stroke={'#9EE0D6'}
                  strokeWidth={'4'}
                  strokeLinecap={'round'}
                ></path>
              </svg>
              {'Volver a la calma'}
            </button>
          </>
        )}
        {v.showReplay && (
          <>
            <button
              type={'button'}
              className={'btn calm-hint'}
              onClick={v.setChispa}
              style={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                zIndex: '4',
                font: 'inherit',
                fontWeight: '700',
                fontSize: '15px',
                background: '#FCEFB4',
                color: '#1A1A1A',
                border: '2px solid #1A1A1A',
                borderRadius: '999px',
                padding: '10px 18px',
                minHeight: '44px',
                cursor: 'pointer',
              }}
            >
              {'↺ Más chispa'}
            </button>
          </>
        )}
        <span
          id={'stage-origin'}
          aria-hidden={'true'}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '2px',
            height: '2px',
          }}
        ></span>

        <div className={v.ideasCls} aria-hidden={'true'}>
          {v.ideas.map((i, index) => (
            <Fragment key={index}>
              <div
                className={'idea'}
                id={i.domId}
                style={{
                  left: i.left + '%',
                  top: i.top + '%',
                  transform: i.tf,
                  opacity: i.op,
                  transitionDelay: i.delay + 's',
                }}
              >
                <span className={'idea-center'}>
                  <span className={'idea-in'}>
                    {i.isPostit && (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '124px',
                            height: '112px',
                            padding: '12px',
                            boxSizing: 'border-box',
                            background: i.bg,
                            fontFamily: "'Gochi Hand', cursive",
                            fontSize: '24px',
                            lineHeight: '1.05',
                            boxShadow: '0 10px 18px rgba(26,26,26,.10)',
                            transform: 'rotate(' + i.rot + 'deg)',
                          }}
                        >
                          {i.label}
                        </span>
                      </>
                    )}
                    {i.isWa && (
                      <>
                        <span
                          style={{
                            display: 'block',
                            position: 'relative',
                            maxWidth: '230px',
                            background: '#DDF3EF',
                            padding: '9px 12px 7px',
                            borderRadius: '12px 12px 12px 2px',
                            boxShadow: '0 4px 10px rgba(26,26,26,.08)',
                            fontSize: '15px',
                            lineHeight: '1.35',
                            transform: 'rotate(' + i.rot + 'deg)',
                          }}
                        >
                          <span
                            style={{
                              display: 'block',
                              fontSize: '12px',
                              fontWeight: '700',
                              color: '#2E7D6E',
                              marginBottom: '2px',
                            }}
                          >
                            {i.from}
                          </span>
                          <span style={{ display: 'block' }}>{i.label}</span>
                          <span
                            style={{
                              display: 'block',
                              textAlign: 'right',
                              fontSize: '11px',
                              color: '#5F6B68',
                              marginTop: '2px',
                            }}
                          >
                            {i.time + ' ✓✓'}
                          </span>
                        </span>
                      </>
                    )}
                    {i.isAudio && (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '200px',
                            background: '#DDF3EF',
                            padding: '10px 12px',
                            borderRadius: '12px 12px 12px 2px',
                            boxShadow: '0 4px 10px rgba(26,26,26,.08)',
                            transform: 'rotate(' + i.rot + 'deg)',
                          }}
                        >
                          <svg width={'22'} height={'22'} viewBox={'0 0 24 24'}>
                            <path
                              d={'M7 4 L20 12 L7 20 Z'}
                              fill={'#1A1A1A'}
                            ></path>
                          </svg>
                          <svg
                            width={'110'}
                            height={'20'}
                            viewBox={'0 0 110 20'}
                          >
                            <path
                              d={
                                'M2 10h2M8 4v12M14 7v6M20 2v16M26 6v8M32 9v2M38 3v14M44 7v6M50 5v10M56 9v2M62 4v12M68 7v6M74 2v16M80 8v4M86 5v10M92 9v2M98 6v8M104 9v2'
                              }
                              stroke={'#2E7D6E'}
                              strokeWidth={'2.4'}
                              strokeLinecap={'round'}
                            ></path>
                          </svg>
                          <span style={{ fontSize: '12px', color: '#5F6B68' }}>
                            {i.time}
                          </span>
                        </span>
                      </>
                    )}
                    {i.isNote && (
                      <>
                        <span
                          style={{
                            display: 'block',
                            width: '170px',
                            padding: '12px 14px 14px 26px',
                            boxSizing: 'border-box',
                            backgroundColor: '#FFFFFF',
                            backgroundImage:
                              'repeating-linear-gradient(to bottom, transparent 0, transparent 25px, #CFE3F2 25px, #CFE3F2 26px)',
                            borderLeft: '3px solid #F4C4CF',
                            fontFamily: "'Gochi Hand', cursive",
                            fontSize: '20px',
                            lineHeight: '26px',
                            whiteSpace: 'pre-line',
                            boxShadow: '0 8px 16px rgba(26,26,26,.08)',
                            transform: 'rotate(' + i.rot + 'deg)',
                          }}
                        >
                          {i.label}
                        </span>
                      </>
                    )}
                    {i.isTab && (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#F9F8F3',
                            border: '2px solid #1A1A1A',
                            borderRadius: '10px 10px 0 0',
                            padding: '8px 14px',
                            fontSize: '14px',
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                            transform: 'rotate(' + i.rot + 'deg)',
                          }}
                        >
                          <span
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: '#F4C4CF',
                            }}
                          ></span>
                          {i.label}
                          <span style={{ fontWeight: '400' }}>{'✕'}</span>
                        </span>
                      </>
                    )}
                    {i.isDoodle && (
                      <>
                        <svg
                          width={i.w}
                          height={i.h}
                          viewBox={i.vb}
                          style={{
                            display: 'block',
                            transform: 'rotate(' + i.rot + 'deg)',
                          }}
                        >
                          <path
                            d={i.d}
                            fill={i.fill}
                            stroke={i.color}
                            strokeWidth={i.sw}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                          ></path>
                        </svg>
                      </>
                    )}
                  </span>
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <div
          id={'laptop'}
          className={v.laptopCls}
          role={'img'}
          aria-label={'Tus ideas ordenadas en un proyecto de Notion'}
        >
          <div
            style={{
              background: '#1A1A1A',
              borderRadius: '18px 18px 6px 6px',
              padding: '12px',
            }}
          >
            <div
              id={'laptop-screen'}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                aspectRatio: '16 / 10',
                boxSizing: 'border-box',
                display: 'flex',
                overflow: 'hidden',
                fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                color: '#37352F',
              }}
            >
              <div
                style={{
                  width: '27%',
                  background: '#F7F6F3',
                  padding: '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '11px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '700',
                    marginBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      background: '#FCEFB4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width={'10'} height={'10'} viewBox={'0 0 40 40'}>
                      <path
                        d={
                          'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                        }
                        fill={'#1A1A1A'}
                      ></path>
                    </svg>
                  </span>
                  {'Tu negocio'}
                </span>
                <span style={{ color: '#6F6E69' }}>{'Inicio'}</span>
                <span
                  style={{
                    background: '#EAE9E5',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    margin: '0 -4px',
                    fontWeight: '600',
                  }}
                >
                  {'Proyectos'}
                </span>
                <span style={{ color: '#6F6E69' }}>{'Tareas'}</span>
                <span style={{ color: '#6F6E69' }}>{'Ideas'}</span>
                <span style={{ color: '#6F6E69' }}>{'Clientes'}</span>
              </div>
              <div
                style={{
                  flex: '1',
                  minWidth: '0',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <svg width={'22'} height={'22'} viewBox={'0 0 40 40'}>
                  <path
                    d={
                      'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'
                    }
                    fill={'#F4C4CF'}
                    stroke={'#37352F'}
                    strokeWidth={'2'}
                    strokeLinejoin={'round'}
                  ></path>
                </svg>
                <span
                  style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    lineHeight: '1.1',
                  }}
                >
                  {'Mi negocio en calma'}
                </span>
                <span
                  style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    fontSize: '10px',
                  }}
                >
                  <span style={{ color: '#6F6E69' }}>{'Estado'}</span>
                  <span
                    style={{
                      background: '#FCEFB4',
                      borderRadius: '3px',
                      padding: '0 5px',
                    }}
                  >
                    {'En marcha'}
                  </span>
                  <span style={{ color: '#6F6E69', marginLeft: '6px' }}>
                    {'Avance'}
                  </span>
                  <span
                    style={{
                      background: '#DDF3EF',
                      borderRadius: '3px',
                      padding: '0 5px',
                    }}
                  >
                    {'33 %'}
                  </span>
                </span>
                <span
                  style={{
                    display: 'flex',
                    gap: '10px',
                    fontSize: '10px',
                    borderBottom: '1px solid #E9E9E7',
                    paddingBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '700',
                      borderBottom: '2px solid #37352F',
                      paddingBottom: '3px',
                      marginBottom: '-5px',
                    }}
                  >
                    {'Tablero'}
                  </span>
                  <span style={{ color: '#6F6E69' }}>{'Tabla'}</span>
                  <span style={{ color: '#6F6E69' }}>{'Calendario'}</span>
                </span>
                <div
                  style={{
                    flex: '1',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '8px',
                    fontSize: '10.5px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        background: '#EEE7FB',
                        borderRadius: '3px',
                        padding: '1px 6px',
                        fontWeight: '600',
                      }}
                    >
                      {'Ideas'}
                    </span>
                    <span
                      className={'board-card'}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9E9E7',
                        borderRadius: '5px',
                        padding: '5px 6px',
                        boxShadow: '0 1px 2px rgba(15,15,15,.06)',
                        transitionDelay: '.45s',
                      }}
                    >
                      {'Newsletter'}
                    </span>
                    <span
                      className={'board-card'}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9E9E7',
                        borderRadius: '5px',
                        padding: '5px 6px',
                        boxShadow: '0 1px 2px rgba(15,15,15,.06)',
                        transitionDelay: '.6s',
                      }}
                    >
                      {'Reels'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        background: '#FCEFB4',
                        borderRadius: '3px',
                        padding: '1px 6px',
                        fontWeight: '600',
                      }}
                    >
                      {'En marcha'}
                    </span>
                    <span
                      className={'board-card'}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9E9E7',
                        borderRadius: '5px',
                        padding: '5px 6px',
                        boxShadow: '0 1px 2px rgba(15,15,15,.06)',
                        transitionDelay: '.75s',
                      }}
                    >
                      {'Web nueva'}
                    </span>
                    <span
                      className={'board-card'}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9E9E7',
                        borderRadius: '5px',
                        padding: '5px 6px',
                        boxShadow: '0 1px 2px rgba(15,15,15,.06)',
                        transitionDelay: '.9s',
                      }}
                    >
                      {'Lanzar curso'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        background: '#DDF3EF',
                        borderRadius: '3px',
                        padding: '1px 6px',
                        fontWeight: '600',
                      }}
                    >
                      {'Hecho'}
                    </span>
                    <span
                      className={'board-card'}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9E9E7',
                        borderRadius: '5px',
                        padding: '5px 6px',
                        boxShadow: '0 1px 2px rgba(15,15,15,.06)',
                        textDecoration: 'line-through',
                        color: '#6F6E69',
                        transitionDelay: '1.05s',
                      }}
                    >
                      {'Facturas'}
                    </span>
                    <span
                      className={'board-card'}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E9E9E7',
                        borderRadius: '5px',
                        padding: '5px 6px',
                        boxShadow: '0 1px 2px rgba(15,15,15,.06)',
                        textDecoration: 'line-through',
                        color: '#6F6E69',
                        transitionDelay: '1.2s',
                      }}
                    >
                      {'Responder WhatsApps'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: '14px',
              background: '#3A3A3A',
              borderRadius: '0 0 18px 18px',
              margin: '0 -6%',
            }}
          ></div>
          <span
            className={'board-card'}
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '14px',
              fontFamily: "'Gochi Hand', cursive",
              fontSize: '26px',
              color: '#5B4A99',
              transitionDelay: '1.4s',
            }}
          >
            {'tus ideas, ya con plan'}
          </span>
        </div>
        <div className={v.hammockCls} aria-hidden={'true'}>
          <span className={'hm-say'}>{'modo calma: ON'}</span>
          <svg
            width={'270'}
            height={'190'}
            viewBox={'0 0 240 170'}
            style={{ display: 'block' }}
          >
            <circle cx={'206'} cy={'26'} r={'15'} fill={'#FCEFB4'}></circle>
            <path
              d={
                'M206 4 v-3 M206 48 v3 M184 26 h-3 M228 26 h3 M191 11 l-2 -2 M221 41 l2 2 M221 11 l2 -2 M191 41 l-2 2'
              }
              stroke={'#F5DF7A'}
              strokeWidth={'2.5'}
              strokeLinecap={'round'}
            ></path>
            <rect
              x={'16'}
              y={'36'}
              width={'7'}
              height={'126'}
              rx={'3.5'}
              fill={'#1A1A1A'}
            ></rect>
            <rect
              x={'217'}
              y={'36'}
              width={'7'}
              height={'126'}
              rx={'3.5'}
              fill={'#1A1A1A'}
            ></rect>
            <path
              d={'M6 162 L234 162'}
              stroke={'#1A1A1A'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
            ></path>
            <g className={'hm-swing'}>
              <path
                d={'M20 42 L58 96 M220 42 L182 96'}
                stroke={'#1A1A1A'}
                strokeWidth={'2'}
              ></path>
              <path
                d={
                  'M54 94 C80 132 160 132 186 94 L186 102 C160 142 80 142 54 102 Z'
                }
                fill={'#9EE0D6'}
                stroke={'#1A1A1A'}
                strokeWidth={'2'}
                strokeLinejoin={'round'}
              ></path>
              <path
                d={'M58 100 C84 136 156 136 182 100'}
                stroke={'#F4C4CF'}
                strokeWidth={'3'}
                fill={'none'}
              ></path>
              <path
                d={'M154 104 L184 88 M152 109 L187 95'}
                stroke={'#1A1A1A'}
                strokeWidth={'6'}
                strokeLinecap={'round'}
              ></path>
              <path
                d={'M86 100 C100 90 140 93 158 104 C140 118 104 118 86 109 Z'}
                fill={'#F4C4CF'}
              ></path>
              <circle cx={'62'} cy={'86'} r={'7'} fill={'#1A1A1A'}></circle>
              <circle cx={'74'} cy={'92'} r={'15'} fill={'#1A1A1A'}></circle>
              <circle cx={'78'} cy={'90'} r={'12'} fill={'#F2C9A8'}></circle>
              <path
                d={'M66 85 C69 74 87 73 90 84 L66 87 Z'}
                fill={'#1A1A1A'}
              ></path>
              <path
                d={
                  'M70 76 L71.2 79.3 L74.5 80.5 L71.2 81.7 L70 85 L68.8 81.7 L65.5 80.5 L68.8 79.3 Z'
                }
                fill={'#FCEFB4'}
              ></path>
              <rect
                x={'70'}
                y={'87'}
                width={'8'}
                height={'5'}
                rx={'2'}
                fill={'#1A1A1A'}
              ></rect>
              <rect
                x={'80'}
                y={'87'}
                width={'8'}
                height={'5'}
                rx={'2'}
                fill={'#1A1A1A'}
              ></rect>
              <path
                d={'M78 88.5 L80 88.5'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.5'}
              ></path>
              <path
                d={'M75 96 Q79 99.5 83 96'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.8'}
                fill={'none'}
                strokeLinecap={'round'}
              ></path>
              <path
                d={'M96 101 L104 79'}
                stroke={'#F2C9A8'}
                strokeWidth={'6'}
                strokeLinecap={'round'}
              ></path>
              <path
                d={'M96 62 L114 62 L105 74 Z'}
                fill={'#F4C4CF'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.5'}
                strokeLinejoin={'round'}
              ></path>
              <path
                d={'M105 74 L105 80 M101 80 L109 80'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.5'}
                strokeLinecap={'round'}
              ></path>
              <path
                d={'M108 62 L114 52'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.5'}
                strokeLinecap={'round'}
              ></path>
              <path
                d={'M107 53 A7.5 7.5 0 0 1 122 53 Z'}
                fill={'#9EE0D6'}
                stroke={'#1A1A1A'}
                strokeWidth={'1.2'}
                strokeLinejoin={'round'}
              ></path>
              <circle
                cx={'97'}
                cy={'62'}
                r={'3.5'}
                fill={'#F5DF7A'}
                stroke={'#1A1A1A'}
                strokeWidth={'1'}
              ></circle>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
