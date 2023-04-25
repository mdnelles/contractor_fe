export const isValidEmail = (email: any) => {
   return String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export const isValidPassword = (password: any) => {
   try {
      return password.toString().length > 1 ? true : false;
   } catch (err) {
      return false;
   }
};

export const isValidSession = (session: any) => {
   return session && session.user && session.user.token ? true : false;
};
