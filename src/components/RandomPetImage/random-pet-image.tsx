import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { getRandomDogImage } from "../../services/dogAPI/dog-api";

function RandomPetImage() {
  const [randomPetImage, setRandomPetImage] = useState<string>("");
  const [isRandomPetImageLoading, setIsRandomPetImageLoading] =
    useState<boolean>(false);

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

  return (
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
  );
}

export default RandomPetImage;
