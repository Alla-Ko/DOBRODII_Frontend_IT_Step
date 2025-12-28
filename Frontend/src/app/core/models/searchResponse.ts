export interface SearchResponse {
  animals: SearchCard[];
  shelters: SearchCard[];
  projects: SearchCard[];
  news: SearchCard[];
  stories: SearchCard[];
  pages: SearchCard[];
}
export interface SearchCard {
  title: string;
  slug: string;
  snippet: string;
  route?: string;
}
