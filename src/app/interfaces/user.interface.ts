export interface User {
  id: string;
  username: string;
  plans: Array<string>;
  pfpUrl: string;
  posts: Array<string>;
}