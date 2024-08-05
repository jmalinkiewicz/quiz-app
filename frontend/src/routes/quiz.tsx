import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useQuizzesState } from "../state/quizzes";
import { deleteQuiz, getCreatedQuizzes } from "../utils";

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
  const { availableQuizzes, setCreatedQuizzes } = useQuizzesState();
  const navigate = useNavigate();

  let hasInvite: boolean = false;

  if (availableQuizzes) {
    hasInvite = availableQuizzes.some((quiz) => quiz.id === data.id);
  }

  async function handleDeleteQuiz() {
    const response = await deleteQuiz(data.id);

    switch (response.status) {
      case 200:
        navigate("/dashboard");
        const createdQuizzes = await getCreatedQuizzes();
        setCreatedQuizzes(createdQuizzes);
        break;
      default:
        console.log("Error deleting quiz");
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
              <Link
                to={`/quizzes/${data.id}/start`}
                className="mt-4 block rounded bg-green-500 px-10 py-2 font-bold text-white hover:bg-green-600"
              >
                START
              </Link>
            )}
            {data.submissions && (
              <button
                onClick={handleDeleteQuiz}
                className="mt-4 rounded bg-red-500 px-10 py-2 font-bold text-white hover:bg-red-600"
              >
                DELETE
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
