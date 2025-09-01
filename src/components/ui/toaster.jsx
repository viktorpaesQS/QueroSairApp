import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            className={cn(
              "border border-[var(--brand-yellow)]/35 bg-zinc-950/90 text-white",
              "backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70",
              "shadow-lg rounded-2xl"
            )}
            {...props}
          >
            <div className="grid gap-1">
              {title ? <ToastTitle className="text-white">{title}</ToastTitle> : null}
              {description ? <ToastDescription className="text-zinc-300">{description}</ToastDescription> : null}
            </div>
            {action}
            <ToastClose className="text-zinc-400 hover:text-white" />
          </Toast>
        );
      })}

      <ToastViewport className="fixed top-4 right-4 z-[9999] w-[360px] max-w-[90vw] outline-none" />
    </ToastProvider>
  );
}
