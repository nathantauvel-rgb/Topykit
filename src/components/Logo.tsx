type Props = {
  size?: number;
  showText?: boolean;
};

export default function Logo({ size = 32, showText = true }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="40" height="40" rx="10" fill="#0a0a0a" />
        <path
          d="M11 27 L17 21 L22 25 L29 13"
          stroke="#ff5b2e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="13" r="2.5" fill="#ff5b2e" />
        <circle cx="22" cy="25" r="2" fill="#fdf8f1" />
        <circle cx="17" cy="21" r="2" fill="#fdf8f1" />
        <circle cx="11" cy="27" r="2" fill="#fdf8f1" />
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-zinc-900">
          Topykit
        </span>
      )}
    </div>
  );
}
