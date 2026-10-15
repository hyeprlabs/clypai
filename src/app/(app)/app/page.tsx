import { AppShell } from "@/components/dashboard/app-shell/app-shell";
import { DashboardSkeleton } from "@/components/dashboard/app-shell/dashboard-skeleton";

export default function DemoPage() {
  return (
    <AppShell>
      <DashboardSkeleton />
    </AppShell>
  );
}
