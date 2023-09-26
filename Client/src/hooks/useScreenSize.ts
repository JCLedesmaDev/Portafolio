import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };


  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => { // Cuando se deje de utilizar este hook, eliminara el evento.
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
};

export default useScreenSize;