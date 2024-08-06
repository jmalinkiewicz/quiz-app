import { useLoaderData } from "react-router-dom";

export default function QuizStart() {
  const data: any = useLoaderData();

  return <h1>{JSON.stringify(data)}</h1>;
}
