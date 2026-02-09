import { cn } from "@/lib/utils";
import { AlertCircle, Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "success" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/5 text-blue-700 dark:text-blue-300",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300",
    iconClassName: "text-yellow-500",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-500/5 text-red-700 dark:text-red-300",
    iconClassName: "text-red-500",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-500/5 text-green-700 dark:text-green-300",
    iconClassName: "text-green-500",
  },
  tip: {
    icon: Lightbulb,
    className: "border-purple-500/50 bg-purple-500/5 text-purple-700 dark:text-purple-300",
    iconClassName: "text-purple-500",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 border p-4",
        config.className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
        <div className="flex-1 space-y-2">
          {title && (
            <div className="font-semibold text-sm uppercase tracking-wide">
              {title}
            </div>
          )}
          <div className="text-sm leading-relaxed [&>p]:my-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface NoteProps {
  children: React.ReactNode;
}

export function Note({ children }: NoteProps) {
  return <Callout type="info" title="Note">{children}</Callout>;
}

export function Warning({ children }: NoteProps) {
  return <Callout type="warning" title="Warning">{children}</Callout>;
}

export function Tip({ children }: NoteProps) {
  return <Callout type="tip" title="Tip">{children}</Callout>;
}

export function Important({ children }: NoteProps) {
  return <Callout type="error" title="Important">{children}</Callout>;
}
