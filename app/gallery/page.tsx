"use client";
import { useState } from "react";
import Image from "next/image";
import { Images, X, Download } from "lucide-react";

type GalleryItem = {
  src: string;
  title: string;
  desc: string;
  isLogo?: boolean;
  filterClass?: string;
};

export default function GalleryPage() {
  const images: GalleryItem[] = [
    { src: "/darbar image.jpg", title: "দরবার শরীফ", desc: "খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ প্রাঙ্গণ" },
    { src: "/khanka.jpg", title: "খানকা শরীফ", desc: "খাজা গরীবে নেওয়াজ (রহ.) এর পবিত্র খানকা শরীফ" },
    { src: "/mosque.jpg", title: "খিজির (আ.) মসজিদ", desc: "খাজা খোয়াজ খিজির (আ.) মসজিদ" },
    { src: "/mosque_back.jpg", title: "মসজিদের পিছনের অংশ", desc: "মসজিদের পিছনের দিকের দৃশ্য" }
  ];

  const logos: GalleryItem[] = [
    { src: "/3.png", title: "অফিসিয়াল লোগো ১", desc: "খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ", isLogo: true },
    { src: "/4.png", title: "অফিসিয়াল লোগো ২", desc: "খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ", isLogo: true },
    { src: "/5.png", title: "অফিসিয়াল সিলমোহর", desc: "খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ", isLogo: true, filterClass: "brightness-[1.10] contrast-125 mix-blend-multiply" }
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-emerald-200 pb-20">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 gap-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-inner">
            <Images className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">গ্যালারি</h1>
          <p className="text-slate-500 text-lg">দরবার শরীফ, খানকা এবং মসজিদের পবিত্র দৃশ্যসমূহ।</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={`img-${i}`}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{img.title}</h3>
                <p className="text-sm text-slate-500">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logos Section */}
        <div className="mt-16 border-t border-slate-200/60 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">লোগো শোকেস</h2>
            <p className="text-slate-500 text-lg">এইচডি কোয়ালিটিতে দেখতে বা ডাউনলোড করতে লোগোর ওপর ক্লিক করুন।</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {logos.map((logo, i) => (
              <div
                key={`logo-${i}`}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer p-10 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => setSelectedImage(logo)}
              >
                <div className={`relative w-40 h-40 sm:w-56 sm:h-56 ${logo.filterClass || 'mix-blend-multiply'} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
                  <Image src={logo.src} alt={logo.title} fill className="object-contain" priority/>
                </div>
                <div className="mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6">
                  <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    শোকেস ভিউ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          {/* Top Actions */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-[101]">
            <a
              href={selectedImage.src}
              download
              onClick={(e) => e.stopPropagation()}
              className="h-12 px-6 flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-lg shadow-emerald-600/20"
            >
              <Download className="w-5 h-5" />
              <span>ডাউনলোড</span>
            </a>
            <button
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className={`relative w-full max-w-5xl aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 animate-in zoom-in-90 duration-300 ${selectedImage.isLogo ? 'bg-white' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              className={`object-contain ${selectedImage.isLogo && selectedImage.filterClass ? selectedImage.filterClass : ''} ${selectedImage.isLogo ? 'scale-75' : ''}`}
              priority
            />
            {/* Title Overlay (Only for photos, not pristine logos) */}
            {!selectedImage.isLogo && (
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
                <p className="text-white/80 text-sm sm:text-base">{selectedImage.desc}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
