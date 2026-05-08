import { useState } from 'react';
import FileDropCID from './FileDropCID';
import LocationVsContent from './LocationVsContent';
import WorksEverywhere from './WorksEverywhere';

interface CTA {
  label: string;
  hint: string;
  link: string;
}

interface Foundation {
  id: string;
  num: string;
  title: string;
  body: string;
  demoHeading: string;
  demoSub: string;
  demo: React.ReactNode;
  ctas: CTA[];
}

const FOUNDATIONS: Foundation[] = [
  {
    id: 'cid', num: '01', title: 'CIDs for addressing',
    body: 'Data is identified by what it is, not where it lives. A CID is a self-describing, cryptographic fingerprint of the content — used by UnixFS, DASL, and BDASL to address everything from a single byte to a multi-gigabyte dataset. Any party generates one; any party verifies one.',
    demoHeading: 'Hash around, and find out.',
    demoSub: 'Change one character. Watch the whole CID change.',
    demo: <FileDropCID />,
    ctas: [
      { label: 'Read the spec', hint: 'CID, UnixFS, DASL', link: 'specs.ipfs.tech' },
      { label: 'Try DASL', hint: 'simple profile', link: 'dasl.ing' },
    ],
  },
  {
    id: 'transport', num: '02', title: 'Transport agnostic',
    body: "IPFS is strict about outcomes, tolerant about methods. The same CID can travel over HTTP, libp2p, Bitswap, RASL, or a USB key — and verification still happens at the endpoints. Hosts come and go. Routes change. The bytes you asked for arrive intact, or you know they didn't.",
    demoHeading: 'Take the host down. The content survives.',
    demoSub: 'Location-addressed URLs depend on a single server. CIDs do not.',
    demo: <LocationVsContent />,
    ctas: [
      { label: 'Pin & retrieve', hint: 'gateways + RASL', link: 'docs.ipfs.tech/concepts/gateways' },
      { label: 'libp2p transports', hint: 'connect anywhere', link: 'libp2p.io' },
    ],
  },
  {
    id: 'everywhere', num: '03', title: 'Works everywhere',
    body: 'Verified publishing and retrieval, wherever you operate. Open social on atproto, sovereign web publishing on Mainnet tooling, IoT and streaming with iroh-blobs and private IPFS, tamperproof media for journalists and artists. Same protocol, different jobs to be done.',
    demoHeading: 'Same bytes. Six runtimes.',
    demoSub: 'One CID, fetched and verified from wildly different places.',
    demo: <WorksEverywhere />,
    ctas: [
      { label: 'Helia (JS)', hint: 'browsers + Node', link: 'helia.io' },
      { label: 'Kubo (Go)', hint: 'all-in-one node', link: 'github.com/ipfs/kubo' },
      { label: 'iroh-blobs', hint: 'embedded / IoT', link: 'iroh.computer' },
    ],
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
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--navy)' }}>{node.demoHeading}</h3>
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: 380, textAlign: 'right' }}>{node.demoSub}</div>
        </div>
        <div key={active}>{node.demo}</div>

        <div className="foundation-ctas">
          <div className="mono" style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 600 }}>
            get started ·
          </div>
          {node.ctas.map((c) => (
            <a key={c.link} href={`https://${c.link}`} className="foundation-cta">
              <span style={{ color: 'var(--turq)', fontWeight: 600 }}>↗ {c.label}</span>
              <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>{c.hint}</span>
              <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 11, marginLeft: 'auto' }}>{c.link}</span>
            </a>
          ))}
        </div>
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
        .foundation-ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 18px;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px dashed var(--line);
        }
        .foundation-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 10px;
          border-radius: 6px;
          background: var(--paper);
          border: 1px solid var(--line);
          font-size: 13px;
          text-decoration: none;
          transition: border-color .15s, transform .15s;
          flex: 1 1 auto;
          min-width: 220px;
        }
        .foundation-cta:hover {
          border-color: var(--turq);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
