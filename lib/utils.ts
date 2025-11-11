export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp; // milliseconds difference

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 5) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  // If more than 5 hours, show local time (e.g., 7:30 PM)
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString([], options);
}