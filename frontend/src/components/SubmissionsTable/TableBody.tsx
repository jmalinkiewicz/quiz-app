import { Link } from "react-router-dom";
import { Submission } from "../../definitions";

export default function TableBody({
  submissions,
}: {
  submissions: Submission[];
}) {
  return (
    <tbody>
      {submissions.map((submission) => {
        return (
          <Link to={`submission/${submission.id}`}>
            <tr className="flex justify-start px-4 py-1.5 text-left odd:bg-slate-100 hover:bg-blue-200/35">
              <th className="w-1/2 font-normal">{submission.user.name}</th>
              <th className="w-1/2 font-normal">{submission.answers.length}</th>
            </tr>
          </Link>
        );
      })}
    </tbody>
  );
}
