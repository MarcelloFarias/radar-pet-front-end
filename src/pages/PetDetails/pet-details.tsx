import { useEffect, useState } from "react";
import LoggedHeader from "../../components/LoggedHeader/logged-header";
import UnloggedHeader from "../../components/UnloggedHeader/unlogged-header";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById } from "../../services/radarPet/pet";
import { Pet } from "../../interfaces/pet";
import { toastError } from "../../components/Toast/toast";
import { Image, Spinner } from "@nextui-org/react";
import Footer from "../../components/Footer/footer";

function PetDetails() {
  const userToken = localStorage.getItem("user-token");
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getPetById(petId)
      .then((response: any) => {
        if (response?.message) {
          toastError(response?.message);
          return userToken ? navigate("/home") : navigate("/");
        }

        setPet(response);
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [petId]);

  return (
    <>
      {userToken ? <LoggedHeader /> : <UnloggedHeader />}
      {isLoading ? (
        <div className="section-container container mx-auto flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="section-container container mx-auto flex items-center flex-wrap justify-around">
          <Image width={288} src={pet?.image} alt="Pet Image" />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">{pet?.name}</h1>
            <p className="mt-5">
              <strong>Endereço:</strong> {pet?.address}
            </p>
            <p className="mt-5">
              <strong>Descrição:</strong> {pet?.description}
            </p>
            <p className="mt-5">
              <strong>Status:</strong>{" "}
              <span
                className={
                  pet?.status === "Desaparecido"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {pet?.status}
              </span>
            </p>
            <p className="mt-5">
              <strong>Última vez visto em: </strong>
              {pet?.lastSeen
                .toString()
                .substring(0, 10)
                .replace("-", "/")
                .replace("-", "/")}
            </p>
            <p className="mt-5">
              <strong>Postado por: </strong> {pet?.author[0].name}
            </p>
            <p className="mt-5">
              <strong>Data do post: </strong>
              {pet?.createdAt
                .toString()
                .substring(0, 10)
                .replace("-", "/")
                .replace("-", "/")}
            </p>
            <p className="mt-5">
              <strong>Telefone para contato: </strong> {pet?.author[0].phone}
            </p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PetDetails;
