import { useState, useEffect } from "react";
import {
  getFurnituresWithCategory,
  getFurnituresForHomebuilder,
} from "../services/furnituresService";

const useFurnitures = (selectedFurnitures = {}) => {
  // console.log('selected furnitures: ', selectedFurnitures);
  const [furnitures, setFurnitures] = useState([]);
  const getAllFurnituresWithCategory = async () => {
    // console.log('furnitures with category!');
    const allFurnitures = await getFurnituresWithCategory();
    // console.log(allFurnitures);

    setFurnitures(allFurnitures);
  };

  const getAllFurnituresForHomebuilder = async () => {
    const allFurnitures = await getFurnituresForHomebuilder(selectedFurnitures);
    setFurnitures(allFurnitures);
  };

  useEffect(() => {
    if (Object.keys(selectedFurnitures).length > 0) {
      const allFurnitures = getAllFurnituresForHomebuilder();
    } else {
      const allFurnitures = getAllFurnituresWithCategory();
    }
  }, []);

  return {
    furnitures,
  };
};

export default useFurnitures;
