import { useLoaderData, Link } from 'react-router-dom';
import { obtenerTareaPorId } from '../servicios/api';
import type { Tarea } from '../interface/tarea';

export async function loader({ params }: { params: { id: string } }) {
  const tarea = await obtenerTareaPorId(params.id);
  return tarea;
}

export default function Ver() {
  const tarea = useLoaderData() as Tarea;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 transition-colors mr-4"
            title="Volver al inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
            DETALLES DE TAREA
          </h2>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Nombre</label>
                <div className="flex items-center p-4 bg-gray-800 border border-gray-700 rounded-lg ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-200">{tarea.nombre}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Estado</label>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${tarea.completado
                    ? 'bg-green-900/50 text-green-300'
                    : 'bg-amber-900/50 text-amber-300'
                  }`}>
                  {tarea.completado ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Completada
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pendiente
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Fecha de Inicio</label>
                <div className="flex items-center p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">
                    {tarea.fechaInicio ? new Date(tarea.fechaInicio).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'No especificada'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Descripción</label>
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg h-full min-h-[120px]">
                  <p className="text-gray-300">
                    {tarea.descripcion || (
                      <span className="text-gray-500 italic">No hay descripción proporcionada</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-cyan-300 mb-2">Fecha de Finalización</label>
                <div className="flex items-center p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">
                    {tarea.fechaFinal ? new Date(tarea.fechaFinal).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'No especificada'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <Link
              to={`/editar/${tarea.id}`}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg shadow-md transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </Link>

            <Link
              to="/"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al listado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}