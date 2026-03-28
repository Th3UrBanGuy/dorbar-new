"use client";

import { useState } from "react";
import { 
  Heart, Smartphone, Building, ArrowRight, User, Hash, Phone,
  CalendarDays, Wallet, Banknote, Loader2, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDonation, DonationRecord } from "@/lib/api/donation";
import { DonationReceipt } from "@/components/DonationReceipt";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | null>(500);
  const [donorName, setDonorName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mobile Banking");
  
  // Method specific fields
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  
  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<DonationRecord | null>(null);
  const [error, setError] = useState("");

  const handleDonate = async () => {
    setError("");
    
    if (!amount || amount <= 0) return setError("দয়া করে সঠিক অর্থের পরিমাণ লিখুন।");
    if (!donorName.trim()) return setError("দয়া করে আপনার নাম লিখুন।");

    if (paymentMethod === "Mobile Banking") {
      if (!transactionId.trim() || !senderNumber.trim()) {
        return setError("বিকাশ/নগদ এর ক্ষেত্রে ট্রানজেকশন আইডি এবং সেন্ডার নম্বর আবশ্যক।");
      }
    } else if (paymentMethod === "Bank Transfer") {
      if (!transactionDate.trim()) {
        return setError("ব্যাংক ট্রান্সফারের ক্ষেত্রে ট্রানজেকশনের সময়/তারিখ আবশ্যক।");
      }
    }

    setIsSubmitting(true);

    const record: DonationRecord = {
      id: `HNY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      donorName,
      amount,
      paymentMethod,
      timestamp: new Date().toISOString()
    };

    if (paymentMethod === "Mobile Banking") {
      record.transactionId = transactionId;
      record.senderNumber = senderNumber;
    } else if (paymentMethod === "Bank Transfer") {
      record.transactionDate = transactionDate;
    }

    const success = await saveDonation(record);
    
    setIsSubmitting(false);

    if (success) {
      setReceiptData(record);
    } else {
      setError("সার্ভারে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন। (Make sure JSONBin placeholder is replaced)");
    }
  };

  if (receiptData) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans py-16 px-4">
         <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
            <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                 <Heart className="w-8 h-8 fill-current" />
               </div>
               <h2 className="text-3xl font-bold text-slate-900 mb-2">জাযাকাল্লাহ খাইরান</h2>
               <p className="text-slate-500">আপনার হাদিয়ার জন্য অসংখ্য ধন্যবাদ। আপনার রশিদ প্রস্তুত।</p>
            </div>
            
            <div className="animate-in zoom-in-95 duration-700 w-full flex justify-center pb-20">
               <DonationReceipt 
                 record={receiptData} 
                 onClose={() => {
                   setReceiptData(null);
                   setAmount(500);
                   setDonorName("");
                   setTransactionId("");
                   setSenderNumber("");
                   setTransactionDate("");
                 }} 
               />
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-emerald-200">
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 lg:px-12 py-12 gap-12 pb-32">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-inner">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">হাদিয়া প্রদান করুন</h1>
          <p className="text-slate-500 text-lg">আপনার উদার হাদিয়া দরবার শরীফের রক্ষণাবেক্ষণ, কমিউনিটি ইভেন্ট এবং দ্বীনি কাজে ব্যয় করা হবে।</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-10">
          
          {/* Amount Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">1</span> 
               হাদিয়ার পরিমাণ
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[100, 500, 1000, 5000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`h-16 rounded-2xl text-xl font-bold transition-all border-2 ${
                    amount === val 
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" 
                      : "border-slate-100 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                  }`}
                >
                  ৳{val}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">৳</span>
              <input 
                type="number" 
                placeholder="অন্য পরিমাণ লিখুন"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-xl font-bold text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans"
              />
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Details Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">2</span> 
               আপনার বিস্তারিত
            </h3>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="আপনার নাম"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-lg font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
              />
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Payment Method Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">3</span> 
               পেমেন্ট পদ্ধতি
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div 
                onClick={() => setPaymentMethod("Mobile Banking")}
                className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer text-center transition-all ${paymentMethod === "Mobile Banking" ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-slate-100 bg-white hover:border-emerald-200"}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${paymentMethod === "Mobile Banking" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-500"}`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${paymentMethod === "Mobile Banking" ? "text-emerald-900" : "text-slate-700"}`}>মোবাইল ব্যাংকিং</h4>
                  <p className="text-xs text-slate-500 font-medium">বিকাশ, নগদ, রকেট</p>
                </div>
              </div>

              <div 
                onClick={() => setPaymentMethod("Bank Transfer")}
                className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer text-center transition-all ${paymentMethod === "Bank Transfer" ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-slate-100 bg-white hover:border-emerald-200"}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${paymentMethod === "Bank Transfer" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-500"}`}>
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${paymentMethod === "Bank Transfer" ? "text-emerald-900" : "text-slate-700"}`}>ব্যাংক ট্রান্সফার</h4>
                  <p className="text-xs text-slate-500 font-medium">সরাসরি অ্যাকাউন্টে</p>
                </div>
              </div>

              <div 
                onClick={() => setPaymentMethod("Hand Cash")}
                className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer text-center transition-all ${paymentMethod === "Hand Cash" ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-slate-100 bg-white hover:border-emerald-200"}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${paymentMethod === "Hand Cash" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-500"}`}>
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${paymentMethod === "Hand Cash" ? "text-emerald-900" : "text-slate-700"}`}>হাতে হাতে</h4>
                  <p className="text-xs text-slate-500 font-medium">সরাসরি অফিসে জমা</p>
                </div>
              </div>
            </div>

            {/* Conditional Form Fields */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              {paymentMethod === "Mobile Banking" && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex bg-blue-50 text-blue-800 p-4 rounded-xl items-start gap-3 mb-4">
                     <Info className="w-5 h-5 shrink-0 mt-0.5" />
                     <p className="text-sm font-medium leading-relaxed">অনুগ্রহ করে বিকাশ/নগদ/রকেটে <strong>সেন্ড মানি</strong> করার পর নিচের বক্সে ট্রানজেকশন আইডি দিন। নাম্বার: <strong>+8801XXXXXXXXX</strong></p>
                  </div>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Transaction ID (e.g. 9AX2B4X9)"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full h-14 bg-white border border-slate-200 rounded-xl pl-12 pr-4 font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-mono"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="যে নম্বর থেকে পাঠিয়েছেন"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      className="w-full h-14 bg-white border border-slate-200 rounded-xl pl-12 pr-4 font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "Bank Transfer" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 border-b pb-3">Bank Account Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                         <span className="text-slate-500">Account Name:</span>
                         <span className="font-bold text-slate-800">Khijiriya Chishtiya Vandar</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-slate-500">Account Number:</span>
                         <span className="font-bold font-mono text-emerald-700">2050 123 4567 890</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-slate-500">Bank Name:</span>
                         <span className="font-bold text-slate-800">Islami Bank Bangladesh PLC</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-slate-500">Branch:</span>
                         <span className="font-bold text-slate-800">Agrabad Branch</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="ট্রান্সফারের তারিখ ও সময় (Date/Time)"
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="w-full h-14 bg-white border border-slate-200 rounded-xl pl-12 pr-4 font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "Hand Cash" && (
                <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100">
                      <Banknote className="w-8 h-8 text-emerald-500" />
                   </div>
                   <h4 className="font-bold text-slate-900 mb-2">সরাসরি জমা</h4>
                   <p className="text-sm text-slate-500 leading-relaxed max-w-sm">আপনি দরবার শরীফে এসে সরাসরি ক্যাশ প্রদান করতে পারেন। সাবমিট করার পর রশিদটি সংরক্ষণ করে নিয়ে আসবেন।</p>
                </div>
              )}
            </div>

          </section>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-bold flex items-center justify-center text-center border border-rose-100">
              {error}
            </div>
          )}

          <Button 
            disabled={isSubmitting}
            onClick={handleDonate}
            className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 h-16 text-xl font-bold group"
          >
            {isSubmitting ? (
              <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> প্রসেসিং...</>
            ) : (
              <>৳{amount || 0} হাদিয়া প্রদান করুন <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
            )}
          </Button>

        </div>
      </main>
    </div>
  );
}
