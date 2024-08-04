import { useParams } from "react-router-dom";

export default function Quiz() {
  const { quizId } = useParams();

  return <h1>{quizId}</h1>;
}
