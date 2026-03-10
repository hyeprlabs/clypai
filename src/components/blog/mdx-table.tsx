import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Drop-in replacement for the raw <table> HTML element in MDX. */
export function MdxTable(props: React.ComponentProps<"table">) {
  return <Table {...props} />;
}

export function MdxThead(props: React.ComponentProps<"thead">) {
  return <TableHeader {...props} />;
}

export function MdxTbody(props: React.ComponentProps<"tbody">) {
  return <TableBody {...props} />;
}

export function MdxTr(props: React.ComponentProps<"tr">) {
  return <TableRow {...props} />;
}

export function MdxTh(props: React.ComponentProps<"th">) {
  return <TableHead {...props} />;
}

export function MdxTd(props: React.ComponentProps<"td">) {
  return <TableCell {...props} />;
}
