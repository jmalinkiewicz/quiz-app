import QuizzesCarousel from "../components/quizzesCarousel";
import { useQuizzesState } from "../state/quizzes";
import { getUser } from "../utils";

export default function Dashboard() {
  const user = getUser();
  const quizzes = useQuizzesState((state) => state.availableQuizzes);
  const createdQuizzes = useQuizzesState((state) => state.createdQuizzes);

  return (
    <main className="m-auto max-w-screen-2xl">
      <h1 className="pt-10 text-3xl font-bold">Hello, {user?.name}</h1>
      <div className="mt-4">
        <h2 className="pb-4 text-lg font-semibold">
          Invites:{" "}
          <span className="rounded bg-slate-300 px-1.5">
            {quizzes?.length ?? 0}
          </span>
        </h2>
        {quizzes && <QuizzesCarousel quizzes={quizzes} />}
      </div>
      <div className="mt-4">
        <h2 className="pb-4 text-lg font-semibold">
          Your Quizzes:{" "}
          <span className="rounded bg-slate-300 px-1.5">
            {createdQuizzes?.length ?? 0}
          </span>
        </h2>
        {createdQuizzes && <QuizzesCarousel quizzes={createdQuizzes} />}
      </div>
    </main>
  );
}
