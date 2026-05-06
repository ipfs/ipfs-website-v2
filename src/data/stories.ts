export interface StoryCard {
  brand: string;
  hue: number;
  title: string;
  body: string;
  linkLabel: string;
  link: string;
}

export const stories: StoryCard[] = [
  { brand: 'Anytype', hue: 255, title: 'Develop offline-native productivity tools',
    body: 'Anytype uses content addressing on IPFS to empower users to build personal knowledge webs that can be shared with others.',
    linkLabel: 'Read how they do it', link: 'doc.anytype.io' },
  { brand: 'Wikipedia', hue: 220, title: 'Make archives censorship-resistant',
    body: 'When the government of Turkey blocked access to Wikipedia, a copy of the site was posted to IPFS, restoring visibility to millions of people.',
    linkLabel: 'Read the story', link: 'observer.com' },
  { brand: '3S Studios', hue: 340, title: 'Speed up gameplay for your superfans',
    body: '3S Studios built an IPFS plugin for Unity that reduced the content size of a game from 2 GB to 40 MB.',
    linkLabel: 'Read their story', link: 'blog.ipfs.tech' },
  { brand: 'Nancy Baker Cahill', hue: 15, title: 'Guarantee a permanent home for your digital art',
    body: 'Digital artist Nancy Baker Cahill stores all of her full-resolution art assets using IPFS through NFT.storage.',
    linkLabel: 'Watch her presentation', link: 'youtu.be' },
  { brand: 'WeatherXM', hue: 200, title: 'Publish scientific research that invites global collaboration',
    body: 'WeatherXM configured thousands of smart weather vanes with IPFS client functionality to collaboratively share weather patterns from around the world.',
    linkLabel: 'Watch the presentation', link: 'youtube.com' },
  { brand: 'ORCESTRA', hue: 35, title: 'Share verifiable scientific datasets across institutions',
    body: 'The ORCESTRA campaign uses IPFS to advance open scientific research by sharing verifiable, accessible datasets across institutions worldwide.',
    linkLabel: 'Read the case study', link: 'docs.ipfs.tech' },
  { brand: 'Snapshot', hue: 48, title: 'Enable data transparency in Web3',
    body: 'Snapshot uses IPFS to publicly record all proposals, votes, and data for more than 9,000 web3 projects and DAOs.',
    linkLabel: 'Read the case study', link: 'docs.ipfs.tech' },
  { brand: 'Lockheed', hue: 210, title: 'Literally store your data out of this world',
    body: 'Lockheed Martin launched an IPFS node into orbit to demonstrate more efficient interplanetary communication.',
    linkLabel: 'Learn more', link: 'thedefiant.io' },
];

export interface Testimonial {
  who: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  { who: 'Tobias Kölling', role: 'Max Planck Institute for Meteorology',
    quote: 'During our 2024 ORCESTRA campaign, our planned local data infrastructure was stuck in customs. We set up IPFS on our notebooks and a Raspberry Pi, and suddenly all scientists could sync, share data, and collaborate on a local network — with automatic uploads back to Hamburg during intermittent internet connectivity.' },
  { who: 'Mauve Signweaver', role: 'Founder · Agregore',
    quote: 'IPFS gives us a set of flexible building blocks for connecting devices and exchanging data. The plethora of documentation and community members contributes toward our goal of making peer-to-peer web apps easy to use.' },
  { who: 'Gabo H Beaumont', role: 'Co-Founder · Seed Hypermedia',
    quote: "It's crucially important to have a distributed file system in our open hypertext system. IPFS is the missing piece that allows for a truly decentralized and open web." },
  { who: 'Wes Floyd', role: 'Bacalhau',
    quote: "As people learn about IPFS, they also get a view of it as a component in a broader ecosystem. It's not an island. It's an onramp to broader decentralization." },
  { who: 'Nancy Baker Cahill', role: 'Artist',
    quote: 'I use NFT.storage for my digital art. It was such a relief to know I could store my videos in one place — each with its own IPFS URL and CID. Resilience is important to me, and having the work backed up to Filecoin means it’ll be around for a long time.' },
  { who: 'Joel Thorstensson', role: 'Co-founder · 3Box Labs',
    quote: 'At 3Box Labs, IPFS is our storage layer. If you want to build fully decentralized applications, you need data integrity — and IPFS guarantees it by providing a framework for merkelized data.' },
  { who: 'Boris Mann', role: 'Co-founder · Fission',
    quote: 'IPFS and content addressing give us the opportunity to work toward every human being able to put data online effectively for free, and effectively forever.' },
  { who: 'Thibault Meunier', role: 'Research Engineer · Cloudflare',
    quote: 'At Cloudflare, we make content available to every user of the Internet. By removing lock-in to any single data storage provider, IPFS really allows our customers to choose a storage provider they are comfortable with.' },
  { who: 'Roland Kuhn', role: 'Actyx',
    quote: 'Using IPFS private swarms, we deployed a fleet of devices communicating mission-critical data in a factory without any central infrastructure — which has allowed us to move much faster.' },
];
