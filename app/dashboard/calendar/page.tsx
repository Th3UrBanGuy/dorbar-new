"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Star, Sparkles } from "lucide-react";
import { gregorianToHijri, gregorianToBangla, toBengaliNumeral, getBanglaWeekday, hasEvents, getEventsForDate, ENGLISH_MONTHS } from "@/lib/date-utils";

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Today's date info
  const hijriToday = gregorianToHijri(today);
  const banglaToday = gregorianToBangla(today);
  const dayName = getBanglaWeekday(today);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return days;
  }, [currentMonth, currentYear]);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-900">ক্যালেন্ডার</h1>
          <p className="text-xs text-slate-500">Calendar</p>
        </div>
        <Calendar className="w-5 h-5 text-emerald-500" />
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Column: Today's Info & Events */}
          <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col gap-6">
            
            {/* Today's Date Card */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-[2rem] p-6 sm:p-8 lg:p-6 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
              <Sparkles className="absolute top-4 right-4 w-5 h-5 text-emerald-200/40" />

              <p className="text-emerald-200 text-sm font-medium mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" /> আজকের তারিখ
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {/* English Date */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-5 border border-white/10 flex flex-col justify-center">
                  <p className="text-emerald-200 text-[10px] uppercase tracking-wider font-bold mb-1">English</p>
                  <p className="text-3xl font-bold">{today.getDate()}</p>
                  <p className="text-sm text-emerald-100 mt-1">
                    {ENGLISH_MONTHS[today.getMonth()]} {today.getFullYear()}
                  </p>
                  <p className="text-xs text-emerald-200/70 mt-0.5">
                    {today.toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                </div>

                {/* Bangla Bangabda */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-5 border border-white/10 flex flex-col justify-center">
                  <p className="text-emerald-200 text-[10px] uppercase tracking-wider font-bold mb-1">বাংলা বঙ্গাব্দ</p>
                  <p className="text-3xl font-bold">{toBengaliNumeral(banglaToday.day)}</p>
                  <p className="text-sm text-emerald-100 mt-1">
                    {banglaToday.monthName} {toBengaliNumeral(banglaToday.year)}
                  </p>
                  <p className="text-xs text-emerald-200/70 mt-0.5">{dayName}</p>
                </div>

                {/* Hijri Arabic */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-5 border border-white/10 flex flex-col justify-center">
                  <p className="text-emerald-200 text-[10px] uppercase tracking-wider font-bold mb-1">আরবি হিজরি</p>
                  <p className="text-3xl font-bold">{hijriToday.day}</p>
                  <p className="text-sm text-emerald-100 mt-1">
                    {hijriToday.monthName} {hijriToday.year}
                  </p>
                  <p className="text-xs text-emerald-200/70 mt-0.5">{hijriToday.monthNameEn}</p>
                </div>
              </div>
            </div>

            {/* Events for Today */}
            {(() => {
              const todayEvents = getEventsForDate(today.getMonth() + 1, today.getDate());
              if (todayEvents.length === 0) return null;
              return (
                <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">আজকের ইভেন্ট</h3>
                  <div className="flex flex-col gap-3">
                    {todayEvents.map((evt, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100/50">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getEventColor(evt.color) }} />
                        <div className="flex-1">
                          <p className="font-bold text-sm text-slate-800">{evt.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{evt.nameEn} • {getEventTypeLabel(evt.type)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Right Column: Calendar Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 lg:h-full lg:flex lg:flex-col lg:justify-center">
              
              {/* Month Navigator */}
              <div className="flex items-center justify-between mb-8 lg:mb-12">
                <button onClick={prevMonth} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-sm border border-slate-100">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{ENGLISH_MONTHS[currentMonth]}</h2>
                  <p className="text-sm font-semibold text-slate-500 mt-1">{currentYear}</p>
                </div>
                <button onClick={nextMonth} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-sm border border-slate-100">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {WEEKDAY_HEADERS.map((day) => (
                  <div key={day} className="text-center text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
                {calendarDays.map((day, i) => {
                  if (day === null) {
                    return <div key={`blank-${i}`} className="aspect-square" />;
                  }

                  const isCurrentDay = isToday(day);
                  const dayHasEvents = hasEvents(currentMonth + 1, day);
                  const dayEvents = getEventsForDate(currentMonth + 1, day);

                  return (
                    <Link
                      key={day}
                      href={`/dashboard/calendar/${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                      className={`
                        aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative
                        transition-all duration-300 group cursor-pointer border
                        ${isCurrentDay
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/30 lg:scale-[1.12] z-10'
                          : 'bg-slate-50/50 border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 text-slate-700 hover:text-emerald-700'
                        }
                      `}
                    >
                      <span className={`text-base sm:text-lg font-bold ${isCurrentDay ? 'text-white' : ''} group-hover:scale-110 transition-transform`}>{day}</span>
                      
                      {dayHasEvents && (
                        <div className="flex gap-1 mt-1 sm:mt-1.5 absolute bottom-2 sm:bottom-3">
                          {dayEvents.slice(0, 3).map((evt, ei) => (
                            <div
                              key={ei}
                              className={`w-1.5 h-1.5 rounded-full ${isCurrentDay ? 'bg-white shadow-sm' : ''}`}
                              style={{ backgroundColor: isCurrentDay ? 'rgba(255,255,255,0.95)' : getEventColor(evt.color) }}
                            />
                          ))}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

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
