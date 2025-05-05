// src/components/LeafAnimation.tsx
import React, { useRef, useEffect } from "react";
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
}

const LeafAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window width/height
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Blue-Purple leaf colors - inspired by colasdroin.github.io
    const leafColors = [
      "rgba(100, 130, 255, 0.8)", // Bright blue
      "rgba(80, 100, 220, 0.8)", // Medium blue
      "rgba(120, 100, 240, 0.8)", // Purple-blue
      "rgba(150, 110, 250, 0.8)", // Light purple
      "rgba(170, 130, 255, 0.8)", // Lavender
    ];

    // Initialize leaves
    const leaves: Leaf[] = [];
    const leafCount = 200;

    // Gravity and wind settings - slightly faster than before
    const gravity = 0.015; // Increased from 0.01
    const baseWind = 0.01; // Increased from 0.005
    let windDirection = 0.3; // Starting more to the right
    let windStrength = 1.0; // Wind strength multiplier
    let windChangeTimer = 0;

    // Create leaf instances with slightly faster but still graceful movement
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5 - canvas.height * 0.5, // Start some above viewport
        size: 7 + Math.random() * 15,
        rotation: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.6, // Increased horizontal variance
        speedY: Math.random() * 0.25 + 0.15, // Slightly faster falling
        rotationSpeed: (Math.random() - 0.5) * 0.01, // Slightly faster rotation
        tiltSpeed: (Math.random() - 0.5) * 0.007, // Slightly faster tilt
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        alpha: 0.7 + Math.random() * 0.3,
        type: Math.floor(Math.random() * 3), // 3 different leaf shapes
        wobble: Math.random() * Math.PI * 2, // Random starting phase
        wobbleSpeed: 0.015 + Math.random() * 0.025, // Faster wobble
        wobbleAmplitude: 0.3 + Math.random() * 0.7, // Different amplitude for each leaf
      });
    }

    // Function to draw a leaf
    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      // Apply tilt effect
      ctx.transform(
        1,
        0,
        Math.sin(leaf.tilt) * 0.25, // Increased tilt effect
        1,
        0,
        0,
      );

      const halfSize = leaf.size / 2;

      ctx.globalAlpha = leaf.alpha;
      ctx.fillStyle = leaf.color;

      switch (leaf.type) {
        case 0: // Oval leaf
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

        case 1: // Heart-shaped leaf
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

        case 2: // Maple-like leaf
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

      ctx.restore();
    };

    // Animation function
    const animate = () => {
      // Clear canvas completely - no trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wind changes - more dynamic now
      windChangeTimer++;

      // Periodically change wind direction
      if (windChangeTimer > 150) {
        // Larger wind direction changes
        windDirection += (Math.random() - 0.5) * 0.2;
        windDirection = Math.max(-1, Math.min(1, windDirection)); // Wider range from -1 to 1

        // Randomly change wind strength too
        windStrength = 0.7 + Math.random() * 1.0; // Wind strength varies from 0.7 to 1.7

        windChangeTimer = 0;
      }

      // Small continuous wind variations
      windDirection += (Math.random() - 0.5) * 0.01; // Tiny random changes
      windDirection = Math.max(-1, Math.min(1, windDirection)); // Keep within bounds

      // Update leaves
      leaves.forEach((leaf) => {
        // Apply wobble effect for a natural sway (more pronounced now)
        leaf.wobble += leaf.wobbleSpeed;
        const wobbleAmount = Math.sin(leaf.wobble) * leaf.wobbleAmplitude;

        // Wind force now varies based on leaf height (stronger higher up)
        const heightFactor =
          1.0 + ((canvas.height - leaf.y) / canvas.height) * 0.5;
        const currentWind =
          baseWind * windDirection * windStrength * heightFactor;

        // Apply gravity and wind with wobble effect
        leaf.speedY += gravity;
        leaf.speedX += currentWind + wobbleAmount * 0.02; // Enhanced wobble effect

        // Apply drag (air resistance)
        leaf.speedX *= 0.99; // Slightly faster deceleration for more responsive feel
        leaf.speedY *= 0.99;

        // Limit maximum falling speed
        leaf.speedY = Math.min(leaf.speedY, 0.85); // Increased from 0.7

        // Update position
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;

        // Update rotation and tilt - affected by horizontal speed
        const speedInfluence = Math.abs(leaf.speedX) * 2; // Speed impacts rotation
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
          leaf.speedY = Math.random() * 0.2 + 0.1; // Slightly faster initial fall
          leaf.speedX = (Math.random() - 0.5) * 0.5 + windDirection * 0.2; // Initial speed influenced by wind

          // Reset wobble with new values
          leaf.wobble = Math.random() * Math.PI * 2;
          leaf.wobbleAmplitude = 0.3 + Math.random() * 0.7;
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvasBackground}
      aria-label="Gently falling particles animation"
    />
  );
};

export default LeafAnimation;
