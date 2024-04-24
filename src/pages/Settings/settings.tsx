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
  const [isChangePasswordVisible, setIsChangePasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [
    isNewPasswordConfirmationVisible,
    setIsNewPasswordConfirmationVisible,
  ] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const handleCurrentPassword = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e: any) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePasswordVisibility = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);
  };

  const handleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleNewPasswordConfirmationVisibility = () => {
    setIsNewPasswordConfirmationVisible(!isNewPasswordConfirmationVisible);
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
        updateUser(user?._id)
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

  function changePassword() {
    if (
      newPassword.newPassword &&
      newPassword.newPasswordConfirmation &&
      currentPassword
    ) {
      if (newPassword.newPassword === newPassword.newPasswordConfirmation) {
        const data: any = {
          newPassword: newPassword.newPassword,
          currentPassword: currentPassword,
        };

        updatePassword(user?._id, data)
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

      return toastWarning("As senhas não conferem !");
    }
    return toastWarning("Preencha todos os campos !");
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
          <h1 className="text-red-500">Alterar senha</h1>
        </div>
        <Input
          label="Digite sua senha atual"
          onChange={handleCurrentPassword}
          className="w-3/4 self-center"
          name="password"
          type={isChangePasswordVisible ? "text" : "password"}
          endContent={
            isChangePasswordVisible ? (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleChangePasswordVisibility}
                size="sm"
              >
                <FaEyeSlash />
              </Button>
            ) : (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleChangePasswordVisibility}
                size="sm"
              >
                <FaEye />
              </Button>
            )
          }
        />
        <Input
          label="Digite a sua nova senha"
          onChange={handleNewPassword}
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
        <Input
          label="Confirme a sua nova senha"
          onChange={handleNewPassword}
          className="w-3/4 self-center mt-5"
          name="newPasswordConfirmation"
          type={isNewPasswordConfirmationVisible ? "text" : "password"}
          endContent={
            isNewPasswordConfirmationVisible ? (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleNewPasswordConfirmationVisibility}
                size="sm"
              >
                <FaEyeSlash />
              </Button>
            ) : (
              <Button
                className=" bg-transparent text-base text-neutral-500"
                onClick={handleNewPasswordConfirmationVisibility}
                size="sm"
              >
                <FaEye />
              </Button>
            )
          }
        />
        <Button
          className="w-32 m-10"
          color="danger"
          variant="flat"
          onClick={() => changePassword()}
        >
          Alterar Senha
        </Button>
      </div>
      <Footer />
    </>
  );
}

export default Settings;
