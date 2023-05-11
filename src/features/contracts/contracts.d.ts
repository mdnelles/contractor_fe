export interface ContractObj {
   _id: string;
   jobTitle: string;
   task: string;
   room: string;
   description: string;
   clientId: string;
   homeStore: number;
   stage: number;
   orderPickedBy?: string | any;
   createdAt: number;
}
export type ContractsArrType = ContractsObj[];

export interface ContractsState {
   arr: ContractObj[];
   init: boolean;
}
