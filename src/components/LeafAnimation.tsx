// src/components/LeafAnimation.tsx
import React, { useRef, useEffect } from "react";
import styles from "../styles/LeafAnimation.module.css";

interface Leaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  swayAmount: number;
  swaySpeed: number;
  svgIndex: number;
  opacity: number;
  hue: number;
}

const LeafAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full parent element size
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      createLeaves(); // Recreate leaves when resizing
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Array to store leaf objects
    let leaves: Leaf[] = [];

    // SVG paths for different leaf shapes
    const leafPaths = [
      // Maple leaf
      "M 0 -25 C 10 -20, 25 -25, 25 -5 C 25 0, 15 5, 15 10 C 15 20, 25 20, 20 30 " +
        "L 0 40 L -20 30 C -25 20, -15 20, -15 10 C -15 5, -25 0, -25 -5 C -25 -25, -10 -20, 0 -25 Z",

      // Simple oval leaf
      "M 0 -30 C 15 -25, 20 -15, 20 0 C 20 15, 15 25, 0 30 C -15 25, -20 15, -20 0 C -20 -15, -15 -25, 0 -30 Z",

      // Oak leaf
      "M 0 -30 C 5 -25, 10 -25, 15 -20 C 20 -15, 15 -10, 20 -5 C 25 0, 20 5, 25 10 " +
        "C 20 15, 25 20, 15 25 C 10 30, 5 25, 0 30 C -5 25, -10 30, -15 25 C -25 20, -20 15, -25 10 " +
        "C -20 5, -25 0, -20 -5 C -15 -10, -20 -15, -15 -20 C -10 -25, -5 -25, 0 -30 Z",
    ];

    // Create leaf objects
    const createLeaves = () => {
      const leafCount = Math.max(
        20,
        Math.floor((canvas.width * canvas.height) / 20000),
      ); // Adjust based on screen size
      leaves = [];

      for (let i = 0; i < leafCount; i++) {
        leaves.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height, // Start above the canvas
          size: 10 + Math.random() * 30,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          fallSpeed: 0.5 + Math.random() * 1.5,
          swayAmount: 1 + Math.random() * 2,
          swaySpeed: 0.01 + Math.random() * 0.02,
          svgIndex: Math.floor(Math.random() * leafPaths.length),
          opacity: 0.4 + Math.random() * 0.4,
          hue: 80 + Math.random() * 40, // Green hues between 80-120
        });
      }
    };

    // Initial creation of leaves
    createLeaves();

    // Draw a leaf using SVG path
    const drawLeaf = (leaf: Leaf) => {
      const { x, y, size, rotation, svgIndex, opacity, hue } = leaf;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 25, size / 25); // Scale based on the original SVG size

      // Use HSL for color variations of green
      const saturation = 50 + Math.random() * 30;
      const lightness = 25 + Math.random() * 20;
      ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      ctx.strokeStyle = `hsla(${hue}, ${saturation - 10}%, ${lightness - 10}%, ${opacity + 0.2})`;
      ctx.lineWidth = 0.5;

      // Draw the leaf shape
      ctx.beginPath();
      const path = new Path2D(leafPaths[svgIndex]);
      ctx.fill(path);
      ctx.stroke(path);

      // Draw veins in the leaf for more detail
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(0, 30);
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = `hsla(${hue}, ${saturation - 20}%, ${lightness + 10}%, ${opacity + 0.1})`;
      ctx.stroke();

      // Draw side veins
      for (let i = -20; i < 20; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(i < 0 ? -10 : 10, i + 5);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent layer for trail effect
      ctx.fillStyle = "rgba(5, 15, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw leaves
      leaves.forEach((leaf) => {
        // Fall movement
        leaf.y += leaf.fallSpeed;

        // Sway movement (pendulum-like)
        leaf.x += (Math.sin(leaf.y * leaf.swaySpeed) * leaf.swayAmount) / 10;

        // Rotate leaf
        leaf.rotation += leaf.rotationSpeed;

        // Reset leaf when it goes out of view
        if (leaf.y > canvas.height + 50) {
          leaf.y = -50;
          leaf.x = Math.random() * canvas.width;
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
    <canvas ref={canvasRef} className={styles.leafCanvas} aria-hidden="true" />
  );
};

export default LeafAnimation;
