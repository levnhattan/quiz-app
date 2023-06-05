import axios from "axios";
import React, { useState, useEffect } from "react";

const useAxios = () => {
  const url = "https://opentdb.com/api.php?amount=5";

  const [response, setResponse] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fectchData = () => {
      axios
        .get(url)
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fectchData();
  }, [url]);

  return { response, err, loading };
};

export default useAxios;
