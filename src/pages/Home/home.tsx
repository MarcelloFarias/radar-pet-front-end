import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/user-context";
import { authorizeUser } from "../../services/radarPet/user";
import { toastError, toastInfo } from "../../components/Toast/toast";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../../components/LoggedHeader/logged-header";
import Footer from "../../components/Footer/footer";
import { MdSearch } from "react-icons/md";
import { Input, Button, Spinner } from "@nextui-org/react";
import { Pet } from "../../interfaces/pet";
import { toastWarning } from "../../components/Toast/toast";
import { searchPet } from "../../services/radarPet/pet";
import { getAllPetsPaged } from "../../services/radarPet/pet";
import PetList from "../../components/PetList/pet-list";
import ListPagination from "../../components/ListPagination/pagination";
import PetCard from "../../components/PetCard/pet-card";
import RegisterPetModal from "../../components/RegisterPetModal/register-pet-modal";

function Home() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");
  const [_, setUser] = useContext(userContext);
  const [isPetsLoading, setIsPetsLoading] = useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("user-token");

    if (token) {
      authorizeUser(token)
        .then((response: any) => {
          if (response?.message) {
            toastError(response?.message);
            return navigate("/");
          }

          setUser(response);
          localStorage.setItem("user-id", response._id);
        })
        .catch((error: any) => console.log(error));

      return;
    }

    toastInfo("Faça login para continuar !");
    return navigate("/");
  }, []);

  useEffect(() => {
    setIsPetsLoading(true);

    getAllPetsPaged(currentPage)
      .then((response: any) => {
        setPets(response?.pets);
        setTotalPages(response?.totalPages);
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setIsPetsLoading(false);
      });
  }, [currentPage]);

  function searchPetByName() {
    setIsPetsLoading(true);

    if (searchValue) {
      searchPet(searchValue)
        .then((response: any) => {
          if (response?.message) {
            return toastError(response?.message);
          }

          setPets(response.pets);
        })
        .catch((error: any) => console.log(error))
        .finally(() => {
          setIsPetsLoading(false);
        });

      return;
    }

    setIsPetsLoading(false);
    return toastWarning("Digite um termo de busca !");
  }

  return (
    <>
      <LoggedHeader />

      <main className="section-container container mx-auto">
        <div className="flex justify-end px-5 mt-10">
          <RegisterPetModal />
        </div>
        <div className="flex items-center px-5 mt-5 max-w-lg">
          <Input
            type="text"
            label="Pesquise por um pet..."
            value={searchValue}
            onChange={handleSearchValue}
            radius="full"
          />
          <Button
            color="success"
            className="ml-5 text-2xl"
            onClick={() => searchPetByName()}
            radius="full"
          >
            <MdSearch />
          </Button>
        </div>
        {isPetsLoading ? (
          <div className="w-full mt-80 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <PetList>
            {pets?.map((pet: Pet) => {
              return <PetCard key={pet?._id} pet={pet} />;
            })}
          </PetList>
        )}
        <div className="container mx-auto flex items-center justify-center my-10">
          <ListPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageController={setCurrentPage}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;
