import { TimesheetStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: TimesheetStatus;
}

const statusConfig = {
  completed: {
    label: "COMPLETED",
    className: "bg-green-100 text-green-700 border border-green-300",
  },
  incomplete: {
    label: "INCOMPLETE",
    className: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  },
  missing: {
    label: "MISSING",
    className: "bg-red-100 text-red-600 border border-red-300",
  },
};
export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        px-3 py-1 rounded text-xs font-semibold tracking-wide
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}
