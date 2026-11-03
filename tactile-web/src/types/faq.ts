export interface FaqGroup {
  id: string;
  title: string;
  items: {
    question: string;
    answer: string;
    link?: { label: string; href: string };
  }[];
}
