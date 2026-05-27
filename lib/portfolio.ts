// lib/portfolio.ts（修正）
import { getPortfolioItems } from "@/lib/notion";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  createdAt: string;
  thumbnail: string;
};

function formatNotionItem(item: any): PortfolioItem {
  const p = item.properties;
  return {
    id: item.id,
    title: p.Name?.title?.[0]?.plain_text || "",
    description: p.説明?.rich_text?.[0]?.plain_text || "",
    category: p.カテゴリ?.select?.name || "",
    url: p["userDefined:URL"]?.url || p.URL?.url || "",
    createdAt: p.作成日?.date?.start || "",
    thumbnail:
      p.サムネイル?.files?.[0]?.file?.url ||
      p.サムネイル?.files?.[0]?.external?.url ||
      "",
  };
}

export async function getPortfolioItemsFormatted(): Promise<PortfolioItem[]> {
  const results = await getPortfolioItems();
  return results.map(formatNotionItem);
}

export async function getCategories(): Promise<string[]> {
  const items = await getPortfolioItemsFormatted();
  return [...new Set(items.map((item) => item.category))].filter(Boolean);
}