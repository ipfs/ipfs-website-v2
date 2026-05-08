import { useState } from 'react';

interface Runtime {
  id: string;
  label: string;
  sub: string;
  icon: string;
  color: string;
  snippet: string;
  source?: { label: string; link: string };
}

const CID = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
const RUNTIMES: Runtime[] = [
  // Browser — Helia in the browser, mirrors helia-101 / 101-basics.js
  { id: 'browser', label: 'Browser', sub: 'Helia · JS', icon: '◐', color: 'var(--turq)',
    snippet: "import { createHelia } from 'helia'\nimport { unixfs } from '@helia/unixfs'\n\nconst helia = await createHelia()\nconst fs = unixfs(helia)\n\n// fetch & verify the same bytes\nconst decoder = new TextDecoder()\nlet text = ''\nfor await (const chunk of fs.cat(cid)) {\n  text += decoder.decode(chunk, { stream: true })\n}",
    source: { label: 'helia-101 · 101-basics.js', link: 'https://github.com/ipfs-examples/helia-101/blob/main/101-basics.js' } },
  // Node.js — helia-101 / 401-pinning.js pattern
  { id: 'node', label: 'Node.js', sub: 'Helia · pinning', icon: '▲', color: 'var(--jade)',
    snippet: "import { createHelia } from 'helia'\nimport { unixfs } from '@helia/unixfs'\n\nconst helia = await createHelia()\nconst fs = unixfs(helia)\n\n// keep the bytes around — pin by CID\nfor await (const _ of helia.pins.add(cid)) {}\nconst stats = await fs.stat(cid, { extended: true })\nconsole.log('pinned', cid.toString(), stats)",
    source: { label: 'helia-101 · 401-pinning.js', link: 'https://github.com/ipfs-examples/helia-101/blob/main/401-pinning.js' } },
  // Go — Kubo / Boxo
  { id: 'go', label: 'Go server', sub: 'Kubo / Boxo', icon: '◆', color: 'var(--navy)',
    snippet: "api, _ := rpc.NewLocalApi()\nreader, _ := api.Unixfs().Get(ctx,\n    path.New(cid))",
    source: { label: 'kubo · examples', link: 'https://github.com/ipfs/kubo' } },
  // IoT — embedded reader
  { id: 'iot', label: 'IoT chip', sub: 'Rust · small', icon: '●', color: 'var(--carmine)',
    snippet: "// embedded DASL reader\nlet block = store.get(&cid)?;\nverify_cid(&cid, &block)?;" },
  // CLI — Helia HTTP + addBytes from helia-101 (run as a Node script)
  { id: 'cli', label: 'CLI', sub: 'helia · http', icon: '$', color: 'var(--ink-2)',
    snippet: "import { createHeliaHTTP } from '@helia/http'\nimport { unixfs } from '@helia/unixfs'\n\nconst helia = await createHeliaHTTP()\nconst fs = unixfs(helia)\nconst encoder = new TextEncoder()\n\nconst cid = await fs.addBytes(\n  encoder.encode('Hello World 101'),\n)\nconsole.log('added:', cid.toString())",
    source: { label: 'helia-101 · 101-basics.js', link: 'https://github.com/ipfs-examples/helia-101/blob/main/101-basics.js' } },
  // Gateway — plain HTTP
  { id: 'gw', label: 'Gateway', sub: 'Over plain HTTP', icon: '↗', color: 'var(--yellow)',
    snippet: "curl https://ipfs.io/ipfs/\\\n  bafybeigdyrzt5sfp7udm7hu76…\n# bytes fly back, hash re-verifies" },
];

export default function WorksEverywhere() {
  const [active, setActive] = useState('browser');
  const node = RUNTIMES.find((r) => r.id === active)!;

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 20, background: 'var(--paper)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 600 }}>
          one CID · six runtimes
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', maxWidth: 360, textAlign: 'right' }}>
          click any runtime to see how it asks for the <em>same</em> bytes
        </div>
      </div>

      <div style={{
        background: 'var(--pearl)', border: '1px solid var(--line)', borderRadius: 10,
        padding: '10px 14px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: 'center',
      }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase' }}>cid</span>
        <span className="mono" style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
          {CID.slice(0, 14)}<span style={{ color: 'var(--ink-3)' }}>…</span>{CID.slice(-10)}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 10, marginBottom: 18,
      }}>
        {RUNTIMES.map((r) => {
          const isActive = r.id === active;
          return (
            <button key={r.id} onClick={() => setActive(r.id)}
              style={{
                border: isActive ? '1.5px solid var(--turq)' : '1px solid var(--line)',
                background: isActive ? 'rgba(107,196,206,0.12)' : 'var(--paper)',
                borderRadius: 10, padding: '12px 10px', cursor: 'pointer',
                textAlign: 'left', fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column', gap: 4,
                transition: 'all .15s',
                boxShadow: isActive ? '0 0 0 4px rgba(107,196,206,0.15)' : 'none',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span className="mono" style={{ color: r.color, fontWeight: 600, fontSize: 14, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
              </div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.sub}</span>
            </button>
          );
        })}
      </div>

      <div style={{ background: 'var(--navy)', borderRadius: 10, padding: '14px 18px', color: '#fff' }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span>// {node.label.toLowerCase()}</span>
          <span>asks for the same bytes, verifies locally ✓</span>
        </div>
        <pre className="mono" style={{
          margin: 0, fontSize: 13, lineHeight: 1.55, color: '#fff',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>{node.snippet}</pre>
        {node.source && (
          <div className="mono" style={{
            marginTop: 12, paddingTop: 10, borderTop: '1px dashed rgba(255,255,255,0.15)',
            fontSize: 11, color: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          }}>
            <span style={{ color: 'var(--teal)' }}>↗</span>
            adapted from
            <a href={node.source.link} target="_blank" rel="noopener"
              style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 500 }}>
              {node.source.label}
            </a>
          </div>
        )}
      </div>

      <div className="mono" style={{
        marginTop: 12, fontSize: 12, color: 'var(--ink-3)',
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      }}>
        <span style={{ color: 'var(--jade)' }}>✓</span>
        same CID · same bytes · same guarantee, regardless of language or transport.
        <a href="https://github.com/ipfs-examples/helia-101" target="_blank" rel="noopener"
          style={{ marginLeft: 'auto', color: 'var(--turq)', textDecoration: 'none', fontWeight: 500 }}>
          browse all helia-101 examples ↗
        </a>
      </div>
    </div>
  );
}
