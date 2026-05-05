import { TaskList } from './components/TaskList';
import './App.css';
import './components/TaskList.css';
import './components/TaskItem.css';

function App() {
  return (
    <main className="app-main">
      <div className="app-background"></div>
      <div className="app-content">
        <header className="app-header">
          <h1>Exploring Poku</h1>
        </header>
        <section className="app-board">
          <TaskList />
        </section>
      </div>
    </main>
  );
}

export default App;
