import { Fragment } from 'react';

export default function SectionNegocios({ v }) {
  return (
    <section
      id={'negocios'}
      data-tone={'#F4C4CF'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '96px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '680px',
          }}
        >
          <span
            style={{
              fontFamily: "'Gochi Hand', cursive",
              fontSize: '28px',
              color: '#5B4A99',
            }}
          >
            {'¿es para ti?'}
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
            {'Negocios con los que trabajo'}
          </h2>
        </div>
        <p
          style={{
            margin: '0',
            fontSize: '18px',
            lineHeight: '1.55',
            maxWidth: '440px',
          }}
        >
          {'Sobre todo, negocios con '}
          <strong>{'mucha chispa y poca parte digital'}</strong>
          {': sin sistema, sin estructura o sin tiempo para ocuparse de ella.'}
        </p>
      </div>
      <div
        className={'stagger'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        <article
          className={'reveal'}
          style={{
            background: '#F9F8F3',
            border: '2px solid #1A1A1A',
            borderRadius: '28px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span
            className={'tint'}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
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
              fill={'none'}
              stroke={'#1A1A1A'}
              strokeWidth={'1.8'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              aria-hidden={'true'}
            >
              <path d={'M5 19c0-8 5-13 14-14-1 9-6 14-14 14z'}></path>
              <path d={'M5 19c3-4 6-7 10-9'}></path>
            </svg>
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '1.2',
            }}
          >
            {'Bienestar y salud'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.55' }}>
            {
              'Nutricionistas, profes de yoga, terapeutas y negocios holísticos.'
            }
          </p>
        </article>
        <article
          className={'reveal'}
          style={{
            background: '#F9F8F3',
            border: '2px solid #1A1A1A',
            borderRadius: '28px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span
            className={'tint'}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: '#F4C4CF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
              <path d={'M4 20l6-6'}></path>
              <path d={'M14 4l6 6-8 8-6-6z'}></path>
              <path d={'M12 6l6 6'}></path>
            </svg>
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '1.2',
            }}
          >
            {'Talleres y negocios creativos'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.55' }}>
            {'Artesanos, talleres, diseño y oficios que crean con las manos.'}
          </p>
        </article>
        <article
          className={'reveal'}
          style={{
            background: '#F9F8F3',
            border: '2px solid #1A1A1A',
            borderRadius: '28px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span
            className={'tint'}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: '#FCEFB4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
                y={'7'}
                width={'18'}
                height={'13'}
                rx={'2.5'}
              ></rect>
              <path d={'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'}></path>
              <path d={'M3 12h18'}></path>
            </svg>
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '1.2',
            }}
          >
            {'Profesionales independientes'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.55' }}>
            {
              'Servicios, consultas y gestiones que dependen de una sola persona.'
            }
          </p>
        </article>
        <article
          className={'reveal'}
          style={{
            background: '#F9F8F3',
            border: '2px solid #1A1A1A',
            borderRadius: '28px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span
            className={'tint'}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: '#D9CCF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
              <path
                d={
                  'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'
                }
              ></path>
            </svg>
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '1.2',
            }}
          >
            {'Negocios conscientes y con alma'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.55' }}>
            {
              'Proyectos con propósito que quieren crecer sin perder su esencia.'
            }
          </p>
        </article>
      </div>
      <p
        className={'reveal'}
        style={{ margin: '0', fontSize: '17px', textAlign: 'center' }}
      >
        {
          '¿No ves el tuyo? No pasa nada: si tienes ideas y te falta estructura, '
        }
        <a href={'#contacto'} style={{ fontWeight: '700' }}>
          {'hablemos de tu chispa'}
        </a>
        {'.'}
      </p>
    </section>
  );
}
