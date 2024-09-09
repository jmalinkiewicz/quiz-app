import InvitePanel from "../components/InvitePanel";
import QuizzesCarousel from "../components/quizzesCarousel";
import RedeemInvitePanel from "../components/RedeemInvitePanel";
import QuizzesTable from "../components/QuizzesTable/QuizzesTable";
import ViewSwitch from "../components/ViewSwitch";
import { useQuizzesState } from "../state/quizzes";
import { useViewState } from "../state/view";
import { getUser } from "../utils";

export default function Dashboard() {
  const user = getUser();
  const invites = useQuizzesState((state) => state.availableQuizzes);
  const createdQuizzes = useQuizzesState((state) => state.createdQuizzes);

  const quizzesViewType = useViewState((state) => state.quizzesViewType);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Hello, {user?.name}</h1>
        <ViewSwitch />
      </div>
      <div className="mt-4">
        <h2 className="pb-4 text-lg font-semibold">
          Invites:{" "}
          <span className="rounded bg-slate-300 px-1.5">
            {invites !== undefined
              ? (invites?.filter((invite) => !invite.isUsed).length ?? 0)
              : 0}
          </span>
        </h2>
        {invites && quizzesViewType === "Carousel" && (
          <QuizzesCarousel invites={invites} />
        )}
        {invites && quizzesViewType === "Table" && (
          <QuizzesTable invites={invites} />
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
      <div className="mt-4 flex items-start justify-start gap-4">
        <div className="h-[200px] w-1/2">
          <RedeemInvitePanel variant="dashboard" />
        </div>
        <div className="h-[200px] w-1/2">
          <InvitePanel variant="dashboard" />
        </div>
      </div>
    </>
  );
}
