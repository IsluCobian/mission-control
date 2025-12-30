"use client";

import { buttonVariants } from "./ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useImageModal } from "@/contexts/ImageModalContext";
import { cn } from "@/lib/utils";

export function ImageModal() {
  const { isOpen, closeModal, imageUrl, alt } = useImageModal();

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
            "fixed left-[50%] top-[50%] z-50 w-full max-w-7xl translate-x-[-50%] translate-y-[-50%]",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0",
            "data-[state=closed]:zoom-out-90",
            "duration-200"
          )}
          onEscapeKeyDown={closeModal}
          onPointerDownOutside={closeModal}
        >
          <DialogPrimitive.Title className="text-white">{alt}</DialogPrimitive.Title>
          <div className="relative flex items-center justify-center p-4">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={alt || "Modal image"}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
            )}
            <DialogPrimitive.Close
              className={cn(buttonVariants({variant:"ghost", size:"icon"}),
                "absolute right-3 top-3 rounded-sm text-white",
              )}
              onClick={closeModal}
            >
              <XIcon className="size-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
