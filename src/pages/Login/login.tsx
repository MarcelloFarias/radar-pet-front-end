import { useState } from "react";
import UnloggedHeader from "../../components/UnloggedHeader/unlogged-header";
import Footer from "../../components/Footer/footer";
import { Spinner, Input, Button } from "@nextui-org/react";
import { UserLogin } from "../../interfaces/user";
import { toastError, toastWarning } from "../../components/Toast/toast";
import { authenticateUser } from "../../services/radarPet/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RandomPetImage from "../../components/RandomPetImage/random-pet-image";

function Login() {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [isUserLoginLoading, setIsUserLoginLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleUserLogin = (e: any) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  function login() {
    setIsUserLoginLoading(true);

    if (userLogin.email && userLogin.password) {
      authenticateUser(userLogin)
        .then((response: any) => {
          if (response?.message) {
            return toastError(response?.message);
          }

          localStorage.setItem("user-token", response?.token);
        })
        .catch((error: any) => console.log(error))
        .finally(() => {
          setIsUserLoginLoading(false);
        });

      return;
    }
    setIsUserLoginLoading(false);
    return toastWarning("Preencha todos os campos !");
  }

  return (
    <>
      <UnloggedHeader />
      <main className="section-container flex items-center justify-around">
        <RandomPetImage />

        <div className="flex items-center flex-col w-80">
          <h1 className="text-2xl">Realizar Login</h1>

          <Input
            label="E-mail"
            onChange={handleUserLogin}
            className="mt-10"
            radius="full"
            name="email"
            type="email"
          />
          <Input
            label="Senha"
            onChange={handleUserLogin}
            className="mt-5"
            radius="full"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
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
          <Button
            className="w-full mt-10"
            color="success"
            size="md"
            radius="full"
            onClick={() => login()}
          >
            Login
            {isUserLoginLoading ? <Spinner size="md" /> : null}
          </Button>

          <p className="text-gray-500 mt-5">ou</p>

          <Button
            className="w-full mt-5"
            color="primary"
            size="md"
            radius="full"
            variant="flat"
          >
            Criar uma conta
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
