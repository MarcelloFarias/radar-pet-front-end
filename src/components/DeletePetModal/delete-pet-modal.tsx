import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { Pet } from "../../interfaces/pet";
import { deletePet } from "../../services/radarPet/pet";
import { toastSuccess, toastError } from "../Toast/toast";

interface IDeletePetModalProps {
  pet: Pet;
}

function DeletePetModal(props: IDeletePetModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function confirmDeletePet() {
    if (props.pet._id) {
      deletePet(props.pet._id)
        .then((response: any) => {
          if (response?.deletedPet) {
            onClose();
            return toastSuccess(response?.message);
          }
          onClose();
          return toastError(response?.message);
        })
        .catch((error: any) => console.log(error));
    }
  }

  return (
    <>
      <Button color="danger" onClick={onOpen}>
        <FaTrash />
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Excluir um pet</ModalHeader>
          <ModalBody>Tem certeza que deseja excluir esse pet ?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onClose}>
              Cancelar
            </Button>

            <Button
              color="danger"
              variant="flat"
              onClick={() => confirmDeletePet()}
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeletePetModal;
