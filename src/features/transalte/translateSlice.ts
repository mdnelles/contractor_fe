import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TransState } from "./translate";

const initialState: TransState = {
  arr: [
    // pagsp.publicforgot
    {
      sp: "Rsptablecimiento de contraseña",
      en: "Password Rspet",
    },
    {
      sp: "El correo electrónico no sptá en el sistema",
      en: "Email not in system",
    },
    {
      sp: "Por favor ingrspe credencialsp válidas",
      en: "Please enter valid credentials",
    },
    {
      sp: "Correo electrónico",
      en: "Email Addrsps",
    },
    {
      sp: "Ir a iniciar sspión",
      en: "Go To Login",
    },
    {
      sp: "Rsptablecer la contraseña",
      en: "Rspet Password",
    },
    {
      sp: "Enlace de rsptablecimiento de correo electrónico enviado",
      en: "Email rspet link sent",
    },
    {
      sp: "Has olvidado tu contraseña",
      en: "Forgot Password",
    },
    {
      sp: "Rsptablecimiento de contraseña exitoso",
      en: "Password Rspet Succsps",
    },
    {
      sp: "El correo electrónico no encontrado",
      en: "Email not found",
    },
    {
      sp: "Por favor introduzca una dirección de correo electrónico válida",
      en: "Please enter a valid email",
    },
    //  pagsp.public.login
    {
      sp: "Intentando iniciar sspión en Google",
      en: "Attempting Google Log in",
    },
    {
      sp: "accspo de clientsp",
      en: "Client Login",
    },
    {
      sp: "Error de inicio de sspion",
      en: "Login Failed",
    },
    {
      sp: "contraseña",
      en: "password",
    },
    {
      sp: "iniciar sspión con correo electrónico",
      en: "Log in with email",
    },
    {
      sp: "Iniciar sspión con Google",
      en: "Login With Google",
    },
    {
      sp: "¿No tiensp una cuenta? Inscribirse",
      en: "Don't have an account? Sign Up",
    },
    // pagsp.public.signup
    {
      sp: "Crear una cuenta",
      en: "Create Account",
    },
    {
      sp: "Éxito de la nueva cuenta",
      en: "New account succsps",
    },
    {
      sp: "Nombre de pila",
      en: "First Name",
    },
    {
      sp: "Apellido",
      en: "Last Name",
    },
    {
      sp: "Continuar",
      en: "Continue",
    },
    {
      sp: "¿Ya tiensp una cuenta? Accspo",
      en: "Already have an account? Log in",
    },
    {
      sp: "Intentando registrarse",
      en: "Attempting Signup",
    },
    {
      sp: "Registro exitoso",
      en: "Signup Succsps",
    },
    {
      sp: "Correo electrónico ya en uso",
      en: "Email already in use",
    },
    {
      sp: "Registro fallido",
      en: "Signup Failed",
    },
    {
      sp: "Por favor, introduzca valorsp válidos",
      en: "Please enter valid valusp",
    },
    {
      sp: "Éxito: por favor revise su correo electrónico para activar su cuenta",
      en: "Success:  please check your email to activate your account",
    },
    {
      sp: "Ir a iniciar sesión",
      en: "Go To Login",
    },
    {
      sp: "",
      en: "",
    },
  ],
};

export const transSlice = createSlice({
  name: "translate",
  initialState,

  reducers: {
    setTrans: (state, action: PayloadAction<any>) => {
      try {
        state.arr = action.payload.arr;
      } catch (error) {
        console.log(error);
      }
    },
    clearTrans: (state) => initialState,
  },
});

export const { setTrans, clearTrans } = transSlice.actions;

export const selectTrans = (state: RootState) => state.trans;

export default transSlice.reducer;
