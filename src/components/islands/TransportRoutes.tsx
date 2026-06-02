// Diagram for the "transport agnostic" commitment: one CID fans out across
// many wires, every lane re-verifies against the same hash at the endpoint.
interface Lane {
  icon: string;
  name: string;
  hint: string;
  color: string;
}

const CID = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';

const LANES: Lane[] = [
  { icon: '↗', name: 'HTTP gateway', hint: 'request / response', color: 'var(--yellow)' },
  { icon: '◆', name: 'libp2p · Bitswap', hint: 'peer-to-peer block exchange', color: 'var(--turq)' },
  { icon: '●', name: 'iroh · QUIC', hint: 'embedded, low-latency', color: 'var(--carmine)' },
  { icon: '≋', name: 'RASL', hint: 'streaming verifiable bytes', color: 'var(--jade)' },
  { icon: '⊟', name: 'sneakernet · USB', hint: 'no network at all', color: 'var(--ink-2)' },
];

export default function TransportRoutes() {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 20, background: 'var(--paper)', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 600 }}>
          one CID · any wire
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', maxWidth: 360, textAlign: 'right' }}>
          the route is interchangeable — the hash is not
        </div>
      </div>

      {/* Source: the single identifier every lane is asked for. */}
      <div style={{
        background: 'var(--navy)', borderRadius: 10, padding: '10px 14px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
      }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: '.12em', textTransform: 'uppercase' }}>cid</span>
        <span className="mono" style={{ fontSize: 13, color: '#fff', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
          {CID.slice(0, 16)}<span style={{ color: 'rgba(255,255,255,0.5)' }}>…</span>{CID.slice(-8)}
        </span>
      </div>

      {/* Lanes: each transport delivers the same bytes, each verifies locally. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LANES.map((l) => (
          <div key={l.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid var(--line)', borderRadius: 8, padding: '10px 14px',
            background: 'var(--pearl)',
          }}>
            <span className="mono" style={{ color: l.color, fontWeight: 600, fontSize: 14, width: 16, textAlign: 'center', flexShrink: 0 }}>{l.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{l.name}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.hint}</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--jade)', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>✓ verified</span>
          </div>
        ))}
      </div>

      <div className="mono" style={{
        marginTop: 14, fontSize: 12, color: 'var(--ink-3)',
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      }}>
        <span style={{ color: 'var(--jade)' }}>✓</span>
        same bytes, re-hashed at the endpoint — or you know they didn't arrive.
      </div>
    </div>
  );
}
