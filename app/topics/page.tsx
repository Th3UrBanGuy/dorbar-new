import fs from "fs";
import path from "path";
import Link from "next/link";
import { 
  Activity, Moon, HeartHandshake, Sparkles, 
  Shield, Flame, Users, Heart, BookOpen
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Activity, Moon, HeartHandshake, Sparkles, 
  Shield, Flame, Users, Heart
};

export default async function TopicsIndexPage() {
  const topicsPath = path.join(process.cwd(), "public", "data", "topics.json");
  let topics = [];
  
  if (fs.existsSync(topicsPath)) {
    topics = JSON.parse(fs.readFileSync(topicsPath, "utf8"));
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 text-center mt-8">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-emerald-100/50 rounded-2xl mb-6 shadow-sm border border-emerald-100">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4 group font-bengali">
             Subjects & Topics
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-bengali font-light leading-relaxed">
             Explore thousands of authentic hadiths organized seamlessly by core Islamic themes.
          </p>
        </div>

        {/* Grid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t: any) => {
             const IconIcon = ICON_MAP[t.icon] || BookOpen;
             return (
               <Link 
                  href={`/topics/${t.id}`} key={t.id}
                  className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-slate-100 group-hover:bg-emerald-100/80 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-sm text-slate-600 group-hover:text-emerald-600">
                       <IconIcon className="w-7 h-7" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 font-bengali">{t.name}</h2>
                    
                    <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-emerald-600 transition-colors mt-4">
                      <span className="bg-slate-100 group-hover:bg-white px-3 py-1 rounded-full border border-transparent group-hover:border-emerald-100">
                         {t.count} Authentic Citations
                      </span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                         Read →
                      </span>
                    </div>
                  </div>
               </Link>
             );
          })}
        </div>

        {topics.length === 0 && (
           <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm mt-8">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Topics Indexed</h3>
              <p className="text-slate-500">Please run <code className="bg-slate-100 px-2 py-1 rounded text-pink-600">npm run build-topics</code> in your terminal to initialize the database.</p>
           </div>
        )}

      </div>
    </div>
  );
}
