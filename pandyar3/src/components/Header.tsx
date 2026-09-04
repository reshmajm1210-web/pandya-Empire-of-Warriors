import { CoinIcon, GearIcon, GemIcon, HeartIcon, PlusIcon } from "./icons";

interface HeaderProps {
  coins: number;
  gems: number;
  lives: number;
  maxLives: number;
  onOpenShop: (type: "coins" | "gems") => void;
  onOpenSettings: () => void;
}

export default function Header({ coins, gems, lives, maxLives, onOpenShop, onOpenSettings }: HeaderProps) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 select-none">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/35 to-transparent sm:h-48" />

      <div className="relative px-3 pt-2.5 sm:px-6 sm:pt-4">
        <div className="relative flex items-start justify-between gap-2">
          {/* Left: player identity */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-gold)] shadow-[0_0_10px_rgba(255,214,120,0.55)] sm:h-14 sm:w-14">
              <img src="/images/player-portrait.jpg" alt="Player portrait" className="h-full w-full object-cover" />
              <div className="absolute inset-0 rounded-full ring-1 ring-black/40" />
            </div>
            <div className="max-w-[92px] leading-tight sm:max-w-none">
              <p
                className="truncate text-[9px] font-semibold tracking-wide text-[var(--color-cream)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] sm:text-sm"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                BHOOTHA PANDYAN
              </p>
              <p className="truncate text-[7.5px] font-medium tracking-wider text-[var(--color-gold)]/80 sm:text-[11px]">
                PANDYA KINGDOM
              </p>
            </div>
          </div>

          {/* Center: title (desktop/tablet only — overlaps identity/currency row) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 sm:block">
            <Title />
          </div>

          {/* Right: currency + settings + lives */}
          <div className="pointer-events-auto flex flex-col items-end gap-1 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <CurrencyPill icon={<CoinIcon className="h-4 w-4 sm:h-6 sm:w-6" />} value={coins} onAdd={() => onOpenShop("coins")} />
              <CurrencyPill icon={<GemIcon className="h-4 w-4 sm:h-6 sm:w-6" />} value={gems} onAdd={() => onOpenShop("gems")} />
              <button
                type="button"
                onClick={onOpenSettings}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--color-gold-deep)]/70 bg-gradient-to-b from-[#3a2c18] to-[#1c140a] text-[var(--color-gold)] shadow-md transition hover:scale-105 hover:text-[var(--color-gold-bright)] active:scale-95 sm:h-9 sm:w-9"
                aria-label="Settings"
              >
                <GearIcon className="h-3 w-3 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-[var(--color-gold-deep)]/60 bg-black/55 px-1.5 py-0.5 shadow-inner backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5">
              <span className="text-[6.5px] font-semibold tracking-widest text-[var(--color-gold)]/90 sm:text-[10px]">
                LIVES
              </span>
              <div className="flex items-center gap-0.5 sm:gap-1">
                {Array.from({ length: maxLives }).map((_, i) => (
                  <HeartIcon key={i} filled={i < lives} className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: title (mobile only — stacked below the identity/currency row) */}
        <div className="pointer-events-none mt-1 text-center sm:hidden">
          <Title />
        </div>
      </div>
    </header>
  );
}

function Title() {
  return (
    <h1
      className="whitespace-nowrap text-[17px] font-bold tracking-[0.06em] text-transparent min-[400px]:text-[19px] sm:text-[32px] md:text-[40px]"
      style={{
        fontFamily: "var(--font-display)",
        backgroundImage: "linear-gradient(180deg, #fff3d0 0%, #f3cf7a 35%, #d9a13c 60%, #a9701f 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: "title-glow 3.6s ease-in-out infinite",
        WebkitTextStroke: "0.6px rgba(74,42,10,0.6)",
      }}
    >
      KINGDOM PATH
    </h1>
  );
}

function CurrencyPill({ icon, value, onAdd }: { icon: React.ReactNode; value: number; onAdd: () => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-gold-deep)]/60 bg-black/55 py-1 pl-1.5 pr-1 shadow-inner backdrop-blur-sm sm:gap-1.5 sm:pl-2">
      {icon}
      <span className="min-w-[1.4rem] text-xs font-semibold tabular-nums text-[var(--color-cream)] sm:text-sm">
        {value}
      </span>
      <button
        type="button"
        onClick={onAdd}
        className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-b from-[#5fd15f] to-[#227a22] text-white shadow transition hover:scale-110 hover:brightness-110 active:scale-95 sm:h-6 sm:w-6"
        aria-label="Add"
      >
        <PlusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </button>
    </div>
  );
}
