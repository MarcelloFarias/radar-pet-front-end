import { useState } from "react";
import Footer from "../../components/Footer/footer";
import UnloggedHeader from "../../components/UnloggedHeader/unlogged-header";
import { Input, Button, Spinner } from "@nextui-org/react";
import RandomPetImage from "../../components/RandomPetImage/random-pet-image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserRegistration } from "../../interfaces/user";
import { registerUser } from "../../services/radarPet/user";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../components/Toast/toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserRegistration>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleUser = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleIsConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const [confirmationPassword, setConfirmationPassword] = useState<string>("");

  const handleConfirmationPassword = (e: any) => {
    setConfirmationPassword(e.target.value);
  };

  const [isUserSignupLoading, setIsUserSignupLoading] =
    useState<boolean>(false);

  function signup() {
    setIsUserSignupLoading(true);

    if (
      user.name &&
      user.email &&
      user.phone &&
      user.password &&
      confirmationPassword
    ) {
      if (confirmationPassword !== user.password) {
        return toastError("As senhas não conferem !");
      }

      registerUser(user)
        .then((response: any) => {
          if (response?.res) {
            return toastSuccess(response?.message);
          }

          return toastError(response?.message);
        })
        .catch((error: any) => console.log(error))
        .finally(() => {
          setIsUserSignupLoading(false);
        });
      return;
    }
    setIsUserSignupLoading(false);
    return toastWarning("Preencha todos os campos !");
  }

  return (
    <>
      <UnloggedHeader />

      <main className="section-container flex items-center justify-around">
        <div className="flex items-center w-80 flex-col">
          <h1 className="text-2xl">Realizar Cadastro</h1>

          <Input
            label="Nome"
            radius="full"
            name="name"
            type="text"
            className="mt-5"
            onChange={handleUser}
          />
          <Input
            label="E-mail"
            radius="full"
            name="email"
            type="email"
            onChange={handleUser}
            className="mt-5"
          />
          <Input
            label="Telefone"
            radius="full"
            name="phone"
            type="text"
            onChange={handleUser}
            className="mt-5"
          />
          <Input
            label="Senha"
            radius="full"
            name="password"
            onChange={handleUser}
            type={isPasswordVisible ? "text" : "password"}
            className="mt-5"
            endContent={
              isPasswordVisible ? (
                <Button
                  className=" bg-transparent text-base text-neutral-500"
                  onClick={handlePasswordVisibility}
                  size="sm"
                >
                  <FaEyeSlash />
                </Button>
              ) : (
                <Button
                  className=" bg-transparent text-base text-neutral-500"
                  onClick={handlePasswordVisibility}
                  size="sm"
                >
                  <FaEye />
                </Button>
              )
            }
          />
          <Input
            label="Confirme a sua senha"
            radius="full"
            type={isConfirmPasswordVisible ? "text" : "password"}
            className="mt-5"
            onChange={handleConfirmationPassword}
            endContent={
              isConfirmPasswordVisible ? (
                <Button
                  className=" bg-transparent text-base text-neutral-500"
                  onClick={handleIsConfirmPasswordVisibility}
                  size="sm"
                >
                  <FaEyeSlash />
                </Button>
              ) : (
                <Button
                  className=" bg-transparent text-base text-neutral-500"
                  onClick={handleIsConfirmPasswordVisibility}
                  size="sm"
                >
                  <FaEye />
                </Button>
              )
            }
          />

          <Button
            color="success"
            radius="full"
            className="w-full mt-5"
            onClick={() => signup()}
          >
            Salvar
            {isUserSignupLoading ? <Spinner size="md" /> : null}
          </Button>

          <Button
            color="primary"
            variant="flat"
            radius="full"
            className="w-full mt-5"
            onClick={() => navigate("/login")}
          >
            Ir para Login
          </Button>
        </div>

        <RandomPetImage />
      </main>

      <Footer />
    </>
  );
}

export default Signup;
