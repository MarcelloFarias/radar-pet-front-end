import { useEffect, useState } from "react";
import { MdPets, MdSearch } from "react-icons/md";
import UnloggedHeader from "../../components/UnloggedHeader/unlogged-header";
import Footer from "../../components/Footer/footer";
import { Button, Input, Spinner } from "@nextui-org/react";
import { getRandomDogImage } from "../../services/dogAPI/dog-api";
import { Pet } from "../../interfaces/pet";
import { getAllPetsPaged } from "../../services/radarPet/pet";
import PetList from "../../components/PetList/pet-list";
import PetCard from "../../components/PetCard/pet-card";
import ListPagination from "../../components/ListPagination/pagination";

function IndexPage() {
  const [randomPetImage, setRandomPetImage] = useState<string>("");
  const [isRandomPetImageLoading, setIsRandomPetImageLoading] =
    useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isPetsLoading, setIsPetsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

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
        console.log(response.currentPage);
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setIsPetsLoading(false);
      });
  }, [currentPage]);

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
          <Button color="primary" variant="shadow" className="mt-5">
            Quero cadastrar um pet
          </Button>
        </div>
      </main>

      <section className="section-container container mx-auto">
        <div className="flex items-center">
          <Input type="text" label="Pesquise por um pet..." />
          <Button color="success" className="ml-5 text-2xl">
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
