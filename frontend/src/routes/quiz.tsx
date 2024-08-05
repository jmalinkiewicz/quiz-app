import { useLoaderData } from "react-router-dom";
import { useQuizzesState } from "../state/quizzes";

export type QuizDetails = {
  id: string;
  title: string;
  description: string;
  background: string;
  authorId: string;
  author: {
    name: string;
  };
  submissions?: any[];
};

export default function Quiz() {
  const data: QuizDetails = useLoaderData() as QuizDetails;
  const { availableQuizzes } = useQuizzesState();

  let hasInvite: boolean = false;

  if (availableQuizzes) {
    hasInvite = availableQuizzes.some((quiz) => quiz.id === data.id);
  }

  return (
    <>
      <div className={`BG-${data.background} rounded-xl pt-32 shadow`}>
        <div className="bg-white px-20 py-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <div className="flex justify-between">
              <p>{data.description}</p>
              <p className="font-semibold text-gray-500">{data.author.name}</p>
            </div>
          </div>
          {data.submissions && (
            <p className="pt-4 text-sm text-gray-700">
              {data.submissions.length} Submissions
            </p>
          )}
          <div className="flex justify-between">
            {hasInvite && (
              <button className="mt-4 rounded bg-green-500 px-10 py-2 font-bold text-white hover:bg-green-600">
                START
              </button>
            )}
            {data.submissions && (
              <button className="mt-4 rounded bg-red-500 px-10 py-2 font-bold text-white hover:bg-red-600">
                DELETE
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
