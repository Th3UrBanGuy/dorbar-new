import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, BookOpen, Heart, Star, Users, Award, Calendar } from "lucide-react";

export default function PirSahebPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-900">পীর সাহেব</h1>
          <p className="text-xs text-slate-500">Pir Saheb Profile</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">

        {/* Hero Profile Card */}
        <div className="mt-6 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-emerald-900/30">
          {/* Decorative */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

          {/* Islamic geometric pattern faint */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\' fill=\'none\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center shrink-0 shadow-2xl">
              <span className="text-5xl sm:text-6xl font-bold text-white/80">ই</span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-emerald-200 text-xs uppercase tracking-widest font-bold mb-2">পীর সাহেব</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">হাফেজ মো ইউসুফ</h1>
              <p className="text-emerald-100 text-sm mb-4">Hafez Mo Yusuf</p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                  হাফেজে কুরআন
                </span>
                <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                  চিশতিয়া তরিকা
                </span>
                <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                  পীরে তরিকত
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <p className="text-lg font-bold">১০০০+</p>
              <p className="text-[10px] text-emerald-200/70 uppercase tracking-wider">মুরিদান</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <p className="text-lg font-bold">হাফেজ</p>
              <p className="text-[10px] text-emerald-200/70 uppercase tracking-wider">কুরআন</p>
            </div>
            <div className="text-center">
              <Award className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <p className="text-lg font-bold">চিশতী</p>
              <p className="text-[10px] text-emerald-200/70 uppercase tracking-wider">সিলসিলা</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">পরিচিতি</h2>
          </div>

          <div className="prose prose-slate prose-sm max-w-none">
            <p className="text-slate-600 leading-relaxed mb-4">
              <span className="font-semibold text-slate-800">হাফেজ মো ইউসুফ</span> হলেন খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফের বর্তমান পীর সাহেব। তিনি পবিত্র কুরআনের হাফেজ এবং চিশতিয়া সিলসিলার একজন সম্মানিত পীর।
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              উনার দরবার শরীফ ফকিরখীল, পাইন্দং-এ অবস্থিত, যেখানে <span className="font-semibold text-emerald-700">খাজা গরীবে নেওয়াজ মঈনুদ্দিন চিশতী (রহিমাতুল্লাহি আলাইহি)</span> এর পবিত্র খানকা শরীফ রয়েছে। এই খানকা শরীফে নিয়মিত ওয়াজ মাহফিল, জিকর মাহফিল এবং ইসলামী তালীম অনুষ্ঠিত হয়।
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              এছাড়াও এই দরবার শরীফ প্রাঙ্গণে রয়েছে নবী ও অলী জ্ঞানের ভান্ডার <span className="font-semibold text-emerald-700">খাজা খোয়াজ খিজির (আলাইহিস সালাম)</span> এর নামে নির্মিত মসজিদ, যেখানে প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামাতে আদায় করা হয়।
            </p>
            <p className="text-slate-600 leading-relaxed">
              হাফেজ মো ইউসুফ সাহেব তাসাউফ ও তরিকতের পথে মানুষকে আল্লাহর নৈকট্য লাভের দিকে পরিচালিত করেন। তিনি সর্বদা ইসলামের সঠিক পথে চলার জন্য মুরিদদের উৎসাহিত করেন এবং কুরআন-সুন্নাহর আলোকে জীবন যাপনের শিক্ষা দেন।
            </p>
          </div>
        </div>

        {/* Darbar Info */}
        <div className="mt-6 bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">দরবার সম্পর্কে</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50">
              <h3 className="font-bold text-emerald-800 text-sm mb-2">🕌 খানকা শরীফ</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                খাজা গরীবে নেওয়াজ হযরত মঈনুদ্দিন চিশতী (রহ.) এর পবিত্র খানকা শরীফ। এখানে নিয়মিত জিকর-আজকার, ওয়াজ মাহফিল ও ইসলামী শিক্ষা প্রদান করা হয়।
              </p>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50">
              <h3 className="font-bold text-blue-800 text-sm mb-2">🕋 খিজির (আ.) মসজিদ</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                নবী ও অলী জ্ঞানের ভান্ডার খাজা খোয়াজ খিজির (আলাইহিস সালাম) এর নামে নির্মিত মসজিদ। প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামাতে আদায় করা হয়।
              </p>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100/50">
              <h3 className="font-bold text-amber-800 text-sm mb-2">📍 অবস্থান</h3>
              <p className="text-sm text-slate-600 mb-3">ফকিরখীল, পাইন্দং</p>
              <a
                href="https://maps.app.goo.gl/UNc8vtUPrXN5kHY96"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-amber-200 rounded-full text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <MapPin className="w-4 h-4" /> Google Maps এ দেখুন
              </a>
            </div>
          </div>
        </div>



        {/* Teachings Section */}
        <div className="mt-6 bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">শিক্ষা ও বাণী</h2>
          </div>

          <div className="space-y-4">
            {[
              { text: "তাসাউফের মূল কথা হলো আল্লাহর সাথে সম্পর্ক স্থাপন করা এবং সৃষ্টির সেবা করা।", topic: "তাসাউফ" },
              { text: "কুরআন তিলাওয়াত ছাড়া কোনো মজলিস পূর্ণ হয় না। প্রতিদিন কুরআন পড়ুন।", topic: "কুরআন" },
              { text: "জিকরে ইলাহীর মাধ্যমে অন্তরের পরিশুদ্ধি অর্জন হয়। বেশি বেশি জিকর করুন।", topic: "জিকর" },
            ].map((teaching, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-emerald-200 transition-colors">
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                  {teaching.topic}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{teaching.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="mt-6 bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">নিয়মিত কার্যক্রম</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "দৈনিক জিকর মাহফিল", time: "আসরের পর", icon: "🤲" },
              { name: "সাপ্তাহিক ওয়াজ মাহফিল", time: "প্রতি শুক্রবার", icon: "📖" },
              { name: "কুরআন তালিম", time: "ফজরের পর", icon: "📚" },
              { name: "ঈদে মিলাদুন্নবী (সা.)", time: "বার্ষিক", icon: "🌙" },
              { name: "বার্ষিক ওরস শরীফ", time: "নির্ধারিত তারিখে", icon: "✨" },
              { name: "ফ্রি ইফতার ও সেহরি", time: "রমজান মাসে", icon: "🍽️" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <p className="font-bold text-sm text-slate-800">{activity.name}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
