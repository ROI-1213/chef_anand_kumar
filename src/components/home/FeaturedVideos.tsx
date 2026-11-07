"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowRight } from "lucide-react";
import { videosData, VideoItem } from "@/lib/content";

export default function FeaturedVideos() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // First 4 original YouTube videos from the verified 22 broadcasts
  const featured = videosData.slice(0, 4);

  return (
    <section
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#FAF6F0] text-[#221D1A] overflow-hidden select-none"
      aria-label="Culinary Stories in Motion"
    >
      {/* Silk Ivory Luxury Background with Golden Corner Curves */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/videos/story-motion-bg.jpg"
          alt=""
          fill
          priority
          unoptimized
          quality={96}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header in LATEST WORK Font Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="flex flex-col items-start">
            <span className="font-sans text-xs sm:text-[13px] tracking-[0.22em] text-[#9F7B3C] uppercase font-semibold mb-2">
              CULINARY STORIES IN MOTION
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141414] uppercase tracking-[0.22em]">
              THE STORY IN MOTION
            </h2>
            <div className="h-[3px] w-24 sm:w-28 bg-[#DCA54C] mt-3 rounded-full" />
          </div>

          <Link
            href="/video-archive"
            className="group inline-flex items-center gap-3 self-start md:self-auto px-7 sm:px-8 py-3.5 rounded-full border border-[#B59252] bg-[#FAF6F0]/90 hover:bg-[#B59252] text-[#141414] hover:text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-[0_4px_16px_rgba(181,146,82,0.12)] transition-all duration-300"
          >
            <span>EXPLORE VIDEO ARCHIVE ({videosData.length})</span>
            <ArrowRight className="w-4 h-4 text-[#7D5E2A] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
          </Link>
        </div>

        {/* 4 Original YouTube Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {featured.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer bg-[#FBF9F5] rounded-[18px] overflow-hidden border border-[#EFE8DC] shadow-[0_14px_38px_rgba(40,30,15,0.08)] hover:shadow-[0_22px_48px_rgba(40,30,15,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Original YouTube Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-b-[14px] overflow-hidden bg-[#171412]">
                <Image
                  src={video.thumbnail}
                  alt={`Chef Anand Kumar Culinary Feature #${video.order}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />

                {/* Top-Left Cream Pill Badge ("EPISODE 01..04") */}
                <div className="absolute top-3.5 left-3.5 z-10 bg-[#F5EFE2]/95 px-3.5 py-1 rounded-full text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#221D1A] shadow-sm">
                  Episode 0{video.order}
                </div>

                {/* Central Champagne Play Button */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#F3E6CA]/95 text-[#8B682F] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.22)] group-hover:scale-110 group-hover:bg-[#EBD7AE] transition-all duration-300">
                    <Play className="w-5 h-5 fill-[#8B682F] text-[#8B682F] ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body in LATEST WORK Font Style */}
              <div className="px-5 pt-5 pb-6 flex-1 flex flex-col items-start justify-between">
                <div>
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-[#141414] group-hover:text-[#9F7B3C] uppercase tracking-[0.18em] transition-colors leading-snug">
                    CULINARY FEATURE #{video.order}
                  </h3>
                  <div className="w-12 h-[3px] bg-[#DCA54C] mt-2.5 mb-3 rounded-full" />
                </div>
                <span className="font-sans text-[11px] sm:text-xs text-[#574E46] font-medium uppercase tracking-[0.12em] block">
                  YOUTUBE BROADCAST &bull; CLICK TO WATCH
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-3 rounded-full border border-white/20 text-white hover:text-[#DCA54C] hover:border-[#DCA54C] transition-colors z-50 cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
              title={`Chef Anand Kumar Culinary Video #${activeVideo.order}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
