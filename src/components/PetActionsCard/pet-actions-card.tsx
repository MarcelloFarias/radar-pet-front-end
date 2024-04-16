import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  CardHeader,
} from "@nextui-org/react";
import { Pet } from "../../interfaces/pet";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

interface IPetActionCardProps {
  pet: Pet;
}

function PetActionCard(props: IPetActionCardProps) {
  return (
    <Card className="w-52">
      <CardHeader>
        <Button color="warning" size="sm">
          <MdEdit />
        </Button>

        <Button color="danger" size="sm" className="ml-3">
          <FaTrash />
        </Button>
      </CardHeader>
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
      <CardFooter>
        <Button color="primary" variant="flat" className="w-full">
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PetActionCard;
