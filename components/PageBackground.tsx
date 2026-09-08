"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Live typedb.com `td-floating-dots-background` from main-EVKLRPT7.js.
const GRID = 50;
const DOT_COUNT = 75;
const SPEED_SPAN = 0.5;
const DOT_FILL = "rgba(0, 150, 100, 0.7)";
const HEX_Y = 0.5;
const HEX_X = Math.cos(Math.PI / 6);

type HexDir = 0 | 1 | 2 | 3 | 4 | 5;

class FloatingDot {
  x = 0;
  y = 0;
  dir: HexDir = 0;
  speed = 0.2;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
  ) {
    this.reset();
  }

  reset() {
    const cellW = GRID * HEX_X * 2;
    const cellH = GRID * HEX_Y * 2;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    let snappedX = Math.round(this.x / cellW) * cellW;
    const snappedY = Math.round(this.y / cellH) * cellH;
    if (Math.round(snappedY / cellH) % 2 !== 0) {
      snappedX += cellW / 2;
    }
    this.x = snappedX;
    this.y = snappedY;
    this.dir = Math.floor(Math.random() * 6) as HexDir;
    this.speed = Math.random() * SPEED_SPAN + 0.2;
  }

  update() {
    const stepX = this.speed * HEX_X;
    const stepY = this.speed * HEX_Y;
    switch (this.dir) {
      case 0:
        this.x += stepX;
        this.y -= stepY;
        break;
      case 1:
        this.x += stepX;
        this.y += stepY;
        break;
      case 2:
        this.x -= stepX;
        this.y += stepY;
        break;
      case 3:
        this.x -= stepX;
        this.y -= stepY;
        break;
      case 4:
        this.y -= this.speed;
        break;
      case 5:
        this.y += this.speed;
        break;
      default: {
        const exhausted: never = this.dir;
        return exhausted;
      }
    }
    if (Math.random() < 0.01) {
      this.dir = Math.floor(Math.random() * 6) as HexDir;
    }
    if (
      this.x < 0 ||
      this.x > this.canvas.width ||
      this.y < 0 ||
      this.y > this.canvas.height
    ) {
      Object.assign(this, new FloatingDot(this.canvas, this.ctx));
    }
  }

  draw() {
    this.ctx.fillStyle = DOT_FILL;
    this.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
  }
}

function subscribeSearch(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readSearchFreeze(): boolean {
  return new URLSearchParams(window.location.search).get("freeze") === "1";
}

function serverHold(): boolean {
  return false;
}

function subscribeReduce(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => {
    media.removeEventListener("change", onStoreChange);
  };
}

function readReduce(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freeze = useSyncExternalStore(subscribeSearch, readSearchFreeze, serverHold);
  const reduce = useSyncExternalStore(subscribeReduce, readReduce, serverHold);
  const hold = freeze || reduce;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const dots: FloatingDot[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    for (let i = 0; i < DOT_COUNT; i += 1) {
      dots.push(new FloatingDot(canvas, ctx));
    }

    const paint = (move: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        if (move) {
          dot.update();
        }
        dot.draw();
      });
    };

    let frame = 0;
    if (hold) {
      paint(false);
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const tick = () => {
      paint(true);
      frame = window.requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [hold]);

  return (
    <canvas
      ref={canvasRef}
      className="page-background"
      data-ambient="dots"
      data-hold={hold ? "1" : "0"}
      aria-hidden="true"
    />
  );
}
