'use client';

import { BinType } from '@/types/bin';

interface BinIllustrationProps {
  type: BinType;
  size?: number;
  fillLevel?: 'empty' | 'half' | 'full';
}

function CantDoBin({ size, fillLevel }: { size: number; fillLevel: string }) {
  const fillY = fillLevel === 'empty' ? 95 : fillLevel === 'half' ? 55 : 25;

  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bin body - woven basket style */}
      <path
        d="M15 35 L25 130 C25 135 30 138 35 138 L85 138 C90 138 95 135 95 130 L105 35"
        fill="#d4a574"
        stroke="#8B6914"
        strokeWidth="2.5"
      />
      {/* Weave pattern */}
      <path d="M20 50 L100 50" stroke="#c49a6c" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M22 65 L98 65" stroke="#c49a6c" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M23 80 L97 80" stroke="#c49a6c" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M24 95 L96 95" stroke="#c49a6c" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M25 110 L95 110" stroke="#c49a6c" strokeWidth="1.5" strokeDasharray="8 4" />
      {/* Vertical weave */}
      <path d="M40 35 L37 138" stroke="#c49a6c" strokeWidth="1" />
      <path d="M60 35 L60 138" stroke="#c49a6c" strokeWidth="1" />
      <path d="M80 35 L83 138" stroke="#c49a6c" strokeWidth="1" />
      {/* Rim */}
      <ellipse cx="60" cy="35" rx="47" ry="10" fill="#e8c89e" stroke="#8B6914" strokeWidth="2.5" />
      {/* Fill level - red tinted papers */}
      <clipPath id="bin-cant-clip">
        <path d="M17 36 L26 129 C26 134 31 137 36 137 L84 137 C89 137 94 134 94 129 L103 36 Z" />
      </clipPath>
      <g clipPath="url(#bin-cant-clip)">
        <rect x="15" y={fillY} width="90" height={140 - fillY} fill="#e74c3c" opacity="0.25" />
        {/* Crumpled paper balls */}
        {fillLevel !== 'empty' && (
          <>
            <circle cx="45" cy={fillY + 15} r="8" fill="#fdecea" stroke="#e74c3c" strokeWidth="1" opacity="0.8" />
            <circle cx="70" cy={fillY + 12} r="7" fill="#fff" stroke="#e74c3c" strokeWidth="1" opacity="0.7" />
            <circle cx="55" cy={fillY + 5} r="6" fill="#fdecea" stroke="#e74c3c" strokeWidth="1" opacity="0.9" />
          </>
        )}
        {fillLevel === 'full' && (
          <>
            <circle cx="38" cy={fillY + 28} r="7" fill="#fff" stroke="#e74c3c" strokeWidth="1" opacity="0.7" />
            <circle cx="75" cy={fillY + 25} r="8" fill="#fdecea" stroke="#e74c3c" strokeWidth="1" opacity="0.8" />
            <circle cx="58" cy={fillY + 20} r="9" fill="#fff" stroke="#e74c3c" strokeWidth="1" opacity="0.6" />
          </>
        )}
      </g>
      {/* Lock icon on front */}
      <g transform="translate(48, 85)">
        <rect x="0" y="10" width="24" height="18" rx="3" fill="#e74c3c" opacity="0.6" />
        <path d="M5 10 V6 C5 1 7 -2 12 -2 C17 -2 19 1 19 6 V10" stroke="#e74c3c" strokeWidth="2.5" fill="none" opacity="0.6" />
        <circle cx="12" cy="19" r="2.5" fill="#fff" opacity="0.8" />
      </g>
    </svg>
  );
}

function NeedHelpBin({ size, fillLevel }: { size: number; fillLevel: string }) {
  const fillY = fillLevel === 'empty' ? 95 : fillLevel === 'half' ? 55 : 25;

  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bin body - cardboard box style */}
      <path
        d="M18 38 L23 128 C23 133 28 138 33 138 L87 138 C92 138 97 133 97 128 L102 38"
        fill="#f5d6a8"
        stroke="#d4922a"
        strokeWidth="2.5"
      />
      {/* Cardboard texture lines */}
      <path d="M22 55 L98 55" stroke="#e8c078" strokeWidth="1.5" />
      <path d="M23 75 L97 75" stroke="#e8c078" strokeWidth="1.5" />
      <path d="M24 95 L96 95" stroke="#e8c078" strokeWidth="1.5" />
      <path d="M25 115 L95 115" stroke="#e8c078" strokeWidth="1.5" />
      {/* Rim with flaps */}
      <path d="M10 38 L18 20 L55 28 L60 38" fill="#f0ca8e" stroke="#d4922a" strokeWidth="2" />
      <path d="M60 38 L65 28 L102 20 L110 38" fill="#e8bf7e" stroke="#d4922a" strokeWidth="2" />
      <ellipse cx="60" cy="38" rx="50" ry="8" fill="#f5d6a8" stroke="#d4922a" strokeWidth="2.5" />
      {/* Fill level */}
      <clipPath id="bin-help-clip">
        <path d="M20 39 L24 127 C24 132 29 137 34 137 L86 137 C91 137 96 132 96 127 L100 39 Z" />
      </clipPath>
      <g clipPath="url(#bin-help-clip)">
        <rect x="18" y={fillY} width="90" height={140 - fillY} fill="#f39c12" opacity="0.2" />
        {fillLevel !== 'empty' && (
          <>
            <circle cx="42" cy={fillY + 14} r="8" fill="#fef9e7" stroke="#f39c12" strokeWidth="1" opacity="0.8" />
            <circle cx="68" cy={fillY + 11} r="7" fill="#fff" stroke="#f39c12" strokeWidth="1" opacity="0.7" />
            <circle cx="55" cy={fillY + 5} r="6" fill="#fef9e7" stroke="#f39c12" strokeWidth="1" opacity="0.9" />
          </>
        )}
        {fillLevel === 'full' && (
          <>
            <circle cx="40" cy={fillY + 27} r="7" fill="#fff" stroke="#f39c12" strokeWidth="1" opacity="0.7" />
            <circle cx="72" cy={fillY + 24} r="8" fill="#fef9e7" stroke="#f39c12" strokeWidth="1" opacity="0.8" />
            <circle cx="56" cy={fillY + 19} r="9" fill="#fff" stroke="#f39c12" strokeWidth="1" opacity="0.6" />
          </>
        )}
      </g>
      {/* Handshake icon */}
      <g transform="translate(38, 82)" opacity="0.5">
        <path d="M0 15 L10 5 L20 10 L30 5 L44 15" stroke="#d4922a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M5 18 L15 10 L25 15 L35 10 L40 18" stroke="#d4922a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function CanChangeBin({ size, fillLevel }: { size: number; fillLevel: string }) {
  const fillY = fillLevel === 'empty' ? 95 : fillLevel === 'half' ? 55 : 25;

  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bin body - toolbox/bright style */}
      <path
        d="M15 35 L22 128 C22 133 27 138 32 138 L88 138 C93 138 98 133 98 128 L105 35"
        fill="#a8e6cf"
        stroke="#1e8449"
        strokeWidth="2.5"
      />
      {/* Decorative stripes */}
      <path d="M19 52 L101 52" stroke="#82d4aa" strokeWidth="2" />
      <path d="M21 70 L99 70" stroke="#82d4aa" strokeWidth="2" />
      <path d="M22 88 L98 88" stroke="#82d4aa" strokeWidth="2" />
      <path d="M23 106 L97 106" stroke="#82d4aa" strokeWidth="2" />
      <path d="M24 124 L96 124" stroke="#82d4aa" strokeWidth="2" />
      {/* Rim */}
      <ellipse cx="60" cy="35" rx="48" ry="10" fill="#b8f0d8" stroke="#1e8449" strokeWidth="2.5" />
      {/* Fill level */}
      <clipPath id="bin-change-clip">
        <path d="M17 36 L23 127 C23 132 28 137 33 137 L87 137 C92 137 97 132 97 127 L103 36 Z" />
      </clipPath>
      <g clipPath="url(#bin-change-clip)">
        <rect x="15" y={fillY} width="90" height={140 - fillY} fill="#27ae60" opacity="0.2" />
        {fillLevel !== 'empty' && (
          <>
            <circle cx="44" cy={fillY + 14} r="8" fill="#eafaf1" stroke="#27ae60" strokeWidth="1" opacity="0.8" />
            <circle cx="70" cy={fillY + 11} r="7" fill="#fff" stroke="#27ae60" strokeWidth="1" opacity="0.7" />
            <circle cx="56" cy={fillY + 5} r="6" fill="#eafaf1" stroke="#27ae60" strokeWidth="1" opacity="0.9" />
          </>
        )}
        {fillLevel === 'full' && (
          <>
            <circle cx="38" cy={fillY + 27} r="7" fill="#fff" stroke="#27ae60" strokeWidth="1" opacity="0.7" />
            <circle cx="74" cy={fillY + 24} r="8" fill="#eafaf1" stroke="#27ae60" strokeWidth="1" opacity="0.8" />
            <circle cx="56" cy={fillY + 19} r="9" fill="#fff" stroke="#27ae60" strokeWidth="1" opacity="0.6" />
          </>
        )}
      </g>
      {/* Star/sparkle icon */}
      <g transform="translate(47, 78)" opacity="0.5">
        <path d="M13 0 L16 9 L26 9 L18 15 L21 24 L13 18 L5 24 L8 15 L0 9 L10 9 Z" fill="#1e8449" />
      </g>
    </svg>
  );
}

export default function BinIllustration({ type, size = 90, fillLevel = 'empty' }: BinIllustrationProps) {
  switch (type) {
    case 'cant_do':
      return <CantDoBin size={size} fillLevel={fillLevel} />;
    case 'need_help':
      return <NeedHelpBin size={size} fillLevel={fillLevel} />;
    case 'can_change':
      return <CanChangeBin size={size} fillLevel={fillLevel} />;
  }
}
