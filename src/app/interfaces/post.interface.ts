export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: Array<string>;
  dislikes: Array<string>;
  posted: Date;
  edited: Date;
}