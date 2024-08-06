import { useLoaderData, useNavigate } from "react-router-dom";
import { QuizStartData } from "../definitions";
import { useState } from "react";
import { submitQuiz } from "../utils";

export default function QuizStart() {
  const data: QuizStartData = useLoaderData() as QuizStartData;

  const [answers, setAnswers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  function handleAnswerClick(id: string) {
    if (answers.includes(id)) {
      setAnswers(answers.filter((answer) => answer !== id));
    } else {
      setAnswers([...answers, id]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setMessage("");

    event.preventDefault();
    if (answers.length === 0) {
      setMessage("Please select an answer for at least one question.");
    }

    const response = await submitQuiz(data.id, answers);
    const status = response.status;
    const body = await response.json();

    switch (status) {
      case 200:
        setMessage("Quiz submitted successfully!");
        navigate("/dashboard");
        break;
      case 403:
        setMessage(body.error);
        break;
      case 400:
        setMessage(body.error);
        break;
      case 404:
        setMessage(body.error);
        break;
      case 505:
        setMessage("Internal server error.");
        break;
    }
  }

  return (
    <>
      <div className={`BG-${data.background} rounded-xl pt-32 shadow`}>
        <div className="bg-white px-20 py-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <div className="flex justify-between">
              <p>{data.description}</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start gap-4 pt-4"
          >
            {data.questions.map((question, index) => {
              return (
                <div key={question.id} className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">
                    {index + 1}. {question.text}
                  </h2>
                  <div className="flex items-start justify-start gap-4">
                    {question.answers.map((answer) => {
                      return (
                        <button
                          className={`rounded px-2 py-1 text-white ${answers.includes(answer.id) ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"}`}
                          key={answer.id}
                          onClick={() => handleAnswerClick(answer.id)}
                          type="button"
                        >
                          {answer.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {message && <p className="text-red-500">{message}</p>}
            <button
              className="block rounded bg-green-500 px-10 py-2 font-bold text-white hover:bg-green-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
