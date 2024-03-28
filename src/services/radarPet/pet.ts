import axios from "axios";

const baseUrl = "http://localhost:8089";

export async function getAllPetsPaged(page: number, limit: string = "10") {
  try {
    const response = await axios.get(
      `${baseUrl}?page=${String(page)}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to get pets paged -> ", error);
  }
}

export async function searchPet(name: string) {
  try {
    const response = await axios.get(`${baseUrl}/pets/search/${name}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to search pet -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}
