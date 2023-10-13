export default async function getFromAPI(endpoint) {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/${endpoint}`);
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
  
      const data = await response.json();
      if (data.length > 0 && data[0].url) {
        return data[0].url;
      } else {
        throw new Error("Nenhuma URL encontrada na resposta");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }
  
  