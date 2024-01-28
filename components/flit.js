import Image from "next/image";
function Flit({ content, user, timestamp }) {
  // Convert to UCT so that js Date does not assume it is EST, + 1900 because getYear returns 1900 as 0
  timestamp = new Date(Date.UTC(timestamp.getYear() + 1900, timestamp.getMonth(), timestamp.getDay(), timestamp.getHours(), timestamp.getMinutes(), timestamp.getSeconds()));
  // Format to EST
  timestamp = timestamp.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  return (
    <div className="border border-l-0 p-5 flit">

      <div className="post-info">
        <span className="post-user">{user}</span>
        <span> · </span>
        <span className="post-timestamp">{timestamp}</span>
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
};

export default Flit;
