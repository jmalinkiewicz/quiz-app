import { useState } from "react";
import PlusIcon from "../components/icons/Plus";
import { useCreateState } from "../state/create";
import { BG } from "../definitions";
import TrashIcon from "../components/icons/Trash";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const {
    setTitle,
    setDescription,
    setBackground,
    addQuestion,
    addAnswer,
    removeAnswer,
    removeQuestion,
    resetState,
    title,
    description,
    background,
    content,
  } = useCreateState();

  function handleCreateQuestion() {
    if (!question) {
      return;
    }

    addQuestion({
      question,
      answers: [],
    });
  }

  function handleRemoveQuestion(index: number) {
    removeQuestion(index);
  }

  function handleAddAnswer(index: number, text: string, isCorrect: boolean) {
    addAnswer(index, { text, isCorrect });
  }

  function handleRemoveAnswer(questionIndex: number, answerIndex: number) {
    removeAnswer(questionIndex, answerIndex);
  }

  async function handleCreateQuiz() {
    if (!title || !description || !background || content.length === 0) {
      return;
    }

    const response = await fetch("http://localhost:8000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        background,
        content,
      }),
      credentials: "include",
    });

    if (response.ok) {
      resetState();
      setQuestion("");
      navigate("/dashboard");
    }
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Create Quiz</h1>
      </div>
      <div className="flex gap-4 pt-10">
        <div className="flex w-1/2 flex-col">
          <label className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Quiz Title</span>
            <input
              className="rounded-sm border-[1px] border-black p-1.5"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="flex w-1/2 flex-col">
          <label className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Quiz Background</span>
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value as BG)}
              className="rounded-sm border-[1px] border-black p-1.5"
            >
              <option value="BLUE">Blue</option>
              <option value="GREEN">Green</option>
              <option value="RED">Red</option>
              <option value="YELLOW">Yellow</option>
              <option value="PURPLE">Purple</option>
              <option value="ORANGE">Orange</option>
              <option value="PINK">Pink</option>
              <option value="GREY">Gray</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <div className="flex w-1/2 flex-col">
          <label className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Quiz Description</span>
            <textarea
              className="rounded-sm border-[1px] border-black p-1.5"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="w-1/2"></div>
      </div>
      <div className="pt-8">
        <h2 className="text-xl font-semibold">Add Question</h2>
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            className="w-96 rounded-sm border-[1px] border-black p-1.5"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={handleCreateQuestion}
            className="grid w-24 place-items-center rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-600"
          >
            <PlusIcon />
          </button>
        </div>
        {content.length > 0 && (
          <ul className="mt-6 rounded bg-slate-100 px-4 pb-16">
            {content.map((question, index) => (
              <>
                <li key={index} className="pl-6 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {index + 1}. {question.question}
                    </h3>
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="rounded bg-red-500 p-1.5 text-white"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                  <ul className="flex flex-col gap-2 pt-2">
                    {question.answers.map((answer, AnswerIndex) => (
                      <li key={AnswerIndex} className="flex items-center gap-2">
                        <span
                          className={`rounded px-4 py-2 font-semibold ${answer.isCorrect ? "bg-green-500" : "bg-slate-200"}`}
                        >
                          {answer.text}
                        </span>
                        <button
                          onClick={() => handleRemoveAnswer(index, AnswerIndex)}
                          className="font-bold text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <h3 className="font-semibold">Add Answer</h3>
                    <form className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="w-96 rounded-sm border-[1px] border-black"
                          name="text"
                          id={`answer-${index}`}
                        />
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            const textElement = document.getElementById(
                              `answer-${index}`,
                            ) as HTMLInputElement;
                            const textValue = textElement?.value || "";

                            const isCorrectElement = document.getElementById(
                              `correct-${index}`,
                            ) as HTMLInputElement;
                            const isCorrect =
                              isCorrectElement?.checked || false;

                            handleAddAnswer(index, textValue, isCorrect);
                            textElement.value = "";
                            isCorrectElement.checked = false;
                          }}
                          className="grid w-8 place-items-center rounded bg-blue-500 font-bold text-white hover:bg-blue-600"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <label className="flex items-center gap-2">
                        <span>Correct:</span>
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          name="isCorrect"
                          id={`correct-${index}`}
                        />
                      </label>
                    </form>
                  </div>
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleCreateQuiz}
        className="my-8 rounded bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
      >
        Create Quiz
      </button>
    </>
  );
}
