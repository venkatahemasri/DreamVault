import React, { useEffect, useRef } from 'react';
import { useDreams } from '../context/DreamContext';

export default function DreamAtmosphere() {
  const canvasRef = useRef(null);
  const { settings } = useDreams();
  const isReducedMotion = settings?.reducedMotion;

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes (luminous teal and warm gold constellations)
    const particleCount = Math.min(45, Math.floor((width * height) / 28000));
    const particles = [];

    const colors = [
      'rgba(0, 217, 192, 0.65)',   // Electric Teal
      'rgba(25, 245, 209, 0.55)',  // Bright Aqua
      'rgba(255, 200, 87, 0.45)',  // Warm Gold
      'rgba(11, 38, 56, 0.8)'      // Deep Ocean
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient radial glow following mouse subtly
      const glowGrad = ctx.createRadialGradient(
        mouseX, mouseY, 10,
        mouseX, mouseY, 450
      );
      glowGrad.addColorStop(0, 'rgba(0, 217, 192, 0.035)');
      glowGrad.addColorStop(0.5, 'rgba(11, 38, 56, 0.04)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Render connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(25, 245, 209, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * 3 + p.phase) * 0.5 + 1;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 15% 15%, #0B2638 0%, #061826 65%, #030d14 100%)'
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: isReducedMotion ? 'none' : 'block',
          opacity: 0.85
        }}
      />
    </div>
  );
}
