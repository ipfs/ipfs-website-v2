import { useMemo, useState } from 'react';

interface Tool {
  name: string;
  blurb: string;
  link: string;
  jobs: string[];
  pillar: 'addressing' | 'discovery' | 'transfer' | 'all';
  lang?: string;
  badge?: string;
}

interface Job {
  id: string;
  label: string;
  hint: string;
}

const JOBS: Job[] = [
  { id: 'all', label: 'All tools', hint: 'browse everything' },
  { id: 'run-a-node', label: 'Run a node', hint: 'self-host the protocol' },
  { id: 'pin-and-host', label: 'Pin & host', hint: 'keep CIDs available' },
  { id: 'publish-to-the-web', label: 'Publish to the web', hint: 'CI / CD for content-addressed sites' },
  { id: 'embed-in-apps', label: 'Embed in apps', hint: 'libraries for product code' },
  { id: 'read-from-the-web', label: 'Read from the web', hint: 'gateways and HTTP clients' },
];

const TOOLS: Tool[] = [
  {
    name: 'Kubo',
    blurb: 'The reference IPFS implementation in Go. A full-featured daemon for desktop, server, and infra deployments: DHT, Bitswap, gateway, and pinning all in one binary.',
    link: 'https://github.com/ipfs/kubo',
    jobs: ['run-a-node', 'pin-and-host', 'read-from-the-web'],
    pillar: 'all',
    lang: 'Go',
    badge: 'reference impl',
  },
  {
    name: 'Helia',
    blurb: 'Modular IPFS in TypeScript. Run a node directly in the browser or in Node. Pick the transports and routers you need, leave the rest behind.',
    link: 'https://helia.io/',
    jobs: ['run-a-node', 'embed-in-apps'],
    pillar: 'all',
    lang: 'TypeScript',
  },
  {
    name: 'iroh-blobs',
    blurb: 'A small, embeddable library for verified blob transfer over QUIC. Designed for apps, IoT, and streaming workloads where a full IPFS daemon is too much.',
    link: 'https://www.iroh.computer/',
    jobs: ['embed-in-apps', 'pin-and-host'],
    pillar: 'transfer',
    lang: 'Rust',
  },
  {
    name: 'Omnipin',
    blurb: 'A decentralized pinning network. Submit a CID, get it persisted across many providers, with no single host to call and no single host to fail.',
    link: 'https://omnipin.eth.link/',
    jobs: ['pin-and-host'],
    pillar: 'all',
    badge: 'community',
  },
  {
    name: 'ipfs-deploy-action',
    blurb: 'A GitHub Action that publishes a build directory to IPFS, returns the CID, and pins it. Drop it into a workflow and ship content-addressed sites on every push.',
    link: 'https://github.com/ipshipyard/ipfs-deploy-action',
    jobs: ['publish-to-the-web', 'pin-and-host'],
    pillar: 'all',
    badge: 'CI / CD',
  },
  {
    name: 'IPFS Gateways',
    blurb: 'HTTP endpoints that resolve CIDs into bytes for any browser or curl. The bridge between content addressing and the location-addressed web.',
    link: 'https://specs.ipfs.tech/http-gateways/',
    jobs: ['read-from-the-web'],
    pillar: 'transfer',
  },
];

const PILLAR_COLOR: Record<Tool['pillar'], string> = {
  addressing: 'var(--turq)',
  discovery: 'var(--jade)',
  transfer: 'var(--yellow)',
  all: 'var(--ink-3)',
};

const PILLAR_LABEL: Record<Tool['pillar'], string> = {
  addressing: 'addressing',
  discovery: 'discovery',
  transfer: 'transfer',
  all: 'full stack',
};

export default function Tools() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () => (active === 'all' ? TOOLS : TOOLS.filter((t) => t.jobs.includes(active))),
    [active],
  );

  return (
    <>
      <div className="tools-jobs" role="tablist" aria-label="Filter tools by job">
        {JOBS.map((j) => {
          const isActive = j.id === active;
          const count = j.id === 'all' ? TOOLS.length : TOOLS.filter((t) => t.jobs.includes(j.id)).length;
          return (
            <button
              key={j.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(j.id)}
              className={`tools-job ${isActive ? 'is-active' : ''}`}
            >
              <span className="tools-job-label">{j.label}</span>
              <span className="mono tools-job-hint">{j.hint}</span>
              <span className="mono tools-job-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="tools-grid" key={active}>
        {filtered.map((t, i) => (
          <a
            key={t.name}
            href={t.link}
            target="_blank"
            rel="noopener"
            className="tool-card"
            style={{ ['--i' as string]: i } as React.CSSProperties}
          >
            <div className="tool-head">
              <h3 className="tool-name">{t.name}</h3>
              {t.badge && <span className="tool-badge">{t.badge}</span>}
            </div>
            <p className="tool-blurb">{t.blurb}</p>
            <div className="tool-foot">
              <span className="mono tool-pillar" style={{ color: PILLAR_COLOR[t.pillar] }}>
                ◆ {PILLAR_LABEL[t.pillar]}
              </span>
              {t.lang && <span className="mono tool-lang">{t.lang}</span>}
              <span className="mono tool-link">↗</span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .tools-jobs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }
        .tools-job {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          padding: 10px 16px;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 999px;
          cursor: pointer;
          font: inherit;
          color: var(--ink-2);
          transition: all .15s;
        }
        .tools-job:hover { border-color: var(--turq); color: var(--navy); }
        .tools-job.is-active {
          background: var(--navy-surface);
          color: #fff;
          border-color: var(--navy-surface);
        }
        .tools-job-label { font-size: 14px; font-weight: 500; }
        .tools-job-hint {
          font-size: 11px;
          color: var(--ink-3);
          letter-spacing: .02em;
        }
        .tools-job.is-active .tools-job-hint { color: rgba(255,255,255,0.65); }
        .tools-job-count {
          font-size: 11px;
          color: var(--ink-3);
          background: var(--pearl);
          padding: 1px 7px;
          border-radius: 999px;
          font-weight: 600;
        }
        .tools-job.is-active .tools-job-count {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 700px) { .tools-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .tools-grid { grid-template-columns: repeat(3, 1fr); } }

        .tool-card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-decoration: none;
          color: inherit;
          transition: border-color .15s, transform .15s, box-shadow .15s;
          animation: tool-in .4s cubic-bezier(.2,.8,.2,1) both;
          animation-delay: calc(var(--i, 0) * 50ms);
        }
        .tool-card:hover {
          border-color: var(--turq);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -18px rgba(7,58,83,0.25);
        }
        @keyframes tool-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tool-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .tool-name {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: var(--navy);
          letter-spacing: -0.01em;
        }
        .tool-badge {
          font-family: var(--font-retro);
          font-style: italic;
          font-size: 12px;
          color: var(--turq);
          background: var(--pearl);
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .tool-blurb {
          margin: 0;
          font-size: 14px;
          color: var(--ink-2);
          line-height: 1.55;
          flex: 1;
        }
        .tool-foot {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 12px;
          border-top: 1px dashed var(--line);
          font-size: 12px;
        }
        .tool-pillar { font-weight: 600; }
        .tool-lang { color: var(--ink-3); }
        .tool-link { margin-left: auto; color: var(--turq); font-size: 14px; }

        @media (prefers-reduced-motion: reduce) {
          .tool-card { animation: none; }
        }
      `}</style>
    </>
  );
}
