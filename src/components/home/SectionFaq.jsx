import { Fragment } from 'react';

export default function SectionFaq({ v }) {
  return (
    <section
      id={'faq'}
      data-tone={'#F4C4CF'}
      style={{
        maxWidth: '880px',
        margin: '0 auto',
        padding: '96px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <h2
        className={'reveal'}
        style={{
          margin: '0',
          fontFamily: "'Unbounded', sans-serif",
          fontWeight: '600',
          fontSize: 'clamp(30px, 3.6vw, 46px)',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
        }}
      >
        {'Preguntas que me hacen '}
        <span
          style={{
            fontFamily: "'Gochi Hand', cursive",
            fontWeight: '400',
            color: '#5B4A99',
          }}
        >
          {'(mucho)'}
        </span>
      </h2>
      <div
        className={'stagger'}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <details
          className={'faq reveal'}
          style={{
            border: '2px solid #1A1A1A',
            borderRadius: '22px',
            padding: '18px 24px',
            background: '#F9F8F3',
          }}
        >
          <summary
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '19px',
            }}
          >
            {'¿Con qué herramientas trabajas?'}
          </summary>
          <p
            style={{
              margin: '12px 0 4px',
              fontSize: '17px',
              lineHeight: '1.6',
            }}
          >
            {
              'Con la que mejor encaje contigo: Notion, Trello, Asana, ClickUp… Primero entiendo cómo trabajas y después elegimos la herramienta. Nunca al revés.'
            }
          </p>
        </details>
        <details
          className={'faq reveal'}
          style={{
            border: '2px solid #1A1A1A',
            borderRadius: '22px',
            padding: '18px 24px',
            background: '#F9F8F3',
          }}
        >
          <summary
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '19px',
            }}
          >
            {'¿Y si no sé nada de tecnología?'}
          </summary>
          <p
            style={{
              margin: '12px 0 4px',
              fontSize: '17px',
              lineHeight: '1.6',
            }}
          >
            {
              'Perfecto, para eso estoy. Te lo dejo montado, te explico solo lo que necesitas y aprendes a usarlo a tu ritmo.'
            }
          </p>
        </details>
        <details
          className={'faq reveal'}
          style={{
            border: '2px solid #1A1A1A',
            borderRadius: '22px',
            padding: '18px 24px',
            background: '#F9F8F3',
          }}
        >
          <summary
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '19px',
            }}
          >
            {'Ya tengo un sistema, pero no lo uso. ¿Me sirves?'}
          </summary>
          <p
            style={{
              margin: '12px 0 4px',
              fontSize: '17px',
              lineHeight: '1.6',
            }}
          >
            {
              'Muchísimo. Lo revisamos juntas, quitamos lo que sobra y lo adaptamos a cómo trabajas de verdad, no a cómo «deberías» trabajar.'
            }
          </p>
        </details>
        <details
          className={'faq reveal'}
          style={{
            border: '2px solid #1A1A1A',
            borderRadius: '22px',
            padding: '18px 24px',
            background: '#F9F8F3',
          }}
        >
          <summary
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '19px',
            }}
          >
            {'¿Cuánto cuesta?'}
          </summary>
          <p
            style={{
              margin: '12px 0 4px',
              fontSize: '17px',
              lineHeight: '1.6',
            }}
          >
            {
              'Depende de lo que necesites. Prefiero escucharte primero y proponerte algo a tu medida. Escríbeme y lo vemos sin compromiso.'
            }
          </p>
        </details>
      </div>
    </section>
  );
}
