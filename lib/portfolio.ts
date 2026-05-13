// lib/portfolio.ts
// 後でNotionAPIに移行する際は、このファイルのgetPortfolioItems関数を変更するだけでOK

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  createdAt: string;
  thumbnail: string;
};

// JSONからデータを取得する関数
// NotionAPI移行時はこの関数を書き換える
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const { default: data } = await import("@/data/portfolio.json");
  return data.items as PortfolioItem[];
}

// カテゴリ一覧を取得
export async function getCategories(): Promise<string[]> {
  const items = await getPortfolioItems();
  const categories = [...new Set(items.map((item) => item.category))];
  return categories.filter(Boolean);
}
