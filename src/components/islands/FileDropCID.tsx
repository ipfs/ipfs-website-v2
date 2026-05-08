import { useEffect, useRef, useState } from 'react';

async function computeCid(bytes: Uint8Array): Promise<string> {
  let hex = '';
  try {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // djb2 fallback when SubtleCrypto is unavailable (non-secure contexts)
    let h = 5381;
    const s = new TextDecoder().decode(bytes);
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    hex = (h.toString(16) + 'a1b2c3d4e5f6').repeat(8).slice(0, 64);
  }
  const alpha = 'abcdefghijklmnopqrstuvwxyz234567';
  let out = '';
  for (let i = 0; i < 52; i++) {
    const byte = parseInt(hex.slice((i * 2) % 64, (i * 2) % 64 + 2), 16);
    out += alpha[byte % 32];
  }
  return 'bafkreic' + out.slice(0, 48);
}

interface CidPart {
  key: string;
  label: string;
  sub: string;
  chars: string;
  color: string;
  detail: string;
}

function CIDAnatomy({ cid, pulse }: { cid: string; pulse: boolean }) {
  const [hover, setHover] = useState<string | null>(null);
  if (!cid) {
    return <div style={{ height: 64, border: '1.5px dashed var(--stone)', borderRadius: 8, background: 'var(--paper)' }} />;
  }
  const parts: CidPart[] = [
    { key: 'mb', label: 'multibase', sub: 'base32',
      chars: cid.slice(0, 1), color: 'var(--carmine)',
      detail: 'Single-letter prefix that tells parsers how the rest is encoded. "b" = base32 lowercase.' },
    { key: 'ver', label: 'version', sub: 'CIDv1',
      chars: cid.slice(1, 2), color: 'var(--yellow)',
      detail: 'Which CID format. "a" here encodes version 1. Self-describing, upgrade-safe.' },
    { key: 'codec', label: 'multicodec', sub: 'raw · 0x55',
      chars: cid.slice(2, 4), color: 'var(--jade)',
      detail: "What kind of bytes we're naming. Raw, dag-pb, dag-cbor, JSON, etc. Tells you how to interpret the data once you fetch it." },
    { key: 'hfn', label: 'hash algo', sub: 'sha-256',
      chars: cid.slice(4, 6), color: 'var(--turq)',
      detail: 'Which hash function was used. sha-256 here; but blake3, sha-512, and others are legal. The CID tells you which.' },
    { key: 'hlen', label: 'hash length', sub: '32 bytes',
      chars: cid.slice(6, 8), color: 'var(--navy)',
      detail: 'How many bytes of digest follow. 32 bytes = 256 bits of sha-256.' },
    { key: 'digest', label: 'digest', sub: 'the fingerprint',
      chars: cid.slice(8), color: 'var(--ink)',
      detail: 'The actual hash of the bytes. Change one character of the file and every character here changes.' },
  ];

  const hovered = parts.find((p) => p.key === hover);

  return (
    <div style={{
      border: '1.5px solid var(--navy)', borderRadius: 10,
      background: pulse ? 'rgba(107,196,206,0.12)' : 'var(--paper)',
      padding: 14, transition: 'background .4s',
    }}>
      <div className="mono" style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 12, wordBreak: 'break-all' }}>
        {parts.map((p) => {
          const isHovered = hover === p.key;
          const isDim = !!hover && !isHovered;
          return (
            <span key={p.key}
              onMouseEnter={() => setHover(p.key)}
              onMouseLeave={() => setHover(null)}
              style={{
                padding: '2px 1px',
                background: isHovered ? p.color : 'transparent',
                color: isHovered ? '#fff' : (isDim ? 'var(--ink-3)' : p.color),
                fontWeight: p.key === 'digest' ? 400 : 600,
                cursor: 'help',
                transition: 'all .12s',
                borderBottom: `2px solid ${isDim ? 'transparent' : p.color}`,
              }}>
              {p.chars}
            </span>
          );
        })}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 6, alignItems: 'start',
        borderTop: '1px dashed var(--hair)', paddingTop: 12,
      }}>
        {parts.map((p) => {
          const isHovered = hover === p.key;
          return (
            <div key={p.key}
              onMouseEnter={() => setHover(p.key)}
              onMouseLeave={() => setHover(null)}
              style={{
                cursor: 'help', padding: '8px 10px', borderRadius: 6,
                background: isHovered ? p.color : 'var(--pearl)',
                color: isHovered ? '#fff' : 'var(--ink-2)',
                transition: 'all .12s', minWidth: 0,
                borderLeft: `3px solid ${p.color}`,
              }}>
              <div className="mono" style={{
                fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase',
                fontWeight: 700, color: isHovered ? '#fff' : p.color,
                marginBottom: 2, whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{p.label}</div>
              <div style={{
                fontSize: 11,
                color: isHovered ? 'rgba(255,255,255,0.85)' : 'var(--ink-3)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{p.sub}</div>
            </div>
          );
        })}
        <div style={{ gridColumn: '1 / -1', marginTop: 8, paddingTop: 10, borderTop: '1px dashed var(--hair)' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.55, minHeight: 34 }}>
            {hovered ? (
              <span>
                <span className="mono" style={{
                  color: hovered.color, fontWeight: 700, textTransform: 'uppercase',
                  fontSize: 10, letterSpacing: '.08em', marginRight: 8,
                }}>{hovered.label}</span>
                {hovered.detail}
              </span>
            ) : (
              <span style={{ color: 'var(--ink-3)', fontStyle: 'italic' }}>
                Hover any chunk above. A CID self-describes: it tells you how it was encoded, what kind of bytes it names, and which hash was used.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FileDropCID() {
  const [text, setText] = useState('hello, content-addressed world\n');
  const [cid, setCid] = useState('');
  const [computing, setComputing] = useState(false);
  const [fileName, setFileName] = useState('note.txt');
  const [size, setSize] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [pulseCid, setPulseCid] = useState(false);
  const liveRef = useRef(true);

  useEffect(() => {
    liveRef.current = true;
    setComputing(true);
    const bytes = new TextEncoder().encode(text);
    setSize(bytes.byteLength);
    const t = setTimeout(async () => {
      const c = await computeCid(bytes);
      if (!liveRef.current) return;
      setCid(c);
      setComputing(false);
      setPulseCid(true);
      setTimeout(() => setPulseCid(false), 450);
    }, 160);
    return () => {
      liveRef.current = false;
      clearTimeout(t);
    };
  }, [text]);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (!f) return;
    setFileName(f.name);
    const buf = await f.arrayBuffer();
    try {
      const t = new TextDecoder('utf-8', { fatal: false }).decode(buf);
      setText(t.slice(0, 4000));
    } catch {
      setText(`[binary · ${f.size} bytes]`);
    }
  };

  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 10, padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 600 }}>
          file → CID
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
          sha-256 · {size} bytes
        </div>
      </div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        style={{
          border: `1.5px dashed ${dragOver ? 'var(--turq)' : 'var(--stone)'}`,
          borderRadius: 8, padding: 12, marginBottom: 12,
          background: dragOver ? 'rgba(107,196,206,0.08)' : 'var(--pearl)',
          transition: 'all .15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M1 1h9l5 5v13H1z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10 1v5h5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="mono"
            style={{
              border: 'none', background: 'transparent', fontSize: 13,
              color: 'var(--ink)', outline: 'none', flex: 1, padding: 0,
            }}
          />
          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>↓ drop a file or edit</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mono"
          style={{
            width: '100%', border: '1px solid var(--hair)', borderRadius: 5,
            fontSize: 13, padding: 10, resize: 'vertical', background: '#fff',
            color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
            lineHeight: 1.5,
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--hair)' }} />
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
          {computing ? 'computing…' : 'anatomy of a CID'}
        </div>
        <div style={{ flex: 1, height: 1, background: 'var(--hair)' }} />
      </div>

      <CIDAnatomy cid={cid} pulse={pulseCid} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>
        <span>change one character…</span>
        <span>…the digest changes completely →</span>
      </div>
    </div>
  );
}
