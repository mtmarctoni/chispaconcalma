import { Fragment } from 'react';

export default function SectionRecursos({ v }) {
  return (
    <section
      id={'recursos'}
      data-tone={'#9EE0D6'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '104px 32px',
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
          {'regalitos para tu cabeza'}
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
          {'Recursos gratis'}
        </h2>
        <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.55' }}>
          {
            'Para cuando necesitas encender ideas… y para cuando necesitas bajar revoluciones. Las descargas por email todavía no están disponibles. Mientras tanto, puedes probar la pausa de un minuto.'
          }
        </p>
      </div>
      <div
        className={'stagger'}
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <div
          className={'reveal tint'}
          style={{
            background: '#FCEFB4',
            borderRadius: '36px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <svg
              width={'44'}
              height={'44'}
              viewBox={'0 0 40 40'}
              aria-hidden={'true'}
            >
              <path
                d={'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'}
                fill={'#F4C4CF'}
                stroke={'#1A1A1A'}
                strokeWidth={'2'}
                strokeLinejoin={'round'}
              ></path>
            </svg>
            <h3
              style={{
                margin: '0',
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '600',
                fontSize: 'clamp(26px, 2.8vw, 36px)',
                lineHeight: '1.1',
              }}
            >
              <span
                style={{
                  fontFamily: "'Erica One', sans-serif",
                  fontWeight: '400',
                }}
              >
                {'Chispa'}
              </span>
              {' para tus ideas'}
            </h3>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55' }}>
              {
                'Creatividad para cuando te quedas en blanco, te bloqueas o necesitas que vuelva a saltar la chispa.'
              }
            </p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {v.guidesChispa.map((g, index) => (
              <Fragment key={index}>
                <article
                  style={{
                    background: '#F9F8F3',
                    border: '2px solid #1A1A1A',
                    borderRadius: '26px',
                    padding: '26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      background: g.bg,
                      padding: '5px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {g.tag}
                  </span>
                  <h4
                    style={{
                      margin: '0',
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: '600',
                      fontSize: '20px',
                      lineHeight: '1.2',
                    }}
                  >
                    {g.title}
                  </h4>
                  <p
                    style={{
                      margin: '0',
                      fontSize: '16px',
                      lineHeight: '1.55',
                    }}
                  >
                    {g.text}
                  </p>
                  {g.isBreath && (
                    <>
                      <button
                        type={'button'}
                        className={'btn'}
                        onClick={v.startBreath}
                        style={{
                          alignSelf: 'flex-start',
                          font: 'inherit',
                          fontWeight: '700',
                          fontSize: '15px',
                          background: '#1A1A1A',
                          color: '#F9F8F3',
                          border: '0',
                          borderRadius: '999px',
                          padding: '12px 20px',
                          minHeight: '46px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Respirar ahora'}
                      </button>
                    </>
                  )}
                  {g.open && (
                    <>
                      <p style={{ fontSize: '15px', lineHeight: '1.5' }}>
                        {
                          'Próximamente. Las descargas todavía no están disponibles.'
                        }
                      </p>
                    </>
                  )}
                </article>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          className={'reveal tint'}
          style={{
            background: '#9EE0D6',
            borderRadius: '36px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <svg
              width={'44'}
              height={'44'}
              viewBox={'0 0 40 40'}
              aria-hidden={'true'}
            >
              <path
                d={'M4 26 C10 14 16 14 20 22 S30 30 36 18'}
                fill={'none'}
                stroke={'#1A1A1A'}
                strokeWidth={'3'}
                strokeLinecap={'round'}
              ></path>
            </svg>
            <h3
              style={{
                margin: '0',
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '600',
                fontSize: 'clamp(26px, 2.8vw, 36px)',
                lineHeight: '1.1',
              }}
            >
              <span
                style={{
                  fontFamily: "'Erica One', sans-serif",
                  fontWeight: '400',
                }}
              >
                {'Calma'}
              </span>
              {' para crecer'}
            </h3>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55' }}>
              {
                'Para relajarte, recuperar el foco y ordenar lo que tienes en la cabeza sin llegar al límite.'
              }
            </p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {v.guidesCalma.map((g, index) => (
              <Fragment key={index}>
                <article
                  style={{
                    background: '#F9F8F3',
                    border: '2px solid #1A1A1A',
                    borderRadius: '26px',
                    padding: '26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      background: g.bg,
                      padding: '5px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {g.tag}
                  </span>
                  <h4
                    style={{
                      margin: '0',
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: '600',
                      fontSize: '20px',
                      lineHeight: '1.2',
                    }}
                  >
                    {g.title}
                  </h4>
                  <p
                    style={{
                      margin: '0',
                      fontSize: '16px',
                      lineHeight: '1.55',
                    }}
                  >
                    {g.text}
                  </p>
                  {g.isBreath && (
                    <>
                      <button
                        type={'button'}
                        className={'btn'}
                        onClick={v.startBreath}
                        style={{
                          alignSelf: 'flex-start',
                          font: 'inherit',
                          fontWeight: '700',
                          fontSize: '15px',
                          background: '#1A1A1A',
                          color: '#F9F8F3',
                          border: '0',
                          borderRadius: '999px',
                          padding: '12px 20px',
                          minHeight: '46px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Respirar ahora'}
                      </button>
                    </>
                  )}
                  {g.open && (
                    <>
                      <p style={{ fontSize: '15px', lineHeight: '1.5' }}>
                        {
                          'Próximamente. Las descargas todavía no están disponibles.'
                        }
                      </p>
                    </>
                  )}
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
