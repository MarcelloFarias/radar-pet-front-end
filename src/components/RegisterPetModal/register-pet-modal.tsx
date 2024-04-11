import { useState, useContext, useEffect } from "react";
import { userContext } from "../../contexts/user-context";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { PetRegistration } from "../../interfaces/pet";
import InputFile from "../InputFile/input-file";
import { registerPet } from "../../services/radarPet/pet";
import { toastSuccess, toastWarning } from "../Toast/toast";

interface IRegisterPetModalProps {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}

function RegisterPetModal(props: IRegisterPetModalProps) {
  const [isRegistrationLoading, setIsRegistrationLoading] =
    useState<boolean>(false);
  const [user, _] = useContext(userContext);
  const [lastSeenPet, setLastSeenPet] = useState<string>("");
  const [pet, setPet] = useState<PetRegistration>({
    name: "",
    address: "",
    description: "",
    lastSeen: new Date(),
    status: "",
    image: "",
    author: user,
  });

  const handlePet = (e: any) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  const handleLastSeenPet = (e: any) => {
    setLastSeenPet(e.target.value);
  };

  const uploadImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = reader.result?.toString();

        if (typeof image === "string") {
          setPet({
            ...pet,
            image: image,
          });

          console.log(pet);
        }
      };
    }
  };

  useEffect(() => {
    console.log(pet);
  }, [pet]);

  useEffect(() => {
    setPet({
      ...pet,
      lastSeen: new Date(lastSeenPet.replace("-", "/")),
    });
  }, [lastSeenPet]);

  function createPet() {
    setIsRegistrationLoading(true);

    if (
      pet.name &&
      pet.address &&
      pet.author &&
      pet.description &&
      pet.lastSeen &&
      pet.status
    ) {
      registerPet(pet)
        .then((response: any) => {
          if (response?.res) {
            setPet({
              name: "",
              address: "",
              description: "",
              lastSeen: new Date(),
              status: "",
              image: "",
              author: user,
            });
            props.onClose();
            return toastSuccess(response?.message);
          }
        })
        .catch((error: any) => console.log(error))
        .finally(() => {
          setIsRegistrationLoading(false);
        });

      return;
    }

    setIsRegistrationLoading(false);
    props.onClose();
    return toastWarning("Preencha todos os campos !");
  }

  return (
    <Modal size="3xl" onClose={props.onClose} isOpen={props.isOpen}>
      <ModalContent>
        <ModalHeader>Registrar um pet</ModalHeader>
        <ModalBody>
          <Input
            isRequired
            radius="full"
            type="text"
            label="Nome do pet"
            name="name"
            onChange={handlePet}
          />
          <Input
            isRequired
            radius="full"
            type="text"
            label="Endereço do pet"
            name="address"
            onChange={handlePet}
          />
          <Textarea
            isRequired
            label="Descrição do pet"
            placeholder="Aponte descrições sobre o pet, para que seja mais fácil identificá-lo..."
            name="description"
            onChange={handlePet}
          />
          <div className="flex items-center">
            <Input
              isRequired
              type="date"
              label="Última vez visto"
              radius="full"
              className="w-1/2"
              name="lastSeen"
              onChange={handleLastSeenPet}
            />

            <div className="w-1/2 px-5">
              <label className="text-xs">Foto do pet</label>
              <InputFile name="image" onChange={uploadImage} />
            </div>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button radius="full" variant="flat">
                Status: {pet.status}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key: any) =>
                setPet({
                  ...pet,
                  status: key,
                })
              }
            >
              <DropdownItem key="Desaparecido">Desaparecido</DropdownItem>
              <DropdownItem key="Encontrado">Encontrado</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={props.onClose}>
            Fechar
          </Button>

          <Button color="success" onClick={() => createPet()}>
            Salvar
            {isRegistrationLoading ? <Spinner size="md" /> : null}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegisterPetModal;
