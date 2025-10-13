
import Sidebar from './components/sidebar/sidebar';
import Widget from './components/widget/widget';
import './App.css';

function App() {

  return (
    <div className="app-container">
      <Sidebar/>
      <main className="main-area">
        <h1>Star Rail Dashboard</h1>
        <div className="widget-grid">
          <Widget title="Warp Tracker" />
          <Widget title="Pity Tracker" />
          <Widget title="End Game Tracker" />
          <Widget title="To-Do List" />
          <Widget title="Run Showcase" />
        </div>
      </main>
    </div>
  );
}

export default App;
