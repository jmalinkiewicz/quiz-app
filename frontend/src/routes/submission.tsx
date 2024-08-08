import { useLoaderData } from "react-router-dom";

export default function Submission() {
  const data = useLoaderData();

  return <h1>{JSON.stringify(data)}</h1>;
}
