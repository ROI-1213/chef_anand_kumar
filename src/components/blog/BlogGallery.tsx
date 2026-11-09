"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, X, Tag } from "lucide-react";
import { blogData, BlogArticleItem } from "@/lib/content";

function formatBlogDate(dateStr: string) {
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function BlogGallery() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogData.map((b) => b.category)));
    return ["All", ...unique];
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<BlogArticleItem | null>(null);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogData;
    return blogData.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  return (
    <div className="space-y-12">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-4 border-b border-white/10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-obsidian font-semibold"
                  : "text-ivory/60 hover:text-ivory bg-white/5 border border-white/10"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="blogCategoryPill"
                  className="absolute inset-0 bg-gold rounded-full -z-10 shadow-lg shadow-gold/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Blog Articles Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.article
              layout
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#141413] border border-white/10 hover:border-[#DCA54C]/50 rounded-[24px] overflow-hidden flex flex-col shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition-all duration-500"
            >
              {/* Post Featured Image */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative w-full h-[270px] sm:h-[300px] overflow-hidden block bg-charcoal"
              >
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-black/20 opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#DCA54C]/40 font-sans text-[10px] uppercase tracking-[0.2em] text-[#DCA54C] font-semibold">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Post Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  {/* Date */}
                  <div className="flex items-center gap-2 font-sans text-xs text-ivory/55 tracking-wider uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#DCA54C]" />
                    <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="font-sans text-lg sm:text-xl font-semibold text-white uppercase tracking-[0.08em] leading-snug group-hover:text-[#DCA54C] transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="h-[2px] w-12 bg-[#DCA54C]/80 rounded-full" />

                  {/* Excerpt */}
                  <p className="font-sans text-sm text-ivory/75 leading-relaxed font-light line-clamp-4 pt-1">
                    {post.paragraphs[0] || post.excerpt}
                  </p>
                </div>

                {/* Read Full Story Button (Internal Link + Quick Read Option) */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#DCA54C] hover:text-white font-semibold transition-colors group/btn"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="font-sans text-[11px] uppercase tracking-widest text-ivory/50 hover:text-[#DCA54C] transition-colors cursor-pointer"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Quick View Article Modal (Stays 100% Inside the Page) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-[#141413] border border-white/15 rounded-[28px] overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-ivory hover:text-[#DCA54C] border border-white/15 transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                {/* Modal Hero Image */}
                <div className="relative w-full h-[300px] sm:h-[420px] bg-black">
                  <Image
                    src={selectedPost.featuredImage}
                    alt={selectedPost.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#DCA54C] text-obsidian font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                      {selectedPost.category}
                    </span>
                    <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold text-white uppercase tracking-[0.1em]">
                      {selectedPost.title}
                    </h2>
                    <p className="font-sans text-xs text-ivory/70 uppercase tracking-widest">
                      {formatBlogDate(selectedPost.date)} &bull; By Executive Chef Anand Kumar
                    </p>
                  </div>
                </div>

                {/* Modal Article Content */}
                <div className="p-6 sm:p-10 space-y-5 font-sans text-base sm:text-lg text-ivory/85 leading-relaxed font-light">
                  {selectedPost.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
