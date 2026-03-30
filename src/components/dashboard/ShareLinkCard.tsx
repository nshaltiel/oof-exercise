'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface ShareLinkCardProps {
  shortCode: string;
}

export default function ShareLinkCard({ shortCode }: ShareLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== 'undefined' ? `${window.location.origin}/s/${shortCode}` : `/s/${shortCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `היי! 👋\nאנחנו עושים תרגיל אוף - בואו תכתבו מה גורם לכם להגיד "אוף" 😤\n\nהיכנסו לקישור:\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-4">שתפ/י את הקישור עם הצוות</h3>

      <div className="flex flex-col items-center gap-4">
        <QRCodeCanvas value={link} size={160} level="M" />

        <div className="w-full flex gap-2">
          <input
            readOnly
            value={link}
            dir="ltr"
            className="flex-1 text-sm bg-gray-100 rounded-lg px-3 py-2 text-left"
          />
          <button
            onClick={handleCopy}
            className="bg-[#6c5ce7] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5b4bd5] transition-colors"
          >
            {copied ? '✓ הועתק!' : 'העתק'}
          </button>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#1da851] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.595-.804-6.356-2.157l-.363-.282-3.26 1.093 1.093-3.26-.282-.363A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          שתף בוואטסאפ
        </button>
      </div>
    </div>
  );
}
