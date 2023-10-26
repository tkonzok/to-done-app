import { Task } from "./components/Task";
import { tasks } from "./data/tasks";

function App() {
  return (
    <div className="max-h-screen flex flex-col">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
}

export default App;
