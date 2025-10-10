import './Widget.css';

function Widget({ title }: { title: string }) {
  return (
    <div className="widget">
      <h3>{title}</h3>
      <p>Content goes here...</p>
    </div>
  );
}

export default Widget;
