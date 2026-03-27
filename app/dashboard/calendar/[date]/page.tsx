import Link from "next/link";
import { ChevronLeft, Calendar, MapPin, Star, BookOpen, Moon } from "lucide-react";
import { gregorianToHijri, gregorianToBangla, toBengaliNumeral, getBanglaWeekday, getEventsForDate, ENGLISH_MONTHS, type DayEvent } from "@/lib/date-utils";

function getEventColor(color: string): string {
  const map: Record<string, string> = {
    red: "#EF4444", green: "#22C55E", blue: "#3B82F6", purple: "#A855F7",
    orange: "#F97316", emerald: "#10B981", teal: "#14B8A6", indigo: "#6366F1",
    black: "#1E293B", amber: "#F59E0B"
  };
  return map[color] || "#64748B";
}

function getEventTypeLabel(type: string): string {
  const map: Record<string, string> = {
    islamic: "ইসলামিক", sufi: "সুফিবাদী", shia: "শিয়া",
    international: "আন্তর্জাতিক", bangladesh: "বাংলাদেশ", national: "জাতীয়"
  };
  return map[type] || type;
}

function getEventIcon(type: string) {
  switch (type) {
    case "islamic": return Moon;
    case "sufi": return Star;
    case "shia": return Moon;
    case "national": return MapPin;
    case "bangladesh": return MapPin;
    default: return Calendar;
  }
}

export default async function DateDetailPage(props: { params: Promise<{ date: string }> }) {
  const params = await props.params;
  const dateStr = params.date; // "2026-03-27"
  const parts = dateStr.split("-");
  
  if (parts.length !== 3) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <p className="text-red-500 font-medium">Invalid date format.</p>
      </div>
    );
  }

  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const date = new Date(year, month - 1, day);

  const hijri = gregorianToHijri(date);
  const bangla = gregorianToBangla(date);
  const weekdayBn = getBanglaWeekday(date);
  const weekdayEn = date.toLocaleDateString('en-US', { weekday: 'long' });
  const events = getEventsForDate(month, day);

  // Group events by type
  const groupedEvents: Record<string, DayEvent[]> = {};
  events.forEach(evt => {
    if (!groupedEvents[evt.type]) groupedEvents[evt.type] = [];
    groupedEvents[evt.type].push(evt);
  });

  const typeOrder = ["islamic", "sufi", "shia", "national", "bangladesh", "international"];

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard/calendar" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-900">{day} {ENGLISH_MONTHS[month - 1]} {year}</h1>
          <p className="text-xs text-slate-500">{weekdayEn}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 pt-4">

        {/* Date Overview Card */}
        <div className="mb-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-[2rem] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>

          {/* Large Day Number */}
          <div className="text-center mb-6">
            <p className="text-6xl sm:text-8xl font-black text-white/90 leading-none">{day}</p>
            <p className="text-lg font-medium text-slate-300 mt-2">{ENGLISH_MONTHS[month - 1]} {year}</p>
            <p className="text-sm text-slate-400">{weekdayEn} • {weekdayBn}</p>
          </div>

          {/* Three date systems */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/10">
              <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1">ইংরেজি</p>
              <p className="text-lg font-bold">{day}</p>
              <p className="text-[10px] text-slate-400">{ENGLISH_MONTHS[month - 1].slice(0, 3)} {year}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/10">
              <p className="text-[9px] uppercase tracking-wider font-bold text-emerald-400 mb-1">বঙ্গাব্দ</p>
              <p className="text-lg font-bold">{toBengaliNumeral(bangla.day)}</p>
              <p className="text-[10px] text-slate-400">{bangla.monthName} {toBengaliNumeral(bangla.year)}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/10">
              <p className="text-[9px] uppercase tracking-wider font-bold text-amber-400 mb-1">হিজরি</p>
              <p className="text-lg font-bold">{hijri.day}</p>
              <p className="text-[10px] text-slate-400">{hijri.monthName} {hijri.year}</p>
            </div>
          </div>
        </div>

        {/* Events Section */}
        {events.length > 0 ? (
          <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              এই দিনের ইভেন্টসমূহ ({events.length})
            </h3>

            <div className="flex flex-col gap-6">
              {typeOrder.map(type => {
                const typeEvents = groupedEvents[type];
                if (!typeEvents || typeEvents.length === 0) return null;
                
                return (
                  <div key={type}>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-3 px-1">
                      {getEventTypeLabel(type)}
                    </p>
                    <div className="flex flex-col gap-2">
                      {typeEvents.map((evt, i) => {
                        const Icon = getEventIcon(evt.type);
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{ backgroundColor: getEventColor(evt.color) + '20' }}
                            >
                              <Icon className="w-5 h-5" style={{ color: getEventColor(evt.color) }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 text-sm">{evt.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{evt.nameEn}</p>
                              <span
                                className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                style={{ backgroundColor: getEventColor(evt.color) + '15', color: getEventColor(evt.color) }}
                              >
                                {getEventTypeLabel(evt.type)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">কোনো ইভেন্ট নেই</h3>
            <p className="text-sm text-slate-500">এই তারিখে কোনো উল্লেখযোগ্য ইভেন্ট পাওয়া যায়নি।</p>
            <p className="text-xs text-slate-400 mt-1">No notable events found for this date.</p>
          </div>
        )}

        {/* Quick Info */}
        <div className="mt-6 bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">দ্রুত তথ্য</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-4">
              <BookOpen className="w-5 h-5 text-emerald-600 mb-2" />
              <p className="text-xs font-bold text-emerald-700">বাংলা তারিখ</p>
              <p className="text-sm text-emerald-600 mt-1">{toBengaliNumeral(bangla.day)} {bangla.monthName}, {toBengaliNumeral(bangla.year)}</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4">
              <Moon className="w-5 h-5 text-amber-600 mb-2" />
              <p className="text-xs font-bold text-amber-700">হিজরি তারিখ</p>
              <p className="text-sm text-amber-600 mt-1">{hijri.day} {hijri.monthNameEn}, {hijri.year}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
