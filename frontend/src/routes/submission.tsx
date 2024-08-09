import { useLoaderData } from "react-router-dom";
import { SubmissionPageData } from "../definitions";

export default function Submission() {
  const data: SubmissionPageData = useLoaderData() as SubmissionPageData;

  function isAnswerSelected(
    submissionAnswers: { answerId: string }[],
    answerId: string,
  ) {
    return submissionAnswers.some(
      (answerObj) => answerObj.answerId === answerId,
    );
  }

  return (
    <>
      <div className={`BG-${data.quiz.background} rounded-xl pt-32 shadow`}>
        <div className="bg-white px-20 py-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{data.quiz.title}</h1>
            <div className="flex justify-between">
              <p>{data.quiz.description}</p>
            </div>
            <h2 className="text-lg font-bold">
              Submitted by {data.submission.user.name}
            </h2>
          </div>
          <div className="flex flex-col items-start justify-start gap-4 pt-4">
            {data.quiz.questions.map((question, index) => {
              return (
                <div key={question.id} className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">
                    {index + 1}. {question.text}
                  </h2>
                  <div className="flex items-start justify-start gap-4">
                    {question.answers.map((answer) => {
                      return (
                        <div
                          className={`rounded px-2 py-1 text-white ${
                            isAnswerSelected(data.submission.answers, answer.id)
                              ? `outline outline-2 outline-offset-1 outline-gray-500 ${answer.isCorrect ? "bg-green-500" : "bg-red-500"}`
                              : `${answer.isCorrect ? "bg-green-900" : "bg-red-900"}`
                          }`}
                          key={answer.id}
                        >
                          {answer.id}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
