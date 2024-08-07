import QuizzesCarousel from "../components/QuizzesCarousel";
import RedeemInvitePanel from "../components/RedeemInvitePanel";
import QuizzesTable from "../components/QuizzesTable/QuizzesTable";
import ViewSwitch from "../components/ViewSwitch";
import { useQuizzesState } from "../state/quizzes";
import { useViewState } from "../state/view";

export default function Invites() {
  const invites = useQuizzesState((state) => state.availableQuizzes);

  const quizzesViewType = useViewState((state) => state.quizzesViewType);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Your Invites</h1>
        <ViewSwitch />
      </div>
      <div className="mt-4">
        <h2 className="pb-4 text-lg font-semibold">
          Your Invites:{" "}
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
        <h2 className="pb-4 text-xl font-semibold">Create an invite</h2>
        <RedeemInvitePanel variant="page" />
      </div>
    </>
  );
}
