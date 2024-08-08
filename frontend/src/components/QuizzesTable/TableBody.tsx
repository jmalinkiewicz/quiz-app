import { Link } from "react-router-dom";
import { Invite, Quiz } from "../../definitions";

export default function TableBody({
  quizzes,
  invites,
}: {
  quizzes?: Quiz[];
  invites?: Invite[];
}) {
  return (
    <tbody>
      {quizzes !== undefined &&
        quizzes.map((invite) => {
          return (
            <Link to={`/quizzes/${invite.id}`}>
              <tr className="flex justify-start px-4 py-1.5 text-left odd:bg-slate-100 hover:bg-blue-200/35">
                <th className="w-1/2 font-normal">{invite.title}</th>
                <th className="w-2/12 font-normal">{invite.author.name}</th>
                <th className="line-clamp-2 w-2/12 font-normal">
                  {invite.description}
                </th>
                <th className="w-2/12 font-normal">
                  {invite.submissions?.length}
                </th>
              </tr>
            </Link>
          );
        })}
      {invites !== undefined &&
        invites.map((invite) => {
          if (invite.isUsed) return null;
          return (
            <Link to={`/quizzes/${invite.quiz.id}`}>
              <tr
                key={invite.quiz.id}
                className="flex justify-start px-4 py-1.5 text-left odd:bg-slate-100 hover:bg-blue-200/35"
              >
                <th
                  style={{
                    minWidth: "50%",
                  }}
                  className="w-1/2 font-normal"
                >
                  {invite.quiz.title}
                </th>
                <th
                  style={{
                    minWidth: "16.666667%",
                  }}
                  className="w-2/12 font-normal"
                >
                  {invite.quiz.author.name}
                </th>
                <th className="line-clamp-2 w-full font-normal">
                  {invite.quiz.description}
                </th>
              </tr>
            </Link>
          );
        })}
    </tbody>
  );
}
