import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ErrorMessage from "../../components/ErrorMessage";
import CTButton from "../../components/ui/CTButton";
import api from "../../config/axios";
import { LoginForm } from "../../types/AuthTypes";

export default function LoginView() {
  const [loading, setLoading] = useState(false);
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);
    try {
      const { data: response } = await api.post("/auth/login", data);
      localStorage.setItem("AUTH_TOKEN", response.token);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.errorMessage || "Error al iniciar sesión"
        );
      } else {
        toast.error(
          "Error desconocido al iniciar sesión, por favor intente de nuevo"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
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
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <CTButton loading={loading} text="Iniciar Sesión" />
      </form>

      <nav className="mt-10">
        <Link
          to="/auth/register"
          className="text-center text-white text-lg block"
        >
          ¿No tienes una cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  );
}
