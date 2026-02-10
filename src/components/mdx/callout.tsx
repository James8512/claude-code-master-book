import { AlertCircle, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  tip: {
    icon: Lightbulb,
    className: "border-green-500/30 bg-green-50 dark:bg-green-50 dark:border-green-500/30",
    iconClass: "text-green-600 dark:text-green-700",
    title: "팁",
  },
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-50 dark:bg-blue-50 dark:border-blue-500/30",
    iconClass: "text-blue-600 dark:text-blue-700",
    title: "참고",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-50 dark:border-yellow-500/30",
    iconClass: "text-yellow-600 dark:text-yellow-700",
    title: "주의",
  },
  danger: {
    icon: AlertCircle,
    className: "border-red-500/30 bg-red-50 dark:bg-red-50 dark:border-red-500/30",
    iconClass: "text-red-600 dark:text-red-700",
    title: "경고",
  },
};

interface CalloutProps {
  type?: keyof typeof variants;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div
      data-callout={type}
      className={cn(
        "my-4 rounded-lg border p-4",
        variant.className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", variant.iconClass)} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm mb-1 dark:text-gray-900">{title || variant.title}</p>
          <div className="text-sm [&>p]:my-1 dark:text-gray-800">{children}</div>
        </div>
      </div>
    </div>
  );
}
