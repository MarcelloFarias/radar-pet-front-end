import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/user-context";
import { Button, Input } from "@nextui-org/react";
import LoggedHeader from "../../components/LoggedHeader/logged-header";
import {
  getUserById,
  updatePassword,
  updateUser,
} from "../../services/radarPet/user";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../components/Toast/toast";
import Footer from "../../components/Footer/footer";
import { User } from "../../interfaces/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Settings() {
  const [user, setUser] = useContext(userContext);
  const [prevUserData, setPrevUserData] = useState<User | null>(null);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);

  const handlePasswords = (e: any) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const handleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleUser = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("user-id");

    if (userId) {
      getUserById(userId)
        .then((response: any) => {
          if (response?.message) {
            return toastError(response?.message);
          }

          setUser(response);
          setPrevUserData(response);
        })
        .catch((error: any) => console.log(error));
    }
  }, []);

  function editUser() {
    if (user?.name && user?.email && user?.phone) {
      if (
        user.email !== prevUserData?.email ||
        user.name !== prevUserData?.name ||
        user.phone !== prevUserData?.phone
      ) {
        updateUser(user?._id, user)
          .then((response: any) => {
            console.log(response);

            if (response?.updatedUser) {
              setPrevUserData(response?.updatedUser);
              setUser(response?.updatedUser);
              return toastSuccess(response?.message);
            }

            return toastError(response?.message);
          })
          .catch((error: any) => console.log(error));
        return;
      }

      return toastWarning("As informações devem ser diferentes das atuais !");
    }

    return toastWarning("Preencha todos os campos !");
  }

  function editPassword() {
    if (passwords.newPassword && passwords.oldPassword) {
      updatePassword(user?._id, passwords)
        .then((response: any) => {
          if (response?.updatedUser) {
            setUser(response?.updatedUser);
            return toastSuccess(response?.message);
          }

          return toastError(response?.message);
        })
        .catch((error: any) => console.log(error));

      return;
    }
    return toastWarning("Digite a senha atual e a nova senha !");
  }

  return (
    <>
      <LoggedHeader />

      <div className="section-container container mx-auto flex flex-col">
        <div className="m-10">
          <h1>Editar informações</h1>
        </div>
        <Input
          label="Nome"
          type="text"
          className="w-3/4 self-center"
          value={user?.name}
          name="name"
          onChange={handleUser}
        />
        <Input
          label="E-mail"
          type="email"
          className="w-3/4 self-center mt-5"
          value={user?.email}
          name="email"
          onChange={handleUser}
        />
        <Input
          label="Telefone"
          type="text"
          className="w-3/4 self-center mt-5"
          value={user?.phone}
          name="phone"
          onChange={handleUser}
        />
        <Button
          className="w-24 m-10"
          color="success"
          onClick={() => editUser()}
        >
          Salvar
        </Button>

        <div className="m-10">
          <h1 className="text-red-500">Alterar senha de acesso</h1>
        </div>
        <Input
          label="Confirme sua senha atual"
          onChange={handlePasswords}
          className="w-3/4 self-center mt-5"
          name="oldPassword"
          type={isCurrentPasswordVisible ? "text" : "password"}
          endContent={
            isCurrentPasswordVisible ? (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleCurrentPasswordVisibility}
                size="sm"
              >
                <FaEyeSlash />
              </Button>
            ) : (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleCurrentPasswordVisibility}
                size="sm"
              >
                <FaEye />
              </Button>
            )
          }
        />

        <Input
          label="Digite sua nova senha"
          onChange={handlePasswords}
          className="w-3/4 self-center mt-5"
          name="newPassword"
          type={isNewPasswordVisible ? "text" : "password"}
          endContent={
            isNewPasswordVisible ? (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleNewPasswordVisibility}
                size="sm"
              >
                <FaEyeSlash />
              </Button>
            ) : (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleNewPasswordVisibility}
                size="sm"
              >
                <FaEye />
              </Button>
            )
          }
        />
        <Button
          className="w-24 m-10"
          color="danger"
          onClick={() => editPassword()}
        >
          Salvar
        </Button>
      </div>
      <Footer />
    </>
  );
}

export default Settings;
