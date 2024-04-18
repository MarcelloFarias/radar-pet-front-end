import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { Pet } from "../../interfaces/pet";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import UpdatePetModal from "../UpdatePetModal/update-pet-modal";

interface IPetActionCardProps {
  pet: Pet;
}

function PetActionCard(props: IPetActionCardProps) {
  return (
    <Card className="w-52">
      <CardBody>
        {props.pet?.image ? (
          <Image
            alt="pet-image"
            className="w-full rounded-xl object-cover"
            src={props.pet?.image}
          />
        ) : (
          <div className="w-full h-36 bg-gray-200 rounded-xl"></div>
        )}

        <h2 className="mt-5">{props.pet?.name}</h2>
        <small
          className={`${
            props.pet?.status === "Encontrado"
              ? "text-green-500"
              : "text-red-500"
          } mt-1`}
        >
          {props.pet?.status}
        </small>
        <small className="mt-1">
          Visto em:{" "}
          {props.pet?.lastSeen
            .toString()
            .substring(0, 10)
            .replace("-", "/")
            .replace("-", "/")}
        </small>
      </CardBody>
      <CardFooter className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          <UpdatePetModal pet={props.pet} />

          <Button color="danger">
            <FaTrash />
          </Button>
        </div>

        <Button color="primary" variant="flat" className="w-full mt-5">
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PetActionCard;
