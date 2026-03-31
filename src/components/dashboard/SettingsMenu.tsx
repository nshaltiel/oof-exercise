'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';

interface SettingsMenuProps {
  shareLink: string;
  onDeleteNote?: (noteId: string) => void;
  onDeleteAll: () => Promise<void>;
}

export default function SettingsMenu({ shareLink, onDeleteAll }: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `היי! 👋\nאנחנו עושים תרגיל אוף - בואו תכתבו מה גורם לכם להגיד "אוף" 😤\n\nהיכנסו לקישור:\n${shareLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDeleteAll = async () => {
    if (deleteText === 'מחק הכל') {
      await onDeleteAll();
      setShowDeleteConfirm(false);
      setDeleteText('');
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity text-gray-600"
        title="שיתוף קישור לתרגיל"
      >
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#6c5ce7] text-white shadow-md hover:bg-[#5b4bd5] transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </div>
        <span className="text-xs text-gray-500 text-center leading-tight max-w-[80px]">לשיתוף הקישור לתרגיל עם הצוות</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute left-0 top-16 z-50 bg-white rounded-2xl shadow-xl border p-5 w-80"
            >
              <h3 className="font-bold text-lg mb-4">הגדרות</h3>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <QRCodeCanvas value={shareLink} size={140} level="M" />
              </div>

              {/* Share Link */}
              <div className="mb-4">
                <label className="text-sm text-gray-500 mb-1 block">קישור לשיתוף</label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={shareLink}
                    className="flex-1 text-sm bg-gray-100 rounded-lg px-3 py-2 text-left direction-ltr"
                    dir="ltr"
                  />
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-[#6c5ce7] text-white px-3 py-2 rounded-lg hover:bg-[#5b4bd5] transition-colors"
                  >
                    {copied ? '✓' : 'העתק'}
                  </button>
                </div>
              </div>

              {/* WhatsApp Share */}
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg mb-4 hover:bg-[#1da851] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.595-.804-6.356-2.157l-.363-.282-3.26 1.093 1.093-3.26-.282-.363A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                שתף בוואטסאפ
              </button>

              <hr className="mb-3" />

              {/* Delete All */}
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full text-sm text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors"
                >
                  🗑️ מחק את כל הפתקים
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-red-600">הקלד/י &quot;מחק הכל&quot; לאישור:</p>
                  <input
                    value={deleteText}
                    onChange={(e) => setDeleteText(e.target.value)}
                    className="w-full text-sm border border-red-300 rounded-lg px-3 py-2"
                    placeholder='הקלד/י "מחק הכל"'
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAll}
                      disabled={deleteText !== 'מחק הכל'}
                      className="flex-1 text-sm bg-red-500 text-white py-2 rounded-lg disabled:opacity-50"
                    >
                      מחק
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteText('');
                      }}
                      className="flex-1 text-sm bg-gray-200 py-2 rounded-lg"
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
