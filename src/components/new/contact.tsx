import { cn } from "@/lib/utils";
import { email } from "@/lib/constants";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  MailSend01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons";

const data = [
  {
    title: "Coming Soon. (1)",
    value: "-",
    icon: <HugeiconsIcon icon={Call02Icon} strokeWidth={2} />,
  },
  {
    title: "Send an Email",
    value: email,
    icon: <HugeiconsIcon icon={MailSend01Icon} strokeWidth={2} />,
  },
  {
    title: "Coming Soon. (2)",
    value: "-",
    icon: <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />,
  },
];

export function Contact() {
  return (
    <div className="mb-12 lg:mb-24 mx-auto max-w-4xl border-y dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <h2 className="font-heading border-b p-6 text-center text-lg md:text-2xl">
        Have Questions? Get in Touch!
      </h2>
      <div className="grid gap-px overflow-hidden bg-border md:grid-cols-3">
        {data.map((item) => (
          <div
            className="flex items-center gap-3 bg-background p-2 shadow-xs"
            key={item.title}
          >
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50",
                "[&_svg]:size-4 [&_svg]:text-muted-foreground",
              )}
            >
              {item.icon}
            </div>
            <div className={cn("flex flex-col gap-y-0.5")}>
              <h2 className="text-sm">{item.title}</h2>
              <p className="text-muted-foreground text-xs">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
