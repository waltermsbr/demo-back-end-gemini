export default async function fetchImages() {
  try {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}