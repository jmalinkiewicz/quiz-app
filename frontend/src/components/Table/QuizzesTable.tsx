import { Quiz } from "../../state/quizzes";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function QuizzesTable({ quizzes }: { quizzes: Quiz[] }) {
  const isOwner = quizzes[0].submissions !== undefined;

  return (
    <div className="w-full rounded border-[1px] bg-slate-50 shadow">
      <table className="w-full">
        <TableHead isOwner={isOwner} />
        <TableBody quizzes={quizzes} />
      </table>
    </div>
  );
}
