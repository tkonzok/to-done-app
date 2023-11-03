async function fetchTasks() {
  const url = "https://to-done-app-backend.fly.dev/api/get-tasks";
  try {
    const response = await fetch(url, { mode: "cors" });
    const allTasks = await response.json();
    return allTasks;
  } catch (error) {
    console.log(error);
  }
}

type TaskProps = {
  id: string;
  title: string;
  area: string;
  interval: number;
  selected: boolean;
  lastDone: Date | string;
};

const tasks = [];
const data = await fetchTasks();
for (const entry of data) {
  const task: TaskProps = entry;
  task.lastDone = new Date(task.lastDone.split("T")[0]);
  tasks.push(task);
}

export default tasks;
