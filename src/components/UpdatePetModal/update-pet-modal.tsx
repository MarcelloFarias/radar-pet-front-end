import { useState } from "react";
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
  useDisclosure,
} from "@nextui-org/react";
import { Pet } from "../../interfaces/pet";
import InputFile from "../InputFile/input-file";
import { updatePet } from "../../services/radarPet/pet";
import { toastError, toastSuccess, toastWarning } from "../Toast/toast";
import { MdEdit } from "react-icons/md";

interface IUpdatePetModal {
  pet: Pet;
}

function UpdatePetModal(props: IUpdatePetModal) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pet, setPet] = useState<Pet>(props.pet);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePet = (e: any) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
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

  function editPet() {
    setIsLoading(true);

    if (pet.name && pet.description && pet.status && pet.address) {
      updatePet(pet)
        .then((response: any) => {
          if (response?.updatedPet) {
            onClose();
            return toastSuccess(response?.message);
          }
          onClose();
          return toastError(response?.error);
        })
        .catch((error: any) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }
    setIsLoading(false);
    onClose();
    return toastWarning("Preencha todos os campos obrigatórios !");
  }

  return (
    <>
      <Button color="warning" onClick={onOpen}>
        <MdEdit />
      </Button>

      <Modal placement="auto" size="3xl" onClose={onClose} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Editar um pet</ModalHeader>
          <ModalBody>
            <div>
              <Input
                isRequired
                radius="full"
                type="text"
                label="Nome do pet"
                name="name"
                onChange={handlePet}
              />
              <small>{pet?.name}</small>
            </div>
            <div>
              <Input
                isRequired
                radius="full"
                type="text"
                label="Endereço do pet"
                name="address"
                onChange={handlePet}
              />
              <small>{pet?.address}</small>
            </div>
            <div>
              <Textarea
                isRequired
                label="Descrição do pet"
                placeholder="Aponte descrições sobre o pet, para que seja mais fácil identificá-lo..."
                name="description"
                onChange={handlePet}
              />
              <small>{pet?.description}</small>
            </div>
            <div className="flex items-center">
              <div className="w-1/2">
                <Input
                  isRequired
                  type="date"
                  label="Última vez visto"
                  radius="full"
                  name="lastSeen"
                  onChange={handlePet}
                />
                <small>{pet?.lastSeen?.toString().split("T")[0]}</small>
              </div>

              <div className="w-1/2 px-5">
                <label className="text-xs">Foto do pet</label>
                <div className="flex items-center">
                  <InputFile name="image" onChange={uploadImage} />
                  <img className="w-8 mt-5" src={pet?.image} />
                </div>
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
            <Button color="danger" variant="light" onClick={onClose}>
              Fechar
            </Button>

            <Button color="success" onClick={() => editPet()}>
              Salvar
              {isLoading ? <Spinner size="md" /> : null}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdatePetModal;
