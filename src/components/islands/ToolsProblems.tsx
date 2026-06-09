import { useState } from 'react';

type Lang = 'all' | 'go' | 'typescript' | 'rust' | 'http';

interface ToolChip {
  name: string;
  link: string;
  lang: Lang;
}

interface Problem {
  label: string;
  guidance: string;
  tools: ToolChip[];
}

const LANG_META: Record<Lang, { label: string; color: string }> = {
  all:        { label: 'All',          color: 'var(--navy)' },
  go:         { label: 'Go',           color: '#00ADD8' },
  typescript: { label: 'TypeScript',   color: '#3178C6' },
  rust:       { label: 'Rust',         color: '#CE422B' },
  http:       { label: 'HTTP / API',   color: 'var(--jade)' },
};

const PROBLEMS: Problem[] = [
  {
    label: 'Use CIDs in my own stack',
    guidance: 'Use DASL for simple content-addressed values; reach for full IPLD when you need linked data or Merkle structures.',
    tools: [
      { name: 'DASL',  link: 'https://dasl.ing/',    lang: 'http' },
      { name: 'IPLD',  link: 'https://ipld.io/',     lang: 'http' },
      { name: 'Helia', link: 'https://helia.io/',    lang: 'typescript' },
    ],
  },
  {
    label: 'Share data in a private network',
    guidance: 'Run Kubo with a swarm key for a closed IPFS network, or use iroh-blobs for lightweight QUIC-native transfer.',
    tools: [
      { name: 'Kubo',       link: 'https://github.com/ipfs/kubo',   lang: 'go' },
      { name: 'iroh-blobs', link: 'https://www.iroh.computer/',     lang: 'rust' },
    ],
  },
  {
    label: 'Publish from my own node',
    guidance: 'Run a Kubo daemon, pin your content locally, and serve it through the built-in HTTP gateway.',
    tools: [
      { name: 'Kubo', link: 'https://github.com/ipfs/kubo', lang: 'go' },
    ],
  },
  {
    label: 'Publish via a hosted service',
    guidance: 'Upload to a pinning service — they handle replication, availability, and IPNI announcements.',
    tools: [
      { name: 'Pinata',   link: 'https://pinata.cloud/',         lang: 'http' },
      { name: 'Filebase', link: 'https://filebase.com/',         lang: 'http' },
      { name: 'Omnipin',  link: 'https://omnipin.eth.link/',     lang: 'http' },
    ],
  },
  {
    label: 'Ship a content-addressed static website',
    guidance: 'Drop ipfs-deploy-action into your CI pipeline to get a CID per build and pin it automatically.',
    tools: [
      { name: 'ipfs-deploy-action', link: 'https://github.com/ipshipyard/ipfs-deploy-action', lang: 'http' },
    ],
  },
];

function chipOpacity(chipLang: Lang, active: Lang): number {
  if (active === 'all') return 1;
  if (chipLang === active) return 1;
  if (chipLang === 'http') return 0.5; // HTTP tools work with any language
  return 0.2;
}

function rowOpacity(tools: ToolChip[], active: Lang): number {
  if (active === 'all') return 1;
  return tools.some((t) => t.lang === active || t.lang === 'http') ? 1 : 0.35;
}

export default function ToolsProblems() {
  const [active, setActive] = useState<Lang>('all');

  return (
    <>
      <div className="lf-bar" role="group" aria-label="Filter by language">
        {(Object.entries(LANG_META) as [Lang, (typeof LANG_META)[Lang]][]).map(([id, meta]) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              className={`lf-btn${isActive ? ' is-active' : ''}`}
              style={{ '--lc': meta.color } as React.CSSProperties}
              onClick={() => setActive(isActive && id !== 'all' ? 'all' : id)}
            >
              {id !== 'all' && <span className="lf-dot" aria-hidden="true" />}
              {meta.label}
            </button>
          );
        })}
      </div>

      <div className="tp-problems">
        {PROBLEMS.map((p) => (
          <div
            key={p.label}
            className="tp-row"
            style={{ opacity: rowOpacity(p.tools, active), transition: 'opacity .2s' }}
          >
            <div className="tp-label">{p.label}</div>
            <div className="tp-right">
              <p className="tp-guidance">{p.guidance}</p>
              <div className="tp-tools">
                {p.tools.map((t) => (
                  <a
                    key={t.name}
                    href={t.link}
                    target="_blank"
                    rel="noopener"
                    className="tp-chip"
                    style={{
                      '--cc': LANG_META[t.lang].color,
                      opacity: chipOpacity(t.lang, active),
                      transition: 'opacity .2s, border-color .15s, background .15s, transform .15s',
                    } as React.CSSProperties}
                  >
                    {t.name}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .lf-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 36px;
        }

        .lf-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 999px;
          cursor: pointer;
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-2);
          transition: border-color .15s, background .15s, color .15s;
        }
        .lf-btn:hover { border-color: var(--lc, var(--turq)); color: var(--navy); }
        .lf-btn.is-active {
          background: var(--lc, var(--navy));
          border-color: var(--lc, var(--navy));
          color: #fff;
        }

        .lf-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--lc);
          flex-shrink: 0;
          transition: background .15s;
        }
        .lf-btn.is-active .lf-dot { background: rgba(255,255,255,0.75); }

        .tp-problems { display: flex; flex-direction: column; }

        .tp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
        }
        .tp-row:first-child { border-top: 1px solid var(--line); }

        @media (max-width: 700px) {
          .tp-row { grid-template-columns: 1fr; gap: 10px; }
        }

        .tp-label {
          font-size: 18px;
          font-weight: 600;
          color: var(--navy);
          letter-spacing: -0.01em;
          line-height: 1.35;
          padding-top: 3px;
        }

        .tp-right { display: flex; flex-direction: column; gap: 14px; }

        .tp-guidance {
          margin: 0;
          font-size: 15px;
          color: var(--ink-2);
          line-height: 1.6;
        }

        .tp-tools { display: flex; flex-wrap: wrap; gap: 8px; }

        .tp-chip {
          display: inline-flex;
          align-items: center;
          padding: 5px 12px;
          background: var(--pearl);
          border: 1px solid var(--line);
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: var(--cc, var(--turq));
          text-decoration: none;
        }
        .tp-chip:hover {
          border-color: var(--cc, var(--turq));
          background: var(--paper);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
