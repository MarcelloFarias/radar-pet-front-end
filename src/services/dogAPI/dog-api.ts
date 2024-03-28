import axios from "axios";

export async function getRandomDogImage() {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(response);

    if (response.data.status === "success") {
      return response.data;
    }
  } catch (error) {
    console.log("Fail to get a random dog picture -> ", error);
  }
}
