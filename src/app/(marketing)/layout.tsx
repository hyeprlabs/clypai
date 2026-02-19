import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer-2";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
