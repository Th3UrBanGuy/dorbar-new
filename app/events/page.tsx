import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const events = [
    {
      title: "বার্ষিক ওরস মোবারক",
      date: "১৫ শাবান, ১৪৪৬",
      time: "মাগরিবের পর",
      location: "প্রধান দরবার শরীফ, ফকিরখীল",
      image: "/darbar image.jpg",
      description: "বার্ষিক ওরস মোবারকে অংশ নিন। আধ্যাত্মিক চিন্তন, জিকর ও কমিউনিটি সমাবেশের একটি রাত।"
    },
    {
      title: "সাপ্তাহিক মাহফিলে সামা",
      date: "প্রতি বৃহস্পতিবার",
      time: "ইশার পর",
      location: "খানকা শরীফ",
      image: "/darbar image.jpg",
      description: "সাপ্তাহিক সমাবেশে কওয়ালি ও কালামে চিশতিয়ার আধ্যাত্মিক আনন্দ অনুভব করুন।"
    },
    {
      title: "রমজান ইফতার সেবা",
      date: "রমজানে প্রতিদিন",
      time: "মাগরিব",
      location: "দরবার শরীফ প্রাঙ্গণ",
      image: "/darbar image.jpg",
      description: "সকলের জন্য উন্মুক্ত কমিউনিটি ইফতার। স্বেচ্ছাসেবী হন অথবা আমাদের সাথে একসাথে ইফতার করুন।"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-emerald-200">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 gap-12">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">আসন্ন অনুষ্ঠানসমূহ</h1>
          <p className="text-slate-500 text-lg">আমাদের কমিউনিটি সমাবেশ, আধ্যাত্মিক মজলিস এবং বিশেষ অনুষ্ঠানে যোগ দিন।</p>
        </div>

        <div className="grid gap-8">
          {events.map((event, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row gap-8 items-center group">
              <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 px-2 md:px-0">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{event.title}</h2>
                <p className="text-slate-500 text-lg leading-relaxed">{event.description}</p>
                <div className="flex items-center gap-2 text-slate-400 font-medium mt-2">
                  <MapPin className="w-5 h-5" />
                  {event.location}
                </div>
                <div className="mt-4">
                  <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 h-12 px-8 font-semibold group/btn">
                    নিবন্ধন করুন <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
