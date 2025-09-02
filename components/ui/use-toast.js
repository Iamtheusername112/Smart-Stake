import { toast } from "sonner"

export function useToast() {
  return {
    toast: (message, options) => {
      if (options?.variant === 'success') {
        return toast.success(message, options)
      } else if (options?.variant === 'error') {
        return toast.error(message, options)
      } else if (options?.variant === 'warning') {
        return toast.warning(message, options)
      } else {
        return toast(message, options)
      }
    },
    success: (message, options) => toast.success(message, options),
    error: (message, options) => toast.error(message, options),
    warning: (message, options) => toast.warning(message, options),
    info: (message, options) => toast.info(message, options),
  }
}

// Also export the toast functions directly for easier use
export { toast }