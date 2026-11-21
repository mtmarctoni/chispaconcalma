import { Fragment } from 'react';

export default function SectionApproach({ v }) {
  return (
    <section
      data-tone={'#FCEFB4'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 32px 96px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}
    >
      <div
        className={'reveal'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
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
          {'son las 12 de la noche y sigues pensando…'}
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
          {'Tu chispa no es un problema. Es tu motor.'}
        </h2>
      </div>
      <div
        className={'stagger'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '20px',
        }}
      >
        <article
          className={'reveal tint'}
          style={{
            background: '#FCEFB4',
            borderRadius: '32px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <svg
            width={'40'}
            height={'40'}
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
              fontSize: '24px',
              lineHeight: '1.2',
            }}
          >
            {'Para mí, la '}
            <span
              style={{
                fontFamily: "'Erica One', sans-serif",
                fontWeight: '400',
              }}
            >
              {'chispa'}
            </span>
            {'…'}
          </h3>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.6' }}>
            {
              '…son todas esas ideas que no te dejan dormir. La curiosidad, las ganas de empezar mil cosas, ese «¿y si…?» que aparece a medianoche. No es algo malo ni algo que haya que apagar. Es lo que te hace única. Solo necesita un sitio donde aterrizar para no desbordarse.'
            }
          </p>
        </article>
        <article
          className={'reveal tint'}
          style={{
            background: '#9EE0D6',
            borderRadius: '32px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <svg
            width={'40'}
            height={'40'}
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
              fontSize: '24px',
              lineHeight: '1.2',
            }}
          >
            {'Para mí, la '}
            <span
              style={{
                fontFamily: "'Erica One', sans-serif",
                fontWeight: '400',
              }}
            >
              {'calma'}
            </span>
            {'…'}
          </h3>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.6' }}>
            {
              '…no es frenar ni hacer menos. Es tener estructura: un sistema que sostiene tus ideas, te dice qué toca hoy y te deja cerrar los ojos sabiendo que nada se va a perder.'
            }
          </p>
        </article>
        <article
          className={'reveal'}
          style={{
            background: '#1A1A1A',
            color: '#F9F8F3',
            borderRadius: '32px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
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
            ></path>
          </svg>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '1.2',
            }}
          >
            {'Lo que quiero conseguir'}
          </h3>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.6' }}>
            {
              'Que tu chispa tenga sistema. Que tus ideas no se queden en la libreta, sino que lleguen a hacerse realidad, a tu ritmo y sin quemarte por el camino.'
            }
          </p>
        </article>
      </div>
    </section>
  );
}
