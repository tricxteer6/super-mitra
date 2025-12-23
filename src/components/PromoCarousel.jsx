import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    image: "/banners/banner-1.jpg",
    alt: "Promo VIP Course Masak",
  },
  {
    id: 2,
    image: "/banners/banner-2.jpg",
    alt: "Belajar Masak dari Rumah",
  },
  {
    id: 3,
    image: "/banners/banner-3.jpg",
    alt: "Upgrade Skill Kuliner",
  },
];

export default function PromoCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Slides */}
      {banners.map((banner, index) => (
        <img
          key={banner.id}
          src={banner.image}
          alt={banner.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700
            ${index === active ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition
              ${i === active ? "bg-white" : "bg-white/60"}
            `}
          />
        ))}
      </div>

      {/* Height Control */}
      <div className="h-36 sm:h-44 md:h-56 lg:h-64" />
    </div>
  );
}
