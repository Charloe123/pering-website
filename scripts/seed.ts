import { connectDB } from "../lib/mongodb";
import Blog from "../models/Blog";

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Update existing blogs to have correct types for likes, dislikes, and comments
    const blogs = await Blog.find({});
    let updatedCount = 0;
    for (const blog of blogs) {
      let modified = false;
      if (!Array.isArray(blog.likes)) {
        blog.likes = [];
        modified = true;
      }
      if (!Array.isArray(blog.dislikes)) {
        blog.dislikes = [];
        modified = true;
      }
      if (!Array.isArray(blog.comments)) {
        blog.comments = [];
        modified = true;
      } else {
        // Update old comment format and ensure valid content and author
        blog.comments = blog.comments.map((c: { text?: string; author?: string | object; content?: string; createdAt?: Date }) => {
          let newC = { ...c };
          if (c.text && !c.author) {
            modified = true;
            newC = {
              author: "Anonymous",
              content: c.text || "No content",
              createdAt: c.createdAt || new Date(),
            };
          } else {
            if (!c.author || typeof c.author !== 'string') {
              modified = true;
              newC.author = "Anonymous";
            }
            if (!c.content || c.content === null) {
              modified = true;
              newC.content = "No content";
            }
            if (!c.createdAt) {
              modified = true;
              newC.createdAt = new Date();
            }
          }
          return newC;
        });
      }
      if (modified) {
        await blog.save();
        updatedCount++;
      }
    }
    console.log(`Updated ${updatedCount} existing blogs`);

    // No sample blogs to insert, only update existing

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
