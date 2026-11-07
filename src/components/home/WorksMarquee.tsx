"use client";

import Image from "next/image";

export interface WorkItem {
  id: string;
  src: string;
  alt: string;
}

export const WORKS_IMAGES: WorkItem[] = [
  {
    id: "work-1",
    src: "/images/works-marquee/work-1.jpg",
    alt: "Chef Anand Kumar live culinary masterclass at Hilton Culinary Studio",
  },
  {
    id: "work-2",
    src: "/images/works-marquee/work-2.jpg",
    alt: "Artisanal two-tier bronze high tea & brunch presentation",
  },
  {
    id: "work-3",
    src: "/images/works-marquee/work-3.jpg",
    alt: "Bespoke luxury hospitality welcome cake creation for Meliá Desert Palm",
  },
  {
    id: "work-4",
    src: "/images/works-marquee/work-4.jpg",
    alt: "Handcrafted bi-color and classic butter croissants with UAE tribute",
  },
  {
    id: "work-5",
    src: "/images/works-marquee/work-5.jpg",
    alt: "Luxury brunch spread with golden table lamp, avocado tartines, scones, and berry parfaits",
  },
  {
    id: "work-6",
    src: "/images/works-marquee/work-6.jpg",
    alt: "Newspaper feature on Executive Chef Anand Kumar with live flaming wok artistry",
  },
  {
    id: "work-7",
    src: "/images/works-marquee/work-7.jpg",
    alt: "Artisanal granola berry tartlets and layered pink parfait jars",
  },
  {
    id: "work-8",
    src: "/images/works-marquee/work-8.jpg",
    alt: "Glazed eggplant with red chili and fresh Thai basil over steamed jasmine rice",
  },
  {
    id: "work-9",
    src: "/images/works-marquee/work-9.jpg",
    alt: "Layered dark chocolate and raspberry entremet with gold leaf and chocolate curl",
  },
  {
    id: "work-10",
    src: "/images/works-marquee/work-10.jpg",
    alt: "Crispy glazed culinary creation in artisan ceramic bowl with avocado crema and caviar",
  },
  {
    id: "work-11",
    src: "/images/works-marquee/work-11.jpg",
    alt: "Char-grilled jumbo prawns with fresh dill over delicate ribbons by Chef Anand Kumar",
  },
  {
    id: "work-12",
    src: "/images/works-marquee/work-12.jpg",
    alt: "Luxury glass cloche welcome amenity for Meliá Desert Palm with Medjool date and ginger relish",
  },
  {
    id: "work-13",
    src: "/images/works-marquee/work-13.jpg",
    alt: "Artisanal chocolate pill bonbon collection — Joy Pill, Chill Pill, Go Pill, Love Pill, Luck Pill",
  },
];

interface ColumnCardConfig {
  imgIndex: number;
  heightClass: string;
}

const COLUMNS_CONFIG: {
  id: string;
  direction: "up" | "down";
  duration: string;
  cards: ColumnCardConfig[];
}[] = [
  {
    id: "col-1",
    direction: "up",
    duration: "44s",
    cards: [
      { imgIndex: 0, heightClass: "h-[300px] sm:h-[350px] lg:h-[380px]" },
      { imgIndex: 4, heightClass: "h-[320px] sm:h-[370px] lg:h-[400px]" },
      { imgIndex: 8, heightClass: "h-[300px] sm:h-[350px] lg:h-[380px]" },
      { imgIndex: 12, heightClass: "h-[320px] sm:h-[370px] lg:h-[400px]" },
    ],
  },
  {
    id: "col-2",
    direction: "down",
    duration: "48s",
    cards: [
      { imgIndex: 1, heightClass: "h-[380px] sm:h-[440px] lg:h-[480px]" },
      { imgIndex: 5, heightClass: "h-[320px] sm:h-[370px] lg:h-[400px]" },
      { imgIndex: 9, heightClass: "h-[380px] sm:h-[440px] lg:h-[480px]" },
      { imgIndex: 2, heightClass: "h-[320px] sm:h-[370px] lg:h-[400px]" },
    ],
  },
  {
    id: "col-3",
    direction: "up",
    duration: "46s",
    cards: [
      { imgIndex: 6, heightClass: "h-[380px] sm:h-[440px] lg:h-[480px]" },
      { imgIndex: 10, heightClass: "h-[320px] sm:h-[370px] lg:h-[400px]" },
      { imgIndex: 3, heightClass: "h-[380px] sm:h-[440px] lg:h-[480px]" },
      { imgIndex: 11, heightClass: "h-[320px] sm:h-[370px] lg:h-[400px]" },
    ],
  },
  {
    id: "col-4",
    direction: "down",
    duration: "45s",
    cards: [
      { imgIndex: 7, heightClass: "h-[360px] sm:h-[410px] lg:h-[440px]" },
      { imgIndex: 12, heightClass: "h-[290px] sm:h-[330px] lg:h-[360px]" },
      { imgIndex: 8, heightClass: "h-[360px] sm:h-[410px] lg:h-[440px]" },
      { imgIndex: 9, heightClass: "h-[290px] sm:h-[330px] lg:h-[360px]" },
    ],
  },
];

export default function WorksMarquee() {
  const getImg = (idx: number) => WORKS_IMAGES[idx % WORKS_IMAGES.length];

  return (
    <section
      className="relative w-full bg-white pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden select-none"
      aria-label="Works Gallery Showcase"
    >
      {/* Full-Width Two-Tone Background Split (No Blank Side Margins) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col">
        <div className="h-[64%] w-full bg-white" />
        <div className="h-[36%] w-full bg-[#F2F2F2]" />
      </div>

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading in Exact Uppercase + Gold Underline Format (Matching LATEST WORK) */}
        <div className="mb-10 sm:mb-14 flex flex-col items-center justify-center">
          <h2 className="text-center font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141414] uppercase tracking-[0.22em]">
            WORKS
          </h2>
          <div className="h-[3px] w-24 sm:w-28 bg-[#DCA54C] mt-3 rounded-full" />
        </div>

        {/* Full-Width 4-Column Continuous Up & Down Sliding Grid */}
        <div className="relative w-full h-[640px] sm:h-[760px] lg:h-[840px] overflow-hidden rounded-[20px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 h-full w-full">
            {COLUMNS_CONFIG.map((col) => (
              <div
                key={col.id}
                className="relative w-full h-full overflow-hidden"
              >
                <div
                  style={{ animationDuration: col.duration }}
                  className={`flex flex-col w-full ${
                    col.direction === "up"
                      ? "animate-works-col-up"
                      : "animate-works-col-down"
                  } hover:[animation-play-state:paused]`}
                >
                  {/* Render two identical vertical sets for seamless 0% <-> -50% infinite loop */}
                  {[0, 1].map((setIdx) => (
                    <div
                      key={`${col.id}-set-${setIdx}`}
                      className="flex flex-col gap-5 sm:gap-6 lg:gap-7 pb-5 sm:pb-6 lg:pb-7 w-full shrink-0"
                    >
                      {col.cards.map((card, cardIdx) => {
                        const item = getImg(card.imgIndex);
                        return (
                          <div
                            key={`${col.id}-${setIdx}-${cardIdx}`}
                            className={`relative w-full ${card.heightClass} rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.1)] bg-neutral-100 group shrink-0`}
                          >
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              unoptimized
                              quality={98}
                              sizes="(max-width: 1024px) 50vw, 25vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes worksColumnSlideUp {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
        @keyframes worksColumnSlideDown {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-works-col-up {
          animation: worksColumnSlideUp 45s linear infinite;
          will-change: transform;
        }
        .animate-works-col-down {
          animation: worksColumnSlideDown 47s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
