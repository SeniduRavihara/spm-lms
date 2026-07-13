"use client";

import { IcoStar, IcoUpcoming } from "@/components/icons/LmsIcons";
import Link from "next/link";

interface CourseCardProps {
  image: string;
  category: string;
  title: string;
  rating: number;
  reviews: number;
  instructor: {
    name: string;
    avatar: string;
  };
  price: string;
  oldPrice?: string;
  lessons: number;
  duration: string;
  badge?: string;
}

export default function CourseCard({
  image,
  category,
  title,
  rating,
  reviews,
  instructor,
  price,
  oldPrice,
  lessons,
  duration,
  badge,
}: CourseCardProps) {
  return (
    <div className="bg-card border border-border/50 rounded-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group cursor-pointer flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">
            {badge}
          </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1 bg-true-black/60 backdrop-blur-md text-white text-[12px] font-medium rounded-full">
           {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[12px] font-medium text-primary mb-2 uppercase tracking-wide">
          {category}
        </div>
        <h3 className="text-[16px] font-medium text-foreground mb-4 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <IcoStar
                key={i}
                className={`w-3.5 h-3.5 ${
                  i <= Math.floor(rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-[12.5px] font-medium text-foreground ml-1">{rating}</span>
          <span className="text-[12.5px] text-foreground-muted">({reviews})</span>
        </div>

        {/* Instructor */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary border border-border/50">
              <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[11px] text-foreground-muted leading-none mb-1">Instructor</div>
              <div className="text-[12.5px] font-medium text-foreground leading-none">{instructor.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-foreground-muted">
             <IcoUpcoming className="w-3.5 h-3.5 text-primary" size={14} />
             <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
