export default function StatusBadge({ gender }) {
  const isMale = String(gender).toLowerCase() === "male";
  return (
    <span className={isMale ? "badge-male" : "badge-female"}>
      {gender || "N/A"}
    </span>
  );
}
