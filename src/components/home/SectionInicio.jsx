import { Fragment } from 'react';

export default function SectionInicio({ v }) {
  return (
    <section
      id={'inicio'}
      data-tone={'#FCEFB4'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 32px 96px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '56px',
      }}
    >
      <div
        style={{
          flex: '999 1 520px',
          minWidth: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        <span
          className={'intro-hide'}
          style={{
            alignSelf: 'flex-start',
            background: '#D9CCF5',
            padding: '8px 16px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {'Digital Project Manager'}
        </span>
        <h1
          style={{
            margin: '0',
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: '600',
            fontSize: 'clamp(40px, 5.2vw, 68px)',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
          }}
        >
          <span className={'intro-hide'}>{'Dale calma a tu '}</span>
          <span
            id={'hero-chispa'}
            className={'spark hero-word'}
            style={{
              fontFamily: "'Erica One', sans-serif",
              fontWeight: '400',
              background: '#FCEFB4',
              padding: '0 12px',
              borderRadius: '14px',
            }}
          >
            {'chispa'}
          </span>
          <span className={'intro-hide'}>{' y haz crecer tus ideas.'}</span>
        </h1>
        <p
          className={'intro-hide'}
          style={{
            margin: '0',
            fontSize: '20px',
            lineHeight: '1.55',
            maxWidth: '560px',
          }}
        >
          <strong>{'Organizo la parte digital de tu negocio'}</strong>
          {
            ': sistemas, proyectos y web, para que tus ideas avancen sin agobios. Para profesionales y pequeños negocios con mil ideas… y cero sistemas.'
          }
        </p>
        <div
          className={'intro-hide'}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            alignItems: 'center',
          }}
        >
          <a
            className={'btn'}
            href={'#contacto'}
            style={{
              textDecoration: 'none',
              background: '#1A1A1A',
              color: '#F9F8F3',
              padding: '16px 28px',
              borderRadius: '999px',
              fontWeight: '700',
              fontSize: '17px',
              minHeight: '44px',
              boxSizing: 'border-box',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {'Hablemos de tu chispa'}
          </a>
        </div>
      </div>
      <div
        className={'intro-hide'}
        style={{
          flex: '1 1 380px',
          minWidth: '0',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            aspectRatio: '1 / 1.22',
            position: 'relative',
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
        <div
          className={'think'}
          style={{
            position: 'absolute',
            top: '2%',
            left: '-4%',
            zIndex: '2',
            maxWidth: '240px',
          }}
        >
          <div
            style={{
              background: '#F9F8F3',
              border: '2px solid #1A1A1A',
              borderRadius: '28px',
              padding: '14px 20px',
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '1.3',
              textAlign: 'center',
              boxShadow: '0 8px 18px rgba(26,26,26,.08)',
            }}
          >
            {v.tabsLabel}
          </div>
          <span
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              right: '26px',
              bottom: '-16px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#F9F8F3',
              border: '2px solid #1A1A1A',
            }}
          ></span>
          <span
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              right: '12px',
              bottom: '-30px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F9F8F3',
              border: '2px solid #1A1A1A',
            }}
          ></span>
        </div>
      </div>
    </section>
  );
}
