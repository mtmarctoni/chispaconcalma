import { Fragment } from 'react';

export default function SectionSobreMi({ v }) {
  return (
    <section
      id={'sobre-mi'}
      className={v.aboutCls}
      data-tone={'#FCEFB4'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '104px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '64px',
      }}
    >
      <div
        style={{
          flex: '1 1 340px',
          minWidth: '0',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          className={'ab-photo'}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '1 / 1.22',
            overflow: 'hidden',
            borderBottomLeftRadius: '50% 40.98%',
            borderBottomRightRadius: '50% 40.98%',
          }}
        >
          <div
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              left: '0',
              bottom: '0',
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: '#FCEFB4',
            }}
          ></div>
          <img
            src={'/assets/portrait.png'}
            alt={
              'Yolanda Muñoz pensativa, con el dedo en la mejilla, moño y jersey amarillo'
            }
            style={{
              position: 'absolute',
              left: '4%',
              bottom: '0',
              width: '92%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
        <svg
          className={'ab-spark s1'}
          width={'34'}
          height={'34'}
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
        <svg
          className={'ab-spark s2'}
          width={'26'}
          height={'26'}
          viewBox={'0 0 40 40'}
          aria-hidden={'true'}
        >
          <path
            d={'M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z'}
            fill={'#9EE0D6'}
            stroke={'#1A1A1A'}
            strokeWidth={'2'}
            strokeLinejoin={'round'}
          ></path>
        </svg>
        <svg
          className={'ab-spark s3'}
          width={'30'}
          height={'30'}
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
        <span
          className={'ab-hola'}
          style={{
            position: 'absolute',
            bottom: '6%',
            left: '2%',
            background: '#F4C4CF',
            border: '2px solid #1A1A1A',
            padding: '10px 20px',
            borderRadius: '18px',
            fontFamily: "'Gochi Hand', cursive",
            fontSize: '30px',
          }}
        >
          {'¡hola, encantada!'}
        </span>
      </div>
      <div
        className={'ab-rest'}
        style={{
          flex: '999 1 460px',
          minWidth: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
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
          {'Soy Yolanda Muñoz, Project Manager con mente dispersa.'}
        </h2>
        <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.6' }}>
          {
            'Mi cabeza funciona con 37 pestañas abiertas. Soy curiosa, inquieta y salto de idea en idea, así que tuve que aprender a darle estructura a mi propia chispa para que no me desbordara.'
          }
        </p>
        <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.6' }}>
          {
            'Por eso diseño sistemas para mentes como la mía: no te pido que cambies tu forma de ser, adapto la estructura a ti. Le damos sistema a tu chispa '
          }
          <strong>{'sin apagarla'}</strong>
          {'.'}
        </p>
      </div>
    </section>
  );
}
