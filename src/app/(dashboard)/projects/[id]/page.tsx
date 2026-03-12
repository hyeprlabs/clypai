import type { Metadata } from "next";
import { ProjectDetail } from "@/components/dashboard/projects/project-detail";

export const metadata: Metadata = {
  title: "Project",
};

export default function Page() {
  return <ProjectDetail />;
}
