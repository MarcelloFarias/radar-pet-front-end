import { createContext, useState } from "react";
import { User } from "../interfaces/user";

export const userContext = createContext<any>(null);

function UserProvider(props: any) {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    password: "",
    email: "",
    phone: "",
  });

  return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
  );
}

export default UserProvider;
