import { Fragment } from 'react';

export default function SectionServicios({ v }) {
  return (
    <section
      id={'servicios'}
      data-tone={'#9EE0D6'}
      style={{
        background:
          'linear-gradient(to bottom, #F9F8F3 0px, #FCEFB4 180px, #FCEFB4 calc(100% - 180px), #F9F8F3 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '44px',
        }}
      >
        <div
          className={'reveal'}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
          }}
        >
          <h2
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              maxWidth: '640px',
            }}
          >
            {'Lo que hago por tu negocio'}
          </h2>
          <p
            style={{
              margin: '0',
              fontSize: '18px',
              lineHeight: '1.5',
              maxWidth: '420px',
            }}
          >
            {
              'Entro en tu chispa, entiendo qué está pasando y la convierto en un plan que avanza. Despega cada post-it para ver qué incluye.'
            }
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            width: '100%',
            maxWidth: '560px',
            margin: '0 auto',
            paddingBottom: '40px',
          }}
        >
          {v.svcs.map((v, index) => (
            <Fragment key={index}>
              <div
                className={'stack-item'}
                style={{ position: 'sticky', top: v.top + 'px' }}
              >
                <button
                  type={'button'}
                  className={v.cls}
                  onClick={v.toggle}
                  aria-expanded={v.expanded}
                >
                  <span className={'pi-under'}>
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Unbounded', sans-serif",
                          fontWeight: '600',
                          fontSize: '16px',
                          lineHeight: '1.25',
                        }}
                      >
                        {v.name + ': qué incluye'}
                      </span>
                    </span>
                    <span className={'ck-bar'} aria-hidden={'true'}>
                      <span style={{ background: v.bg }}></span>
                    </span>
                    <span className={'inc'}>
                      {v.list.map((it, index) => (
                        <Fragment key={index}>
                          <span
                            className={'inc-i'}
                            style={{ transitionDelay: it.delay }}
                          >
                            <span className={'tick'}>
                              <svg
                                width={'12'}
                                height={'12'}
                                viewBox={'0 0 24 24'}
                                fill={'none'}
                                stroke={'#F9F8F3'}
                                strokeWidth={'3.5'}
                                strokeLinecap={'round'}
                                strokeLinejoin={'round'}
                                aria-hidden={'true'}
                              >
                                <path d={'M5 12.5l4.5 4.5L19 7.5'}></path>
                              </svg>
                            </span>
                            <span>{it.t}</span>
                          </span>
                        </Fragment>
                      ))}
                    </span>
                    <span className={'hint'} style={{ marginTop: 'auto' }}>
                      {'toca para volver a pegar el post-it'}
                    </span>
                  </span>
                  <span className={'pi'} style={{ background: v.bg }}>
                    <span
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: '#F9F8F3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >
                      {v.is_org && (
                        <>
                          <svg
                            width={'26'}
                            height={'26'}
                            viewBox={'0 0 24 24'}
                            fill={'none'}
                            stroke={'#1A1A1A'}
                            strokeWidth={'1.8'}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                            aria-hidden={'true'}
                          >
                            <rect
                              x={'3'}
                              y={'3'}
                              width={'7'}
                              height={'7'}
                              rx={'1.5'}
                            ></rect>
                            <rect
                              x={'14'}
                              y={'3'}
                              width={'7'}
                              height={'7'}
                              rx={'1.5'}
                            ></rect>
                            <rect
                              x={'3'}
                              y={'14'}
                              width={'7'}
                              height={'7'}
                              rx={'1.5'}
                            ></rect>
                            <rect
                              x={'14'}
                              y={'14'}
                              width={'7'}
                              height={'7'}
                              rx={'1.5'}
                            ></rect>
                          </svg>
                        </>
                      )}
                      {v.is_pm && (
                        <>
                          <svg
                            width={'26'}
                            height={'26'}
                            viewBox={'0 0 24 24'}
                            fill={'none'}
                            stroke={'#1A1A1A'}
                            strokeWidth={'1.8'}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                            aria-hidden={'true'}
                          >
                            <path d={'M4 6h10'}></path>
                            <path d={'M4 12h16'}></path>
                            <path d={'M4 18h7'}></path>
                            <circle cx={'18'} cy={'6'} r={'2'}></circle>
                            <circle cx={'15'} cy={'18'} r={'2'}></circle>
                          </svg>
                        </>
                      )}
                      {v.is_web && (
                        <>
                          <svg
                            width={'26'}
                            height={'26'}
                            viewBox={'0 0 24 24'}
                            fill={'none'}
                            stroke={'#1A1A1A'}
                            strokeWidth={'1.8'}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                            aria-hidden={'true'}
                          >
                            <rect
                              x={'3'}
                              y={'4'}
                              width={'18'}
                              height={'16'}
                              rx={'2.5'}
                            ></rect>
                            <path d={'M3 9h18'}></path>
                          </svg>
                        </>
                      )}
                      {v.is_asis && (
                        <>
                          <svg
                            width={'26'}
                            height={'26'}
                            viewBox={'0 0 24 24'}
                            fill={'none'}
                            stroke={'#1A1A1A'}
                            strokeWidth={'1.8'}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                            aria-hidden={'true'}
                          >
                            <path d={'M4 12a8 8 0 0 1 16 0'}></path>
                            <rect
                              x={'3'}
                              y={'12'}
                              width={'4'}
                              height={'6'}
                              rx={'1.5'}
                            ></rect>
                            <rect
                              x={'17'}
                              y={'12'}
                              width={'4'}
                              height={'6'}
                              rx={'1.5'}
                            ></rect>
                            <path d={'M19 18c0 2-2 3-5 3'}></path>
                          </svg>
                        </>
                      )}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Unbounded', sans-serif",
                        fontWeight: '600',
                        fontSize: '21px',
                        lineHeight: '1.2',
                      }}
                    >
                      {v.name}
                    </span>
                    <span style={{ fontSize: '16px', lineHeight: '1.55' }}>
                      {v.short}
                    </span>
                    <svg
                      className={'pin'}
                      viewBox={'0 0 40 40'}
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
                        fill={v.pin}
                        stroke={'#1A1A1A'}
                        strokeWidth={'1.6'}
                      ></circle>
                      <circle
                        cx={'19'}
                        cy={'17'}
                        r={'6'}
                        fill={'none'}
                        stroke={'#1A1A1A'}
                        strokeWidth={'1'}
                        opacity={'.35'}
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
                    <span className={'hint'} style={{ marginTop: 'auto' }}>
                      {'toca y despégame'}
                    </span>
                  </span>
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <p
          className={'reveal'}
          style={{ margin: '0', fontSize: '16px', textAlign: 'center' }}
        >
          {
            'Sin precios cerrados: cada proyecto se presupuesta a medida después de escucharte. '
          }
          <a href={'#contacto'} style={{ fontWeight: '700' }}>
            {'Hablemos de tu chispa'}
          </a>
        </p>
      </div>
    </section>
  );
}
