"use client";

import { useEffect } from "react";

export function FontFaces() {
  useEffect(() => {
    if (!("fonts" in document)) {
      return;
    }

    const alreadyLoaded = [...document.fonts].some((face) => {
      return face.family.replace(/['"]/g, "") === "Monaco" && face.status === "loaded";
    });
    if (alreadyLoaded) {
      return;
    }

    const face = new FontFace("Monaco", "url(/fonts/Monaco.woff2) format('woff2')", {
      weight: "400",
      style: "normal",
      display: "swap",
    });

    void face
      .load()
      .then((loaded) => {
        document.fonts.add(loaded);
      })
      .catch(() => undefined);
  }, []);

  return null;
}
