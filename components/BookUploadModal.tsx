"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Upload, FileText, Loader2, CheckCircle2, 
  BookOpen, User, AlignLeft, Shield, Palette
} from "lucide-react";

interface BookUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const COVER_COLORS = [
  '#EA580C', '#DC2626', '#7C3AED', '#2563EB',
  '#059669', '#CA8A04', '#BE185D', '#1E293B',
];

export default function BookUploadModal({ isOpen, onClose, onSuccess }: BookUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isMureedOnly, setIsMureedOnly] = useState(false);
  const [coverColor, setCoverColor] = useState('#EA580C');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setAuthor('');
    setDescription('');
    setIsMureedOnly(false);
    setCoverColor('#EA580C');
    setUploadProgress(0);
    setSuccess(false);
    setError(null);
  };

  const handleClose = () => {
    if (uploading) return;
    resetForm();
    onClose();
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      if (!title) {
        setTitle(droppedFile.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '));
      }
    } else {
      setError('শুধুমাত্র PDF ফাইল আপলোড করা যাবে');
    }
  }, [title]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleUpload = async () => {
    if (!file || !title.trim() || !author.trim()) {
      setError('ফাইল, নাম ও লেখকের নাম দিন');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    // Simulate progress for UX (actual upload is a single fetch)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) { clearInterval(progressInterval); return 90; }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('author', author.trim());
      formData.append('description', description.trim());
      formData.append('isMureedOnly', String(isMureedOnly));
      formData.append('coverColor', coverColor);

      const res = await fetch('/api/books/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'আপলোড ব্যর্থ হয়েছে');
      }

      setUploadProgress(100);
      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || 'আপলোডে সমস্যা হয়েছে');
      setUploadProgress(0);
    } finally {
      setUploading(false);
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
                <h2 className="text-xl font-bold text-slate-900">বই আপলোড</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">ক্লাউডফ্লেয়ার R2 তে সংরক্ষণ হবে</p>
              </div>
              <button
                onClick={handleClose}
                disabled={uploading}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {success ? (
              /* ─── Success State ─── */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">সফলভাবে আপলোড হয়েছে!</h3>
                <p className="text-sm text-slate-500 mb-8">বইটি এখন লাইব্রেরিতে দেখা যাবে</p>
                <button
                  onClick={handleClose}
                  className="w-full h-14 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 transition-colors"
                >
                  বন্ধ করুন
                </button>
              </motion.div>
            ) : (
              <>
                {/* ─── Drop Zone ─── */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-orange-500 bg-orange-50'
                      : file
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : 'border-slate-200 bg-slate-50/50 hover:border-orange-300 hover:bg-orange-50/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {file ? (
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                        <FileText className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="font-bold text-slate-800 truncate text-sm">{file.name}</p>
                        <p className="text-xs text-emerald-600 font-medium">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-orange-500" />
                      </div>
                      <p className="font-bold text-slate-700 text-sm mb-1">PDF ফাইল টেনে আনুন বা ক্লিক করুন</p>
                      <p className="text-xs text-slate-400">কোনো সাইজ লিমিট নেই</p>
                    </>
                  )}
                </div>

                {/* ─── Form Fields ─── */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <BookOpen className="w-3.5 h-3.5" /> বইয়ের নাম *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="যেমন: ফুয়াদুল ফুয়াদ"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <User className="w-3.5 h-3.5" /> লেখক *
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="যেমন: আমীর হাসান সিজ্জী"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <AlignLeft className="w-3.5 h-3.5" /> বর্ণনা
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="বইয়ের সংক্ষিপ্ত বর্ণনা লিখুন..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                    />
                  </div>

                  {/* Cover Color */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <Palette className="w-3.5 h-3.5" /> কভারের রঙ
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {COVER_COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => setCoverColor(color)}
                          className={`w-9 h-9 rounded-xl transition-all ${
                            coverColor === color ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
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
                      <p className="text-[10px] text-slate-400">শুধুমাত্র মুরিদরা পড়তে পারবে</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors ${isMureedOnly ? 'bg-amber-500' : 'bg-slate-300'}`}>
                      <motion.div
                        animate={{ x: isMureedOnly ? 20 : 2 }}
                        className="w-5 h-5 rounded-full bg-white shadow-sm mt-0.5"
                      />
                    </div>
                  </button>
                </div>

                {/* ─── Error ─── */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-50 rounded-xl border border-rose-200"
                  >
                    <p className="text-sm font-bold text-rose-700">{error}</p>
                  </motion.div>
                )}

                {/* ─── Progress Bar ─── */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>আপলোড হচ্ছে...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                {/* ─── Upload Button ─── */}
                <button
                  onClick={handleUpload}
                  disabled={uploading || !file || !title.trim() || !author.trim()}
                  className="w-full h-14 rounded-2xl bg-[#1A1A1A] text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> আপলোড হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" /> আপলোড করুন
                    </>
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
