"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, ExternalLink } from "lucide-react";
import { videosData, VideoItem } from "@/lib/content";

export default function VideoArchiveGrid() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="space-y-12">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videosData.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group cursor-pointer bg-obsidian-100 rounded-xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 shadow-xl flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={`Chef Anand Kumar Video #${video.order}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-colors" />

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold/90 text-obsidian flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold transition-all duration-300">
                  <Play className="w-5 h-5 fill-obsidian ml-0.5" />
                </div>
              </div>

              {/* Order badge */}
              <div className="absolute top-3 left-3 bg-obsidian/85 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                Video {String(video.order).padStart(2, "0")}
              </div>
            </div>

            {/* Meta */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-serif text-lg text-ivory-light group-hover:text-gold transition-colors font-light">
                  Culinary Demonstration #{video.order}
                </p>
                <span className="font-sans text-xs text-ivory/50 mt-1 block">
                  YouTube ID: {video.id}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gold/80 font-sans">
                <span>Watch Video</span>
                <Play className="w-3 h-3 fill-gold" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-3 rounded-full border border-white/20 text-ivory hover:text-gold hover:border-gold transition-colors z-50"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
              title={`Chef Anand Kumar Video Demonstration #${activeVideo.order}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
