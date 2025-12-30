"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface ImageModalContextType {
  openModal: (imageUrl: string, alt?: string) => void;
  closeModal: () => void;
  isOpen: boolean;
  imageUrl: string | null;
  alt: string;
}

const ImageModalContext = createContext<ImageModalContextType | undefined>(
  undefined
);

export function ImageModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("");

  const openModal = useCallback((url: string, altText: string = "") => {
    setImageUrl(url);
    setAlt(altText);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Clear the image URL after animation completes
    setTimeout(() => {
      setImageUrl(null);
      setAlt("");
    }, 300);
  }, []);

  return (
    <ImageModalContext.Provider
      value={{ openModal, closeModal, isOpen, imageUrl, alt }}
    >
      {children}
    </ImageModalContext.Provider>
  );
}

export function useImageModal() {
  const context = useContext(ImageModalContext);
  if (context === undefined) {
    throw new Error("useImageModal must be used within an ImageModalProvider");
  }
  return context;
}
