import { Submission } from "../../definitions";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  return (
    <div className="max-h-[220px] w-full overflow-y-scroll rounded border-[1px] bg-slate-50 shadow">
      <table className="w-full">
        <TableHead />
        <TableBody submissions={submissions} />
      </table>
    </div>
  );
}
