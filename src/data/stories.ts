export interface UseCase {
  brand: string;
  hue: number;
  title: string;
  body: string;
  linkLabel: string;
  link: string;
  quote?: { who: string; role: string; text: string };
}

export interface UseCaseCategory {
  id: string;
  label: string;
  job: string;
  framing: string;
  cases: UseCase[];
}

export const categories: UseCaseCategory[] = [
  {
    id: 'social',
    label: 'Open social',
    job: 'Self-certifying data for the next wave of open networks.',
    framing: 'AT Protocol uses CIDs so anyone on the network can verify what they receive — no trusted server in the middle.',
    cases: [
      {
        brand: 'Stargate', hue: 270,
        title: 'A content-addressed backbone for atproto apps',
        body: 'Stargate gives atproto applications a verifiable, content-addressed layer for identity, posts, and assets — anchored to IPFS.',
        linkLabel: 'Visit Stargate', link: 'vereign.com/stargate',
      },
      {
        brand: 'GainForest', hue: 130,
        title: 'Rainforest data, posted to a public network',
        body: 'GainForest publishes on-the-ground forest monitoring through atproto so funders, scientists, and communities can audit outcomes themselves.',
        linkLabel: 'See GainForest', link: 'gainforest.app',
      },
      {
        brand: 'Anytype', hue: 255,
        title: 'Offline-native knowledge graphs',
        body: 'Anytype uses content addressing to let users build personal knowledge webs that sync peer to peer, with no server lock-in.',
        linkLabel: 'How they do it', link: 'doc.anytype.io',
      },
    ],
  },
  {
    id: 'publishing',
    label: 'Resilient web publishing',
    job: 'Sovereign, peer-to-peer publishing on Mainnet tooling.',
    framing: 'Publish once, reference forever. The site survives a host outage, a takedown, or a country-wide block.',
    cases: [
      {
        brand: 'Wikipedia', hue: 220,
        title: 'Restore a censored encyclopedia',
        body: 'When the government of Turkey blocked Wikipedia, a copy was posted to IPFS — restoring access for millions of readers.',
        linkLabel: 'Read the story', link: 'observer.com',
      },
      {
        brand: 'Snapshot', hue: 48,
        title: 'Permanent, public DAO records',
        body: 'Snapshot uses IPFS to publicly record every proposal, vote, and result for more than 9,000 web3 projects and DAOs.',
        linkLabel: 'Case study', link: 'docs.ipfs.tech',
      },
      {
        brand: 'ORCESTRA', hue: 35,
        title: 'Verifiable scientific datasets across institutions',
        body: 'The ORCESTRA atmospheric campaign uses IPFS to share verifiable, accessible datasets across research institutions worldwide.',
        linkLabel: 'Case study', link: 'docs.ipfs.tech',
        quote: {
          who: 'Tobias Kölling', role: 'Max Planck Institute for Meteorology',
          text: 'Our local data infrastructure was stuck in customs. We set up IPFS on notebooks and a Raspberry Pi, and suddenly all scientists could sync, share, and collaborate — with automatic uploads back to Hamburg whenever the connection returned.',
        },
      },
    ],
  },
  {
    id: 'iot',
    label: 'IoT data & streaming',
    job: 'Lightweight private swarms with iroh-blobs and embedded IPFS.',
    framing: 'Move bytes between sensors, satellites, factories, and games — with cryptographic guarantees and no central broker.',
    cases: [
      {
        brand: 'WeatherXM', hue: 200,
        title: 'Crowdsourced weather, verified at the edge',
        body: 'WeatherXM ships smart weather vanes with IPFS clients so thousands of stations can collaboratively share atmospheric data.',
        linkLabel: 'Watch presentation', link: 'youtube.com',
      },
      {
        brand: 'Lockheed', hue: 210,
        title: 'Store data out of this world',
        body: 'Lockheed Martin launched an IPFS node into orbit to demonstrate more efficient interplanetary communication.',
        linkLabel: 'Learn more', link: 'thedefiant.io',
      },
      {
        brand: 'Actyx', hue: 290,
        title: 'Mission-critical factory swarms',
        body: 'Actyx deploys private IPFS swarms to coordinate factory devices with no central infrastructure.',
        linkLabel: 'Read more', link: 'actyx.com',
        quote: {
          who: 'Roland Kuhn', role: 'Actyx',
          text: 'Using IPFS private swarms, we deployed a fleet of devices communicating mission-critical data in a factory without any central infrastructure — which has allowed us to move much faster.',
        },
      },
      {
        brand: '3S Studios', hue: 340,
        title: 'Fast game asset delivery for superfans',
        body: '3S Studios built an IPFS plugin for Unity that reduced game content from 2 GB to 40 MB, then streamed updates over the swarm.',
        linkLabel: 'Their story', link: 'blog.ipfs.tech',
      },
    ],
  },
  {
    id: 'media',
    label: 'Tamperproof media',
    job: 'Integrity for journalism, art, and field evidence.',
    framing: 'A CID is a fingerprint. Anchor a photograph, a dataset, or a research artifact — and prove later that nothing was altered.',
    cases: [
      {
        brand: 'Starling Lab', hue: 12,
        title: 'Authenticate human-rights evidence',
        body: 'Starling Lab anchors photos, videos, and documents to CIDs so journalists, archivists, and prosecutors can prove integrity over time.',
        linkLabel: 'See their work', link: 'starlinglab.org',
      },
      {
        brand: 'Nancy Baker Cahill', hue: 15,
        title: 'A permanent home for digital art',
        body: 'Nancy Baker Cahill stores all her full-resolution art assets on IPFS via NFT.storage — each work with its own CID.',
        linkLabel: 'Watch her presentation', link: 'youtu.be',
        quote: {
          who: 'Nancy Baker Cahill', role: 'Artist',
          text: 'It was such a relief to know I could store my videos in one place — each with its own IPFS URL and CID. Resilience is important to me, and having the work backed up means it’ll be around for a long time.',
        },
      },
      {
        brand: 'GainForest', hue: 130,
        title: 'Provable conservation outcomes',
        body: 'Field photos and sensor readings are hashed and pinned, so reforestation claims can be independently checked.',
        linkLabel: 'Visit GainForest', link: 'gainforest.app',
      },
    ],
  },
];
