"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Music, Loader2, CheckCircle2, 
  FileText, User, AlignLeft, Shield, Link2
} from "lucide-react";

interface KalamAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function KalamAddModal({ isOpen, onClose, onSuccess }: KalamAddModalProps) {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isMureedOnly, setIsMureedOnly] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setWriter('');
    setContent('');
    setMediaUrl('');
    setIsMureedOnly(false);
    setSuccess(false);
    setError(null);
  };

  const handleClose = () => {
    if (saving) return;
    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !writer.trim()) {
      setError('শিরোনাম, কন্টেন্ট ও লেখকের নাম দিন');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/kalams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          writer: writer.trim(),
          mediaUrl: mediaUrl.trim() || null,
          isMureedOnly,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'কালাম সেভ করতে ব্যর্থ');
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'সেভ করতে সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-lg sm:rounded-[2rem] rounded-t-[2rem] max-h-[92vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">কালাম যোগ করুন</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">নতুন কালাম/নাত ডাটাবেসে সংরক্ষণ হবে</p>
              </div>
              <button
                onClick={handleClose}
                disabled={saving}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">সফলভাবে যোগ হয়েছে!</h3>
                <p className="text-sm text-slate-500 mb-8">কালামটি এখন আর্কাইভে দেখা যাবে</p>
                <button
                  onClick={handleClose}
                  className="w-full h-14 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 transition-colors"
                >
                  বন্ধ করুন
                </button>
              </motion.div>
            ) : (
              <>
                {/* Title */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <Music className="w-3.5 h-3.5" /> শিরোনাম *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমন: মন ময়ূরপঙ্খী নিয়া"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Writer */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <User className="w-3.5 h-3.5" /> কবি / লেখক *
                  </label>
                  <input
                    type="text"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                    placeholder="যেমন: মাওলানা জালালুদ্দিন রুমি"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Content/Lyrics */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <AlignLeft className="w-3.5 h-3.5" /> কন্টেন্ট / লিরিক্স *
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="কালামের কথা / লিরিক্স লিখুন..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>

                {/* Audio URL */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <Link2 className="w-3.5 h-3.5" /> অডিও লিংক (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Mureed Only Toggle */}
                <button
                  onClick={() => setIsMureedOnly(!isMureedOnly)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    isMureedOnly
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <Shield className={`w-5 h-5 ${isMureedOnly ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div className="text-left flex-1">
                    <p className={`text-sm font-bold ${isMureedOnly ? 'text-amber-800' : 'text-slate-600'}`}>
                      মুরিদ এক্সেস
                    </p>
                    <p className="text-[10px] text-slate-400">শুধুমাত্র মুরিদরা শুনতে/পড়তে পারবে</p>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors ${isMureedOnly ? 'bg-amber-500' : 'bg-slate-300'}`}>
                    <motion.div
                      animate={{ x: isMureedOnly ? 20 : 2 }}
                      className="w-5 h-5 rounded-full bg-white shadow-sm mt-0.5"
                    />
                  </div>
                </button>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-50 rounded-xl border border-rose-200"
                  >
                    <p className="text-sm font-bold text-rose-700">{error}</p>
                  </motion.div>
                )}

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving || !title.trim() || !content.trim() || !writer.trim()}
                  className="w-full h-14 rounded-2xl bg-[#1A1A1A] text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {saving ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> সেভ হচ্ছে...</>
                  ) : (
                    <><FileText className="w-5 h-5" /> কালাম সেভ করুন</>
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
