export function highlightText(text, highlight) {
  if (!highlight) return text;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} style={{ fontWeight: "bold" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}
