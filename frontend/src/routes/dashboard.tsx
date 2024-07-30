import SquaresIcon from "../components/icons/Squares";
import TableIcon from "../components/icons/Table";
import QuizzesCarousel from "../components/QuizzesCarousel";
import QuizzesTable from "../components/Table/QuizzesTable";
import { useQuizzesState } from "../state/quizzes";
import { useViewState } from "../state/view";
import { getUser } from "../utils";

export default function Dashboard() {
  const user = getUser();
  const quizzes = useQuizzesState((state) => state.availableQuizzes);
  const createdQuizzes = useQuizzesState((state) => state.createdQuizzes);

  const quizzesViewType = useViewState((state) => state.quizzesViewType);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Hello, {user?.name}</h1>
        <div className="flex items-center justify-center rounded-full bg-slate-200 p-[2px] text-black">
          <button
            className={`rounded-full p-2 transition-colors ${quizzesViewType === "Carousel" ? "bg-slate-300/90" : "hover:bg-slate-400/35"}`}
            onClick={() =>
              useViewState.getState().setQuizzesViewType("Carousel")
            }
          >
            <SquaresIcon />
          </button>
          <button
            className={`rounded-full p-2 transition-colors ${quizzesViewType === "Table" ? "bg-slate-300/90" : "hover:bg-slate-400/35"}`}
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
        {quizzes && quizzesViewType === "Carousel" && (
          <QuizzesCarousel quizzes={quizzes} />
        )}
        {quizzes && quizzesViewType === "Table" && (
          <QuizzesTable quizzes={quizzes} />
        )}
      </div>
      <div className="mt-4">
        <h2 className="pb-4 text-lg font-semibold">
          Your Quizzes:{" "}
          <span className="rounded bg-slate-300 px-1.5">
            {createdQuizzes?.length ?? 0}
          </span>
        </h2>
        {createdQuizzes && quizzesViewType === "Carousel" && (
          <QuizzesCarousel quizzes={createdQuizzes} />
        )}
        {createdQuizzes && quizzesViewType === "Table" && (
          <QuizzesTable quizzes={createdQuizzes} />
        )}
      </div>
    </>
  );
}
