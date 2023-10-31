import { useCallback, useEffect, useState } from "react";

const useAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: "idle",
  });

  const run = useCallback(() => {
    setState({
      result: null,
      error: null,
      status: "pending",
    });

    return asyncFunction()
      .then((response) => {
        setState({
          result: response,
          error: null,
          status: "settled",
        });
      })
      .catch((error) => {
        setState({
          result: null,
          error: error,
          status: "error",
        });
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, state.result, state.error, state.status];
};

const fetchData = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await data.json();
  return json;
};

export const Home = () => {
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     reFetchData();
  //   }, 5000);
  // }, [reFetchData]);

  const handleClick = () => {
    reFetchData();
  };

  if (status === "idle") {
    return <pre>idle: Nada executando</pre>;
  }
  if (status === "pending") {
    return <pre>pending: Loading...</pre>;
  }
  if (status === "error") {
    return <pre>error: {error.message}</pre>;
  }
  if (status === "settled") {
    return <pre onClick={handleClick}>settled: {JSON.stringify(result, null, 2)}</pre>;
  }
};
