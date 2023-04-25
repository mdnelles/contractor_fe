export type Anim = {
   css?: string;
   body?: any;
};

export type AnimArr = Anim[];

export type AnimObj = {
   front?: Anim | undefined;
   back?: Anim | undefined;
   left?: Anim | undefined;
   right?: Anim | undefined;
   top?: Anim | undefined;
   bottom?: Anim | undefined;
};
