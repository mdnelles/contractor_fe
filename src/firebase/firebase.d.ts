export interface LoginEmailPwdProps {
  email: any;
  password: any;
}

export interface RegisterWithEmailPasswordProps {
  name: string | any;
  email: string | any;
  password: string | any;
}

interface User {
  uid: string;
  email: string;
}
