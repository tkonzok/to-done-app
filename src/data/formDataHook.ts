type TaskProps = {
  title: string;
  area: string;
  interval: number;
};

export async function createTask(data: TaskProps) {
  const url = "https://to-done-app-backend.fly.dev/api/add-task";
  try {
    const response = await fetch(url, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success", result);
  } catch (error) {
    console.log(error);
  }
}
