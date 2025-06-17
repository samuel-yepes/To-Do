import { useLoaderData, Link, Form, redirect } from 'react-router-dom';
import { type Tarea } from '../interface/tarea';
import { eliminarTarea, obtenerTareas } from '../servicios/api';
import { useState } from 'react';

export async function loader() {
  const tareas = await obtenerTareas(null);
  return { tareas };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const id = formData.get('id') as string;

  try {
    await eliminarTarea(id);
    return { success: true, mensaje: "Tarea eliminada con éxito" };
  } catch (error) {
    return { success: false, mensaje: " No se pudo eliminar la tarea" };
  }
}

export default function Home() {
  const { tareas } = useLoaderData() as { tareas: Tarea[] };

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [tareaAEliminar, setTareaAEliminar] = useState<Tarea | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight">
            GESTIÓN DE TAREAS
          </h1>
          <p className="text-lg text-gray-400">Gestióna las tareas que tengas por hacer</p>
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <Link
            to="/crear"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-semibold rounded-lg shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 border border-cyan-300/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            NUEVA TAREA
          </Link>
          <Link
            to="/estadisticas"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-semibold rounded-lg shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 border border-cyan-300/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="12" width="4" height="8" rx="1" fill="currentColor" />
              <rect x="9" y="8" width="4" height="12" rx="1" fill="currentColor" />
              <rect x="15" y="4" width="4" height="16" rx="1" fill="currentColor" />
            </svg>
            ESTADÍSTICAS
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-2xl backdrop-blur-sm bg-gray-800/50">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-5 px-6 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Nombre</th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Estado</th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Descripción</th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Inicio</th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Final</th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {tareas.length > 0 ? (
                tareas.map((tarea, index) => (
                  <tr
                    key={tarea.id}
                    className={`hover:bg-gray-850 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/80'}`}
                  >
                    <td className="py-5 px-6 text-gray-100 font-medium whitespace-nowrap">{tarea.nombre}</td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-5 ${tarea.completado
                        ? 'bg-green-900/50 text-green-300'
                        : 'bg-amber-900/50 text-amber-300'
                        }`}>
                        {tarea.completado ? 'Completada' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-300 max-w-xs truncate">{tarea.descripcion}</td>
                    <td className="py-5 px-6 text-gray-400 whitespace-nowrap">
                      {new Date(tarea.fechaInicio).toLocaleDateString('es-CO')}
                    </td>
                    <td className="py-5 px-6 text-gray-400 whitespace-nowrap">
                      {new Date(tarea.fechaFinal).toLocaleDateString('es-CO')}
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="flex gap-3">
                        <Link
                          to={`/ver/${tarea.id}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          to={`/editar/${tarea.id}`}
                          className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setTareaAEliminar(tarea);
                            setMostrarConfirmacion(true);
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 px-6 text-center text-gray-500">
                    No hay tareas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarConfirmacion && tareaAEliminar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 max-w-md w-full">
            <h2 className="text-lg font-bold text-white mb-4">¿Estás seguro?</h2>
            <p className="text-gray-300 mb-6">
              ¿Deseas eliminar la tarea <span className="text-cyan-400 font-semibold">"{tareaAEliminar.nombre}"</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setMostrarConfirmacion(false);
                  setTareaAEliminar(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <Form method="post">
                <input type="hidden" name="id" value={tareaAEliminar.id} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Eliminar
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}