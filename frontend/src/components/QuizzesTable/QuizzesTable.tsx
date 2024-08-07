import { Invite, Quiz } from "../../definitions";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function QuizzesTable({
  quizzes,
  invites,
}: {
  quizzes?: Quiz[];
  invites?: Invite[];
}) {
  return (
    <div className="max-h-[220px] w-full overflow-y-scroll rounded border-[1px] bg-slate-50 shadow">
      <table className="w-full">
        {invites !== undefined && (
          <>
            <TableHead isOwner={false} />
            <TableBody invites={invites} />
          </>
        )}
        {quizzes !== undefined && (
          <>
            <TableHead isOwner={true} />
            <TableBody quizzes={quizzes} />
          </>
        )}
      </table>
    </div>
  );
}
