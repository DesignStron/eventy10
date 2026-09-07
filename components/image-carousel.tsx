"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  initialImages?: string[];
}

export default function ImageCarousel({ initialImages = [] }: ImageCarouselProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(initialImages.length === 0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Fetch only if no initial images were provided (SSR fallback)
  useEffect(() => {
    if (initialImages.length > 0) return;
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/galeria");
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          const byCategory: Record<string, any[]> = {};
          data.images.forEach((img: any) => {
            const cat = (img.category || "").toString().trim();
            if (!cat) return;
            if (cat.toLowerCase() === "inne") return;
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(img);
          });

          const categories = Object.keys(byCategory);
          const maxPerCategory = 3;
          const categoryImages: any[][] = categories.map((cat) =>
            byCategory[cat].slice(0, maxPerCategory)
          );

          const interleaved: string[] = [];
          let index = 0;
          let hasMore = true;

          while (hasMore) {
            hasMore = false;
            for (let i = 0; i < categoryImages.length; i++) {
              if (index < categoryImages[i].length) {
                interleaved.push(categoryImages[i][index].url);
                hasMore = true;
              }
            }
            index++;
          }

          setImages(interleaved);
        }
      } catch (e) {
        console.error("Failed to fetch gallery images:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe && images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        width:"100%",height:"100%",
        background:"linear-gradient(135deg,rgba(240,23,122,.08) 0%,rgba(240,23,122,.02) 100%)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <span style={{fontSize:"4rem",animation:"dot 1.5s ease-in-out infinite"}}>✦</span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={{
        width:"100%",height:"100%",
        background:"linear-gradient(135deg,rgba(240,23,122,.08) 0%,rgba(240,23,122,.02) 100%)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <span style={{fontSize:"4rem",color:"rgba(240,23,122,.3)"}}>✦</span>
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={img}
            alt={`Realizacja ${index + 1}`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
          />
        </div>
      ))}
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(to top,rgba(6,5,8,.9) 0%,rgba(6,5,8,.3) 42%,rgba(6,5,8,.04) 100%)",
        zIndex: 2,
      }}/>
      <div style={{
        position:"absolute",bottom:"0.5rem",left:"50%",transform:"translateX(-50%)",
        display:"flex",gap:0,zIndex:10,padding:"0.25rem 0",
      }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Przejdź do slajdu ${index + 1}`}
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              pointerEvents: "auto",
              flexShrink: 0,
            }}
          >
            <span style={{
              display: "block",
              width: index === currentIndex ? "1.5rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "9999px",
              background: index === currentIndex ? "var(--pink)" : "rgba(255,255,255,.4)",
              transition: "all 300ms ease",
            }} />
          </button>
        ))}
      </div>
    </div>
  );
}
