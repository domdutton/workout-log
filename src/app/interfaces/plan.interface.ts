export interface Plan {
  id: string;
  author: string;
  title: string;
  description: string;
  exercises: Array<string>;
  logs: Array<{ eid: string; date: Date; value: number }>;
}