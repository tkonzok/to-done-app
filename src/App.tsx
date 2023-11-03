import { Task } from "./components/Task";
import { TaskCreate } from "./components/TaskCreate";
import tasks from "./data/apiTasks";

function App() {
  return (
    <div className="max-h-screen flex flex-col">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
      <TaskCreate />
    </div>
  );
}

export default App;
