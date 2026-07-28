import { newsArticles } from "@/data/news";
import NewsClient from "./NewsClient";

export const dynamic = "force-static";

export default function NewsPage() {
  return <NewsClient articles={newsArticles} />;
}
