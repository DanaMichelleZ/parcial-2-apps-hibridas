// Mi api.js contiene func que se ejecutan en el frontend para hacer solicitudes HTTP a mi API :3

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

//func asincrona, realiza solicitud GET a mmi API pa obtener todos los vocaloids desde el endpoint /vocaloids
export async function getVocaloids() {
  const response = await fetch(`${API_URL}/vocaloids`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) {
    throw new Error(`Error al obtener los Vocaloids: ${response.statusText}`);
  }
  return response.json();
}

export async function getVocaloidById(id) {
  const response = await fetch(`${API_URL}/vocaloids/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) {
    throw new Error("Error al obtener el Vocaloid");
  }
  return response.json();
}