import { Fragment } from 'react';

export default function SectionFormatos({ v }) {
  return (
    <section
      id={'formatos'}
      data-tone={'#FCEFB4'}
      style={{
        background:
          'linear-gradient(to bottom, #F9F8F3 0px, #F4C4CF 180px, #F4C4CF calc(100% - 180px), #F9F8F3 100%)',
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
            flexDirection: 'column',
            gap: '14px',
            maxWidth: '760px',
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
            }}
          >
            {'Cómo podemos trabajar juntas'}
          </h2>
          <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.55' }}>
            {'No compras horas: compras que alguien se ocupe de verdad.'}
          </p>
        </div>
        <div
          className={'stagger'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <article
            className={'reveal'}
            style={{
              background: '#F9F8F3',
              borderRadius: '28px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <span
              style={{
                alignSelf: 'flex-start',
                background: '#FCEFB4',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {'Proyecto puntual'}
            </span>
            <h3
              style={{
                margin: '0',
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '1.2',
              }}
            >
              {'Un reto, de principio a fin'}
            </h3>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55' }}>
              {
                'Ordenar tu ecosistema digital, coordinar un lanzamiento o poner en marcha una herramienta nueva. Empezamos, terminamos y te lo dejo funcionando.'
              }
            </p>
          </article>
          <article
            className={'reveal'}
            style={{
              background: '#F9F8F3',
              borderRadius: '28px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <span
              style={{
                alignSelf: 'flex-start',
                background: '#9EE0D6',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {'Web'}
            </span>
            <h3
              style={{
                margin: '0',
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '1.2',
              }}
            >
              {'Tu casa en internet'}
            </h3>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55' }}>
              {
                'Web de 3–4 páginas con tu personalidad, página de reservas y pasarela de pago. Si quieres algo más interactivo, lo presupuestamos a medida.'
              }
            </p>
          </article>
          <article
            className={'reveal'}
            style={{
              background: '#1A1A1A',
              color: '#F9F8F3',
              borderRadius: '28px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <span
              style={{
                alignSelf: 'flex-start',
                background: '#D9CCF5',
                color: '#1A1A1A',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {'Acompañamiento mensual'}
            </span>
            <h3
              style={{
                margin: '0',
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '1.2',
              }}
            >
              {'Tu mano derecha digital'}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                margin: '0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <li
                style={{
                  borderBottom: '1px solid #4A4A4A',
                  paddingBottom: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: '600',
                    fontSize: '17px',
                  }}
                >
                  {'Chispa Organizada'}
                </span>
                <span
                  style={{
                    fontFamily: "'Gochi Hand', cursive",
                    fontSize: '20px',
                    color: '#C9B8F0',
                  }}
                >
                  {'Para empezar'}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#E8E5DA',
                  }}
                >
                  {'Ordeno tu agenda, correo y tareas, y lo mantengo al día.'}
                </span>
              </li>
              <li
                style={{
                  borderBottom: '1px solid #4A4A4A',
                  paddingBottom: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: '600',
                    fontSize: '17px',
                  }}
                >
                  {'Calma en Marcha '}
                  <span
                    style={{
                      background: '#FCEFB4',
                      color: '#1A1A1A',
                      borderRadius: '999px',
                      padding: '2px 10px',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      verticalAlign: '2px',
                    }}
                  >
                    {'recomendado'}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "'Gochi Hand', cursive",
                    fontSize: '20px',
                    color: '#C9B8F0',
                  }}
                >
                  {'Para negocios en movimiento'}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#E8E5DA',
                  }}
                >
                  {
                    'Sistemas funcionando y seguimiento semanal de tus proyectos.'
                  }
                </span>
              </li>
              <li
                style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
              >
                <span
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: '600',
                    fontSize: '17px',
                  }}
                >
                  {'Calma Total'}
                </span>
                <span
                  style={{
                    fontFamily: "'Gochi Hand', cursive",
                    fontSize: '20px',
                    color: '#C9B8F0',
                  }}
                >
                  {'Para delegar de verdad'}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#E8E5DA',
                  }}
                >
                  {
                    'Coordino proyectos, personas y lanzamientos como tu mano derecha.'
                  }
                </span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
