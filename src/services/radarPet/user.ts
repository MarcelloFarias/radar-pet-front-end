import axios from "axios";
import { UserLogin } from "../../interfaces/user";

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
