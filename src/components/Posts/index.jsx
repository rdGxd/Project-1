import { PostCard } from "../PostCard/index";
import "./styles.css";

export const Posts = ({ posts }) => {
  return (
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
};
