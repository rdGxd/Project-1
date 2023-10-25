import { PostCard } from "../PostCard/index";

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        title={post.title}
        cover={post.cover}
        content={post.content}
      />
    ))}
  </div>
);
