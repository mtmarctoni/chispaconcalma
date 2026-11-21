import { Fragment } from 'react';

export default function SectionTest({ v }) {
  return (
    <section
      id={'test'}
      aria-label={'¿Qué tipo de chispa eres?'}
      data-tone={'#D9CCF5'}
      style={{
        background:
          'linear-gradient(to bottom, #F9F8F3 0px, #EEE7FB 180px, #EEE7FB calc(100% - 180px), #F9F8F3 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          padding: '120px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <div
          className={'reveal'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Gochi Hand', cursive",
              fontSize: '28px',
              color: '#5B4A99',
            }}
          >
            {'3 preguntas, 1 minuto'}
          </span>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: 'clamp(30px, 3.6vw, 44px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            {'¿Qué tipo de '}
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
            {' eres?'}
          </h2>
          <p
            style={{
              margin: '0',
              fontSize: '18px',
              lineHeight: '1.55',
              maxWidth: '620px',
            }}
          >
            {
              'Tu chispa solo necesita estructura para no desbordarse. Y como no hay dos chispas iguales, no hay dos sistemas iguales. Haz el test y descubre la tuya.'
            }
          </p>
        </div>
        <div
          className={'reveal'}
          style={{
            background: '#F9F8F3',
            border: '2px solid #1A1A1A',
            borderRadius: '32px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {v.quizOpen && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '22px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {'Pregunta ' + v.qNum + ' de 3'}
                  </span>
                  <div
                    aria-hidden={'true'}
                    style={{ display: 'flex', gap: '6px' }}
                  >
                    {v.dots.map((d, index) => (
                      <Fragment key={index}>
                        <span
                          style={{
                            width: '32px',
                            height: '6px',
                            borderRadius: '6px',
                            background: d.bg,
                          }}
                        ></span>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <h3
                  style={{
                    margin: '0',
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: '600',
                    fontSize: '26px',
                    lineHeight: '1.2',
                  }}
                >
                  {v.q.text}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {v.q.options.map((o, index) => (
                    <Fragment key={index}>
                      <button
                        type={'button'}
                        className={'opt'}
                        onClick={o.pick}
                        style={{
                          textAlign: 'left',
                          font: 'inherit',
                          fontSize: '17px',
                          color: '#1A1A1A',
                          background: '#F9F8F3',
                          border: '2px solid #1A1A1A',
                          borderRadius: '18px',
                          padding: '16px 20px',
                          minHeight: '52px',
                          cursor: 'pointer',
                        }}
                      >
                        {o.label}
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          )}
          {v.quizDone && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Gochi Hand', cursive",
                    fontSize: '26px',
                    color: '#5B4A99',
                  }}
                >
                  {'tu chispa es…'}
                </span>
                <div
                  style={{
                    background: v.result.bg,
                    border: '2px solid #1A1A1A',
                    borderRadius: '28px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <h3
                    style={{
                      margin: '0',
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: '800',
                      fontSize: 'clamp(28px, 3.4vw, 40px)',
                      lineHeight: '1.1',
                    }}
                  >
                    {v.result.name}
                  </h3>
                  <p
                    style={{ margin: '0', fontSize: '18px', lineHeight: '1.6' }}
                  >
                    <strong>{'Así es tu chispa.'}</strong>
                    {' ' + v.result.chaos}
                  </p>
                  <div
                    style={{
                      background: '#1A1A1A',
                      color: '#F9F8F3',
                      borderRadius: '20px',
                      padding: '20px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Gochi Hand', cursive",
                        fontSize: '24px',
                        color: '#FCEFB4',
                      }}
                    >
                      {'tu calma'}
                    </span>
                    <span style={{ fontSize: '18px', lineHeight: '1.55' }}>
                      {v.result.calm}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <a
                    className={'btn'}
                    href={v.resultHref}
                    style={{
                      textDecoration: 'none',
                      background: '#1A1A1A',
                      color: '#F9F8F3',
                      padding: '16px 26px',
                      borderRadius: '999px',
                      fontWeight: '700',
                      fontSize: '17px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    {'Quiero darle calma a mi chispa'}
                  </a>
                  <button
                    type={'button'}
                    onClick={v.restart}
                    style={{
                      font: 'inherit',
                      fontWeight: '700',
                      fontSize: '16px',
                      background: 'none',
                      border: '0',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      minHeight: '44px',
                      color: '#1A1A1A',
                    }}
                  >
                    {'Repetir el test'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className={'reveal'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '17px', fontWeight: '700' }}>
            {'Conoce las cuatro chispas'}
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '10px',
              width: '100%',
              maxWidth: '620px',
            }}
          >
            {v.types.map((a, index) => (
              <Fragment key={index}>
                <button
                  type={'button'}
                  className={'btn'}
                  onClick={a.show}
                  style={{
                    font: 'inherit',
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#1A1A1A',
                    background: a.bg,
                    border: '2px solid #1A1A1A',
                    borderRadius: '999px',
                    padding: '12px 16px',
                    minHeight: '48px',
                    cursor: 'pointer',
                    width: '100%',
                    lineHeight: '1.2',
                  }}
                >
                  {a.name}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
