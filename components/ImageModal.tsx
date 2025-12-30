"use client"

import { buttonVariants } from "./ui/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { useImageModal } from "@/contexts/ImageModalContext"
import { cn } from "@/lib/utils"

export function ImageModal() {
  const { isOpen, closeModal, imageUrl, alt } = useImageModal()

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={closeModal}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-[50%] left-[50%] z-50 w-full max-w-5xl translate-x-[-50%] translate-y-[-50%]",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0",
            "data-[state=closed]:zoom-out-90",
            "duration-200"
          )}
          onEscapeKeyDown={closeModal}
          onPointerDownOutside={closeModal}
        >
          <div className="flex justify-between text-white">
            <DialogPrimitive.Title className="text-xl font-semibold">
              {alt}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                ""
              )}
              onClick={closeModal}
            >
              <XIcon className="size-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          <div className="relative flex items-center justify-center p-4">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={alt || "Modal image"}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
