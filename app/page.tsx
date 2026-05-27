import { getPortfolioItemsFormatted, getCategories } from "@/lib/portfolio";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { Pencil, Star } from "lucide-react";

export default async function Home() {
  const items = await getPortfolioItemsFormatted();
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-crayon-yellow/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-crayon-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-crayon-blue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-crayon-green/20 rounded-full blur-3xl" />
      </div>

      {/* ヘッダー */}
      <header className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            {/* タイトル */}
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground inline-block px-8 py-4 bg-card crayon-shadow relative"
              style={{
                borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                transform: "rotate(-1deg)",
              }}
            >
              <span className="relative">
                Portfolio
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-crayon-yellow/60 -z-10 skew-x-3" />
              </span>
            </h1>

            {/* サブタイトル */}
            <p
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              これまでに手がけたプロジェクトをご紹介します
            </p>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <section className="relative container mx-auto px-4 py-8 md:py-12">
        <PortfolioGrid items={items} categories={categories} />
      </section>

      {/* フッター */}
      <footer className="relative mt-auto py-8">
        <div className="container mx-auto px-4">
          <p
            className="text-lg text-muted-foreground text-center inline-block w-full"
          >
            <span
              className="inline-block px-6 py-2 bg-card crayon-shadow"
              style={{
                borderRadius: "30px 50px 30px 50px",
              }}
            >
              {new Date().getFullYear()} Portfolio
            </span>
          </p>
        </div>
      </footer>
    </main>
  );
}
