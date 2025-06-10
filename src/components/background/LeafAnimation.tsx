// src/components/background/LeafAnimation.tsx
import React, { useRef, useEffect, useState } from "react";
import styles from "../../styles/components/background/LeafAnimation.module.css";

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
  path?: Path2D; // Cached path for efficient rendering
}

// Helper function to detect device performance
const detectPerformance = (): "low" | "medium" | "high" => {
  // Simple heuristic based on device pixel ratio and memory
  const dpr = window.devicePixelRatio || 1;
  const memory = (navigator as any).deviceMemory || 8;

  if (dpr <= 1 || memory <= 2) return "low";
  if (dpr <= 2 || memory <= 4) return "medium";
  return "high";
};

// Type declaration for window to handle setTimeout
declare global {
  interface Window {
    mouseResetTimeout: number;
  }
}

const LeafAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [devicePerformance] = useState<"low" | "medium" | "high">(
    detectPerformance(),
  );
  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const targetFpsRef = useRef<number>(devicePerformance === "low" ? 30 : 60);

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

    // Blue-Purple leaf colors - inspired by colasdroin.github.io
    const leafColors = [
      "rgba(100, 130, 255, 0.8)", // Bright blue
      "rgba(80, 100, 220, 0.8)", // Medium blue
      "rgba(120, 100, 240, 0.8)", // Purple-blue
      "rgba(150, 110, 250, 0.8)", // Light purple
      "rgba(170, 130, 255, 0.8)", // Lavender
    ];

    // Initialize leaves - adjust count based on device performance
    const leaves: Leaf[] = [];
    const leafCount =
      devicePerformance === "low"
        ? 75
        : devicePerformance === "medium"
          ? 150
          : 200;

    // Gravity and wind settings - slightly faster than before
    const gravity = 0.018; // Increased for larger leaves
    const baseWind = 0.012; // Increased for larger leaves
    let windDirection = 0.3;
    let windStrength = 1.0;
    let windChangeTimer = 0;

    // Create leaf instances with slightly faster but still graceful movement
    for (let i = 0; i < leafCount; i++) {
      // Favor more detailed maple leaves
      let leafType = Math.floor(Math.random() * 7);

      // On medium and high performance, increase chance of maple leaves
      if (devicePerformance !== "low" && Math.random() < 0.5) {
        leafType = 6; // Detailed maple leaf
      }

      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5 - canvas.height * 0.5, // Start some above viewport
        size: 12 + Math.random() * 25, // Increased size range
        rotation: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.6, // Increased horizontal variance
        speedY: Math.random() * 0.2 + 0.12, // Adjusted for larger leaves
        rotationSpeed: (Math.random() - 0.5) * 0.01, // Slightly faster rotation
        tiltSpeed: (Math.random() - 0.5) * 0.007, // Slightly faster tilt
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        alpha: 0.7 + Math.random() * 0.3,
        type: leafType,
        wobble: Math.random() * Math.PI * 2, // Random starting phase
        wobbleSpeed: 0.015 + Math.random() * 0.025, // Faster wobble
        wobbleAmplitude: 0.3 + Math.random() * 0.7, // Different amplitude for each leaf
      });
    }

    // Create and cache leaf shapes - much more efficient
    const createLeafPath = (leaf: Leaf): Path2D => {
      const path = new Path2D();
      const halfSize = leaf.size / 2;

      // Use simplified versions of shapes based on device performance
      if (devicePerformance === "low" && leaf.type > 1) {
        // For low-performance devices, use only simple shapes
        if (leaf.type % 2 === 0) {
          // Oval leaf
          path.ellipse(0, 0, halfSize, leaf.size, 0, 0, Math.PI * 2);
        } else {
          // Simple triangle leaf
          path.moveTo(0, -leaf.size);
          path.lineTo(halfSize, halfSize);
          path.lineTo(-halfSize, halfSize);
          path.closePath();
        }
        return path;
      }

      switch (leaf.type) {
        case 0: // Oval leaf - simple and efficient
          path.ellipse(0, 0, halfSize, leaf.size, 0, 0, Math.PI * 2);
          break;

        case 1: // Heart-shaped leaf
          path.moveTo(0, halfSize);
          path.bezierCurveTo(
            halfSize,
            halfSize * 0.5,
            halfSize,
            -halfSize * 0.7,
            0,
            -leaf.size,
          );
          path.bezierCurveTo(
            -halfSize,
            -halfSize * 0.7,
            -halfSize,
            halfSize * 0.5,
            0,
            halfSize,
          );
          break;

        case 2: // Simplified maple-like leaf
          // Leaf base
          path.moveTo(0, leaf.size);
          // Right side
          path.bezierCurveTo(
            halfSize * 0.8,
            halfSize * 0.5,
            halfSize,
            -halfSize * 0.5,
            0,
            -leaf.size,
          );
          // Left side
          path.bezierCurveTo(
            -halfSize,
            -halfSize * 0.5,
            -halfSize * 0.8,
            halfSize * 0.5,
            0,
            leaf.size,
          );
          break;

        case 3: // Simplified fern leaf
          if (devicePerformance === "medium") {
            // Simplified version for medium performance
            path.moveTo(0, leaf.size);
            path.lineTo(0, -leaf.size);

            // Just a few leaflets
            const leafletCount = 4;
            const leafletSpacing = (leaf.size * 2) / leafletCount;

            for (let i = 0; i < leafletCount; i++) {
              const y = leaf.size - i * leafletSpacing;
              const leafletSize =
                halfSize *
                0.7 *
                (i < leafletCount / 2
                  ? i / (leafletCount / 2)
                  : (leafletCount - i) / (leafletCount / 2));

              // Right leaflet
              path.moveTo(0, y);
              path.lineTo(leafletSize, y - leafletSize);

              // Left leaflet
              path.moveTo(0, y);
              path.lineTo(-leafletSize, y - leafletSize);
            }
          } else {
            // Full version
            const fernSize = leaf.size * 1.2;
            const fernWidth = halfSize * 0.7;

            // Main stem
            path.moveTo(0, fernSize);
            path.lineTo(0, -fernSize);

            // Draw leaflets
            const leafletCount = 6; // Reduced from 10
            const leafletSpacing = (fernSize * 2) / leafletCount;

            for (let i = 0; i < leafletCount; i++) {
              const y = fernSize - i * leafletSpacing;
              const leafletSize =
                fernWidth *
                (i < leafletCount / 2
                  ? i / (leafletCount / 2)
                  : (leafletCount - i) / (leafletCount / 2));

              // Right leaflet - simplified bezier curve
              path.moveTo(0, y);
              path.quadraticCurveTo(
                leafletSize * 0.7,
                y - leafletSize * 0.5,
                leafletSize * 0.8,
                y - leafletSize,
              );

              // Left leaflet - simplified bezier curve
              path.moveTo(0, y);
              path.quadraticCurveTo(
                -leafletSize * 0.7,
                y - leafletSize * 0.5,
                -leafletSize * 0.8,
                y - leafletSize,
              );
            }
          }
          break;

        case 4: // Simplified ginkgo leaf
          const fanWidth = leaf.size * 1.2;
          const fanHeight = leaf.size * 1.1;

          // Draw the leaf outline with fewer control points
          path.moveTo(0, leaf.size * 0.3);
          path.bezierCurveTo(
            fanWidth * 0.5,
            0,
            fanWidth * 0.5,
            -fanHeight * 0.7,
            0,
            -fanHeight,
          );
          path.bezierCurveTo(
            -fanWidth * 0.5,
            -fanHeight * 0.7,
            -fanWidth * 0.5,
            0,
            0,
            leaf.size * 0.3,
          );
          break;

        case 5: // Simplified oak leaf
          path.moveTo(0, leaf.size * 0.4);

          // Right side with fewer lobes
          path.bezierCurveTo(
            leaf.size * 0.5,
            0,
            leaf.size * 0.7,
            -leaf.size * 0.4,
            leaf.size * 0.4,
            -leaf.size * 0.8,
          );

          // Top curve
          path.bezierCurveTo(
            0,
            -leaf.size * 1.1,
            0,
            -leaf.size * 1.1,
            -leaf.size * 0.4,
            -leaf.size * 0.8,
          );

          // Left side
          path.bezierCurveTo(
            -leaf.size * 0.7,
            -leaf.size * 0.4,
            -leaf.size * 0.5,
            0,
            0,
            leaf.size * 0.4,
          );
          break;

        case 6: // Detailed maple leaf
          const mapleSize = leaf.size * 1.3;

          // Stem base
          path.moveTo(0, mapleSize * 0.5);

          // Right side - bottom lobe
          path.bezierCurveTo(
            mapleSize * 0.1,
            mapleSize * 0.2,
            mapleSize * 0.4,
            mapleSize * 0.1,
            mapleSize * 0.5,
            0,
          );

          // Right side - indent
          path.bezierCurveTo(
            mapleSize * 0.45,
            -mapleSize * 0.1,
            mapleSize * 0.3,
            -mapleSize * 0.15,
            mapleSize * 0.3,
            -mapleSize * 0.2,
          );

          // Right side - middle lobe
          path.bezierCurveTo(
            mapleSize * 0.35,
            -mapleSize * 0.3,
            mapleSize * 0.6,
            -mapleSize * 0.4,
            mapleSize * 0.6,
            -mapleSize * 0.5,
          );

          // Right side - second indent
          path.bezierCurveTo(
            mapleSize * 0.55,
            -mapleSize * 0.55,
            mapleSize * 0.35,
            -mapleSize * 0.6,
            mapleSize * 0.25,
            -mapleSize * 0.65,
          );

          // Right side - top lobe
          path.bezierCurveTo(
            mapleSize * 0.3,
            -mapleSize * 0.75,
            mapleSize * 0.3,
            -mapleSize * 0.9,
            mapleSize * 0.2,
            -mapleSize * 0.95,
          );

          // Center top
          path.bezierCurveTo(
            mapleSize * 0.1,
            -mapleSize * 1.05,
            -mapleSize * 0.1,
            -mapleSize * 1.05,
            -mapleSize * 0.2,
            -mapleSize * 0.95,
          );

          // Left side - top lobe
          path.bezierCurveTo(
            -mapleSize * 0.3,
            -mapleSize * 0.9,
            -mapleSize * 0.3,
            -mapleSize * 0.75,
            -mapleSize * 0.25,
            -mapleSize * 0.65,
          );

          // Left side - indent
          path.bezierCurveTo(
            -mapleSize * 0.35,
            -mapleSize * 0.6,
            -mapleSize * 0.55,
            -mapleSize * 0.55,
            -mapleSize * 0.6,
            -mapleSize * 0.5,
          );

          // Left side - middle lobe
          path.bezierCurveTo(
            -mapleSize * 0.6,
            -mapleSize * 0.4,
            -mapleSize * 0.35,
            -mapleSize * 0.3,
            -mapleSize * 0.3,
            -mapleSize * 0.2,
          );

          // Left side - second indent
          path.bezierCurveTo(
            -mapleSize * 0.3,
            -mapleSize * 0.15,
            -mapleSize * 0.45,
            -mapleSize * 0.1,
            -mapleSize * 0.5,
            0,
          );

          // Left side - bottom lobe
          path.bezierCurveTo(
            -mapleSize * 0.4,
            mapleSize * 0.1,
            -mapleSize * 0.1,
            mapleSize * 0.2,
            0,
            mapleSize * 0.5,
          );
          break;
      }

      return path;
    };

    // Optimize leaf drawing by caching paths
    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      ctx.transform(1, 0, Math.sin(leaf.tilt) * 0.25, 1, 0, 0);

      ctx.globalAlpha = leaf.alpha;
      ctx.fillStyle = leaf.color;

      // Create or use cached path
      if (!leaf.path) {
        leaf.path = createLeafPath(leaf);
      }

      // Draw the leaf
      ctx.fill(leaf.path);

      // Only add veins on medium and high performance devices
      if (devicePerformance !== "low") {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 0.5;

        // Add veins based on leaf type
        if (leaf.type === 6) {
          // Main central vein for maple leaf
          ctx.beginPath();
          ctx.moveTo(0, leaf.size * 0.5);
          ctx.lineTo(0, -leaf.size * 0.8);
          ctx.lineWidth = 0.8; // Slightly thicker veins for larger leaves
          ctx.stroke();

          // Side veins to lobes
          if (devicePerformance === "high") {
            const mapleSize = leaf.size * 1.3;

            // Bottom right lobe vein
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
              mapleSize * 0.1,
              -mapleSize * 0.05,
              mapleSize * 0.2,
              -mapleSize * 0.05,
              mapleSize * 0.4,
              -mapleSize * 0.02,
            );
            ctx.stroke();

            // Bottom left lobe vein
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
              -mapleSize * 0.1,
              -mapleSize * 0.05,
              -mapleSize * 0.2,
              -mapleSize * 0.05,
              -mapleSize * 0.4,
              -mapleSize * 0.02,
            );
            ctx.stroke();

            // Middle right lobe vein
            ctx.beginPath();
            ctx.moveTo(0, -mapleSize * 0.3);
            ctx.bezierCurveTo(
              mapleSize * 0.1,
              -mapleSize * 0.35,
              mapleSize * 0.2,
              -mapleSize * 0.4,
              mapleSize * 0.4,
              -mapleSize * 0.45,
            );
            ctx.stroke();

            // Middle left lobe vein
            ctx.beginPath();
            ctx.moveTo(0, -mapleSize * 0.3);
            ctx.bezierCurveTo(
              -mapleSize * 0.1,
              -mapleSize * 0.35,
              -mapleSize * 0.2,
              -mapleSize * 0.4,
              -mapleSize * 0.4,
              -mapleSize * 0.45,
            );
            ctx.stroke();
          }
        } else {
          // Simple vein down the middle for other leaf types
          ctx.beginPath();
          ctx.moveTo(0, leaf.size * 0.5);
          ctx.lineTo(0, -leaf.size * 0.5);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    // Track mouse position with enhanced effect
    let mouseX = -100;
    let mouseY = -100;
    let isMouseMoving = false;
    // @ts-ignore -- These variables may be used in future enhancements
    let mouseSpeedX = 0;
    // @ts-ignore -- These variables may be used in future enhancements
    let mouseSpeedY = 0;
    // @ts-ignore -- These variables may be used in future enhancements
    let mouseSpeedFactor = 0.15; // Factor for mouse speed influence
    let lastMouseMoveTime = 0;

    // Create debounced mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle mouse events to 60fps (16ms) or 30fps (33ms) based on device performance
      const throttleTime = devicePerformance === "low" ? 33 : 16;

      if (now - lastMouseMoveTime < throttleTime) {
        return; // Skip this update if it's too soon
      }

      lastMouseMoveTime = now;

      // Calculate mouse speed
      const newMouseX = e.clientX;
      const newMouseY = e.clientY;

      mouseSpeedX = newMouseX - mouseX;
      mouseSpeedY = newMouseY - mouseY;

      // Update mouse position
      mouseX = newMouseX;
      mouseY = newMouseY;
      isMouseMoving = true;

      // Auto-reset mouse moving flag after 150ms of inactivity (longer for more responsive feel)
      clearTimeout(window.mouseResetTimeout);
      window.mouseResetTimeout = setTimeout(() => {
        if (mouseX === newMouseX && mouseY === newMouseY) {
          isMouseMoving = false;
        }
      }, 150) as unknown as number;
    };

    // Throttled touch handler
    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      // Throttle touch events (touch events often fire more frequently)
      const throttleTime = devicePerformance === "low" ? 50 : 33;

      if (now - lastMouseMoveTime < throttleTime) {
        return; // Skip this update
      }

      lastMouseMoveTime = now;

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

        // Auto-reset mouse moving flag after 150ms of inactivity (longer for more responsive feel)
        clearTimeout(window.mouseResetTimeout);
        window.mouseResetTimeout = setTimeout(() => {
          if (mouseX === newMouseX && mouseY === newMouseY) {
            isMouseMoving = false;
          }
        }, 150) as unknown as number;
      }
    };

    // Add event listeners with passive option where possible
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Frame rate limiting animation function
    const animate = (timestamp: number) => {
      // Frame rate limiting for better performance
      const targetFPS = targetFpsRef.current;
      const frameInterval = 1000 / targetFPS;
      const elapsed = timestamp - lastFrameTimeRef.current;

      // Only run animation if enough time has passed, or first frame
      if (elapsed > frameInterval || lastFrameTimeRef.current === 0) {
        // Capture timestamp for next frame calculation
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

        // Clear canvas completely - no trails
        const devicePixelRatio = window.devicePixelRatio || 1;
        ctx.clearRect(
          0,
          0,
          canvas.width / devicePixelRatio,
          canvas.height / devicePixelRatio,
        );

        // Wind changes - update less frequently for better performance
        windChangeTimer++;

        // Periodically change wind direction (less often on low performance devices)
        const windChangeInterval = devicePerformance === "low" ? 250 : 150;
        if (windChangeTimer > windChangeInterval) {
          windDirection += (Math.random() - 0.5) * 0.2;
          windDirection = Math.max(-1, Math.min(1, windDirection));
          windStrength = 0.7 + Math.random() * 1.0;
          windChangeTimer = 0;
        }

        // Small continuous wind variations - less frequent for low-performance devices
        if (devicePerformance !== "low" || Math.random() < 0.3) {
          windDirection += (Math.random() - 0.5) * 0.01;
          windDirection = Math.max(-1, Math.min(1, windDirection));
        }

        // Batch process leaves - process different amounts based on device performance
        const batchSize =
          devicePerformance === "low"
            ? Math.floor(leaves.length / 2)
            : leaves.length;

        // On low performance, update only a subset of leaves each frame
        const startIdx =
          devicePerformance === "low"
            ? Math.floor(Math.random() * (leaves.length - batchSize))
            : 0;

        for (
          let i = startIdx;
          i < startIdx + batchSize && i < leaves.length;
          i++
        ) {
          const leaf = leaves[i];

          // Apply wobble effect
          leaf.wobble += leaf.wobbleSpeed;
          const wobbleAmount = Math.sin(leaf.wobble) * leaf.wobbleAmplitude;

          // Wind force varies based on leaf height
          const heightFactor =
            1.0 + ((canvas.height - leaf.y) / canvas.height) * 0.5;
          const currentWind =
            baseWind * windDirection * windStrength * heightFactor;

          // Mouse interaction - only if mouse is near and the device can handle it
          if (isMouseMoving && devicePerformance !== "low") {
            const mouseFalloff = devicePerformance === "medium" ? 120 : 180;
            const dx = leaf.x - mouseX;
            const dy = leaf.y - mouseY;
            const distSquared = dx * dx + dy * dy;

            // Skip expensive square root calculation if definitely out of range
            if (distSquared < mouseFalloff * mouseFalloff) {
              const dist = Math.sqrt(distSquared);

              if (dist < mouseFalloff) {
                // Calculate force direction (normalized vector)
                const mouseForce = isMouseMoving ? 5.0 : 2.5; // Increased force
                const forceX = dx / dist;
                const forceY = dy / dist;

                // Enhanced force calculation with stronger effect at close range
                const forceMagnitude =
                  mouseForce * Math.pow(1 - dist / mouseFalloff, 1.5);

                // Apply the force with increased effect
                leaf.speedX += forceX * forceMagnitude * 0.1;
                leaf.speedY += forceY * forceMagnitude * 0.1;

                // Enhanced rotation based on mouse
                leaf.rotationSpeed +=
                  forceMagnitude * 0.003 * (Math.random() - 0.5);
              }
            }
          }

          // Basic physics - simplified
          leaf.speedY += gravity;
          leaf.speedX += currentWind + wobbleAmount * 0.01;

          leaf.speedX *= 0.99;
          leaf.speedY *= 0.99;

          leaf.speedY = Math.min(leaf.speedY, 0.8);

          leaf.x += leaf.speedX;
          leaf.y += leaf.speedY;

          // Simplified rotation update - less math
          if (i % (devicePerformance === "low" ? 3 : 1) === 0) {
            // Update less frequently on low-end
            leaf.rotation += leaf.rotationSpeed;
            leaf.tilt += leaf.tiltSpeed;
          }

          // Simple wrap-around
          if (leaf.x < -leaf.size * 2) leaf.x = canvas.width + leaf.size;
          if (leaf.x > canvas.width + leaf.size * 2) leaf.x = -leaf.size;

          // Reset if leaf goes off bottom
          if (leaf.y > canvas.height + leaf.size) {
            leaf.y = -leaf.size * 2;
            leaf.x = Math.random() * canvas.width;
            leaf.speedY = Math.random() * 0.2 + 0.1;
            leaf.speedX = (Math.random() - 0.5) * 0.5 + windDirection * 0.2;

            leaf.wobble = Math.random() * Math.PI * 2;
            leaf.wobbleAmplitude = 0.3 + Math.random() * 0.7;
          }

          // Draw the leaf
          drawLeaf(leaf);
        }
      }

      // Request next frame
      frameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [devicePerformance]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvasBackground}
      aria-label="Gently falling particles animation"
    />
  );
};

export default LeafAnimation;
