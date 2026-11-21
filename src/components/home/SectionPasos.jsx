import { Fragment } from 'react';

export default function SectionPasos({ v }) {
  return (
    <section
      id={'pasos'}
      data-tone={'#FCEFB4'}
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '96px 32px',
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
          gap: '10px',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'Gochi Hand', cursive",
            fontSize: '26px',
            color: '#5B4A99',
          }}
        >
          {'una chispa que va encendiendo cada paso'}
        </span>
        <h2
          style={{
            margin: '0',
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: '600',
            fontSize: 'clamp(28px, 3.4vw, 42px)',
            lineHeight: '1.1',
          }}
        >
          {'Así empezamos, paso a paso'}
        </h2>
      </div>
      <div className={'ps-st'} aria-hidden={'true'}>
        <span className={'ps-line'}></span>
        <span className={'ps-fill'}></span>
        <span
          className={'ps-bulb'}
          style={{ left: '16%', animation: 'psb0 9.0s linear infinite' }}
        >
          {'1'}
        </span>
        <span
          className={'ps-bulb'}
          style={{ left: '50%', animation: 'psb1 9.0s linear infinite' }}
        >
          {'2'}
        </span>
        <span
          className={'ps-bulb'}
          style={{ left: '84%', animation: 'psb2 9.0s linear infinite' }}
        >
          {'3'}
        </span>
        <span className={'ps-mover'}>
          <svg
            width={'46'}
            height={'46'}
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
        </span>
      </div>
      <div className={'ps-cards'}>
        <article
          className={'ps-card'}
          style={{ animation: 'psk0 9.0s linear infinite' }}
        >
          <span
            style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: '#FCEFB4',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: '700',
            }}
          >
            {'PASO 1'}
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
            }}
          >
            {'Hablamos'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5' }}>
            {
              'Diagnóstico Chispa-Calma: 20 minutos para escuchar tu chispa y ver por dónde empezar.'
            }
          </p>
        </article>
        <article
          className={'ps-card'}
          style={{ animation: 'psk1 9.0s linear infinite' }}
        >
          <span
            style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: '#9EE0D6',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: '700',
            }}
          >
            {'PASO 2'}
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
            }}
          >
            {'Te propongo un plan'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5' }}>
            {'Un plan a medida: qué hacemos, en qué orden y cómo te acompaño.'}
          </p>
        </article>
        <article
          className={'ps-card'}
          style={{ animation: 'psk2 9.0s linear infinite' }}
        >
          <span
            style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: '#F4C4CF',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: '700',
            }}
          >
            {'PASO 3'}
          </span>
          <h3
            style={{
              margin: '0',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '20px',
            }}
          >
            {'Manos a la obra'}
          </h3>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5' }}>
            {
              'Montamos tu sistema y avanzamos juntas, a tu ritmo y sin agobios.'
            }
          </p>
        </article>
      </div>
    </section>
  );
}
