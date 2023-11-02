import { Suspense, lazy, useState } from "react";
// import LazyComponent from "./lazy-component";

const loadComponent = () => {
  console.log("Carregando...");
  return import("./lazy-component");
};

const LazyComponent = lazy(loadComponent);

export const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onMouseOver={loadComponent} onClick={() => setShow((s) => !s)}>
        {show ? "LC on screen" : "LC is off screen"}
      </button>
      <Suspense fallback={<p>Carregando...</p>}>{show && <LazyComponent />}</Suspense>
    </div>
  );
};
