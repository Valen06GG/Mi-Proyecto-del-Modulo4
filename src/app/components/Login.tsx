'use client';

import "../Login/login.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from "../Services/userService";
import { useAuth } from "../context/authContext";

export interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { setDataUser } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await loginUser(values);
    setDataUser(response);
    console.log('Usuario logueado', response);
    window.location.href = "/dashboard";
  };

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (!values.email) {
      errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'El formato del email no es válido.';
    }

    if (!values.password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return errors;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={errors.email && touched.email ? 'input-error' : ''}
                />
                <ErrorMessage name="email" component="span" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={errors.password && touched.password ? 'input-error' : ''}
                />
                <ErrorMessage name="password" component="span" className="error-message" />
              </div>

              <button type="submit" className="submit-button">
                Ingresar
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <footer className="login-footer">
        © E-Commerce | Todos los derechos reservados
      </footer>
    </div>
  );
};

export default Login;