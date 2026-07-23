"use client";

import { useEffect, useRef } from "react";

const AREA_PER_POINT = 18500;
const MIN_POINTS = 35;
const MAX_POINTS = 90;
const LINK_DISTANCE = 130;
const SPEED = 0.15;
const REPEL_RADIUS = 140;
const REPEL_STRENGTH = 36;
const COMET_DURATION = 1800;
const COMET_TRAIL = 0.28;
const COMET_MIN_GAP = 4000;
const COMET_MAX_GAP = 8000;
const COMET_CENTER_JITTER = 70;

type Point = { x: number; y: number; vx: number; vy: number };
type Comet = { x1: number; y1: number; x2: number; y2: number; start: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let animationFrame = 0;
    const mouse = { x: -9999, y: -9999 };
    let comet: Comet | null = null;
    let nextCometAt = performance.now() + 1500;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pointCount = Math.round(
        Math.min(MAX_POINTS, Math.max(MIN_POINTS, (width * height) / AREA_PER_POINT)),
      );
      points = Array.from({ length: pointCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    }

    function spawnComet() {
      const angle = Math.random() * Math.PI * 2;
      const cx = width / 2 + (Math.random() - 0.5) * COMET_CENTER_JITTER * 2;
      const cy = height / 2 + (Math.random() - 0.5) * COMET_CENTER_JITTER * 2;
      const halfLen = Math.max(width, height) * 0.6;
      const dx = Math.cos(angle) * halfLen;
      const dy = Math.sin(angle) * halfLen;
      comet = { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy, start: performance.now() };
    }

    function drawComet(now: number) {
      if (!ctx || !comet) return;
      const t = (now - comet.start) / COMET_DURATION;
      if (t >= 1) {
        comet = null;
        nextCometAt = now + COMET_MIN_GAP + Math.random() * (COMET_MAX_GAP - COMET_MIN_GAP);
        return;
      }
      const headT = t;
      const tailT = Math.max(0, t - COMET_TRAIL);
      const hx = lerp(comet.x1, comet.x2, headT);
      const hy = lerp(comet.y1, comet.y2, headT);
      const tx = lerp(comet.x1, comet.x2, tailT);
      const ty = lerp(comet.y1, comet.y2, tailT);
      const fade = t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1;

      const gradient = ctx.createLinearGradient(tx, ty, hx, hy);
      gradient.addColorStop(0, "rgba(103, 232, 249, 0)");
      gradient.addColorStop(1, `rgba(103, 232, 249, ${0.75 * fade})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.fillStyle = `rgba(224, 250, 255, ${0.9 * fade})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    function handlePointerMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handlePointerAway() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      if (!ctx) return;
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
      }

      const rendered = points.map((p) => {
        if (reduceMotion) return { x: p.x, y: p.y };
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.001) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          return { x: p.x + (dx / dist) * force, y: p.y + (dy / dist) * force };
        }
        return { x: p.x, y: p.y };
      });

      for (let i = 0; i < rendered.length; i++) {
        for (let j = i + 1; j < rendered.length; j++) {
          const a = rendered[i];
          const b = rendered[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            const proximityBoost =
              mouseDist < REPEL_RADIUS ? (1 - mouseDist / REPEL_RADIUS) * 0.45 : 0;
            const opacity = Math.min(0.35 * (1 - dist / LINK_DISTANCE) + proximityBoost, 0.85);
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of rendered) {
        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const boost = mouseDist < REPEL_RADIUS ? (1 - mouseDist / REPEL_RADIUS) * 0.2 : 0;
        ctx.fillStyle = `rgba(226, 232, 240, ${Math.min(0.8 + boost, 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        if (!comet && now >= nextCometAt) spawnComet();
        drawComet(now);
        animationFrame = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerAway);
      window.addEventListener("blur", handlePointerAway);
    }
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerAway);
      window.removeEventListener("blur", handlePointerAway);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
