"use client";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export default function Avatar({ src, name, size = "md" }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  if (src) {
    return (
      <img
        src={src}
        alt={name || "User"}
        className={`${sizes[size]} rounded-full object-cover border border-[var(--border)]`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-medium border border-[var(--border)]`}
    >
      {initials}
    </div>
  );
}
