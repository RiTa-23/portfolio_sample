"use client";

import Image from "next/image";
import { ExternalLink, Calendar, Sparkles } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";

type PortfolioCardProps = {
  item: PortfolioItem;
  colorIndex: number;
};

const crayonColors = [
  "bg-crayon-red",
  "bg-crayon-orange", 
  "bg-crayon-yellow",
  "bg-crayon-green",
  "bg-crayon-blue",
  "bg-crayon-purple",
  "bg-crayon-pink",
];

const crayonBorderColors = [
  "border-crayon-red",
  "border-crayon-orange",
  "border-crayon-yellow", 
  "border-crayon-green",
  "border-crayon-blue",
  "border-crayon-purple",
  "border-crayon-pink",
];

export function PortfolioCard({ item, colorIndex }: PortfolioCardProps) {
  const formattedDate = new Date(item.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const bgColor = crayonColors[colorIndex % crayonColors.length];
  const borderColor = crayonBorderColors[colorIndex % crayonBorderColors.length];

  return (
    <div 
      className={`group relative bg-card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:rotate-1 crayon-border crayon-shadow border-4 ${borderColor}`}
      style={{
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
      }}
    >
      {/* 装飾スパークル */}
      <Sparkles className={`absolute -top-2 -right-2 w-8 h-8 text-crayon-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />
      
      {/* サムネイル */}
      <div className="relative aspect-video overflow-hidden m-3 rounded-2xl">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* リンクボタン */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 p-3 bg-card rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 crayon-shadow"
          style={{
            borderRadius: "60% 40% 50% 50%",
          }}
          aria-label={`${item.title}を開く`}
        >
          <ExternalLink className="w-5 h-5 text-foreground" />
        </a>
      </div>

      {/* コンテンツ */}
      <div className="px-5 pb-5 space-y-3">
        {/* カテゴリバッジ */}
        <span 
          className={`inline-block px-4 py-1.5 text-sm font-bold text-foreground ${bgColor} crayon-shadow`}
          style={{
            borderRadius: "50px 20px 40px 20px",
            transform: "rotate(-2deg)",
          }}
        >
          {item.category}
        </span>

        {/* タイトル */}
        <h3 className="text-xl font-bold leading-tight line-clamp-2 text-foreground">
          {item.title}
        </h3>

        {/* 説明 */}
        <p className="text-base text-muted-foreground line-clamp-3 leading-relaxed">
          {item.description}
        </p>

        {/* 日付 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={item.createdAt}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
