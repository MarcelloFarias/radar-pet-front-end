import { useState, useEffect } from "react";
import LoggedHeader from "../../components/LoggedHeader/logged-header";
import { Pet } from "../../interfaces/pet";
import { getAllPets } from "../../services/radarPet/pet";
import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";
import PetList from "../../components/PetList/pet-list";
import PetActionsCard from "../../components/PetActionsCard/pet-actions-card";
import Footer from "../../components/Footer/footer";
import RegisterPetModal from "../../components/RegisterPetModal/register-pet-modal";

function MyRegistrations() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pets, setPets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          />
          <Button
            color="success"
            radius="full"
            className="ml-5"
            onClick={onOpen}
          >
            Registrar pet
          </Button>
        </div>

        {isLoading ? (
          <div className="w-full mt-80 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <PetList>
            {pets?.map((pet: Pet) => {
              return <PetActionsCard key={pet?._id} pet={pet} />;
            })}
          </PetList>
        )}
      </main>
      <Footer />

      <RegisterPetModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
}

export default MyRegistrations;
