import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/MondrianCanvas.module.css';

interface MondrianCanvasProps {
  className?: string;
  minBlocks?: number;
  maxBlocks?: number;
}

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface MondrianGrid {
  blocks: Block[];
  lineWidth: number;
  lineColor: string;
}

// Colors for the blocks using theme variables
const PASTEL_COLORS = [
  { value: `rgba(var(--color-accent-rgb), 0.02)`, weight: 3 }, // Very subtle accent
  { value: `rgba(var(--color-accent-rgb), 0.04)`, weight: 2 }, // Light accent
  { value: `rgba(var(--color-primary-rgb), 0.02)`, weight: 2 }, // Very subtle primary
  { value: `rgba(var(--color-primary-rgb), 0.04)`, weight: 1 }, // Light primary
  { value: 'transparent', weight: 15 }, // Empty space (transparent)
];

// Function to get weighted random color
const getRandomColor = (): string => {
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
): Block[] => {
  // Start with a single block covering the entire canvas
  const blocks: Block[] = [
    { x: 0, y: 0, width, height, color: getRandomColor() }
  ];

  // Split blocks randomly to create a Mondrian-style grid
  const targetBlocks = Math.floor(minBlocks + Math.random() * (maxBlocks - minBlocks));
  
  while (blocks.length < targetBlocks) {
    // Pick a random block to split
    const blockIndex = Math.floor(Math.random() * blocks.length);
    const block = blocks[blockIndex];
    
    // Decide whether to split horizontally or vertically
    if (block.width > 20 && block.height > 20) {
      const splitHorizontal = Math.random() > 0.5;
      
      if (splitHorizontal && block.width > 40) {
        // Split horizontally at a random position
        const splitAt = Math.floor(block.width * 0.3 + Math.random() * block.width * 0.4);
        
        // Create two new blocks
        const newBlock1: Block = {
          x: block.x,
          y: block.y,
          width: splitAt,
          height: block.height,
          color: getRandomColor()
        };
        
        const newBlock2: Block = {
          x: block.x + splitAt,
          y: block.y,
          width: block.width - splitAt,
          height: block.height,
          color: getRandomColor()
        };
        
        // Replace the original block with the new blocks
        blocks.splice(blockIndex, 1, newBlock1, newBlock2);
      } 
      else if (!splitHorizontal && block.height > 40) {
        // Split vertically at a random position
        const splitAt = Math.floor(block.height * 0.3 + Math.random() * block.height * 0.4);
        
        // Create two new blocks
        const newBlock1: Block = {
          x: block.x,
          y: block.y,
          width: block.width,
          height: splitAt,
          color: getRandomColor()
        };
        
        const newBlock2: Block = {
          x: block.x,
          y: block.y + splitAt,
          width: block.width,
          height: block.height - splitAt,
          color: getRandomColor()
        };
        
        // Replace the original block with the new blocks
        blocks.splice(blockIndex, 1, newBlock1, newBlock2);
      }
    }
  }
  
  return blocks;
};

const MondrianCanvas: React.FC<MondrianCanvasProps> = ({ 
  className = '', 
  minBlocks = 15,
  maxBlocks = 30
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [grid, setGrid] = useState<MondrianGrid | null>(null);
  
  // Get container dimensions and generate grid
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        const lineWidth = Math.max(0.5, Math.min(0.8, width / 1000));
        const lineColor = 'rgba(138, 169, 244, 0.06)';
        const blocks = generateMondrianGrid(width, height, minBlocks, maxBlocks);
        setGrid({ blocks, lineWidth, lineColor });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [minBlocks, maxBlocks]);
  
  // Draw the Mondrian grid when the canvas or grid changes
  useEffect(() => {
    if (!canvasRef.current || !grid) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match container
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each block
    grid.blocks.forEach(block => {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.width, block.height);
    });
    
    // Draw the grid lines on top
    ctx.strokeStyle = grid.lineColor;
    ctx.lineWidth = grid.lineWidth;
    
    grid.blocks.forEach(block => {
      ctx.strokeRect(block.x, block.y, block.width, block.height);
    });
    
  }, [grid, dimensions]);
  
  return (
    <div 
      ref={containerRef} 
      className={`${styles.canvasContainer} ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className={styles.mondrianCanvas}
        style={{ width: dimensions.width, height: dimensions.height }}
      />
    </div>
  );
};

export default MondrianCanvas;