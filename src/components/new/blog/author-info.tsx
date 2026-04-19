import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AuthorInfoProps = {
  name?: string | null;
  src?: string | null;
  alt?: string | null;
};

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase() || "A"
  );
}

export function AuthorInfo({ name, src, alt }: AuthorInfoProps) {
  const displayName = name?.trim() || "Author";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
      <Avatar className="size-[18px] sm:size-5 md:size-6">
        <AvatarImage src={src ?? undefined} alt={alt ?? displayName} />
        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-[10px] text-muted-foreground sm:text-[11px] md:text-xs">
        {displayName}
      </span>
    </div>
  );
}
