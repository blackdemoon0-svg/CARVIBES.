import Link from "next/link";
import { notFound } from "next/navigation";
import { newsArticles, getArticleBySlug } from "@/data/news";

export const dynamic = "force-static";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = newsArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <div className="cv-bg-grid mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs text-white/40">
        <Link href="/news" className="hover:text-white">News</Link> / {article.category}
      </p>
      <span className="mt-4 inline-block rounded-full bg-cv-red/20 px-3 py-1 text-[10px] font-700 uppercase tracking-wide text-cv-red">
        {article.category}
      </span>
      <h1 className="mt-4 font-display text-4xl font-800 leading-tight">{article.title}</h1>
      <p className="mt-4 text-sm text-white/45">
        By {article.author} ·{" "}
        {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} ·{" "}
        {article.readTime} min read
      </p>

      <div className="mt-8 cv-glass rounded-2xl border border-white/10 p-8">
        <p className="text-lg font-600 text-white/80">{article.excerpt}</p>
        <div className="cv-divider my-6" />
        <div className="space-y-5 text-white/70">
          {article.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/explore" className="cv-btn cv-btn-primary px-5 py-2.5 text-sm">
          Explore Related Cars →
        </Link>
        <Link href="/news" className="cv-btn cv-btn-ghost px-5 py-2.5 text-sm">
          ← Back to News
        </Link>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 font-display text-xl font-700">More in {article.category}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} href={`/news/${a.slug}`} className="cv-card cv-glass rounded-2xl border border-white/10 p-5">
                <h3 className="font-700 leading-snug">{a.title}</h3>
                <p className="mt-3 text-xs text-white/40">{a.readTime} min read</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
