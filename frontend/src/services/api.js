const API_URL = import.meta.env.VITE_API_URL;

export async function getVocaloids() {
  const response = await fetch(`${API_URL}/vocaloids`);
  if (!response.ok) {
    throw new Error("Error al obtener los Vocaloids");
  }
  return response.json();
}
