import axios from "axios";
import { PetRegistration } from "../../interfaces/pet";
import { Pet } from "../../interfaces/pet";

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

export async function registerPet(pet: PetRegistration) {
  try {
    const response = await axios.post(`${baseUrl}/pets`, pet);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to register pet -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}

export async function getAllPets() {
  try {
    const response = await axios.get(`${baseUrl}/pets`);
    return response.data;
  } catch (error: any) {
    console.log("Fail to get pets -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}

export async function updatePet(pet: Pet) {
  try {
    const response = await axios.put(`${baseUrl}/pets/${pet?._id}`, pet);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to update pet -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}

export async function deletePet(petId: string) {
  try {
    const response = await axios.delete(`${baseUrl}/pets/${petId}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to delete pet -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}
