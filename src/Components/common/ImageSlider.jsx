import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Circle } from "lucide-react";

/**
 * ImageSlider — production-style carousel
 *
 * Props
 * ----------------------------------------------------------------------
 * images            : [{ src, alt, caption }]  (required)
 * width             : any CSS width value. Pass viewport units directly,
 *                      e.g. "80vw". Default: "100%"
 * height            : any CSS height value, e.g. "60vh". Default: "50vh"
 * autoPlay          : boolean, default true
 * autoPlayInterval  : ms between slides, default 4000
 * loop              : boolean, wrap around at ends, default true
 * showArrows        : boolean, default true
 * showDots          : boolean, default true
 * showThumbnails    : boolean, default false
 * showPlayButton    : boolean, default true
 * pauseOnHover      : boolean, default true
 * swipe             : enable touch/drag swipe, default true
 * keyboardNav       : enable left/right arrow key control, default true
 * transitionMs      : slide transition duration, default 450
 * objectFit         : "cover" | "contain", default "cover"
 * rounded           : boolean, default true
 * onSlideChange     : (index) => void
 * ----------------------------------------------------------------------
 */
export default function ImageSlider({
  images = [],
  width = "100%",
  height = "50vh",
  autoPlay = true,
  autoPlayInterval = 4000,
  loop = true,
  showArrows = true,
  showDots = true,
  showThumbnails = false,
  showPlayButton = true,
  pauseOnHover = true,
  swipe = true,
  keyboardNav = true,
  transitionMs = 450,
  objectFit = "cover",
  rounded = true,
  onSlideChange,
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovering, setIsHovering] = useState(false);
  const [loaded, setLoaded] = useState({});
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const dragStartX = useRef(0);
  const count = images.length;

  const goTo = useCallback(
    (i) => {
      let next = i;
      if (loop) {
        next = (i + count) % count;
      } else {
        next = Math.min(Math.max(i, 0), count - 1);
      }
      setIndex(next);
      onSlideChange && onSlideChange(next);
    },
    [count, loop, onSlideChange]
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || count <= 1) return;
    if (pauseOnHover && isHovering) return;
    timerRef.current = setTimeout(() => next(), autoPlayInterval);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, isHovering, index, autoPlayInterval, pauseOnHover, count, next]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboardNav) return;
    const handler = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, keyboardNav]);

  // Swipe / drag handlers
  const onDragStart = (clientX) => {
    if (!swipe) return;
    setIsDragging(true);
    dragStartX.current = clientX;
    setIsPlaying(false);
  };
  const onDragMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStartX.current);
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    const threshold = 60;
    if (dragOffset > threshold) prev();
    else if (dragOffset < -threshold) next();
    setDragOffset(0);
    setIsDragging(false);
    if (autoPlay) setIsPlaying(true);
  };

  if (!count) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-neutral-100 text-neutral-400 rounded-xl text-sm"
      >
        No images to display
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image slider"
      // style={{ width, height }}
      className={`relative select-none outline-none group bg-neutral-900 ${
        rounded ? "rounded-2xl" : ""
      } overflow-hidden w-full h-full shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        onDragEnd();
      }}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
    >
      {/* Slide track */}
      <div
        ref={trackRef}
        className="flex h-full w-full"
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
          transition: isDragging
            ? "none"
            : `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
          >
            {!loaded[i] && (
              <div className="absolute inset-0 animate-pulse bg-neutral-800" />
            )}
            <img
              src={img.src}
              alt={img.alt || `Slide ${i + 1}`}
              draggable={false}
              loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
              onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
              className={`h-full w-full transition-opacity duration-300 ${
                objectFit === "contain" ? "object-contain" : "object-cover"
              } ${loaded[i] ? "opacity-100" : "opacity-0"}`}
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-liner-to-t from-black/70 to-transparent px-4 pt-10 pb-4 sm:px-6">
                <p className="text-white text-sm sm:text-base font-medium drop-shadow">
                  {img.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Play / pause */}
      {showPlayButton && count > 1 && (
        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/70"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      )}

      {/* Counter */}
      <div className="absolute top-2 left-2 z-10 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {index + 1} / {count}
      </div>

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="p-1"
            >
              <Circle
                size={i === index ? 8 : 6}
                className={`transition-all duration-200 ${
                  i === index
                    ? "fill-white text-white"
                    : "fill-white/40 text-white/40 hover:fill-white/70 hover:text-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && count > 1 && (
        <div className="absolute bottom-3 right-3 z-10 hidden gap-1.5 sm:flex">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Thumbnail ${i + 1}`}
              className={`h-10 w-14 overflow-hidden rounded-md ring-2 transition-all duration-200 ${
                i === index ? "ring-white" : "ring-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Autoplay progress bar */}
      {isPlaying && count > 1 && !(pauseOnHover && isHovering) && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
          <div
            key={index}
            className="h-full bg-white"
            style={{
              animation: `slider-progress ${autoPlayInterval}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes slider-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
