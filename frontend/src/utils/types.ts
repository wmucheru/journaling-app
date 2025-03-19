export type JournalItem = {
  id?: number;
  title?: string;
  content?: string;
  categoryId?: number;
  category?: string;
  owner?: string;
  createdBy?: number;
  createdAt?: number;
};

export type JournalCategory = {
  id?: number;
  name?: string;
  active?: boolean;
};
