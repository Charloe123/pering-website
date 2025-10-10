export interface PostType {
    _id: string;
    title: string;
    description: string;
    ImageUrl: string;
    createdAt: string;
  }

  export interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }

export default function EditBlogPage() {
  return (
    <div>
      <h1>Edit Blog</h1>
      <p>Edit blog functionality to be implemented.</p>
    </div>
  );
}