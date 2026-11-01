/**
 * Bitmoji & Illustrated Student Avatars for CampusLoop
 */

// Curated seed mappings for verified campus students
const SEED_MAP = {
  'Ramsha Azra': {
    style: 'lorelei',
    seed: 'Ramsha',
    bg: 'eef0ff',
    hair: 'wavy01',
    hairColor: '2c1b18',
    accessories: 'glasses'
  },
  'Aarav Sharma': {
    style: 'adventurer',
    seed: 'Aarav',
    bg: 'e8f8f1',
    hair: 'short02'
  },
  'Sneha Patel': {
    style: 'lorelei',
    seed: 'Sneha',
    bg: 'fff9e6',
    hair: 'straight02'
  },
  'Rohan Verma': {
    style: 'adventurer',
    seed: 'Rohan',
    bg: 'eef0ff',
    hair: 'short01'
  },
  'Ananya Roy': {
    style: 'lorelei',
    seed: 'Ananya',
    bg: 'fce7f3',
    hair: 'curly01'
  },
  'Vikram Nair': {
    style: 'adventurer',
    seed: 'Vikram',
    bg: 'e0f2fe',
    hair: 'short03'
  },
  'Priya Singh': {
    style: 'lorelei',
    seed: 'Priya',
    bg: 'fef3c7',
    hair: 'wavy02'
  }
};

export const getStudentBitmoji = (name = 'Student', seed = '') => {
  const cleanName = name.trim();
  const config = SEED_MAP[cleanName] || {
    style: 'lorelei',
    seed: seed || cleanName || 'Student',
    bg: 'eef0ff'
  };

  const avatarSeed = encodeURIComponent(config.seed || cleanName);
  const bg = config.bg || 'eef0ff';
  
  // High quality SVG Bitmoji endpoint
  return `https://api.dicebear.com/7.x/${config.style}/svg?seed=${avatarSeed}&backgroundColor=${bg}&radius=50`;
};

// Fallback stylized inline SVG Bitmoji (renders instantly even with no network)
export const getFallbackBitmojiSvg = (seed = 'student') => {
  const isFemale = seed.toLowerCase().includes('ramsha') || 
                   seed.toLowerCase().includes('sneha') || 
                   seed.toLowerCase().includes('ananya') || 
                   seed.toLowerCase().includes('priya');

  if (isFemale) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="%23EEF0FF"/>
      <path d="M22 45 C22 25 35 15 50 15 C65 15 78 25 78 45 C78 60 76 72 74 80 C68 85 32 85 26 80 C24 72 22 60 22 45 Z" fill="%234A3E3D"/>
      <ellipse cx="50" cy="54" rx="22" ry="24" fill="%23FFDFBD"/>
      <circle cx="42" cy="52" r="3.5" fill="%232D3748"/>
      <circle cx="58" cy="52" r="3.5" fill="%232D3748"/>
      <circle cx="43.5" cy="50.5" r="1.2" fill="white"/>
      <circle cx="59.5" cy="50.5" r="1.2" fill="white"/>
      <path d="M44 64 Q50 69 56 64" stroke="%23E53E3E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="36" cy="59" r="4" fill="%23FEB2B2" opacity="0.6"/>
      <circle cx="64" cy="59" r="4" fill="%23FEB2B2" opacity="0.6"/>
      <path d="M30 35 C38 25 62 25 70 35 C65 28 35 28 30 35 Z" fill="%23635BFF"/>
      <rect x="36" y="47" width="12" height="10" rx="3" fill="none" stroke="%23635BFF" stroke-width="2"/>
      <rect x="52" y="47" width="12" height="10" rx="3" fill="none" stroke="%23635BFF" stroke-width="2"/>
      <line x1="48" y1="52" x2="52" y2="52" stroke="%23635BFF" stroke-width="2"/>
    </svg>`;
  }

  // Male / generic Bitmoji
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="%23E8F8F1"/>
    <path d="M26 40 C26 22 36 16 50 16 C64 16 74 22 74 40 C74 42 74 45 73 48 C70 34 30 34 27 48 Z" fill="%232D3748"/>
    <ellipse cx="50" cy="55" rx="23" ry="24" fill="%23F6D8B8"/>
    <circle cx="41" cy="53" r="3.5" fill="%231A202C"/>
    <circle cx="59" cy="53" r="3.5" fill="%231A202C"/>
    <circle cx="42.5" cy="51.5" r="1.2" fill="white"/>
    <circle cx="60.5" cy="51.5" r="1.2" fill="white"/>
    <path d="M44 65 Q50 71 56 65" stroke="%23C53030" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M35 46 Q42 43 47 45" stroke="%232D3748" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M53 45 Q58 43 65 46" stroke="%232D3748" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M32 92 C32 80 40 76 50 76 C60 76 68 80 68 92 Z" fill="%23635BFF"/>
  </svg>`;
};
