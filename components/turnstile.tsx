"use client";

import { useEffect, useRef, useState } from "react";

interface TurnstileProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export default function Turnstile({ siteKey, onSuccess, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    // Load Turnstile script
    if (!window.turnstile && !isLoaded) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.turnstile && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || widgetId.current) return;

    // Render Turnstile widget
    if (window.turnstile) {
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onSuccess(token);
        },
        "error-callback": () => {
          onError?.();
        },
        "expired-callback": () => {
          onExpire?.();
        },
        theme: "auto",
        size: "normal",
      });

      widgetId.current = id;

      return () => {
        if (widgetId.current && window.turnstile) {
          window.turnstile.remove(widgetId.current);
          widgetId.current = null;
        }
      };
    }
  }, [isLoaded, siteKey, onSuccess, onError, onExpire]);

  return <div ref={containerRef} style={{ display: "none" }} />;
}

// Extend window type for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: string;
          size?: string;
        }
      ) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
      getResponse: (id?: string) => string;
    };
  }
}
