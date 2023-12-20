import { useEffect, useRef } from "react";

export type WindowEventHandler<K extends keyof WindowEventMap> = (
  event: WindowEventMap[K],
) => void;

export default function useWindowEvent<K extends keyof WindowEventMap>(
  eventName: K,
  eventHandler: WindowEventHandler<K>,
) {
  const savedHandler = useRef(eventHandler);

  useEffect(() => {
    if (!window) {
      return;
    }

    const listener: typeof eventHandler = (event) =>
      savedHandler.current(event);

    window.addEventListener(eventName, listener);

    return () => {
      window.removeEventListener(eventName, listener);
    };
  }, [eventName, eventHandler]);
}
