import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
  const [userChoice, setUserChoice] = useLocalStorage("darkMode");

  useEffect(() => {
    const bodyElem = window.document.body;
    userChoice ? bodyElem.classList.add("dark-mode")
      : bodyElem.classList.remove("dark-mode");


  }, [userChoice]);
  return [userChoice, setUserChoice];
};

export default useDarkMode;