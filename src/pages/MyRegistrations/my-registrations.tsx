import { useState, useEffect } from "react";
import LoggedHeader from "../../components/LoggedHeader/logged-header";
import { Pet } from "../../interfaces/pet";
import { getAllPets } from "../../services/radarPet/pet";
import { Input, Spinner } from "@nextui-org/react";
import PetList from "../../components/PetList/pet-list";
import PetActionsCard from "../../components/PetActionsCard/pet-actions-card";
import Footer from "../../components/Footer/footer";
import RegisterPetModal from "../../components/RegisterPetModal/register-pet-modal";

function MyRegistrations() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);

    getAllPets()
      .then((response: any) => {
        const userId = localStorage.getItem("user-id");

        const pets = [...response];

        if (userId) {
          const petsFilteredByUser = pets.filter(
            (pet: any) => pet.author[0]._id === userId
          );

          setPets(petsFilteredByUser);
        }
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <LoggedHeader />

      <main className="section-container container mx-auto">
        <div className="flex items-center justify-between mt-10 px-5">
          <Input
            label="Pesquisar por um pet..."
            radius="full"
            className="w-3/4"
            value={searchValue}
            onChange={handleSearchValue}
          />
          <RegisterPetModal />
        </div>

        {isLoading ? (
          <div className="w-full mt-80 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <PetList>
            {pets
              ?.filter((pet: any) => {
                if (
                  pet.name.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return pet;
                }
                return;
              })
              .map((pet: Pet) => {
                return <PetActionsCard key={pet?._id} pet={pet} />;
              })}
          </PetList>
        )}
      </main>
      <Footer />
    </>
  );
}

export default MyRegistrations;
