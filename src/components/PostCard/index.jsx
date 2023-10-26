import "./styles.css";

export const PostCard = ({ cover, title, content }) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};
