"use client";
import { Heart, CreditCard, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | null>(50);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-blue-200">
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 lg:px-12 py-12 gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-[#0066FF] mx-auto mb-6 shadow-inner">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Support Our Mission</h1>
          <p className="text-slate-500 text-lg">Your generous contributions help us maintain the Darbar Sharif, organize community events, and support those in need.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Select Donation Amount</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[10, 20, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`h-16 rounded-2xl text-xl font-bold transition-all border-2 ${
                  amount === val 
                    ? "border-[#0066FF] bg-blue-50 text-[#0066FF]" 
                    : "border-slate-100 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-500 mb-3">Or enter custom amount</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">$</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-xl font-bold text-slate-900 outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="border-2 border-[#0066FF] bg-blue-50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0066FF] shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Credit Card</h4>
                <p className="text-sm text-slate-500 font-medium">Stripe Secure</p>
              </div>
            </div>
            <div className="border-2 border-slate-100 bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Bank Transfer</h4>
                <p className="text-sm text-slate-500 font-medium">Direct Deposit</p>
              </div>
            </div>
          </div>

          <Button className="w-full rounded-2xl bg-[#0066FF] hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 h-16 text-lg font-bold group">
            Donate ${amount || 0} Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-sm text-slate-400 font-medium mt-6">
            Secure payment processing. You will receive an email receipt.
          </p>
        </div>
      </main>
    </div>
  );
}
