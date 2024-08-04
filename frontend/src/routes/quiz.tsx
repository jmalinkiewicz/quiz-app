import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizDetails } from "../utils";

export default function Quiz() {
  const [data, setData] = useState();
  const { quizId } = useParams();

  useEffect(() => {
    async function getData() {
      if (!quizId) return;
      const data = await getQuizDetails(quizId);
      setData(data);
    }

    getData();
  }, []);

  return <h1>{JSON.stringify(data)}</h1>;
}
