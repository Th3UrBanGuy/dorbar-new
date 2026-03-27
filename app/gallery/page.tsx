"use client";
import { useState } from "react";
import Image from "next/image";
import { Images, X } from "lucide-react";

export default function GalleryPage() {
  const images = [
    { src: "/darbar image.jpg", title: "দরবার শরীফ", desc: "খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ প্রাঙ্গণ" },
    { src: "/khanka.jpg", title: "খানকা শরীফ", desc: "খাজা গরীবে নেওয়াজ (রহ.) এর পবিত্র খানকা শরীফ" },
    { src: "/mosque.jpg", title: "খিজির (আ.) মসজিদ", desc: "খাজা খোয়াজ খিজির (আ.) মসজিদ" },
    { src: "/mosque_back.jpg", title: "মসজিদের পিছনের অংশ", desc: "মসজিদের পিছনের দিকের দৃশ্য" }
  ];

  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-emerald-200">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 gap-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-inner">
            <Images className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">গ্যালারি</h1>
          <p className="text-slate-500 text-lg">দরবার শরীফ, খানকা এবং মসজিদের পবিত্র দৃশ্যসমূহ। বিস্তারিত দেখতে ছবিতে ক্লিক করুন।</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
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
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[101]"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 animate-in zoom-in-90 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              className="object-contain"
              priority
            />
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
              <p className="text-white/80 text-sm sm:text-base">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
