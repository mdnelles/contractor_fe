import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TransState } from "./translate";

const initialState: TransState = {
   arr: [
    {
        es: "Restablecimiento de contraseña",
        en: "Password Reset",
   },
   {
        en:"Email not in system",
        es:"El correo electrónico no está en el sistema"
   },
    {
        en:"Please enter valid credentials",
        es:"Por favor ingrese credenciales válidas"
    },
    {
        en:"Email Address",
        es:"Correo electrónico"
    },
    {
        en:"Go To Login",
        es:"Ir a iniciar sesión"
    },
    {
        en:"Reset Password",
        es:"Restablecer la contraseña"
    },
    {
        en:"Email reset link sent",
        es:"Enlace de restablecimiento de correo electrónico enviado"
    },
    {
        en:"Forgot Password",
        es:"Has olvidado tu contraseña"
    },
    // client login
    {
        en:"Client Login",
        es:"acceso de clientes"
    },
    {
        en:"password",
        es:"contraseña"
    },
    {
        en:"Login with email",
        es:"iniciar sesión con correo electrónico"
    },
    {
        en:"Login With Google",
        es:"Iniciar sesión con Google"
    },
    {
        en:"Don't have an account? Sign Up",
        es:"¿No tienes una cuenta? Inscribirse"
    },
    //  create account / signup
    {
        en:"Create Account",
        es:"Crear una cuenta"
    },
    {
        en:"New account success",
        es:"Éxito de la nueva cuenta"
    },
    {
        en:"First Name",
        es:"Nombre de pila"
    },
    {
        en:"Last Name",
        es:"Apellido"
    },
    {
        en:"Continue",
        es:"Continuar"
    },
    {
        en:"Already have an account? Log in",
        es:"¿Ya tienes una cuenta? Acceso"
    },
    {
        en:"",
        es:""
    },
    {
        en:"",
        es:""
    },
    {
        en:"",
        es:""
    },

   ]
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
