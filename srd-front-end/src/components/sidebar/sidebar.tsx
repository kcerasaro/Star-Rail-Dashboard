import './Sidebar.css';
import Widget from '../widget/widget';
import PlayerWidget from '../playerWidget/playerWidget';

function Sidebar() {
  return (
    <aside className="sidebar">
        <PlayerWidget/>
      <nav className="sidebar-nav">
      </nav>
    </aside>
  );
}

export default Sidebar;
