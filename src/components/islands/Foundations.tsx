import { useState } from 'react';
import FileDropCID from './FileDropCID';
import LocationVsContent from './LocationVsContent';
import WorksEverywhere from './WorksEverywhere';

interface Foundation {
  id: string;
  num: string;
  title: string;
  body: string;
  demoHeading: string;
  demoSub: string;
  demo: React.ReactNode;
}

const FOUNDATIONS: Foundation[] = [
  {
    id: 'cid', num: '01', title: 'CIDs for addressing',
    body: 'Data is identified by what it is, not where it lives. A CID is a self-describing, cryptographic identifier that encodes the hash of the content. Any party can generate one; any party can verify one. No authority required.',
    demoHeading: 'Hash around, and find out.',
    demoSub: 'Change one character. Watch the whole CID change.',
    demo: <FileDropCID />,
  },
  {
    id: 'transport', num: '02', title: 'Transport agnostic',
    body: "IPFS is strict about outcomes, tolerant about methods. Because CIDs enforce that you get exactly what you asked for, it doesn't matter how the data traveled — HTTP, a peer next door, a USB key. Verification happens at the endpoints.",
    demoHeading: 'Take the host down. The content survives.',
    demoSub: 'Location-addressed URLs depend on a single server. CIDs do not.',
    demo: <LocationVsContent />,
  },
  {
    id: 'everywhere', num: '03', title: 'Works everywhere',
    body: 'IPFS is intended to work everywhere: web browsers, IoT chips, and large storage clusters. It gets there by building on reusable pieces and an ecosystem of interoperable implementations across languages.',
    demoHeading: 'Same bytes. Six runtimes.',
    demoSub: 'One CID, fetched and verified from wildly different places.',
    demo: <WorksEverywhere />,
  },
];

export default function Foundations() {
  const [active, setActive] = useState('cid');
  const node = FOUNDATIONS.find((f) => f.id === active) || FOUNDATIONS[0];

  return (
    <>
      <div className="foundation-tabs">
        {FOUNDATIONS.map((f) => {
          const isActive = f.id === active;
          return (
            <button key={f.id} onClick={() => setActive(f.id)}
              style={{
                textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                border: isActive ? '1.5px solid var(--turq)' : '1px solid var(--line)',
                background: 'var(--paper)',
                borderRadius: 14, padding: 26, position: 'relative', overflow: 'hidden',
                boxShadow: isActive
                  ? '0 0 0 5px rgba(107,196,206,0.15), 0 12px 28px -18px rgba(7,58,83,0.35)'
                  : 'none',
                transition: 'all .18s',
              }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: isActive ? 'var(--grad)' : 'var(--stone)',
                opacity: isActive ? 1 : 0.4,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <span className="mono" style={{ fontSize: 12, color: isActive ? 'var(--turq)' : 'var(--ink-3)', fontWeight: 600, letterSpacing: '.1em' }}>{f.num}</span>
                <span className="mono" style={{ fontSize: 11, color: isActive ? 'var(--turq)' : 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {isActive ? '◉ live demo ↓' : '○ try demo'}
                </span>
              </div>
              <h3 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6 }}>{f.body}</p>
            </button>
          );
        })}
      </div>

      <div style={{ background: 'var(--pearl)', border: '1px solid var(--line)', borderRadius: 16, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--jade)', marginBottom: 8, fontWeight: 600 }}>
              try it · live · foundation {node.num}
            </div>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--navy)' }}>{node.demoHeading}</h3>
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: 380, textAlign: 'right' }}>{node.demoSub}</div>
        </div>
        <div key={active}>{node.demo}</div>
      </div>

      <style>{`
        .foundation-tabs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (min-width: 768px) {
          .foundation-tabs { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  );
}
