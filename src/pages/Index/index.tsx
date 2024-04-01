import { useEffect, useState } from "react";
import { MdPets, MdSearch } from "react-icons/md";
import UnloggedHeader from "../../components/UnloggedHeader/unlogged-header";
import Footer from "../../components/Footer/footer";
import { Button, Input, Spinner } from "@nextui-org/react";
import { getRandomDogImage } from "../../services/dogAPI/dog-api";
import { Pet } from "../../interfaces/pet";
import { getAllPetsPaged, searchPet } from "../../services/radarPet/pet";
import PetList from "../../components/PetList/pet-list";
import PetCard from "../../components/PetCard/pet-card";
import ListPagination from "../../components/ListPagination/pagination";
import { toastWarning, toastError } from "../../components/Toast/toast";

function IndexPage() {
  const [randomPetImage, setRandomPetImage] = useState<string>("");
  const [isRandomPetImageLoading, setIsRandomPetImageLoading] =
    useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isPetsLoading, setIsPetsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setIsRandomPetImageLoading(true);

    getRandomDogImage()
      .then((response: any) => {
        setRandomPetImage(response?.message);
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setIsRandomPetImageLoading(false);
      });
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
      <UnloggedHeader />

      <main className="section-container flex items-center justify-around">
        <div className="random-pet-image-container">
          {isRandomPetImageLoading ? (
            <Spinner size="md" />
          ) : (
            <img
              src={randomPetImage}
              alt="pet-image"
              className="rounded-md max-w-96"
            />
          )}
        </div>

        <div className="flex items-center flex-col">
          <h1 className="text-8xl">
            <MdPets />
          </h1>
          <h1 className="text-2xl mt-5">Cadastrou ... Achou</h1>
          <Button
            color="primary"
            variant="shadow"
            className="mt-5"
            radius="full"
          >
            Quero cadastrar um pet
          </Button>
        </div>
      </main>

      <section className="section-container container mx-auto">
        <div className="flex items-center px-5">
          <Input
            type="text"
            label="Pesquise por um pet..."
            value={searchValue}
            onChange={handleSearchValue}
          />
          <Button
            color="success"
            className="ml-5 text-2xl"
            onClick={() => searchPetByName()}
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
      </section>

      <div className="container mx-auto flex items-center justify-center my-10">
        <ListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageController={setCurrentPage}
        />
      </div>

      <Footer />
    </>
  );
}

export default IndexPage;
