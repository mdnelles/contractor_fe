export interface StoreObj {
   number: number;
   address: string;
   city: string;
   province: string;
   postalCode: string;
   phone: string;
}

export type StoresState = {
   arr: StoreObj[];
};
