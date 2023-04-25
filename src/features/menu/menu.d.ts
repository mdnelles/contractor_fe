export type liveMenuType = {
   name: string;
   left: number;
   width: number;
};

export interface MenuState {
   liveMenu: liveMenuType | undefined;
   compactMenu: boolean;
}
