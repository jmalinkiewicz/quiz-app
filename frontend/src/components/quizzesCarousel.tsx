import { useRef } from "react";
import ChevronDownIcon from "./icons/ChevronDown";
import { Link } from "react-router-dom";
import { Invite, Quiz } from "../definitions";

export default function QuizzesCarousel({
  quizzes,
  invites,
}: {
  quizzes?: Quiz[];
  invites?: Invite[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-[190px] w-full items-center rounded-md bg-slate-200">
      <button
        className="h-full px-2 hover:bg-slate-300 active:bg-slate-400"
        onClick={scrollLeft}
      >
        <span className="block rotate-90">
          <ChevronDownIcon />
        </span>
      </button>
      <div
        ref={carouselRef}
        className={`scrollbar-hide flex h-full w-full space-x-4 overflow-y-hidden overflow-x-scroll bg-white px-2 ${quizzes !== undefined && quizzes.length === 0 ? "items-center justify-center" : ""}`}
      >
        {quizzes !== undefined && (
          <>
            {quizzes.map((quiz) => (
              <Link className="w-[250px]" to={`/quizzes/${quiz.id}`}>
                <div
                  key={quiz.id}
                  className={`h-full rounded border-[1px] p-4 pb-1 shadow hover:bg-gray-100 ${quiz.background}`}
                >
                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {quiz.title}
                  </h3>
                  <h4 className="pt-1 text-sm text-gray-500">
                    {quiz.author?.name}
                  </h4>
                  <p className="line-clamp-2 pt-2">{quiz.description}</p>
                  {quiz.submissions !== undefined && (
                    <p className="pb-2 pt-4 text-sm text-gray-700">
                      {quiz.submissions.length} Submissions
                    </p>
                  )}
                </div>
              </Link>
            ))}
            {quizzes.length === 0 && (
              <h3 className="text-lg font-semibold">No quizzes found.</h3>
            )}
          </>
        )}
        {invites !== undefined && (
          <>
            {invites.map((invite) => {
              if (invite.isUsed) return null;

              return (
                <Link className="w-[250px]" to={`/quizzes/${invite.quiz.id}`}>
                  <div
                    key={invite.quiz.id}
                    className={`h-full rounded border-[1px] p-4 pb-1 shadow hover:bg-gray-100 ${invite.quiz.background}`}
                  >
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {invite.quiz.title}
                    </h3>
                    <h4 className="pt-1 text-sm text-gray-500">
                      {invite.quiz.author?.name}
                    </h4>
                    <p className="line-clamp-2 pt-2">
                      {invite.quiz.description}
                    </p>
                    {invite.quiz.submissions !== undefined && (
                      <p className="pb-2 pt-4 text-sm text-gray-700">
                        {invite.quiz.submissions.length} Submissions
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
            {invites.length === 0 && (
              <h3 className="text-lg font-semibold">No invites found.</h3>
            )}
          </>
        )}
      </div>
      <button
        className="h-full px-2 hover:bg-slate-300 active:bg-slate-400"
        onClick={scrollRight}
      >
        <span className="block -rotate-90">
          <ChevronDownIcon />
        </span>
      </button>
    </div>
  );
}
