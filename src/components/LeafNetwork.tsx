// src/components/LeafNetwork.tsx
import React, { useRef, useEffect } from "react";
import styles from "../styles/LeafNetwork.module.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  isLeafNode?: boolean;
}

const LeafNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window width/height
    const handleResize = () => {
      // Get the parent dimensions instead of window dimensions
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        // Fallback to window dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Initialize particles
    const particles: Particle[] = [];
    const leafPoints: Particle[] = [];
    const particleCount = 100; // Regular particles
    // Removed unused leafNodesCount variable
    const maxDistance = 100; // Max distance for drawing connections

    // Define leaf shapes (multiple simple leaf outlines)
    const leafShapes = [
      // Simple leaf shape 1 (coordinates relative to center)
      [
        { x: 0, y: -50 },
        { x: 15, y: -40 },
        { x: 25, y: -20 },
        { x: 15, y: 0 },
        { x: 25, y: 20 },
        { x: 15, y: 40 },
        { x: 0, y: 50 },
        { x: -15, y: 40 },
        { x: -25, y: 20 },
        { x: -15, y: 0 },
        { x: -25, y: -20 },
        { x: -15, y: -40 },
      ],
      // Simple leaf shape 2 (more oval)
      [
        { x: 0, y: -30 },
        { x: 20, y: -20 },
        { x: 30, y: 0 },
        { x: 20, y: 20 },
        { x: 0, y: 30 },
        { x: -20, y: 20 },
        { x: -30, y: 0 },
        { x: -20, y: -20 },
      ],
    ];

    // Colors
    const colors = {
      darkGreen: "rgba(0, 50, 20, 0.7)",
      midGreen: "rgba(20, 100, 40, 0.5)",
      lightGreen: "rgba(60, 180, 60, 0.3)",
      white: "rgba(255, 255, 255, 0.8)",
    };

    // Create 3-4 leaf instances at random positions
    const leafCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 leaves

    for (let l = 0; l < leafCount; l++) {
      // Random position for this leaf
      const leafCenterX = Math.random() * canvas.width;
      const leafCenterY = Math.random() * canvas.height;
      const leafSize = 50 + Math.random() * 100; // Random size
      const rotation = Math.random() * Math.PI * 2; // Random rotation

      // Choose a random leaf shape
      const shapeIndex = Math.floor(Math.random() * leafShapes.length);
      const leafShape = leafShapes[shapeIndex];

      // Create particles for this leaf
      for (let i = 0; i < leafShape.length; i++) {
        const point = leafShape[i];

        // Apply size and rotation
        const rotatedX =
          point.x * Math.cos(rotation) - point.y * Math.sin(rotation);
        const rotatedY =
          point.x * Math.sin(rotation) + point.y * Math.cos(rotation);

        const x = leafCenterX + (rotatedX * leafSize) / 50; // Normalize to leafSize
        const y = leafCenterY + (rotatedY * leafSize) / 50;

        // Add some randomness to the points
        const jitter = leafSize * 0.05; // 5% jitter

        leafPoints.push({
          x: x + (Math.random() * jitter * 2 - jitter),
          y: y + (Math.random() * jitter * 2 - jitter),
          size: 2 + Math.random() * 1,
          speedX: 0,
          speedY: 0,
          color: colors.lightGreen,
          isLeafNode: true,
        });
      }

      // Add some extra points inside the leaf
      for (let i = 0; i < 20; i++) {
        const randPointIndex1 = Math.floor(Math.random() * leafShape.length);
        const randPointIndex2 = Math.floor(Math.random() * leafShape.length);
        const point1 = leafShape[randPointIndex1];
        const point2 = leafShape[randPointIndex2];

        // Interpolate between two random points
        const factor = Math.random();
        const x =
          leafCenterX +
          ((point1.x * factor + point2.x * (1 - factor)) * leafSize) / 50;
        const y =
          leafCenterY +
          ((point1.y * factor + point2.y * (1 - factor)) * leafSize) / 50;

        leafPoints.push({
          x,
          y,
          size: 1 + Math.random() * 1,
          speedX: 0,
          speedY: 0,
          color: colors.white,
          isLeafNode: true,
        });
      }
    }

    // Create regular moving particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: i % 4 === 0 ? colors.white : colors.midGreen,
      });
    }

    // Add leaf points to the particles array
    particles.push(...leafPoints);

    // Animation function
    const animate = () => {
      // Clear canvas with a semi-transparent dark background for trail effect
      ctx.fillStyle = "rgba(5, 15, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Only move particles that are not part of leaf structures
        if (!particle.isLeafNode) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Wrap around screen edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections between particles
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Calculate line opacity based on distance
            const opacity = 1 - distance / maxDistance;

            // Determine line color based on particle types
            let lineColor;
            if (particles[i].isLeafNode && particles[j].isLeafNode) {
              // Connection between leaf nodes
              lineColor = `rgba(60, 180, 60, ${opacity * 0.6})`;
            } else if (particles[i].isLeafNode || particles[j].isLeafNode) {
              // Connection between leaf node and regular particle
              lineColor = `rgba(120, 220, 100, ${opacity * 0.3})`;
            } else {
              // Connection between regular particles
              lineColor = `rgba(255, 255, 255, ${opacity * 0.15})`;
            }

            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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
      aria-label="Interactive leaf network visualization"
    />
  );
};

export default LeafNetwork;
