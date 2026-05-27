// lib/notion.ts（新規作成）
export const getPortfolioItems = async () => {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Notion API error");
  }
  const data = await res.json();
  return data.results;
};