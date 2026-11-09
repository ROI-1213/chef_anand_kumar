import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import { blogData } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    return constructMetadata({
      title: "Blog Post | Executive Chef Anand Kumar",
      description: "Personal blog of Executive Chef Anand Kumar.",
      path: "/blog",
    });
  }

  return constructMetadata({
    title: `${post.title} | Executive Chef Anand Kumar Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

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

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postIndex = blogData.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = blogData[postIndex];
  const prevPost = postIndex > 0 ? blogData[postIndex - 1] : null;
  const nextPost =
    postIndex < blogData.length - 1 ? blogData[postIndex + 1] : null;

  return (
    <article className="pt-32 pb-24 bg-obsidian text-ivory relative min-h-screen overflow-hidden">
      {/* Subtle Ambient Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Back to Blog Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#DCA54C] hover:text-white font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL BLOG POSTS</span>
          </Link>
        </div>

        {/* Post Header */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#DCA54C]/15 border border-[#DCA54C]/40 font-sans text-xs uppercase tracking-[0.2em] text-[#DCA54C] font-semibold">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>

            <div className="flex items-center gap-2 font-sans text-xs text-ivory/60 tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5 text-[#DCA54C]" />
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            </div>
          </div>

          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl font-semibold text-white uppercase tracking-[0.1em] leading-tight">
            {post.title}
          </h1>

          <div className="h-[3px] w-24 bg-[#DCA54C] rounded-full" />
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_24px_65px_rgba(0,0,0,0.55)] border border-white/10 bg-[#141413]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Article Body Paragraphs */}
        <div className="bg-[#141413] border border-white/10 rounded-[24px] p-7 sm:p-12 space-y-6 font-sans text-base sm:text-lg text-ivory/90 leading-[1.85] font-light shadow-xl">
          {post.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#DCA54C]">
            <span>Written by Executive Chef Anand Kumar</span>
            <span>Official Culinary Chronicle</span>
          </div>
        </div>

        {/* Prev / Next Article Navigation */}
        <nav className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group p-6 rounded-2xl bg-[#141413] border border-white/10 hover:border-[#DCA54C]/50 transition-all flex flex-col justify-between space-y-2"
            >
              <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/50 group-hover:text-[#DCA54C]">
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Article
              </span>
              <span className="font-sans text-sm sm:text-base font-semibold text-white uppercase tracking-wider line-clamp-2 group-hover:text-[#DCA54C] transition-colors">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group p-6 rounded-2xl bg-[#141413] border border-white/10 hover:border-[#DCA54C]/50 transition-all flex flex-col justify-between items-end text-right space-y-2"
            >
              <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/50 group-hover:text-[#DCA54C]">
                Next Article
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="font-sans text-sm sm:text-base font-semibold text-white uppercase tracking-wider line-clamp-2 group-hover:text-[#DCA54C] transition-colors">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}
