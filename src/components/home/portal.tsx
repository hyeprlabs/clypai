import { cn } from "@/lib/utils";
import React from "react";
import { createPortal } from "react-dom";

function Portal({ className, ...props }: React.ComponentProps<"div">) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={cn("fixed inset-0 isolate z-40 flex flex-col", className)}
      {...props}
    />,
    document.body,
  );
}

function PortalBackdrop({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-1 animate-in fade-in bg-background/95 backdrop-blur-sm duration-200 ease-out-strong supports-backdrop-filter:bg-background/60",
        className,
      )}
      {...props}
    />
  );
}

export { Portal, PortalBackdrop };
