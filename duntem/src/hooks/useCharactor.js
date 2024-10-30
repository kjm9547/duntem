import { useState } from "react";

export const useCharactor = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [charactor, setCharactor] = useState(null);

  const handleSetIsDeleteMode = (v) => {
    setIsDeleteMode(v);
  };
  const handleSetCharactor = (v) => {
    setCharactor(v);
  };
  return {
    isDeleteMode,
    charactor,
    handleSetIsDeleteMode,
    handleSetCharactor,
  };
};
