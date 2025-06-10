/// <reference types="vite/client" />

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.md" {
  const content: string;
  export default content;
}
