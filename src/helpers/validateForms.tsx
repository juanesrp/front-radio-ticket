import { LoginErrorProps, LoginProps } from "@/interfaces/login";
import { RegisterErrorProps, RegisterProps } from "@/interfaces/register";


export function validateLoginForms(values: LoginProps): LoginErrorProps {
  let errors: LoginErrorProps = {
    email: "",
    password: "",
  };

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!values.email) {
    errors.email = "El Email es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El Email no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
}

export function validateRegisterForms(values: RegisterProps): RegisterErrorProps {
  let errors: RegisterErrorProps = {
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/;
                        
  const nameRegex = /^[A-Z][a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  console.log({values})


  if (!nameRegex.test(values.name)) {
    errors.name = 'El nombre debe iniciar con mayúscula'
  }
  if (!nameRegex.test(values.lastName)) {
    errors.name = 'El apellido debe iniciar con mayúscula'
  }
  if (!emailRegex.test(values.email)) {
    errors.email = "El Email no es válido";
  }
  if (!values.phone) {
    errors.phone = "El teléfono es requerido";
  }
  if (!passwordRegex.test(values.password)) {
    errors.password = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (!@#$%^&*), y tener entre 8 y 15 caracteres de longitud." ;
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors
}

