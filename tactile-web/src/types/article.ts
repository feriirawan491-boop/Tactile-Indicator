export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
}
export interface Article {
  slug: string;
  title: string;
  summary: string;
  topic: "Dasar" | "Fungsi" | "Pemilihan";
  featured?: boolean;
  sections: ArticleSection[];
  sources: { title: string; url: string }[];
  relatedLinks: { label: string; href: string }[];
  approved: boolean;
}
