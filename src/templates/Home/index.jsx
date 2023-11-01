import { useDebugValue, useEffect, useState } from "react";

const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatch] = useState(initialValue);

  useDebugValue(`Query: ${queryValue}`, (name) => {
    return `${name} + modificado`;
  });

  useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);

    const handleChange = () => {
      if (!isMounted) return;

      // !! => convertendo para boolean
      setMatch(!!matchMedia.matches);
    };

    matchMedia.addEventListener("change", handleChange);
    setMatch(!!matchMedia.matches);

    return () => {
      isMounted = false;
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [queryValue]);

  return match;
};

export const Home = () => {
  const huge = useMediaQuery("(min-width: 980px)");
  const big = useMediaQuery("(max-width: 979px) and (min-width: 768px)");
  const medium = useMediaQuery("(max-width: 767px) and (min-width: 321px)");
  const small = useMediaQuery("(max-width: 320px)");
  const background = huge ? "purple" : big ? "yellow" : medium ? "red" : small ? "black" : "";

  return (
    <div style={{ background }}>
      <h1>Oi</h1>
    </div>
  );
};
