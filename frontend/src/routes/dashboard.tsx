import SquaresIcon from "../components/icons/Squares";
import TableIcon from "../components/icons/Table";
import QuizzesCarousel from "../components/quizzesCarousel";
import { useQuizzesState } from "../state/quizzes";
import { useViewState } from "../state/view";
import { getUser } from "../utils";

export default function Dashboard() {
  const user = getUser();
  const quizzes = useQuizzesState((state) => state.availableQuizzes);
  const createdQuizzes = useQuizzesState((state) => state.createdQuizzes);

  const quizzesViewType = useViewState((state) => state.quizzesViewType);

  return (
    <main className="m-auto max-w-screen-2xl">
      <div className="flex justify-between pt-10">
        <h1 className="text-3xl font-bold">Hello, {user?.name}</h1>
        <div className="flex items-center justify-center rounded-full bg-slate-300 p-[2px] text-black">
          <button
            className={`rounded-full p-2 transition-colors ${quizzesViewType === "Carousel" ? "bg-slate-400/70" : "hover:bg-slate-400/35"}`}
            onClick={() =>
              useViewState.getState().setQuizzesViewType("Carousel")
            }
          >
            <SquaresIcon />
          </button>
          <button
            className={`rounded-full p-2 transition-colors ${quizzesViewType === "Table" ? "bg-slate-400/70" : "hover:bg-slate-400/35"}`}
            onClick={() => useViewState.getState().setQuizzesViewType("Table")}
          >
            <TableIcon />
          </button>
        </div>
      </div>
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
