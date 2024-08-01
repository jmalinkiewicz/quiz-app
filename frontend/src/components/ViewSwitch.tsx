import { useViewState } from "../state/view";
import SquaresIcon from "./icons/Squares";
import TableIcon from "./icons/Table";

export default function ViewSwitch() {
  const quizzesViewType = useViewState((state) => state.quizzesViewType);

  return (
    <div className="flex items-center justify-center rounded-full bg-slate-200 p-[2px] text-black">
      <button
        className={`rounded-full p-2 transition-colors ${quizzesViewType === "Carousel" ? "bg-slate-300/90" : "hover:bg-slate-400/35"}`}
        onClick={() => useViewState.getState().setQuizzesViewType("Carousel")}
      >
        <SquaresIcon />
      </button>
      <button
        className={`rounded-full p-2 transition-colors ${quizzesViewType === "Table" ? "bg-slate-300/90" : "hover:bg-slate-400/35"}`}
        onClick={() => useViewState.getState().setQuizzesViewType("Table")}
      >
        <TableIcon />
      </button>
    </div>
  );
}
