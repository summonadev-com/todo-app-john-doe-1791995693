export type Todo = {
  id: string;
  title: string;
  done: boolean;
  due: string | null; // YYYY-MM-DD
  createdAt: number;
};
