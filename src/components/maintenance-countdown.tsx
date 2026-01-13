"use client"

import Countdown from "react-countdown";
import { cn } from "@/lib/utils";

interface MaintenanceCountdownProps {
  date: string | number | Date;
  className?: string;
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl md:text-4xl font-light text-foreground">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/80">
      {label}
    </span>
  </div>
);

const Separator = () => <span className="text-xl md:text-3xl pb-4">:</span>;

export function MaintenanceCountdown({ date, className }: MaintenanceCountdownProps) {
  return (
    <Countdown
      date={new Date(date)}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) return null;

        return (
          <div className={cn("flex items-center gap-2 md:gap-4 font-mono text-muted-foreground", className)}>
            <TimeUnit value={days} label="Days" />
            <Separator />
            <TimeUnit value={hours} label="Hrs" />
            <Separator />
            <TimeUnit value={minutes} label="Min" />
            <Separator />
            <TimeUnit value={seconds} label="Sec" />
          </div>
        );
      }}
    />
  );
}
