export const PostCard = ({ cover, title, content }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  </div>
);
