import { useLoaderData, Form, Link, useActionData, useNavigate } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { obtenerTareaPorId, actualizarTarea } from "../servicios/api";
import type { Tarea } from "../interface/tarea";
import { useEffect, useState } from "react";

export async function loader({ params }: { params: { id: string } }) {
  const tarea = await obtenerTareaPorId(params.id);
  return tarea;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const tareaActualizada: Tarea = {
    id: params.id as string,
    nombre: formData.get("nombre") as string,
    descripcion: formData.get("descripcion") as string,
    completado: formData.get("completado") === "on", 
    fechaInicio: formData.get("fechaInicio") as string,
    fechaFinal: formData.get("fechaFinal") as string,
  };

  try {
    await actualizarTarea(params.id as string, tareaActualizada);
    return { success: true, mensaje: "Tarea actualizada con éxito" };
  } catch (error) {
    return { success: false, mensaje: "No se pudo actualizar la tarea" };
  }
}

export default function Editar() {
  const tarea = useLoaderData() as Tarea;
  const actionData = useActionData() as { success: boolean; mensaje: string } | undefined;
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    if (actionData?.mensaje) {
      setMensaje(actionData.mensaje);
      if (actionData.success) {
        setTimeout(() => navigate("/"), 2000);
      }
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6 font-sans">
      <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 max-w-lg w-full p-8 sm:p-10 backdrop-blur-sm bg-gray-800/50">
        {mensaje && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm font-semibold shadow-md ${
              actionData?.success ? "bg-green-700 text-white" : "bg-red-700 text-white"
            }`}
          >
            {mensaje}
          </div>
        )}

        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
            title="Volver al inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
              EDITAR TAREA
            </h2>
            <p className="text-gray-400 mt-2">Modifica los detalles de la tarea</p>
          </div>
          <div className="w-6"></div>
        </div>

        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-cyan-300">
              Nombre de la tarea
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              defaultValue={tarea.nombre}
              className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-cyan-300">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              required
              rows={4}
              defaultValue={tarea.descripcion}
              className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="completado"
              name="completado"
              defaultChecked={tarea.completado}
              className="h-5 w-5 text-cyan-600 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500"
            />
            <label htmlFor="completado" className="text-cyan-300 text-sm font-medium select-none">
              Marcar como completada
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fechaInicio" className="block mb-2 text-sm font-medium text-cyan-300">
                Fecha de inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                required
                defaultValue={tarea.fechaInicio ? new Date(tarea.fechaInicio).toISOString().split("T")[0] : "FECHA NO ENCONTRADA"}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="fechaFinal" className="block mb-2 text-sm font-medium text-cyan-300">
                Fecha final
              </label>
              <input
                type="date"
                id="fechaFinal"
                name="fechaFinal"
                required
                defaultValue={tarea.fechaFinal ? new Date(tarea.fechaFinal).toISOString().split("T")[0] : "FECHA NO ENCONTRADA"}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-lg shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              GUARDAR CAMBIOS
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}