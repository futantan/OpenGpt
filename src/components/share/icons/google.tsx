export default function Google({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <linearGradient
        id="b"
        x1="55.41"
        x2="12.11"
        y1="96.87"
        y2="21.87"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1e8e3e" />
        <stop offset="1" stopColor="#34a853" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="42.7"
        x2="86"
        y1="100"
        y2="25.13"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fcc934" />
        <stop offset="1" stopColor="#fbbc04" />
      </linearGradient>
      <linearGradient
        id="a"
        x1="6.7"
        x2="93.29"
        y1="31.25"
        y2="31.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#d93025" />
        <stop offset="1" stopColor="#ea4335" />
      </linearGradient>
      <path fill="url(#a)" d="M93.29 25a50 50 90 0 0-86.6 0l3 54z" />
      <path fill="url(#b)" d="M28.35 62.5 6.7 25A50 50 90 0 0 50 100l49-50z" />
      <path fill="url(#c)" d="M71.65 62.5 50 100a50 50 90 0 0 43.29-75H50z" />
      <path fill="#fff" d="M50 75a25 25 90 1 0 0-50 25 25 90 0 0 0 50z" />
      <path
        fill="#1a73e8"
        d="M50 69.8a19.8 19.8 90 1 0 0-39.6 19.8 19.8 90 0 0 0 39.6z"
      />{" "}
    </svg>
  );
}
