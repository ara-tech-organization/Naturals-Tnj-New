/**
 * Inline line-icon set (lucide-style geometry, 24px grid, 1.6 stroke).
 * Kept as local SVG rather than an icon package: only ~14 glyphs are used,
 * so shipping a library would cost more than it saves.
 */

const PATHS = {
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z|M22 6l-10 7L2 6",
  mapPin:
    "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z|M12 6v6l4 2",
  arrowRight: "M5 12h14|M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7|M8 7h9v9",
  arrowLeft: "M19 12H5|M11 18l-6-6 6-6",
  calendar:
    "M8 2v4|M16 2v4|M3 6h18v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z|M3 10h18",
  star: "M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.3l6.6-.9L12 2.5Z",
  quote:
    "M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2|M19 7h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2",
  check: "M20 6 9 17l-5-5",
  sparkle:
    "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z|M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
  whatsapp:
    "M20.5 11.9a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.2-4.3A8.5 8.5 0 1 1 20.5 11.9Z|M8.8 8.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.6l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.7 2.3c.3.1.4 0 .6-.1l.5-.6c.2-.2.3-.2.6-.1l1.5.8c.3.1.4.3.4.5a1.9 1.9 0 0 1-1.3 1.5c-.5.2-1.2.2-3.2-.7a8.4 8.4 0 0 1-3.5-3.4c-.7-1.3-.5-2.2-.2-2.9Z",
  instagram:
    "M7.5 2.5h9a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5Z|M12 15.8a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z|M17.3 6.9h.01",
  facebook:
    "M15.5 2.5h-2.2A4.3 4.3 0 0 0 9 6.8v2.7H6.5v3.4H9v8.6h3.4v-8.6h2.6l.5-3.4h-3.1V7a1 1 0 0 1 1-1h2.1V2.5Z",
  chevron: "M5 8.5 12 15.5 19 8.5",
  pause: "M9.5 4.5v15|M14.5 4.5v15",
  play: "M7.5 4.6 19 12 7.5 19.4Z",
  menu: "M3 6h18|M3 12h18|M3 18h18",
  close: "M18 6 6 18|M6 6l12 12",
  scissors:
    "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z|M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z|M20 4 8.1 15.9|M8.1 8.1 20 20",
  heart:
    "M19.5 5a5 5 0 0 0-7.1 0l-.4.4-.4-.4A5 5 0 0 0 4.5 12l7.5 7.6 7.5-7.6a5 5 0 0 0 0-7Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z|M9 12l2 2 4-4",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z|M22 21v-2a4 4 0 0 0-3-3.9|M16 3.1a4 4 0 0 1 0 7.8",
  award:
    "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z|M8.2 13.9 7 22l5-3 5 3-1.2-8.1",
};

export default function Icon({ name, size = 20, stroke = 1.6, className = "", ...rest }) {
  const def = PATHS[name];
  if (!def) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {def.split("|").map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
