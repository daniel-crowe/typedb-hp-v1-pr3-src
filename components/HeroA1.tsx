"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { HeroA1Svg } from "./HeroA1Svg";

const HeroA1Canvas = dynamic(() => import("./HeroA1Canvas"), { ssr: false });

function subscribe() {
  return () => {};
}

function clientTrue() {
  return true;
}

function serverFalse() {
  return false;
}

export function HeroA1() {
  const [live, setLive] = useState(false);
  const mount = useSyncExternalStore(subscribe, clientTrue, serverFalse);

  return (
    <figure
      className={live ? "hero-a1 is-live" : "hero-a1"}
      data-hero="a1-compact-hierarchy"
      data-craft="a1-compact-hierarchy"
    >
      <div className="hero-a1-stage">
        <HeroA1Svg />
        {mount ? <HeroA1Canvas onReady={() => setLive(true)} /> : null}
      </div>
      <figcaption>
        People play director. Companies play directed. Ownership between companies carries
        stake-percentage.
      </figcaption>
    </figure>
  );
}
