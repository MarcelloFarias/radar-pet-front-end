import axios from "axios";
import { UserLogin, UserRegistration } from "../../interfaces/user";

const baseUrl = "http://localhost:8089";

export async function authenticateUser(userLoginData: UserLogin) {
  try {
    const response = await axios.post(`${baseUrl}/users/auth`, userLoginData);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to authenticate user -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}

export async function registerUser(user: UserRegistration) {
  try {
    const response = await axios.post(`${baseUrl}/users`, user);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to register user -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}

export async function authorizeUser(userToken: string) {
  try {
    const response = await axios.get(`${baseUrl}/users/auth`, {
      headers: {
        "x-access-token": userToken,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Fail to authorize user -> ", error);

    if (error.response) {
      return error.response.data;
    }
  }
}
