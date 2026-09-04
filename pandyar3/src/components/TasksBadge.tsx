import { ScrollIcon } from "./icons";

export default function TasksBadge({ onOpenTasks }: { onOpenTasks: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenTasks}
      className="group absolute right-2 top-[46%] z-30 flex -translate-y-1/2 flex-col items-center gap-1 sm:right-4 md:right-6"
      aria-label="Open tasks"
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-full border-2 border-[var(--color-gold)] bg-gradient-to-b from-[#3a2c18] to-[#1c140a] p-2 shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:h-16 sm:w-16"
        style={{ animation: "badge-breathe 3s ease-in-out infinite" }}
      >
        <ScrollIcon className="h-full w-full drop-shadow" />
      </span>
      <span
        className="rounded-sm bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold tracking-widest text-[var(--color-gold-bright)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] sm:text-[11px]"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        TASKS
      </span>
    </button>
  );
}
