export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type FilterElement = {
  searchByTitle: string;
  searchByDescription: string;
  searchByBoth: string;
  filterStatus: string;
};
