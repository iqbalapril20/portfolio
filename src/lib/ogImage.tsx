import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_IMAGE_ALT =
  'Muchammad Iqbal Aprilianto - Full-Stack Web Developer Portfolio';

function loadPortraitDataUri(): string | null {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'images',
      'profile-iqbal-hero.jpg',
    );
    const buffer = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
}

export function renderPortfolioOgImage() {
  const portraitSrc = loadPortraitDataUri();
  const stackTags = ['Next.js', 'TypeScript', 'Laravel', 'React', 'MySQL'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '52px 60px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          border: '1px solid #1E293B',
        }}
      >
        {/* Left Editorial Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '680px',
            paddingRight: '36px',
          }}
        >
          {/* Top Brand & Status */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
              }}
            >
              <span style={{ color: '#3B82F6' }}>&lt;</span>
              <span>iqbal.dev</span>
              <span style={{ color: '#3B82F6' }}>/&gt;</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: '#064E3B',
                border: '1px solid #047857',
                fontSize: '15px',
                fontWeight: 600,
                color: '#A7F3D0',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: '#34D399',
                }}
              />
              <span>Available for Work</span>
            </div>
          </div>

          {/* Center Identity */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#60A5FA',
              }}
            >
              Full-Stack Web Developer
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '54px',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#F8FAFC',
              }}
            >
              Muchammad Iqbal Aprilianto
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '22px',
                lineHeight: 1.45,
                color: '#CBD5E1',
                marginTop: '4px',
              }}
            >
              Membangun aplikasi web terstruktur, sistem informasi, dan solusi
              digital modern dari frontend hingga backend.
            </div>
          </div>

          {/* Bottom Tech Pills */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {stackTags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#E2E8F0',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right Portrait Frame */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '380px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '360px',
              height: '490px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid #334155',
              backgroundColor: '#1E293B',
            }}
          >
            {portraitSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={portraitSrc}
                alt="Muchammad Iqbal Aprilianto"
                width={360}
                height={490}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '96px',
                  fontWeight: 800,
                  color: '#3B82F6',
                }}
              >
                MI
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    },
  );
}
