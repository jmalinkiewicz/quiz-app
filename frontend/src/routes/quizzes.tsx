import InvitePanel from "../components/InvitePanel";
import QuizzesCarousel from "../components/QuizzesCarousel";
import QuizzesTable from "../components/Table/QuizzesTable";
import ViewSwitch from "../components/ViewSwitch";
import { useQuizzesState } from "../state/quizzes";
import { useViewState } from "../state/view";

export default function Quizzes() {
  const createdQuizzes = useQuizzesState((state) => state.createdQuizzes);

  const quizzesViewType = useViewState((state) => state.quizzesViewType);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Your Quizzes</h1>
        <ViewSwitch />
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
      <div className="mt-4">
        <h2 className="pb-4 text-xl font-semibold">Create an invite</h2>
        <InvitePanel variant="page" />
      </div>
    </>
  );
}
