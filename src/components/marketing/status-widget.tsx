import * as z from "zod";

const status = z.enum([
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
  "incident",
]);

const schema = z.object({ status: status });

const dictionary = {
  operational: {
    label: "Operational",
    color: "bg-green-500",
  },
  degraded_performance: {
    label: "Degraded Performance",
    color: "bg-yellow-500",
  },
  partial_outage: {
    label: "Partial Outage",
    color: "bg-yellow-500",
  },
  major_outage: {
    label: "Major Outage",
    color: "bg-red-500",
  },
  unknown: {
    label: "Unknown",
    color: "bg-gray-500",
  },
  incident: {
    label: "Incident",
    color: "bg-yellow-500",
  },
  under_maintenance: {
    label: "Under Maintenance",
    color: "bg-blue-500",
  },
} as const;

export async function StatusWidget({ slug }: { slug: string }) {
  const res = await fetch(`https://api.openstatus.dev/public/status/${slug}`, {
    next: { revalidate: 60 }, // cache request for 60 seconds
  });

  const data = await res.json();

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return null;
  }

  const key = parsed.data.status;
  
  const { label, color } = dictionary[key];

  return (
    <a
      className="border bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex max-w-fit items-center gap-2 rounded-full px-2 h-7 text-xs font-mono"
      href={`https://${slug}.openstatus.dev`}
      target="_blank"
      rel="noreferrer"
    >
      {label}
      <span className="relative flex h-2 w-2">
        {parsed.data.status === "operational" ? (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75 duration-1000`}
          />
        ) : null}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${color}`}
        />
      </span>
    </a>
  );
}
