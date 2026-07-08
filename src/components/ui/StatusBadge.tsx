import { cn } from "@/lib/cn";
import { ApplicationStatus, STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

export default function StatusBadge({
  status,
  className,
}: {
  status: ApplicationStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        STATUS_COLORS[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
