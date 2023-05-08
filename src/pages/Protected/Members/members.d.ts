export interface Column {
   email: string;
   firstName: number;
   userLevel: number;
   homeStore: number;
   createdAt: number;
}

export const columns: readonly Column[] | any[] = [
   { id: "_id", label: "ID", minWidth: 10 },
   { id: "email", label: "email", minWidth: 100 },
   {
      id: "firstName",
      label: "Name",
      minWidth: 100,
   },
   {
      id: "userLevel",
      label: "lvl",
      minWidth: 10,
   },
   {
      id: "homeStore",
      label: "Store",
      minWidth: 10,
   },
   {
      id: "createdAt",
      label: "Start",
      minWidth: 170,
   },
];
