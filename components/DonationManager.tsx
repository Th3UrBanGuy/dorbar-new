"use client";

import { useState, useEffect } from "react";
import { 
  Heart, Download, Search, Filter, Calendar, 
  ExternalLink, Eye, Smartphone, Building, Wallet,
  CheckCircle2, Clock, Trash2, Loader2, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export function DonationManager() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/donations");
      const data = await res.json();
      if (data.donations) {
        setDonations(data.donations);
      }
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(d => 
    d.contributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.amount.toString().includes(searchTerm)
  );

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Mobile Banking": return <Smartphone className="w-4 h-4" />;
      case "Bank Transfer": return <Building className="w-4 h-4" />;
      default: return <Wallet className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-bengali">হাদিয়া ব্যবস্থাপনা</h2>
          <p className="text-sm text-slate-500 font-bengali">সংগৃহীত হাদিয়ার তালিকা ও স্লিপ চেক করুন</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="খুঁজুন..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
             />
          </div>
          <button onClick={fetchDonations} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Loader2 className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-slate-400 font-medium">তথ্য লোড হচ্ছে...</p>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium font-bengali">কোনো রেকর্ড পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonations.map((donation) => (
            <motion.div 
              key={donation.id}
              layoutId={`donation-${donation.id}`}
              onClick={() => setSelectedDonation(donation)}
              className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  {getMethodIcon(donation.paymentMethod)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    donation.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {donation.status === 'verified' ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-slate-800 text-lg mb-1 truncate font-bengali">{donation.contributor}</h3>
              <div className="text-2xl font-black text-emerald-600 mb-4 font-mono">৳{donation.amount}</div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(donation.createdAt).toLocaleDateString('bn-BD')}</span>
                </div>
                {donation.transactionId && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">ID: {donation.transactionId}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {donation.paymentMethod}
                  </span>
                  {donation.slipUrl && (
                    <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                       <Eye className="w-3 h-3" /> স্লিপ দেখুন
                    </div>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDonation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDonation(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              layoutId={`donation-${selectedDonation.id}`}
              className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 font-bengali">{selectedDonation.contributor}</h2>
                    <p className="text-slate-500 text-sm font-bengali">{selectedDonation.paymentMethod} হাদিয়ার বিস্তারিত</p>
                  </div>
                  <button onClick={() => setSelectedDonation(null)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">পরিমাণ</p>
                    <p className="text-2xl font-black text-emerald-700 font-mono">৳{selectedDonation.amount}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">স্ট্যাটাস</p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold font-bengali">
                      {selectedDonation.status === 'verified' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                      <span>{selectedDonation.status === 'verified' ? 'যাচাইকৃত' : 'পেন্ডিং'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm font-bengali">ট্রানজেকশন আইডি</span>
                    <span className="font-mono font-bold text-slate-800">{selectedDonation.transactionId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm font-bengali">প্রেরক নম্বর</span>
                    <span className="font-mono font-bold text-slate-800">{selectedDonation.senderNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm font-bengali">তারিখ</span>
                    <span className="font-bold text-slate-800">{new Date(selectedDonation.createdAt).toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                {selectedDonation.slipUrl && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">পেমেন্ট স্লিপ</p>
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-inner group">
                      <Image 
                        src={selectedDonation.slipUrl} 
                        alt="Donation Slip" 
                        fill 
                        className="object-contain bg-slate-50" 
                      />
                      <a 
                        href={selectedDonation.slipUrl} 
                        target="_blank" 
                        className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-emerald-600 shadow-lg border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                      >
                         <ExternalLink className="w-3 h-3" /> বড় করে দেখুন
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3 mt-8">
                   <button className="h-12 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors font-bengali">ডিলিট করুন</button>
                   <button className="h-12 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-bengali">ভেরিফাই করুন</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
