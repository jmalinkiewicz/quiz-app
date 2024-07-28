import { useRef } from "react";
import { Quiz } from "../state/quizzes";
import ChevronDownIcon from "./icons/ChevronDown";

export default function QuizzesCarousel({ quizzes }: { quizzes: Quiz[] }) {
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
        className={`scrollbar-hide flex h-full w-full space-x-4 overflow-x-scroll bg-white px-2 ${quizzes.length === 0 ? "items-center justify-center" : ""}`}
      >
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={`min-w-[250px] rounded border-[1px] p-4 pb-1 shadow ${quiz.background}`}
          >
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <h4 className="pt-1 text-sm text-gray-500">{quiz.author?.name}</h4>
            <p className="line-clamp-2 pt-2">{quiz.description}</p>
            {quiz.submissions !== undefined && (
              <p className="pb-2 pt-4 text-sm text-gray-700">
                {quiz.submissions.length} Submissions
              </p>
            )}
          </div>
        ))}
        {quizzes.length === 0 && (
          <h3 className="text-lg font-semibold">No quizzes found.</h3>
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
