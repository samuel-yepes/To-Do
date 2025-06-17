import type { Tarea } from "~/interface/tarea";

const API_URL = 'http://localhost:5197/Tareas'; 

export async function obtenerTareas(id: any): Promise<Tarea[]> {
  const res = await fetch(`${API_URL}/ObtenerTareas`);
  if (!res.ok) return [];
  const text = await res.text();
  if (!text) return [];
  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export async function obtenerTareaPorId(id: string): Promise<Tarea> {
  const res = await fetch(`${API_URL}/ObtenerTareaPorId/${id}`);
  return res.json();
}

export async function crearTarea(tarea: Omit<Tarea, 'id'>) {
  const res = await fetch(`${API_URL}/CrearTarea`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  });
  const text = await res.text();
  if (!text) return {}; 
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function actualizarTarea(id: string, tarea: Tarea) {
  const res = await fetch(`${API_URL}/EditarTarea/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  });
  return res.json();
}

export async function eliminarTarea(id: string) {
  const res = await fetch(`${API_URL}/EliminarTarea/${id}`, {
    method: 'DELETE',
  });
  return res.ok;
}