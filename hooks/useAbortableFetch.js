import { useState, useEffect, useRef } from 'react';

const useAbortableFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setLoading(true);
    fetch(url, { signal })
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
        setLoading(false);
      });

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url]);

  return { data, loading, error };
};

export default useAbortableFetch;