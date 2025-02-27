import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";


export async function searchPokemons(pageData) {
  try {
    const result = await axios.post(`${API_URL}pokemon`, pageData);
    return result.data;
  } catch (e) {
    alert(e.response.data)
  }
}

export async function getByUrl(url) {
  try {
    const result = await axios.get(`${API_URL}pokemon?url=${url}`);
    return result.data;
  } catch (e) {
    alert(e.response.data)
  }
}
