import { Quiz } from "../../state/quizzes";

export default function TableBody({ quizzes }: { quizzes: Quiz[] }) {
  if (quizzes.length === 0 || quizzes === undefined) {
    return <h1>No quizzes found</h1>;
  }

  return (
    <tbody>
      {quizzes[0].submissions !== undefined &&
        quizzes.map((quiz) => {
          return (
            <tr className="flex justify-start px-4 py-1.5 text-left odd:bg-slate-100">
              <th className="w-1/2 font-normal">{quiz.title}</th>
              <th className="w-2/12 font-normal">{quiz.author.name}</th>
              <th className="line-clamp-2 w-2/12 font-normal">
                {quiz.description}
              </th>
              <th className="w-2/12 font-normal">{quiz.submissions?.length}</th>
            </tr>
          );
        })}
      {quizzes[0].submissions === undefined &&
        quizzes.map((quiz) => {
          return (
            <tr
              key={quiz.id}
              className="flex justify-start px-4 py-1.5 text-left odd:bg-slate-100"
            >
              <th
                style={{
                  minWidth: "50%",
                }}
                className="w-1/2 font-normal"
              >
                {quiz.title}
              </th>
              <th
                style={{
                  minWidth: "16.666667%",
                }}
                className="w-2/12 font-normal"
              >
                {quiz.author.name}
              </th>
              <th className="line-clamp-2 w-full font-normal">
                {quiz.description}
              </th>
            </tr>
          );
        })}
    </tbody>
  );
}
