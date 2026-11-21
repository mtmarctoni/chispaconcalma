import { Fragment } from 'react';

export default function SectionContacto({ v }) {
  return (
    <section
      id={'contacto'}
      data-tone={'#FCEFB4'}
      style={{ padding: '0 32px 96px' }}
    >
      <div
        className={'reveal'}
        style={{
          maxWidth: '1136px',
          margin: '0 auto',
          background: '#1A1A1A',
          color: '#F9F8F3',
          borderRadius: '40px',
          padding: '72px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        <svg
          width={'48'}
          height={'48'}
          viewBox={'0 0 40 40'}
          aria-hidden={'true'}
        >
          <path
            d={'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'}
            fill={'#FCEFB4'}
          ></path>
        </svg>
        <h2
          style={{
            margin: '0',
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: '600',
            fontSize: 'clamp(30px, 4vw, 52px)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            maxWidth: '800px',
          }}
        >
          {'¿Hablamos de tu '}
          <span
            style={{
              fontFamily: "'Erica One', sans-serif",
              fontWeight: '400',
              color: '#FCEFB4',
            }}
          >
            {'chispa'}
          </span>
          {'?'}
        </h2>
        <p
          style={{
            margin: '0',
            fontSize: '19px',
            lineHeight: '1.55',
            maxWidth: '560px',
            color: '#E8E5DA',
          }}
        >
          {
            'Cuéntame qué tienes entre manos. Sin compromiso y sin juicios: primero escucho, luego ordenamos.'
          }
        </p>
        <a
          className={'btn'}
          href={'mailto:hola@chispaconcalma.com'}
          style={{
            textDecoration: 'none',
            background: '#FCEFB4',
            color: '#1A1A1A',
            padding: '18px 32px',
            borderRadius: '999px',
            fontWeight: '700',
            fontSize: '18px',
            minHeight: '44px',
            boxSizing: 'border-box',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {'Enciende la conversación'}
        </a>
        <p style={{ margin: '0', fontSize: '16px', color: '#E8E5DA' }}>
          {'hola@chispaconcalma.com'}
        </p>
      </div>
    </section>
  );
}
