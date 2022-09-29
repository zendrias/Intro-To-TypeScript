import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date,
};


const list = document.getElementById('list') as HTMLUListElement | null;
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.getElementById('new-task-title') as HTMLInputElement | null;
const tasks: Task[] = loadTasks();

(function renderTasks() { for (let task of tasks) addListItem(task) })();


form?.addEventListener("submit", e => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  addListItem(newTask);

  input.value = "";
});



function addListItem(task: Task): void {
  const item = document.createElement("li") as HTMLLIElement;
  const label = document.createElement("label") as HTMLLabelElement;
  const checkbox = document.createElement("input") as HTMLInputElement;

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox";

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  saveTasks();
};


function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
};


function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  else return JSON.parse(taskJSON);
};