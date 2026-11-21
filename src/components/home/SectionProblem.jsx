import { Fragment } from 'react';

export default function SectionProblem({ v }) {
  return (
    <section
      data-tone={'#F4C4CF'}
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
            {'¿Te suena?'}
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
            {'Tu negocio no debería vivir solo en tu cabeza.'}
          </h2>
        </div>
        <div
          className={'stagger'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            className={'reveal'}
            style={{
              background: '#F9F8F3',
              borderRadius: '24px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '800',
                fontSize: '32px',
              }}
            >
              {'01'}
            </span>
            <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.5' }}>
              {
                'Tienes ideas, tareas y archivos repartidos entre el móvil, tres libretas y un «ya me acordaré».'
              }
            </p>
          </div>
          <div
            className={'reveal'}
            style={{
              background: '#F9F8F3',
              borderRadius: '24px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '800',
                fontSize: '32px',
              }}
            >
              {'02'}
            </span>
            <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.5' }}>
              {
                'Empiezas mil cosas con ilusión, pero lo importante siempre se queda para la semana que viene.'
              }
            </p>
          </div>
          <div
            className={'reveal'}
            style={{
              background: '#F9F8F3',
              borderRadius: '24px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: '800',
                fontSize: '32px',
              }}
            >
              {'03'}
            </span>
            <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.5' }}>
              {
                'La parte digital te supera: herramientas, web, procesos… y no sabes por dónde empezar.'
              }
            </p>
          </div>
        </div>
        <p
          className={'reveal'}
          style={{
            margin: '0',
            fontSize: '20px',
            lineHeight: '1.5',
            maxWidth: '760px',
          }}
        >
          <strong>{'No te falta talento, te falta estructura.'}</strong>
          {' Y eso tiene arreglo.'}
        </p>
      </div>
    </section>
  );
}
