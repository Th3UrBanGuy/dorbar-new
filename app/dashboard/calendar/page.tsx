"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay } from "date-fns";
import { ChevronLeft, ChevronRight, Menu, Bell, Trophy, Eye, Clock, CalendarIcon, MapPin, X, Star, Sun, Bookmark, Flag, Heart } from "lucide-react";
import { specialDays, sectColors, CalendarEvent } from "@/lib/calendar-events";
import { Button } from "@/components/ui/button";

// A helper dictionary for lucide icons
const IconMap: Record<string, any> = {
  star: Star,
  moon: Bookmark, // Using bookmark for moon approximation if missing
  award: Trophy,
  sun: Sun,
  bookmark: Bookmark,
  flag: Flag,
  heart: Heart,
  'map-pin': MapPin,
  default: Bell
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Start at June 2026 for dummy data visibility
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Calendar logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  // Get days to display (including padding days from prev/next months)
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Start on Sunday
  
  const endDate = new Date(monthEnd);
  if (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // End on Saturday
  }

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const resetDate = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Find events for the given month
  const upcomingEvents = specialDays
    .filter(event => new Date(event.dateStr).getMonth() === currentDate.getMonth() || new Date(event.dateStr) >= currentDate)
    .sort((a, b) => new Date(a.dateStr).getTime() - new Date(b.dateStr).getTime())
    .slice(0, 3); // Top 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] font-sans text-slate-900 pb-20 relative overflow-hidden flex justify-center">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#BAE6FD] rounded-full blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#99F6E4] rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-md bg-transparent relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white">
               <Image src="https://picsum.photos/seed/avatar/100/100" alt="Profile" width={48} height={48} className="object-cover" />
             </div>
             <div>
               <h2 className="text-sm font-bold text-slate-800">James Liq</h2>
               <p className="text-xs text-slate-500 font-medium">Designer</p>
             </div>
          </div>
          <button className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 opacity-80 hover:opacity-100">
            <div className="w-6 h-0.5 bg-slate-800 rounded-full"></div>
            <div className="w-6 h-0.5 bg-slate-800 rounded-full"></div>
            <div className="w-4 h-0.5 bg-slate-800 rounded-full self-start ml-2"></div>
          </button>
        </header>

        {/* Main Content Area */}
        <div className="px-6 flex-1 flex flex-col gap-6">
          
          {/* Calendar Section */}
          <div>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-xl font-bold text-slate-800">Create Event</h3>
              <button className="text-xs font-semibold text-[#0EA5E9] hover:underline">View all</button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
            >
              {/* Month Navigator */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h4 className="text-sm font-bold text-slate-800">{format(currentDate, "MMMM yyyy")}</h4>
                <button onClick={nextMonth} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs font-bold text-slate-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Date Grid */}
              <div className="grid grid-cols-7 gap-y-3 mb-6">
                {dateRange.map((date, i) => {
                  const isSelected = isSameDay(date, selectedDate);
                  const isCurrentMonth = isSameMonth(date, currentDate);
                  
                  // Check if there are events on this date
                  const dayEvents = specialDays.filter(e => isSameDay(new Date(e.dateStr), date));
                  const hasEvents = dayEvents.length > 0;
                  const dotColor = hasEvents ? sectColors[dayEvents[0].sect] : '';

                  // Mocking "today" styling with a green background for the 15th if we're in June (to match visual of the design exactly)
                  const isMockToday = date.getDate() === 15 && date.getMonth() === 5;

                  return (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className="relative h-10 flex items-center justify-center"
                    >
                      <div className={`
                        w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold transition-all
                        ${isSelected ? 'bg-[#00B4D8] text-white shadow-md shadow-cyan-500/30' : 
                          isMockToday && !isSelected ? 'bg-[#2DD4BF] text-white shadow-md shadow-teal-500/30' : 
                          isCurrentMonth ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300'}
                      `}>
                        {format(date, 'd')}
                      </div>
                      {/* Event Dot Marker */}
                      {hasEvents && !isSelected && !isMockToday && (
                        <div className={`absolute bottom-0 w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-2">
                <button onClick={resetDate} className="text-xs font-bold text-slate-800 hover:text-slate-600">
                  Reset
                </button>
                <button className="bg-[#2DD4BF] hover:bg-[#14B8A6] text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg shadow-teal-500/20 transition-colors">
                  Create
                </button>
              </div>
            </motion.div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-2">
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-lg font-bold text-slate-800">Coming Soon</h3>
              <button className="text-xs font-semibold text-[#0EA5E9] hover:underline">View all</button>
            </div>
            
            <div className="flex flex-col gap-3">
              {upcomingEvents.map((event, i) => {
                const IconComponent = IconMap[event.icon || 'default'] || Bell;
                const bgColor = sectColors[event.sect] || 'bg-slate-500';

                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-white rounded-3xl p-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-shadow border border-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center text-white shadow-sm`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 mb-1">{event.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{format(new Date(event.dateStr), 'dd MMMM yyyy')}</p>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors" onClick={(e) => { e.stopPropagation(); /* Delete logic here */ }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <nav className="p-6 text-center">
             <Link href="/dashboard" className="text-[#0EA5E9] text-sm font-semibold hover:underline bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-white shadow-sm inline-block">
                Return to Dashboard
             </Link>
        </nav>
      </div>

      {/* Event Details Overlay / Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#F4F7FB] flex flex-col max-w-md mx-auto sm:border-x border-slate-200"
          >
            {/* Top Image/Gradient Header */}
            <div className="h-64 relative bg-gradient-to-br from-[#0B3A36] to-[#047857] w-full">
               <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://picsum.photos/seed/leaves/800/600")', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
               
               {/* Nav in Header */}
               <div className="absolute top-0 w-full p-6 flex justify-between items-center text-white">
                 <button onClick={() => setSelectedEvent(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                   <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                   <div className="flex flex-col gap-1">
                     <div className="w-1 h-1 rounded-full bg-white"></div>
                     <div className="w-1 h-1 rounded-full bg-white"></div>
                     <div className="w-1 h-1 rounded-full bg-white"></div>
                   </div>
                 </button>
               </div>
            </div>

            {/* Content Bottom Sheet */}
            <div className="bg-white flex-1 -mt-8 rounded-t-[2.5rem] relative px-8 pt-14 pb-8 flex flex-col">
              
              {/* Floating Icon */}
              <div className={`absolute -top-10 left-8 w-20 h-20 rounded-[1.5rem] ${selectedEvent?.sect ? sectColors[selectedEvent.sect] : 'bg-[#00B4D8]'} shadow-xl shadow-slate-900/20 flex items-center justify-center text-white border-4 border-white`}>
                {(() => {
                  const ModalIcon = IconMap[selectedEvent?.icon || 'default'] || undefined;
                  return ModalIcon ? <ModalIcon className="w-8 h-8" /> : null;
                })()}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-800 mb-8">{selectedEvent?.title}</h2>

              {/* Details List */}
              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#00B4D8]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{selectedEvent?.time || '12:00 PM (All Day)'}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#00B4D8]">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{selectedEvent?.dateStr ? format(new Date(selectedEvent.dateStr), 'dd MMMM yyyy') : ''}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#00B4D8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{selectedEvent?.location || 'Location To Be Announced'}</span>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-auto">
                <h3 className="text-sm font-bold text-slate-800 mb-2">About</h3>
                <p className="text-xs text-slate-500 leading-relaxed text-justify">
                  {selectedEvent?.description}
                  <br/><br/>
                  This is a special day observed by the <span className="capitalize font-semibold">{selectedEvent?.sect}</span> sect. You can set a reminder to be notified before the event begins.
                </p>
              </div>

              {/* Bottom Action Area */}
              <div className="flex gap-4 mt-8 pt-4">
                <button className="flex-1 bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-bold py-3.5 rounded-full shadow-lg shadow-teal-500/20 transition-colors text-sm">
                  Set Alarm
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full border border-slate-200 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
