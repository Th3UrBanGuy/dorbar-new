import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-emerald-200">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 gap-12">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">যোগাযোগ করুন</h1>
          <p className="text-slate-500 text-lg">যেকোনো জিজ্ঞাসা, আধ্যাত্মিক নির্দেশনা বা পোর্টাল সংক্রান্ত সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">আমাদের ঠিকানা</h3>
              <p className="text-slate-500 font-medium">খিজিরিয়া চিশতিয়া ভান্ডার<br/>দরবার শরীফ<br/>ফকিরখীল, পাইন্দং</p>
              <a 
                href="https://maps.app.goo.gl/UNc8vtUPrXN5kHY96"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm text-emerald-600 hover:underline font-medium"
              >
                ম্যাপে দেখুন →
              </a>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ফোন করুন</h3>
              <p className="text-slate-500 font-medium">+৮৮০ ১৭XX-XXXXXX<br/>প্রতিদিন, সকাল ৮টা - রাত ১০টা</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ইমেইল করুন</h3>
              <p className="text-slate-500 font-medium">info@darbarsharif.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">আমাদের মেসেজ পাঠান</h2>
            <form className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 pl-2">আপনার নাম</label>
                  <input 
                    type="text" 
                    placeholder="নাম লিখুন"
                    className="h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 pl-2">ফোন নম্বর</label>
                  <input 
                    type="tel" 
                    placeholder="০১XXXXXXXXX"
                    className="h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 pl-2">ইমেইল ঠিকানা</label>
                <input 
                  type="email" 
                  placeholder="example@email.com"
                  className="h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 pl-2">আপনার বার্তা</label>
                <textarea 
                  placeholder="আপনার বার্তা এখানে লিখুন..."
                  rows={6}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 h-14 text-lg font-bold group mt-4">
                বার্তা পাঠান <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
