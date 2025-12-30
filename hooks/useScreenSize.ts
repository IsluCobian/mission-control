"use client";

import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmall: boolean; // < 640px
  isMedium: boolean; // >= 640px && < 1024px
  isLarge: boolean; // >= 1024px && < 1280px
  isXLarge: boolean; // >= 1280px
}

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;
const DESKTOP_BREAKPOINT = 1280;

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window === "undefined") {
      return {
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isSmall: false,
        isMedium: false,
        isLarge: false,
        isXLarge: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      isMobile: width < MOBILE_BREAKPOINT,
      isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      isDesktop: width >= DESKTOP_BREAKPOINT,
      isSmall: width < MOBILE_BREAKPOINT,
      isMedium: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      isLarge: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
      isXLarge: width >= DESKTOP_BREAKPOINT,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= DESKTOP_BREAKPOINT,
        isSmall: width < MOBILE_BREAKPOINT,
        isMedium: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isLarge: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
        isXLarge: width >= DESKTOP_BREAKPOINT,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

