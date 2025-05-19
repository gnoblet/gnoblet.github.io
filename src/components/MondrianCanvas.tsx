import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/MondrianCanvas.module.css';

interface MondrianCanvasProps {
  className?: string;
  minBlocks?: number;
  maxBlocks?: number;
}

// Subtle colors for the Zen Browser-inspired blocks - fixed colors, no CSS variables
const PASTEL_COLORS = [
  { value: 'rgba(138, 169, 244, 0.02)', weight: 3 }, // Very subtle blue
  { value: 'rgba(138, 169, 244, 0.04)', weight: 2 }, // Light blue
  { value: 'rgba(91, 111, 233, 0.02)', weight: 2 }, // Very subtle primary
  { value: 'rgba(91, 111, 233, 0.04)', weight: 1 }, // Light primary
  { value: 'rgba(108, 142, 239, 0.02)', weight: 3 }, // Very subtle secondary
  { value: 'rgba(108, 142, 239, 0.03)', weight: 2 }, // Light secondary
  { value: 'transparent', weight: 15 }, // Empty space (transparent)
];

// Function to get weighted random color
const getRandomColor = () => {
  const totalWeight = PASTEL_COLORS.reduce((acc, color) => acc + color.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const color of PASTEL_COLORS) {
    random -= color.weight;
    if (random <= 0) {
      return color.value;
    }
  }
  return PASTEL_COLORS[0].value; // Fallback
};

// Create a randomized Mondrian-style grid
const generateMondrianGrid = (
  width: number, 
  height: number, 
  minBlocks: number = 20, 
  maxBlocks: number = 40
) => {
  // Start with a single block covering the entire canvas
  const blocks: any[] = [
    { x: 0, y: 0, width, height, color: getRandomColor() }
  ];

  // Define line properties
  const lineWidth = Math.max(0.5, Math.min(0.8, width / 1000));
  const lineColor = 'rgba(138, 169, 244, 0.06)';

  // Split blocks randomly to create a Mondrian-style grid
  const targetBlocks = Math.floor(minBlocks + Math.random() * (maxBlocks - minBlocks));
  
  while (blocks.length < targetBlocks) {
    // Pick a random block to split
    const blockIndex = Math.floor(Math.random() * blocks.length);
    const block = blocks[blockIndex];
    
    // Don't split blocks that are too small
    const minSize = Math.min(width, height) / 12;
    if (block.width < minSize * 1.5 && block.height < minSize * 1.5) {
      continue;
    }
    
    // Choose split direction based on block proportions
    const splitHorizontally = block.width > block.height;
    
    if (splitHorizontally) {
      // Split position (avoid very thin slices)
      const minSplit = Math.max(block.x + minSize, block.x + block.width * 0.2);
      const maxSplit = Math.min(block.x + block.width - minSize, block.x + block.width * 0.8);
      
      if (maxSplit <= minSplit) continue;
      
      const splitAt = minSplit + Math.random() * (maxSplit - minSplit);
      
      // Create new blocks
      const block1 = {
        x: block.x,
        y: block.y,
        width: splitAt - block.x,
        height: block.height,
        color: getRandomColor()
      };
      
      const block2 = {
        x: splitAt,
        y: block.y,
        width: block.x + block.width - splitAt,
        height: block.height,
        color: getRandomColor()
      };
      
      // Replace the original block with the two new blocks
      blocks.splice(blockIndex, 1, block1, block2);
    } else {
      // Split position (avoid very thin slices)
      const minSplit = Math.max(block.y + minSize, block.y + block.height * 0.2);
      const maxSplit = Math.min(block.y + block.height - minSize, block.y + block.height * 0.8);
      
      if (maxSplit <= minSplit) continue;
      
      const splitAt = minSplit + Math.random() * (maxSplit - minSplit);
      
      // Create new blocks
      const block1 = {
        x: block.x,
        y: block.y,
        width: block.width,
        height: splitAt - block.y,
        color: getRandomColor()
      };
      
      const block2 = {
        x: block.x,
        y: splitAt,
        width: block.width,
        height: block.y + block.height - splitAt,
        color: getRandomColor()
      };
      
      // Replace the original block with the two new blocks
      blocks.splice(blockIndex, 1, block1, block2);
    }
  }

  return { blocks, lineWidth, lineColor };
};

const MondrianCanvas: React.FC<MondrianCanvasProps> = ({ 
  className = '', 
  minBlocks = 15,
  maxBlocks = 30
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [grid, setGrid] = useState<any>(null);
  
  // Get container dimensions and generate grid
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        setGrid(generateMondrianGrid(width, height, minBlocks, maxBlocks));
      }
    };
    
    updateDimensions();
    
    // Update when window is resized
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [minBlocks, maxBlocks]);
  
  // Draw the Mondrian grid when the canvas or grid changes
  useEffect(() => {
    if (!canvasRef.current || !grid) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with pixel ratio for high DPI screens
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * pixelRatio;
    canvas.height = dimensions.height * pixelRatio;
    
    // Scale all drawing operations
    ctx.scale(pixelRatio, pixelRatio);
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Draw blocks
    grid.blocks.forEach((block: any) => {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.width, block.height);
    });
    
    // Draw grid lines on top of blocks
    ctx.strokeStyle = grid.lineColor;
    ctx.lineWidth = grid.lineWidth;
    
    grid.blocks.forEach((block: any) => {
      ctx.strokeRect(block.x, block.y, block.width, block.height);
    });
    
  }, [dimensions, grid]);
  
  return (
    <div ref={containerRef} className={`${styles.canvasContainer} ${className}`}>
      <canvas 
        ref={canvasRef} 
        className={styles.mondrianCanvas}
        style={{ width: dimensions.width, height: dimensions.height }}
      />
    </div>
  );
};

export default MondrianCanvas;