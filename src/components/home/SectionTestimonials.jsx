import { Fragment } from 'react';

export default function SectionTestimonials({ v }) {
  return (
    <section
      data-tone={'#D9CCF5'}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '104px 32px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: '52px',
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
          {'notas que guardo con cariño'}
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
          {'Lo que dicen cuando su chispa encuentra calma'}
        </h2>
      </div>
      <div
        className={'stagger'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '36px 28px',
        }}
      >
        <figure className={'reveal'} style={{ margin: '0' }}>
          <div
            className={'note tint'}
            style={{
              background: '#FCEFB4',
              borderRadius: '6px',
              padding: '36px 28px 28px',
              transform: 'rotate(-2deg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minHeight: '220px',
              boxSizing: 'border-box',
            }}
          >
            <blockquote
              style={{ margin: '0', fontSize: '18px', lineHeight: '1.55' }}
            >
              {'«[Texto de la reseña de Marc]»'}
            </blockquote>
            <figcaption
              style={{
                marginTop: 'auto',
                fontFamily: "'Gochi Hand', cursive",
                fontSize: '24px',
              }}
            >
              {'— Marc · gestión de alquileres'}
            </figcaption>
          </div>
        </figure>
        <figure className={'reveal'} style={{ margin: '0' }}>
          <div
            className={'note tint'}
            style={{
              background: '#9EE0D6',
              borderRadius: '6px',
              padding: '36px 28px 28px',
              transform: 'rotate(2deg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minHeight: '220px',
              boxSizing: 'border-box',
            }}
          >
            <blockquote
              style={{ margin: '0', fontSize: '18px', lineHeight: '1.55' }}
            >
              {'«[Reseña de clienta]»'}
            </blockquote>
            <figcaption
              style={{
                marginTop: 'auto',
                fontFamily: "'Gochi Hand', cursive",
                fontSize: '24px',
              }}
            >
              {'— [Nombre] · [Negocio]'}
            </figcaption>
          </div>
        </figure>
        <figure className={'reveal'} style={{ margin: '0' }}>
          <div
            className={'note tint'}
            style={{
              background: '#F4C4CF',
              borderRadius: '6px',
              padding: '36px 28px 28px',
              transform: 'rotate(-1.5deg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minHeight: '220px',
              boxSizing: 'border-box',
            }}
          >
            <blockquote
              style={{ margin: '0', fontSize: '18px', lineHeight: '1.55' }}
            >
              {'«[Reseña de clienta]»'}
            </blockquote>
            <figcaption
              style={{
                marginTop: 'auto',
                fontFamily: "'Gochi Hand', cursive",
                fontSize: '24px',
              }}
            >
              {'— [Nombre] · [Negocio]'}
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
