import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ErrorMessage from "../../components/ErrorMessage";
import api from "../../config/axios";
import { RegisterForm } from "../../types/AuthTypes";

export default function RegisterView() {
  const [loading, setLoading] = useState(true);
  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const password = watch("password");

  const handleRegisterSubmit = async (formData: RegisterForm) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", formData);
      toast.success(data.message);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(
          "Error desconocido al crear la cuenta, por favor intente de nuevo"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegisterSubmit)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: {
                value: true,
                message: "El Email es requerido",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: {
                value: true,
                message: "El Handle es requerido",
              },
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: {
                value: true,
                message: "El Password es requerido",
              },
              minLength: {
                value: 8,
                message: "El password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: {
                value: true,
                message: "Repetir password es requerido",
              },
              minLength: {
                value: 8,
                message: "El repetir password debe tener al menos 8 caracteres",
              },
              validate: (value) =>
                value === password || "Los passwords no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className={`bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                opacity="0.25"
              />
              <path
                fill="#fff"
                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="0.75s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                />
              </path>
            </svg>
          ) : (
            "Crear Cuenta"
          )}
        </button>
      </form>

      <nav className="mt-10">
        <Link to="/auth/login" className="text-center text-white text-lg block">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  );
}
