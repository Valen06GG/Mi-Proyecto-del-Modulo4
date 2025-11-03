'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from "../Services/userService";

export interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
}

const RegisterPage: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,15}$/;

    if (!values.name) {
      errors.name = 'El nombre es obligatorio.';
    } else if (values.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!values.email) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'El formato del correo electrónico no es válido.';
    }

    if (!values.password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'La confirmación de contraseña es obligatoria.';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (!values.address) {
      errors.address = 'La dirección es obligatoria.';
    }

    if (!values.phone) {
      errors.phone = 'El teléfono es obligatorio.';
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = 'Debe contener solo dígitos (7 a 15 números).';
    }

    return errors;
  };

  const handleSubmit = async (values: FormValues) => {
    const response = await registerUser(values);
    console.log('Resultado del registro:', response);
    setTimeout(() => {
      window.location.href = "/Login";
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0a0f1a] text-white">
      <div className="bg-[#111827] p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-semibold mb-6 text-center">Registro de Usuario</h1>

        <Formik initialValues={initialValues} 
        validate={validate} 
        onSubmit={handleSubmit}>
          
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block mb-1">Nombre Completo</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full p-2 rounded bg-[#0a0f1a] border ${
                    errors.name && touched.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1">Correo Electrónico</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-2 rounded bg-[#0a0f1a] border ${
                    errors.email && touched.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1">Contraseña</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full p-2 rounded bg-[#0a0f1a] border ${
                    errors.password && touched.password ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-1">Confirmar Contraseña</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full p-2 rounded bg-[#0a0f1a] border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-600'
                  }`}
                />
                <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1">Dirección</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className={`w-full p-2 rounded bg-[#0a0f1a] border ${
                    errors.address && touched.address ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <ErrorMessage name="address" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1">Teléfono</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`w-full p-2 rounded bg-[#0a0f1a] border ${
                    errors.phone && touched.phone ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-semibold"
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;