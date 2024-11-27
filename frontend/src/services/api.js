const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export async function getVocaloids() {
  const response = await fetch(`${API_URL}/vocaloids`);
  if (!response.ok) {
    throw new Error(`Error al obtener los Vocaloids: ${response.statusText}`);
  }
  return response.json();
}

export async function getVocaloidById(id) {
    const response = await fetch(`${API_URL}/vocaloids/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el Vocaloid");
    }
    return response.json();
  }
  