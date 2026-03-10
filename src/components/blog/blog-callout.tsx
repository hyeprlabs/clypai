import { ReactNode } from "react";
import {
  InfoIcon,
  TriangleAlertIcon,
  XCircleIcon,
  CheckCircleIcon,
  LightbulbIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warn" | "warning" | "error" | "success" | "idea";

interface BlogCalloutProps {
  type?: CalloutType;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const typeConfig: Record<
  CalloutType,
  {
    variant: "info" | "warning" | "destructive" | "success" | "idea";
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  info: { variant: "info", icon: InfoIcon },
  warn: { variant: "warning", icon: TriangleAlertIcon },
  warning: { variant: "warning", icon: TriangleAlertIcon },
  error: { variant: "destructive", icon: XCircleIcon },
  success: { variant: "success", icon: CheckCircleIcon },
  idea: { variant: "idea", icon: LightbulbIcon },
};

export function BlogCallout({
  type = "info",
  title,
  children,
  className,
}: BlogCalloutProps) {
  const config = typeConfig[type] ?? typeConfig.info;
  const Icon = config.icon;

  return (
    <Alert variant={config.variant} className={cn("my-6 not-prose", className)}>
      <Icon className="size-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
