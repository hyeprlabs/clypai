import { ClypAIWordmark } from "@/components/brand/logos";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Page() {

  return (
    <div 
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
      style={{
        backgroundImage: 'url(/background-auth.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative w-full max-w-3xl border border-zinc-800 bg-linear-to-br from-background to-card p-10 md:p-12">
        {/* Corner decorators */}
        <span className="absolute -left-px -top-px block size-3 border-l-2 border-t-2 border-white"></span>
        <span className="absolute -right-px -top-px block size-3 border-r-2 border-t-2 border-white"></span>
        <span className="absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 border-white"></span>
        <span className="absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 border-white"></span>

        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <ClypAIWordmark height={48} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif">
              Coming Soon
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              A revolutionary AI-powered platform designed to transform how teams collaborate, automate workflows, and unlock unprecedented productivity.
            </p>
          </div>

          <WaitlistForm />

          <div className="space-y-1.5 border-t border-zinc-800 pt-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">LAUNCHING</p>
            <p className="text-2xl font-light tracking-wider text-white">2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}