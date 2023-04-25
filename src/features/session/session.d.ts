type UserType = {
   token: string;
   email: string | any;
   bio?: string | undefined;
   displayName?: string | number | undefined;
   photoUrl?: string | undefined;
   uid?: string | number | undefined;
   createdAt: number;
   creationTime?: string | undefined;
   lastLoginAt: number;
   lastSignInTime?: string | undefined;
};

export type Dimensions = {
   wi: number;
   he: number;
};

export type liveMenuType = {
   name: string;
   left: number;
   width: number;
};

export interface SessionState {
   loginDisplay: number | any; // 0 hide login, 1 show login, 2 show logout
   loginDisplayLastClicked: number | string | undefined; // 0=close 1=logout, 2=login/info
   language: string;
   paused: boolean;
   toggle: boolean;
   cookieConsent: boolean;
   status: "idle" | "loading" | "failed";
   user: UserType;
   value: number;
   speed: number; // speed in seconds of the site (animations)
   darkMode: boolean;
   dim: Dimensions;
}
