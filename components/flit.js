import Image from "next/image";

export default ({ content, user, timestamp }) => {
  timestamp = new Date(timestamp).toDateString(undefined, {
    year: 'numeric',
    month: 'short',
    date: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
  return (
    <div className="border border-l-0 p-5 flit">

      <div className="post-info">
        <span className="post-user">{user}</span>
        <span> · </span>
        <span className="post-timestamp">{timestamp.toString()}</span>
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
};

