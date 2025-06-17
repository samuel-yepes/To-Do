import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData, Link } from "react-router-dom";
import { obtenerTareas } from "../servicios/api";
import { Bar, Pie, Line } from "react-chartjs-2";
import { 
  Chart, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import type { Tarea } from "../interface/tarea";

Chart.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export async function loader(args: LoaderFunctionArgs) {
  const tareas = await obtenerTareas(null);
  return { tareas };
}

export default function Estadisticas() {
  const { tareas } = useLoaderData() as { tareas: Tarea[] };

  
  const completadas = tareas.filter(t => t.completado).length;
  const pendientes = tareas.length - completadas;
  
  const tareasPorFecha = tareas.reduce((acc, tarea) => {
    const fecha = new Date(tarea.fechaInicio).toLocaleDateString();
    acc[fecha] = (acc[fecha] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1', 
          font: {
            size: 14
          }
        },
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1' 
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)' 
        }
      },
      y: {
        ticks: {
          color: '#cbd5e1' 
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)' 
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight">
            ESTADÍSTICAS DE TAREAS
          </h1>
          <p className="text-lg text-gray-400">Visualiza el progreso de tus tareas</p>
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-semibold rounded-lg shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 border border-cyan-300/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            VOLVER AL LISTADO
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
            <h3 className="text-gray-400 text-lg mb-2">Total de tareas</h3>
            <p className="text-4xl font-bold text-cyan-400">{tareas.length}</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
            <h3 className="text-gray-400 text-lg mb-2">Completadas</h3>
            <p className="text-4xl font-bold text-green-400">{completadas}</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
            <h3 className="text-gray-400 text-lg mb-2">Pendientes</h3>
            <p className="text-4xl font-bold text-amber-400">{pendientes}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* de barras */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Distribución de tareas</h3>
            <div className="h-80">
              <Bar 
                data={{
                  labels: ["Pendientes", "Completadas"],
                  datasets: [{
                    label: "Cantidad de tareas",
                    data: [pendientes, completadas],
                    backgroundColor: [
                      'rgba(251, 191, 36, 0.7)', 
                      'rgba(34, 197, 94, 0.7)' 
                    ],
                    borderColor: [
                      'rgb(251, 191, 36)', 
                      'rgb(34, 197, 94)' 
                    ],
                    borderWidth: 1
                  }],
                }} 
                options={options}
              />
            </div>
          </div>

          {/*  circular */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Proporción de estados</h3>
            <div className="h-80">
              <Pie 
                data={{
                  labels: ["Pendientes", "Completadas"],
                  datasets: [{
                    data: [pendientes, completadas],
                    backgroundColor: [
                      'rgba(251, 191, 36, 0.7)', 
                      'rgba(34, 197, 94, 0.7)' 
                    ],
                    borderColor: [
                      'rgb(251, 191, 36)', 
                      'rgb(34, 197, 94)'
                    ],
                    borderWidth: 1
                  }],
                }} 
                options={options}
              />
            </div>
          </div>
        </div>

        {/* Gráfico de líneas */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm mb-10">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">Actividad por fecha</h3>
          <div className="h-96">
            <Line 
              data={{
                labels: Object.keys(tareasPorFecha),
                datasets: [{
                  label: 'Tareas creadas',
                  data: Object.values(tareasPorFecha),
                  borderColor: 'rgb(34, 211, 238)', 
                  backgroundColor: 'rgba(34, 211, 238, 0.1)',
                  tension: 0.1,
                  fill: true,
                  pointBackgroundColor: 'rgb(34, 211, 238)',
                  pointBorderColor: '#fff',
                  pointHoverRadius: 5
                }],
              }} 
              options={options}
            />
          </div>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">Detalles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h4 className="text-lg font-medium text-gray-400 mb-2">Tareas completadas</h4>
              <p className="text-cyan-400">{completadas} ({tareas.length > 0 ? Math.round((completadas / tareas.length) * 100) : 0}%)</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-400 mb-2">Tareas pendientes</h4>
              <p className="text-amber-400">{pendientes} ({tareas.length > 0 ? Math.round((pendientes / tareas.length) * 100) : 0}%)</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-400 mb-2">Fecha más activa</h4>
              <p className="text-blue-400">
                {Object.keys(tareasPorFecha).length > 0 ? 
                  Object.entries(tareasPorFecha).sort((a, b) => b[1] - a[1])[0][0] : 
                  'No hay datos'}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-400 mb-2">Promedio diario</h4>
              <p className="text-green-400">
                {Object.keys(tareasPorFecha).length > 0 ? 
                  (tareas.length / Object.keys(tareasPorFecha).length).toFixed(1) : 
                  '0'} tareas/día
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}