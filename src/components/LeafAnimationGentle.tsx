// src/components/LeafAnimationGentle.tsx
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
  lastMouseForce?: number; // Track last time mouse force was applied
}

const LeafAnimationGentle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        type: Math.floor(Math.random() * 7), // 7 different leaf shapes
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

        case 3: // Fern leaf
          const fernSize = leaf.size * 1.2;
          const fernWidth = halfSize * 0.7;
          ctx.beginPath();

          // Main stem
          ctx.moveTo(0, fernSize);
          ctx.lineTo(0, -fernSize);

          // Draw leaflets
          const leafletCount = 10;
          const leafletSpacing = (fernSize * 2) / leafletCount;

          for (let i = 0; i < leafletCount; i++) {
            const y = fernSize - i * leafletSpacing;
            const leafletSize =
              fernWidth *
              (i < leafletCount / 2
                ? i / (leafletCount / 2)
                : (leafletCount - i) / (leafletCount / 2));

            // Right leaflet
            ctx.moveTo(0, y);
            ctx.bezierCurveTo(
              leafletSize * 0.5,
              y - leafletSize * 0.2,
              leafletSize,
              y - leafletSize * 0.5,
              leafletSize * 0.8,
              y - leafletSize,
            );

            // Left leaflet
            ctx.moveTo(0, y);
            ctx.bezierCurveTo(
              -leafletSize * 0.5,
              y - leafletSize * 0.2,
              -leafletSize,
              y - leafletSize * 0.5,
              -leafletSize * 0.8,
              y - leafletSize,
            );
          }

          ctx.strokeStyle = leaf.color;
          ctx.lineWidth = 1;
          ctx.stroke();
          break;

        case 4: // Ginkgo-inspired leaf
          ctx.beginPath();
          
          // Create a fan/ginkgo shaped leaf
          const fanWidth = leaf.size * 1.2;
          const fanHeight = leaf.size * 1.1;
          
          // Draw the leaf outline
          ctx.moveTo(0, leaf.size * 0.3); // Start at stem
          
          // Right side curve
          ctx.bezierCurveTo(
            fanWidth * 0.4, 0,
            fanWidth * 0.7, -fanHeight * 0.5,
            fanWidth * 0.5, -fanHeight
          );
          
          // Top curve
          ctx.bezierCurveTo(
            fanWidth * 0.3, -fanHeight * 1.1,
            -fanWidth * 0.3, -fanHeight * 1.1,
            -fanWidth * 0.5, -fanHeight
          );
          
          // Left side curve
          ctx.bezierCurveTo(
            -fanWidth * 0.7, -fanHeight * 0.5,
            -fanWidth * 0.4, 0,
            0, leaf.size * 0.3
          );
          
          ctx.fill();
          
          // Add veins
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;
          
          // Main center vein
          ctx.beginPath();
          ctx.moveTo(0, leaf.size * 0.3);
          ctx.lineTo(0, -fanHeight * 0.9);
          ctx.stroke();
          
          // Side veins
          const veins = 5;
          for (let i = 1; i <= veins; i++) {
            const yPos = -fanHeight * 0.2 * i;
            const xWidth = (fanWidth * 0.5) * (i / veins);
            
            // Right vein
            ctx.beginPath();
            ctx.moveTo(0, yPos);
            ctx.bezierCurveTo(
              xWidth * 0.3, yPos,
              xWidth * 0.6, yPos - 0.1 * leaf.size,
              xWidth, yPos - 0.05 * leaf.size
            );
            ctx.stroke();
            
            // Left vein
            ctx.beginPath();
            ctx.moveTo(0, yPos);
            ctx.bezierCurveTo(
              -xWidth * 0.3, yPos,
              -xWidth * 0.6, yPos - 0.1 * leaf.size,
              -xWidth, yPos - 0.05 * leaf.size
            );
            ctx.stroke();
          }
          break;
          
        case 5: // Oak leaf
          ctx.beginPath();
          const oakSize = leaf.size * 1.2;
          const lobeFactor = 0.3; // How deep the lobes go
          
          // Starting point at the stem
          ctx.moveTo(0, oakSize * 0.4);

          // Right side lobes - each is a small curve in and out
          for (let i = 5; i >= 0; i--) {
            const progress = i / 5; // 1 to 0
            const width = oakSize * 0.7 * progress;
            const height = -oakSize * 0.8 * progress;
            
            // In for the lobe
            ctx.bezierCurveTo(
              width - width * lobeFactor * 0.5, height + oakSize * 0.2 * (1-progress),
              width - width * lobeFactor, height,
              width, height
            );
            
            // Out for the next lobe
            if (i > 0) {
              const nextProgress = (i-1) / 5;
              const nextWidth = oakSize * 0.7 * nextProgress;
              const nextHeight = -oakSize * 0.8 * nextProgress;
              
              ctx.bezierCurveTo(
                width + width * lobeFactor * 0.3, height - oakSize * 0.05 * (1-progress),
                nextWidth + nextWidth * lobeFactor * 0.3, nextHeight + oakSize * 0.05 * nextProgress,
                nextWidth, nextHeight
              );
            }
          }
          
          // Top of the leaf
          ctx.bezierCurveTo(
            0, -oakSize,
            0, -oakSize,
            0, -oakSize
          );
          
          // Left side lobes - mirror of right side
          for (let i = 0; i <= 5; i++) {
            const progress = i / 5; // 0 to 1
            const width = -oakSize * 0.7 * progress;
            const height = -oakSize * 0.8 * (1-progress);
            
            // In for the lobe
            ctx.bezierCurveTo(
              width - width * lobeFactor * 0.5, height + oakSize * 0.2 * progress,
              width - width * lobeFactor, height,
              width, height
            );
            
            // Out for the next lobe
            if (i < 5) {
              const nextProgress = (i+1) / 5;
              const nextWidth = -oakSize * 0.7 * nextProgress;
              const nextHeight = -oakSize * 0.8 * (1-nextProgress);
              
              ctx.bezierCurveTo(
                width + width * lobeFactor * 0.3, height - oakSize * 0.05 * progress,
                nextWidth + nextWidth * lobeFactor * 0.3, nextHeight + oakSize * 0.05 * (1-nextProgress),
                nextWidth, nextHeight
              );
            }
          }
          
          // Back to stem
          ctx.bezierCurveTo(
            -oakSize * 0.1, oakSize * 0.2,
            -oakSize * 0.05, oakSize * 0.3,
            0, oakSize * 0.4
          );
          
          ctx.fill();
          
          // Add main vein
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, oakSize * 0.4);
          ctx.lineTo(0, -oakSize * 0.8);
          ctx.stroke();
          
          // Add side veins
          for (let i = 1; i <= 5; i++) {
            const progress = i / 6; // Spread out the veins
            const height = -oakSize * progress;
            const width = oakSize * 0.5 * progress;
            
            // Right vein
            ctx.beginPath();
            ctx.moveTo(0, height);
            ctx.lineTo(width * 0.7, height + height * 0.1);
            ctx.stroke();
            
            // Left vein
            ctx.beginPath();
            ctx.moveTo(0, height);
            ctx.lineTo(-width * 0.7, height + height * 0.1);
            ctx.stroke();
          }
          break;
          
        case 6: // Detailed maple leaf
          ctx.beginPath();
          const mapleSize = leaf.size * 1.3;
          
          // Define the main points of the maple leaf
          // Stem base
          ctx.moveTo(0, mapleSize * 0.5);
          
          // Right side - 3 points with curves between
          // First (bottom) lobe
          ctx.bezierCurveTo(
            mapleSize * 0.1, mapleSize * 0.2,
            mapleSize * 0.4, mapleSize * 0.1,
            mapleSize * 0.5, 0
          );
          
          // Curve inward for the indent
          ctx.bezierCurveTo(
            mapleSize * 0.45, -mapleSize * 0.1,
            mapleSize * 0.3, -mapleSize * 0.15,
            mapleSize * 0.3, -mapleSize * 0.2
          );
          
          // Second (middle) lobe - extend out
          ctx.bezierCurveTo(
            mapleSize * 0.35, -mapleSize * 0.3,
            mapleSize * 0.6, -mapleSize * 0.4,
            mapleSize * 0.6, -mapleSize * 0.5
          );
          
          // Curve inward for the second indent
          ctx.bezierCurveTo(
            mapleSize * 0.55, -mapleSize * 0.55,
            mapleSize * 0.35, -mapleSize * 0.6,
            mapleSize * 0.25, -mapleSize * 0.65
          );
          
          // Third (top) lobe
          ctx.bezierCurveTo(
            mapleSize * 0.3, -mapleSize * 0.75,
            mapleSize * 0.3, -mapleSize * 0.9,
            mapleSize * 0.2, -mapleSize * 0.95
          );
          
          // Center top point
          ctx.bezierCurveTo(
            mapleSize * 0.1, -mapleSize * 1.05,
            -mapleSize * 0.1, -mapleSize * 1.05,
            -mapleSize * 0.2, -mapleSize * 0.95
          );
          
          // Left side - mirror of right side
          // Third (top) lobe
          ctx.bezierCurveTo(
            -mapleSize * 0.3, -mapleSize * 0.9,
            -mapleSize * 0.3, -mapleSize * 0.75,
            -mapleSize * 0.25, -mapleSize * 0.65
          );
          
          // Curve inward for the second indent
          ctx.bezierCurveTo(
            -mapleSize * 0.35, -mapleSize * 0.6,
            -mapleSize * 0.55, -mapleSize * 0.55,
            -mapleSize * 0.6, -mapleSize * 0.5
          );
          
          // Second (middle) lobe - extend out
          ctx.bezierCurveTo(
            -mapleSize * 0.6, -mapleSize * 0.4,
            -mapleSize * 0.35, -mapleSize * 0.3,
            -mapleSize * 0.3, -mapleSize * 0.2
          );
          
          // Curve inward for the indent
          ctx.bezierCurveTo(
            -mapleSize * 0.3, -mapleSize * 0.15,
            -mapleSize * 0.45, -mapleSize * 0.1,
            -mapleSize * 0.5, 0
          );
          
          // First (bottom) lobe
          ctx.bezierCurveTo(
            -mapleSize * 0.4, mapleSize * 0.1,
            -mapleSize * 0.1, mapleSize * 0.2,
            0, mapleSize * 0.5
          );
          
          ctx.fill();
          
          // Add main vein
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;
          
          // Central vein
          ctx.beginPath();
          ctx.moveTo(0, mapleSize * 0.5);
          ctx.lineTo(0, -mapleSize * 0.8);
          ctx.stroke();
          
          // Right veins - one to each lobe
          // Bottom lobe
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(
            mapleSize * 0.1, -mapleSize * 0.05,
            mapleSize * 0.2, -mapleSize * 0.05,
            mapleSize * 0.4, -mapleSize * 0.02
          );
          ctx.stroke();
          
          // Middle lobe
          ctx.beginPath();
          ctx.moveTo(0, -mapleSize * 0.3);
          ctx.bezierCurveTo(
            mapleSize * 0.1, -mapleSize * 0.35,
            mapleSize * 0.2, -mapleSize * 0.4,
            mapleSize * 0.4, -mapleSize * 0.45
          );
          ctx.stroke();
          
          // Top lobe
          ctx.beginPath();
          ctx.moveTo(0, -mapleSize * 0.6);
          ctx.bezierCurveTo(
            mapleSize * 0.05, -mapleSize * 0.7,
            mapleSize * 0.1, -mapleSize * 0.8,
            mapleSize * 0.15, -mapleSize * 0.9
          );
          ctx.stroke();
          
          // Left veins - mirror of right
          // Bottom lobe
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(
            -mapleSize * 0.1, -mapleSize * 0.05,
            -mapleSize * 0.2, -mapleSize * 0.05,
            -mapleSize * 0.4, -mapleSize * 0.02
          );
          ctx.stroke();
          
          // Middle lobe
          ctx.beginPath();
          ctx.moveTo(0, -mapleSize * 0.3);
          ctx.bezierCurveTo(
            -mapleSize * 0.1, -mapleSize * 0.35,
            -mapleSize * 0.2, -mapleSize * 0.4,
            -mapleSize * 0.4, -mapleSize * 0.45
          );
          ctx.stroke();
          
          // Top lobe
          ctx.beginPath();
          ctx.moveTo(0, -mapleSize * 0.6);
          ctx.bezierCurveTo(
            -mapleSize * 0.05, -mapleSize * 0.7,
            -mapleSize * 0.1, -mapleSize * 0.8,
            -mapleSize * 0.15, -mapleSize * 0.9
          );
          ctx.stroke();
          break;
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
      // Clear canvas completely - no trails
      const devicePixelRatio = window.devicePixelRatio || 1;
      ctx.clearRect(
        0,
        0,
        canvas.width / devicePixelRatio,
        canvas.height / devicePixelRatio,
      );

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

        // Mouse interaction - push leaves away when mouse is nearby
        // REDUCED mouse repulsion force - this is the key change
        const mouseForce = isMouseMoving ? 4.0 : 2.0; // Reduced from 5.0/2.5
        const mouseFalloff = 150; // Reduced from 200 - smaller area of influence
        const dx = leaf.x - mouseX;
        const dy = leaf.y - mouseY;
        const distSquared = dx * dx + dy * dy;
        const dist = Math.sqrt(distSquared);

        // Only apply force if the leaf is within range
        if (dist < mouseFalloff) {
          // Calculate force direction (normalized vector)
          let forceX = dx / dist;
          let forceY = dy / dist;

          // Force is stronger the closer the leaf is to the mouse
          // Use inverse square falloff for natural-looking physics with a minimum threshold to ensure visibility
          const forceMagnitude =
            mouseForce * Math.pow(1 - dist / mouseFalloff, 2.0); // Reduced power from 2.5

          // Add mouse velocity influence for more dynamic interaction
          const mouseInfluence = 0.1; // Reduced from 0.2
          forceX += mouseSpeedX * mouseInfluence;
          forceY += mouseSpeedY * mouseInfluence;

          // Apply the force with increased effect
          leaf.speedX += forceX * forceMagnitude * 0.1; // Reduced from 0.2
          leaf.speedY += forceY * forceMagnitude * 0.1; // Reduced from 0.2

          // Increase rotation based on mouse proximity
          leaf.rotationSpeed += forceMagnitude * 0.002 * (Math.random() - 0.5); // Reduced from 0.005

          // Add a slight color shift effect when pushed by mouse
          leaf.alpha = Math.min(1.0, leaf.alpha + 0.05); // Reduced from 0.1

          // Mark when we last applied mouse force
          leaf.lastMouseForce = Date.now();
        }

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
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
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

export default LeafAnimationGentle;
