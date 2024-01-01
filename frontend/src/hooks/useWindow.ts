import { useCallback, useEffect, useRef } from "react";

export type UseWindowOnMessageFunction<T> = (
  data: T,
  event: MessageEvent<T>,
) => void;

export interface UseWindowParams<T> {
  url?: string;
  target?: string;
  width: number;
  height: number;
  onMessage?: UseWindowOnMessageFunction<T>;
}

export default function useWindow<T>(params: UseWindowParams<T>) {
  const { url, target, width, height, onMessage } = params;

  const windowRef = useRef<Window | null>(null);
  const onMessageRef = useRef<UseWindowOnMessageFunction<T> | null | undefined>(
    null,
  );

  useEffect(() => {
    onMessageRef.current = onMessage;
  });

  useEffect(() => {
    function messageHandler(event: MessageEvent<T>) {
      if (onMessageRef.current && windowRef.current == event.source) {
        onMessageRef.current(event.data, event);
      }
    }

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const open = useCallback(
    function open(overrideUrl?: string) {
      const left = screen.width / 2 - width / 2;
      const top = screen.height / 2 - height / 2;
      let windowUrl = url;

      if (overrideUrl) {
        windowUrl = overrideUrl;
      }

      const features: Record<string, string | number> = {
        width,
        height,
        left,
        top,
      };

      const featuresString = Object.entries(features)
        .map((entry) => {
          const [key, value] = entry;

          return `${key}=${value}`;
        })
        .join(",");

      windowRef.current = window.open(windowUrl, target, featuresString);
    },
    [url, target, width, height],
  );

  return {
    open,
  };
}
