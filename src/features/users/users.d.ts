export interface UserObj {
   id: number;
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   last_login: string;
   isDeleted: string;
   uuid: string;
}
export type UsersArrType = UsersObj[];

export interface UsersState {
   arr: UserObj[];
   init: boolean;
}
