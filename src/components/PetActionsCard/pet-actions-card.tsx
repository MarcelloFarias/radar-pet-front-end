import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { Pet } from "../../interfaces/pet";
import UpdatePetModal from "../UpdatePetModal/update-pet-modal";
import DeletePetModal from "../DeletePetModal/delete-pet-modal";
import { useNavigate } from "react-router-dom";

interface IPetActionCardProps {
  pet: Pet;
}

function PetActionCard(props: IPetActionCardProps) {
  const navigate = useNavigate();

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

          <DeletePetModal pet={props.pet} />
        </div>

        <Button
          color="primary"
          variant="flat"
          className="w-full mt-5"
          onClick={() => navigate(`/pet/${props.pet?._id}`)}
        >
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PetActionCard;
