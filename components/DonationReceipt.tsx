"use client";

import { useRef, useState } from "react";
import { Download, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DonationRecord } from "@/lib/api/donation";
import { Button } from "./ui/button";
import Image from "next/image";

interface DonationReceiptProps {
  record: DonationRecord;
  onClose: () => void;
}

export function DonationReceipt({ record, onClose }: DonationReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    try {
      setIsDownloading(true);
      
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#f4f3ec",
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Hadya_Receipt_${record.id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Visual Receipt Element */}
      <div 
        ref={receiptRef}
        className="relative w-full max-w-md bg-[#f4f3ec] rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden font-sans p-8 pt-10 pb-20"
      >
        {/* Decorative corner patterns */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-emerald-900/10 rounded-tl-3xl opacity-50 m-2 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-emerald-900/10 rounded-tr-3xl opacity-50 m-2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-emerald-900/10 rounded-bl-3xl opacity-50 m-2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-emerald-900/10 rounded-br-3xl opacity-50 m-2 pointer-events-none"></div>

        {/* Header Region */}
        <div className="flex flex-col items-center text-center justify-center relative z-10 mb-8">
           {/* Dynamic Logo integration */}
           <div className="w-20 h-20 bg-white rounded-full border-4 border-emerald-100 shadow-md p-1 mb-4 flex items-center justify-center overflow-hidden">
             <Image src="/4.png" alt="Logo" width={70} height={70} className="object-cover" />
           </div>
           
           <h1 className="text-2xl font-bold text-emerald-900 tracking-tight leading-tight">
             খিজিরিয়া চিশতিয়া ভান্ডার
           </h1>
           <p className="text-emerald-700/80 font-medium text-sm mt-1 tracking-widest uppercase">
             Digital Hadya Receipt
           </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-6 gap-2 opacity-60">
           <div className="w-16 h-[2px] bg-emerald-800/20 rounded-full"></div>
           <Sparkles className="w-5 h-5 text-emerald-800" />
           <div className="w-16 h-[2px] bg-emerald-800/20 rounded-full"></div>
        </div>

        {/* Body Content */}
        <div className="space-y-5 relative z-10 text-emerald-950 font-medium">
           
           <div className="flex flex-col items-center justify-center mb-6">
             <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Total Hadya</p>
             <h2 className="text-5xl font-bold text-emerald-700 drop-shadow-sm">৳{record.amount}</h2>
           </div>

           <div className="w-full bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-emerald-900/5 space-y-4">
             <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
               <span className="text-slate-500 text-sm">Receipt ID</span>
               <span className="font-mono text-emerald-900 font-bold">{record.id}</span>
             </div>
             <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
               <span className="text-slate-500 text-sm">Date & Time</span>
               <span className="text-emerald-900">{new Date(record.timestamp).toLocaleString("en-GB")}</span>
             </div>
             <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
               <span className="text-slate-500 text-sm">Donor Name</span>
               <span className="text-emerald-900 font-bold">{record.donorName}</span>
             </div>
             <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
               <span className="text-slate-500 text-sm">Payment Method</span>
               <span className="text-emerald-900">{record.paymentMethod}</span>
             </div>
             
             {record.transactionId && (
                <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
                  <span className="text-slate-500 text-sm">Transaction ID</span>
                  <span className="font-mono text-emerald-900">{record.transactionId}</span>
                </div>
             )}
             
             {record.senderNumber && (
                <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
                  <span className="text-slate-500 text-sm">Sender Num.</span>
                  <span className="font-mono text-emerald-900">{record.senderNumber}</span>
                </div>
             )}

             {record.transactionDate && (
                <div className="flex justify-between items-center border-b border-emerald-900/5 pb-3">
                  <span className="text-slate-500 text-sm">Bank TXN Date</span>
                  <span className="text-emerald-900">{record.transactionDate}</span>
                </div>
             )}
           </div>

           <div className="text-center pt-4 opacity-80">
              <p className="text-xs text-emerald-800/60 font-medium px-4 leading-relaxed">
                আপনার আন্তরিক হাদিয়ার জন্য আল্লাহ্ এবং তাঁর রাসুল (সাঃ) আপনার মঙ্গল করুন।
              </p>
           </div>
        </div>

        {/* CSS Digital Seal (Sishmohor) */}
        <div className="absolute -bottom-8 -right-4 opacity-15 rotate-[-15deg] pointer-events-none select-none mix-blend-multiply">
           <div className="w-48 h-48 border-8 border-emerald-900 rounded-full flex items-center justify-center p-2 relative">
              <div className="w-full h-full border-4 border-emerald-800 border-dashed rounded-full flex flex-col items-center justify-center text-center p-4">
                 <span className="font-arabic text-3xl text-emerald-900 mb-1">خيجيريا</span>
                 <span className="text-[10px] font-bold tracking-widest text-emerald-900 uppercase">Authorized</span>
              </div>
           </div>
        </div>
      </div>

      {/* Action Buttons Below Receipt */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className="flex-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 h-14 text-lg font-bold"
        >
          {isDownloading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating PDF...</>
          ) : (
            <><Download className="w-5 h-5 mr-2" /> Download Formally</>
          )}
        </Button>
        <Button 
          variant="outline"
          onClick={onClose} 
          className="rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-sm border-slate-200 h-14 text-lg font-bold px-8"
        >
          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" /> Done
        </Button>
      </div>

    </div>
  );
}
