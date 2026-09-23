// VanaVeda by Arohi - SVG Botanical Leaf Illustration Badges
// Elegant, handcrafted botanical leaf vector artwork with biological vein tracings

import React from 'react';

interface LeafIconProps {
  leafId: string;
  className?: string;
  size?: number;
}

export const BotanicalLeafSvg: React.FC<LeafIconProps> = ({ leafId, className = 'w-6 h-6', size }) => {
  const dimensionProps = size ? { width: size, height: size } : {};

  switch (leafId) {
    case 'tulsi':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Stem */}
          <path d="M32 60C32 48 31 32 32 10" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Main Leaf Body with serrated holy basil outline */}
          <path d="M32 12C20 18 16 30 20 44C24 48 30 50 32 50C34 50 40 48 44 44C48 30 44 18 32 12Z" fill="#15803D" fillOpacity="0.2" stroke="#15803D" strokeWidth="2" strokeLinejoin="round" />
          {/* Secondary smaller leaflets */}
          <path d="M32 30C24 24 14 26 12 34C18 38 28 34 32 30Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M32 32C40 26 50 28 52 36C46 40 36 36 32 32Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          {/* Veins */}
          <path d="M32 24L24 32M32 34L22 42M32 24L40 32M32 34L42 42" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
          {/* Sacred Blossom Spire Manjari */}
          <circle cx="32" cy="7" r="2.5" fill="#D97706" />
          <circle cx="30" cy="11" r="1.8" fill="#D97706" />
          <circle cx="34" cy="11" r="1.8" fill="#D97706" />
        </svg>
      );

    case 'neem':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Curved compound stem */}
          <path d="M12 56C24 46 36 32 52 12" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
          {/* Serrated falcate (sickle-shaped) neem leaflets */}
          <path d="M26 44C18 42 16 34 22 28C28 34 30 40 26 44Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M32 38C40 40 46 36 44 28C38 30 34 34 32 38Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M38 30C32 28 30 20 36 16C40 20 42 26 38 30Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M44 24C52 26 56 20 52 14C46 16 44 20 44 24Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M52 12C50 6 56 8 58 10C56 14 54 14 52 12Z" fill="#166534" stroke="#166534" strokeWidth="1.5" />
        </svg>
      );

    case 'peepal':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Broad cordate base tapering into slender tail (drip tip) */}
          <path d="M32 60C32 54 32 48 32 44" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 44C16 44 8 28 16 18C24 8 31 8 32 4C33 8 40 8 48 18C56 28 48 44 32 44Z" fill="#B45309" fillOpacity="0.18" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
          {/* Prominent tail tip */}
          <path d="M32 4C32 2 31.5 1 32 0" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          {/* Beautiful network of reticulate venation */}
          <path d="M32 44V8" stroke="#B45309" strokeWidth="1.8" />
          <path d="M32 34C24 32 18 28 14 22M32 34C40 32 46 28 50 22" stroke="#B45309" strokeWidth="1.3" />
          <path d="M32 24C26 22 22 18 18 14M32 24C38 22 42 18 46 14" stroke="#B45309" strokeWidth="1.3" />
        </svg>
      );

    case 'bilva':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Sacred Trifoliate Leaf (Brahma, Vishnu, Shiva / Trishula) */}
          <path d="M32 58V40" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          {/* Central leaflet */}
          <path d="M32 40C24 34 22 20 32 6C42 20 40 34 32 40Z" fill="#D97706" fillOpacity="0.22" stroke="#D97706" strokeWidth="2" />
          {/* Left leaflet */}
          <path d="M30 40C20 44 8 36 10 24C16 20 26 28 30 40Z" fill="#D97706" fillOpacity="0.22" stroke="#D97706" strokeWidth="1.8" />
          {/* Right leaflet */}
          <path d="M34 40C44 44 56 36 54 24C48 20 38 28 34 40Z" fill="#D97706" fillOpacity="0.22" stroke="#D97706" strokeWidth="1.8" />
          {/* Central leaf midrib */}
          <path d="M32 40V12" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      );

    case 'parijat':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Broad ovate rough leaf paired with divine orange-tubed star flower */}
          <path d="M24 58C24 48 24 38 26 30" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          {/* Leaf */}
          <path d="M26 34C14 36 10 24 16 12C26 6 36 14 34 28C32 34 28 34 26 34Z" fill="#78350F" fillOpacity="0.18" stroke="#78350F" strokeWidth="2" />
          {/* Celestial flower with orange center tube */}
          <path d="M46 44L44 32" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="44" cy="30" r="3" fill="#D97706" />
          {/* White pristine star petals */}
          <circle cx="44" cy="22" r="3.5" fill="#FAF7F2" stroke="#D97706" strokeWidth="1" />
          <circle cx="51" cy="26" r="3.5" fill="#FAF7F2" stroke="#D97706" strokeWidth="1" />
          <circle cx="49" cy="35" r="3.5" fill="#FAF7F2" stroke="#D97706" strokeWidth="1" />
          <circle cx="39" cy="35" r="3.5" fill="#FAF7F2" stroke="#D97706" strokeWidth="1" />
          <circle cx="37" cy="26" r="3.5" fill="#FAF7F2" stroke="#D97706" strokeWidth="1" />
        </svg>
      );

    case 'moringa':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Multi-pinnate spray of small oval leaflets */}
          <path d="M32 58C32 40 32 20 32 8" stroke="#15803D" strokeWidth="2" />
          <path d="M32 44C20 40 16 34 20 30M32 44C44 40 48 34 44 30" stroke="#15803D" strokeWidth="1.5" />
          <path d="M32 30C22 26 18 20 22 16M32 30C42 26 46 20 42 16" stroke="#15803D" strokeWidth="1.5" />
          {/* Round tender leaflets */}
          <circle cx="32" cy="8" r="4.5" fill="#15803D" fillOpacity="0.3" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="20" cy="30" r="4" fill="#15803D" fillOpacity="0.3" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="44" cy="30" r="4" fill="#15803D" fillOpacity="0.3" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="22" cy="16" r="3.8" fill="#15803D" fillOpacity="0.3" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="42" cy="16" r="3.8" fill="#15803D" fillOpacity="0.3" stroke="#15803D" strokeWidth="1.5" />
        </svg>
      );

    case 'arjuna':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Oblong thick coriaceous leaf with heart-protective symbol */}
          <path d="M32 58V48" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 48C18 48 16 34 18 20C20 10 28 6 32 6C36 6 44 10 46 20C48 34 46 48 32 48Z" fill="#991B1B" fillOpacity="0.18" stroke="#991B1B" strokeWidth="2" />
          <path d="M32 48V8" stroke="#991B1B" strokeWidth="1.8" />
          {/* Sub-opposite lateral veins */}
          <path d="M32 40L22 36M32 32L20 28M32 24L22 20M32 40L42 36M32 32L44 28M32 24L42 20" stroke="#991B1B" strokeWidth="1.3" />
        </svg>
      );

    case 'curry_leaf':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Pinnate stalk with fragrant asymmetrically ovate leaflets */}
          <path d="M16 56C26 44 38 28 48 12" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 42C20 40 18 32 22 28C26 32 30 36 28 42Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M32 36C40 38 44 34 42 28C36 30 34 32 32 36Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M38 28C32 26 30 20 34 16C38 20 40 24 38 28Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
          <path d="M42 22C48 24 52 20 48 14C44 16 42 18 42 22Z" fill="#166534" fillOpacity="0.25" stroke="#166534" strokeWidth="1.5" />
        </svg>
      );

    case 'jamun':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Glossy elliptic-oblong leaf paired with deep purple berry */}
          <path d="M24 58V44" stroke="#581C87" strokeWidth="2" />
          <path d="M24 44C12 40 10 24 16 12C24 6 32 10 34 22C36 34 30 44 24 44Z" fill="#581C87" fillOpacity="0.18" stroke="#581C87" strokeWidth="2" />
          <path d="M24 44V10" stroke="#581C87" strokeWidth="1.5" />
          {/* Jamun fruit droplet */}
          <path d="M46 52C42 52 38 48 38 42C38 36 44 30 46 28C48 30 54 36 54 42C54 48 50 52 46 52Z" fill="#581C87" stroke="#3B0764" strokeWidth="1.5" />
        </svg>
      );

    case 'brahmi':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...dimensionProps}>
          {/* Succulent, spoon-shaped, opposite leaves with tiny white-blue flower */}
          <path d="M32 58C32 44 32 30 32 14" stroke="#047857" strokeWidth="2" />
          {/* Left spatulate leaf */}
          <path d="M32 38C20 38 14 30 18 22C24 18 30 26 32 38Z" fill="#047857" fillOpacity="0.25" stroke="#047857" strokeWidth="1.8" />
          {/* Right spatulate leaf */}
          <path d="M32 38C44 38 50 30 46 22C40 18 34 26 32 38Z" fill="#047857" fillOpacity="0.25" stroke="#047857" strokeWidth="1.8" />
          {/* Apical baby leaves */}
          <path d="M32 20C24 16 26 8 32 8C38 8 40 16 32 20Z" fill="#047857" fillOpacity="0.3" stroke="#047857" strokeWidth="1.5" />
          {/* Small 5-petaled Medhya blossom */}
          <circle cx="32" cy="8" r="2" fill="#D4AF37" />
        </svg>
      );
  }
};
