export const PostCard = ({ cover, title, content }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  </div>
);
