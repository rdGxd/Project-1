import P from "prop-types";
import { PostCard } from "../PostCard/index";
import "./styles.css";

export const Posts = ({ posts = [] }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} cover={post.cover} body={post.body} />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      cover: P.string.isRequired,
      title: P.string.isRequired,
      body: P.string.isRequired,
    }),
  ),
};
