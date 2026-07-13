"use client";

import { PieChart, TrendingUp, Heart, Activity, Atom, Palette, Code, Megaphone } from "lucide-react";

const categories = [
  { name: "Management", courses: 2, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/management.svg" },
  { name: "Business Strategy", courses: 2, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/business.svg" },
  { name: "Lifestyle", courses: 3, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/lifestyle.svg" },
  { name: "Health & Fitness", courses: 1, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/health.svg" },
  { name: "Science", courses: 1, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/science.svg" },
  { name: "Design", courses: 9, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/design.svg" },
  { name: "Web Development", courses: 7, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/development.svg" },
  { name: "Marketing", courses: 0, icon: "https://lms.rocket-soft.org/store/1/default_images/trend_categories_icons/marketing.svg" },
];

export default function TrendingCategories() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-4 uppercase tracking-wider">
             Trending
          </div>
          <h2 className="text-[34px] font-black text-foreground mb-4 tracking-[-0.03em]">Trending Categories</h2>
          <p className="text-[13.5px] text-foreground-muted max-w-2xl mx-auto leading-relaxed">
             Explore our top-rated categories and find the perfect course to advance your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="p-5 bg-card border border-border/50 rounded-md flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer group">
              <div className="w-14 h-14 rounded-md bg-secondary flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                <img src={cat.icon} alt={cat.name} className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-[13.5px] font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                 {cat.name}
              </h3>
              <p className="text-[12px] text-foreground-muted">{cat.courses} Courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
