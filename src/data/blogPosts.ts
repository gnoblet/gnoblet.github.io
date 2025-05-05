// src/data/blogPosts.ts
import { BlogPost } from "../types/blog";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "post1",
    slug: "20250205_post1_IDidIt",
    title: "I Did It!",
    date: "2025-02-05",
    excerpt: "My journey of accomplishing a major milestone.",
    content: `
      <h1>I Did It!</h1>
      <p>After months of hard work, I finally achieved my goal. In this post, I want to share my journey, the challenges I faced, and what I learned along the way.</p>

      <h2>The Beginning</h2>
      <p>It all started when I decided to challenge myself to learn something new. I set a goal to build a website from scratch using modern web technologies.</p>

      <h2>The Challenges</h2>
      <p>Learning new technologies wasn't easy. I faced many obstacles:</p>
      <ul>
        <li>Understanding complex concepts like state management</li>
        <li>Debugging code that didn't work as expected</li>
        <li>Finding time to practice consistently</li>
      </ul>

      <h2>The Breakthrough</h2>
      <p>The turning point came when I joined an online community of developers who were working on similar projects. Sharing knowledge and getting feedback accelerated my learning.</p>

      <h2>Lessons Learned</h2>
      <ol>
        <li>Consistency is key - small daily progress adds up</li>
        <li>Don't be afraid to ask for help</li>
        <li>Break down large goals into manageable tasks</li>
      </ol>

      <h2>What's Next</h2>
      <p>This is just the beginning of my journey. I'm excited to continue learning and building more complex projects in the future.</p>

      <p>If you're on a similar journey, I'd love to hear about your experiences in the comments below!</p>
    `,
    author: "John Doe",
    tags: ["personal", "achievement"],
    coverImage: "/images/blog/i-did-it.jpg",
  },
];
