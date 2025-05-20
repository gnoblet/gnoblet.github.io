// src/components/LeafAnimation.tsx
import React, { useRef, useEffect } from "react";
import { useColorPalette } from "../contexts/ColorPaletteContext";
import styles from "../styles/components/LeafAnimation.module.css";

interface Leaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  tilt: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
  tiltSpeed: number;
  color: string;
  alpha: number;
  type: number; // To select different leaf shapes
  wobble: number;
  wobbleSpeed: number;
  wobbleAmplitude: number; // Controls how much a leaf sways
  lastMouseForce?: number; // Track last time mouse force was applied
}

const LeafAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { palette } = useColorPalette();
  const leafColorsRef = useRef<string[]>([]);
  const leavesRef = useRef<Leaf[]>([]);
  const prevPaletteRef = useRef<string>(palette);
  const colorUpdateCounterRef = useRef<number>(0);

  // Update colors when palette changes
  useEffect(() => {
    // Update color palette reference
    if (palette === "autumn") {
      leafColorsRef.current = [
        "rgba(214, 125, 62, 0.6)", // Autumn orange
        "rgba(164, 93, 64, 0.6)", // Autumn brown
        "rgba(186, 110, 64, 0.6)", // Autumn medium brown
        "rgba(232, 164, 76, 0.6)", // Autumn gold
        "rgba(157, 95, 59, 0.6)", // Autumn dark orange
      ];
    } else {
      leafColorsRef.current = [
        "rgba(100, 130, 255, 0.6)", // Bright blue
        "rgba(80, 100, 220, 0.6)", // Medium blue
        "rgba(120, 100, 240, 0.6)", // Purple-blue
        "rgba(150, 110, 250, 0.6)", // Light purple
        "rgba(170, 130, 255, 0.6)", // Lavender
      ];
    }

    // Detect actual palette changes
    if (prevPaletteRef.current !== palette) {
      prevPaletteRef.current = palette;
      colorUpdateCounterRef.current = 0; // Reset counter to start color transition
    }
  }, [palette]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window width/height with pixel ratio adjustment for sharp rendering
    const handleResize = () => {
      const parent = canvas.parentElement;
      const devicePixelRatio = window.devicePixelRatio || 1;

      let width, height;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      // Set display size (css pixels)
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Set actual size in memory (scaled to device pixel ratio)
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      // Scale all drawing operations by the device pixel ratio
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Initialize colors if they haven't been set in the effect hook
    if (leafColorsRef.current.length === 0) {
      if (palette === "autumn") {
        leafColorsRef.current = [
          "rgba(214, 125, 62, 0.6)", // Autumn orange
          "rgba(164, 93, 64, 0.6)", // Autumn brown
          "rgba(186, 110, 64, 0.6)", // Autumn medium brown
          "rgba(232, 164, 76, 0.6)", // Autumn gold
          "rgba(157, 95, 59, 0.6)", // Autumn dark orange
        ];
      } else {
        leafColorsRef.current = [
          "rgba(100, 130, 255, 0.6)", // Bright blue
          "rgba(80, 100, 220, 0.6)",  // Medium blue
          "rgba(120, 100, 240, 0.6)", // Purple-blue
          "rgba(150, 110, 250, 0.6)", // Light purple
          "rgba(170, 130, 255, 0.6)", // Lavender
        ];
      }
    }

    const leafColors = leafColorsRef.current;

    // Initialize leaves
    const leaves: Leaf[] = [];
    leavesRef.current = leaves;
    const leafCount = 200;

    // Gravity and wind settings
    const gravity = 0.015;
    const baseWind = 0.01;
    let windDirection = 0.3;
    let windStrength = 1.0;
    let windChangeTimer = 0;

    // Create leaf instances
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5 - canvas.height * 0.5, // Start some above viewport
        size: 7 + Math.random() * 15,
        rotation: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: Math.random() * 0.25 + 0.15,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        tiltSpeed: (Math.random() - 0.5) * 0.007,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        alpha: 0.7 + Math.random() * 0.3,
        type: Math.floor(Math.random() * 3), // 3 different leaf shapes
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.025,
        wobbleAmplitude: 0.3 + Math.random() * 0.7,
      });
    }

    // Function to draw a leaf
    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      // Apply tilt effect
      ctx.transform(1, 0, Math.sin(leaf.tilt) * 0.25, 1, 0, 0);

      const halfSize = leaf.size / 2;

      ctx.globalAlpha = leaf.alpha;
      ctx.fillStyle = leaf.color;

      switch (leaf.type) {
        case 0: {
          // Oval leaf
          ctx.beginPath();
          ctx.ellipse(0, 0, halfSize, leaf.size, 0, 0, Math.PI * 2);
          ctx.fill();

          // Leaf vein
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -leaf.size);
          ctx.lineTo(0, leaf.size);
          ctx.stroke();
          break;
        }

        case 1: {
          // Heart-shaped leaf
          ctx.beginPath();
          ctx.moveTo(0, halfSize);
          ctx.bezierCurveTo(
            halfSize,
            halfSize * 0.5,
            halfSize,
            -halfSize * 0.7,
            0,
            -leaf.size,
          );
          ctx.bezierCurveTo(
            -halfSize,
            -halfSize * 0.7,
            -halfSize,
            halfSize * 0.5,
            0,
            halfSize,
          );
          ctx.fill();

          // Add subtle vein
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, halfSize);
          ctx.lineTo(0, -leaf.size * 0.8);
          ctx.stroke();
          break;
        }

        case 2: {
          // Maple-like leaf
          ctx.beginPath();

          // Leaf base
          ctx.moveTo(0, leaf.size);

          // Right side lobes
          ctx.bezierCurveTo(
            halfSize * 0.5,
            halfSize * 0.8,
            halfSize * 1.2,
            halfSize * 0.6,
            halfSize,
            0,
          );
          ctx.bezierCurveTo(
            halfSize * 1.2,
            -halfSize * 0.2,
            halfSize * 0.8,
            -halfSize * 0.5,
            halfSize * 0.4,
            -halfSize * 0.4,
          );

          // Top lobe
          ctx.bezierCurveTo(
            halfSize * 0.3,
            -halfSize * 0.8,
            -halfSize * 0.3,
            -halfSize * 0.8,
            -halfSize * 0.4,
            -halfSize * 0.4,
          );

          // Left side lobes
          ctx.bezierCurveTo(
            -halfSize * 0.8,
            -halfSize * 0.5,
            -halfSize * 1.2,
            -halfSize * 0.2,
            -halfSize,
            0,
          );
          ctx.bezierCurveTo(
            -halfSize * 1.2,
            halfSize * 0.6,
            -halfSize * 0.5,
            halfSize * 0.8,
            0,
            leaf.size,
          );

          ctx.fill();

          // Add veins
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;

          // Main vein
          ctx.beginPath();
          ctx.moveTo(0, leaf.size);
          ctx.lineTo(0, -leaf.size * 0.3);
          ctx.stroke();

          // Side veins
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(halfSize * 0.7, halfSize * 0.2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-halfSize * 0.7, halfSize * 0.2);
          ctx.stroke();
          break;
        }
      }

      ctx.restore();
    };

    // Track mouse position
    let mouseX = -100;
    let mouseY = -100;
    let isMouseMoving = false;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse speed
      const newMouseX = e.clientX;
      const newMouseY = e.clientY;

      mouseSpeedX = newMouseX - mouseX;
      mouseSpeedY = newMouseY - mouseY;

      // Update mouse position
      mouseX = newMouseX;
      mouseY = newMouseY;
      isMouseMoving = true;

      // Auto-reset mouse moving flag after 100ms of inactivity
      setTimeout(() => {
        if (mouseX === newMouseX && mouseY === newMouseY) {
          isMouseMoving = false;
        }
      }, 100);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // Calculate mouse speed
        const newMouseX = e.touches[0].clientX;
        const newMouseY = e.touches[0].clientY;

        mouseSpeedX = newMouseX - mouseX;
        mouseSpeedY = newMouseY - mouseY;

        // Update mouse position
        mouseX = newMouseX;
        mouseY = newMouseY;
        isMouseMoving = true;

        // Prevent scrolling while interacting with leaves
        e.preventDefault();

        // Auto-reset mouse moving flag after 100ms of inactivity
        setTimeout(() => {
          if (mouseX === newMouseX && mouseY === newMouseY) {
            isMouseMoving = false;
          }
        }, 100);
      }
    };

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Animation function
    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wind changes
      windChangeTimer++;

      // Periodically change wind direction
      if (windChangeTimer > 150) {
        windDirection += (Math.random() - 0.5) * 0.2;
        windDirection = Math.max(-1, Math.min(1, windDirection));
        windStrength = 0.7 + Math.random() * 1.0;
        windChangeTimer = 0;
      }

      // Small continuous wind variations
      windDirection += (Math.random() - 0.5) * 0.01;
      windDirection = Math.max(-1, Math.min(1, windDirection));

      // Update leaves
      leaves.forEach((leaf) => {
        // Apply wobble effect for sway
        leaf.wobble += leaf.wobbleSpeed;
        const wobbleAmount = Math.sin(leaf.wobble) * leaf.wobbleAmplitude;

        // Wind force varies based on leaf height
        const heightFactor =
          1.0 + ((canvas.height - leaf.y) / canvas.height) * 0.5;
        const currentWind =
          baseWind * windDirection * windStrength * heightFactor;

        // Mouse interaction
        const mouseForce = isMouseMoving ? 5.0 : 2.5;
        const mouseFalloff = 200;
        const dx = leaf.x - mouseX;
        const dy = leaf.y - mouseY;
        const distSquared = dx * dx + dy * dy;
        const dist = Math.sqrt(distSquared);

        // Apply mouse force if the leaf is within range
        if (dist < mouseFalloff) {
          let forceX = dx / dist;
          let forceY = dy / dist;
          const forceMagnitude =
            mouseForce * Math.pow(1 - dist / mouseFalloff, 2.5);
          const mouseInfluence = 0.2;
          forceX += mouseSpeedX * mouseInfluence;
          forceY += mouseSpeedY * mouseInfluence;

          leaf.speedX += forceX * forceMagnitude * 0.2;
          leaf.speedY += forceY * forceMagnitude * 0.2;
          leaf.rotationSpeed += forceMagnitude * 0.005 * (Math.random() - 0.5);
          leaf.alpha = Math.min(1.0, leaf.alpha + 0.1);

          // Update color from current palette when interacted with
          leaf.color =
            leafColorsRef.current[
              Math.floor(Math.random() * leafColorsRef.current.length)
            ];
          leaf.lastMouseForce = Date.now();
        }

        // Apply gravity and wind
        leaf.speedY += gravity;
        leaf.speedX += currentWind + wobbleAmount * 0.02;

        // Apply drag (air resistance)
        leaf.speedX *= 0.99;
        leaf.speedY *= 0.99;

        // Randomly update some leaves' colors each frame for smoother transition when palette changes
        // 0.05% chance per leaf per frame
        if (Math.random() < 0.0005) {
          leaf.color =
            leafColorsRef.current[
              Math.floor(Math.random() * leafColorsRef.current.length)
            ];
        }

        // Limit maximum falling speed
        leaf.speedY = Math.min(leaf.speedY, 0.85);

        // Update position
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;

        // Update rotation and tilt
        const speedInfluence = Math.abs(leaf.speedX) * 2;
        leaf.rotation +=
          leaf.rotationSpeed + wobbleAmount * 0.003 + speedInfluence * 0.005;
        leaf.tilt += leaf.tiltSpeed + wobbleAmount * 0.002 + leaf.speedX * 0.01;

        // Wrap around screen edges horizontally
        if (leaf.x < -leaf.size * 2) leaf.x = canvas.width + leaf.size;
        if (leaf.x > canvas.width + leaf.size * 2) leaf.x = -leaf.size;

        // Reset if leaf goes off bottom
        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size * 2;
          leaf.x = Math.random() * canvas.width;
          leaf.speedY = Math.random() * 0.15 + 0.05;
          leaf.speedX = (Math.random() - 0.5) * 0.3 + windDirection * 0.1;

          // Reset wobble with new values
          leaf.wobble = Math.random() * Math.PI * 2;
          leaf.wobbleAmplitude = 0.2 + Math.random() * 0.3;

          // Always update leaf color with current palette when recycled
          leaf.color =
            leafColorsRef.current[
              Math.floor(Math.random() * leafColorsRef.current.length)
            ];
        }

        // Draw the leaf
        drawLeaf(leaf);
      });

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []); // No palette dependency to prevent animation reset

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvasBackground}
      aria-label="Gently falling particles animation"
    />
  );
};

export default LeafAnimation;
