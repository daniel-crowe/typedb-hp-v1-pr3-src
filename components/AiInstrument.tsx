"use client";

import { useEffect, useRef } from "react";

const HEIGHT_MSG = "typedb-passb-height";

export function AiInstrument() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const applyHeight = (height: number) => {
      const frame = frameRef.current;
      if (!frame || !Number.isFinite(height) || height < 400) return;
      frame.style.height = `${Math.ceil(height)}px`;
    };

    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.type !== HEIGHT_MSG) return;
      applyHeight(Number(data.height));
    };

    const syncFromDocument = () => {
      const frame = frameRef.current;
      if (!frame) return;
      try {
        const stage = frame.contentDocument?.getElementById("shot");
        if (!stage) return;
        applyHeight(stage.getBoundingClientRect().height);
      } catch {
        // cross-origin: height arrives via postMessage
      }
    };

    window.addEventListener("message", onMessage);
    const frame = frameRef.current;
    frame?.addEventListener("load", syncFromDocument);
    syncFromDocument();
    return () => {
      window.removeEventListener("message", onMessage);
      frame?.removeEventListener("load", syncFromDocument);
    };
  }, []);

  return (
    <figure className="passb-iframe-wrap" data-s2="pass-b-chat-v4.1">
      <iframe
        ref={frameRef}
        title="Connected context — pass-b-chat-v4.1"
        src="/instruments/pass-b-chat-v4.1.html"
        className="passb-iframe"
        loading="eager"
        scrolling="no"
      />
    </figure>
  );
}
