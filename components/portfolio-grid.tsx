"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/portfolio-card";
import type { PortfolioItem } from "@/lib/portfolio";

type PortfolioGridProps = {
  items: PortfolioItem[];
  categories: string[];
};

const filterColors = [
  { bg: "bg-crayon-red", hover: "hover:bg-crayon-red/80", active: "bg-crayon-red" },
  { bg: "bg-crayon-orange", hover: "hover:bg-crayon-orange/80", active: "bg-crayon-orange" },
  { bg: "bg-crayon-yellow", hover: "hover:bg-crayon-yellow/80", active: "bg-crayon-yellow" },
  { bg: "bg-crayon-green", hover: "hover:bg-crayon-green/80", active: "bg-crayon-green" },
  { bg: "bg-crayon-blue", hover: "hover:bg-crayon-blue/80", active: "bg-crayon-blue" },
  { bg: "bg-crayon-purple", hover: "hover:bg-crayon-purple/80", active: "bg-crayon-purple" },
  { bg: "bg-crayon-pink", hover: "hover:bg-crayon-pink/80", active: "bg-crayon-pink" },
];

export function PortfolioGrid({ items, categories }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div className="space-y-10">
      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 crayon-shadow ${
            selectedCategory === null
              ? "bg-foreground text-background"
              : "bg-card text-foreground hover:bg-muted"
          }`}
          style={{
            borderRadius: selectedCategory === null 
              ? "50px 20px 40px 25px" 
              : "30px 50px 30px 50px",
            transform: selectedCategory === null ? "rotate(-1deg)" : "rotate(0deg)",
          }}
        >
          ALL
        </button>
        {categories.map((category, index) => {
          const color = filterColors[index % filterColors.length];
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 text-lg font-bold transition-all duration-200 active:scale-95 ${
                isSelected
                  ? "bg-foreground text-background scale-110"
                  : `bg-card text-foreground ${color.hover} hover:scale-105 crayon-shadow`
              }`}
              style={{
                borderRadius: isSelected 
                  ? "40px 25px 50px 20px" 
                  : "25px 40px 25px 40px",
                transform: isSelected ? `rotate(${(index % 2 === 0 ? 1 : -1) * 2}deg)` : "rotate(0deg)",
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* グリッド表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id}
            className="animate-float"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <PortfolioCard item={item} colorIndex={index} />
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p 
            className="text-2xl text-muted-foreground inline-block px-8 py-4 bg-card crayon-shadow"
            style={{
              borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
            }}
          >
            該当する成果物がありません
          </p>
        </div>
      )}
    </div>
  );
}
