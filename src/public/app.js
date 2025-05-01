const apiUrl = 'http://localhost:3000/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

async function fetchTodos() {
  const res = await fetch(apiUrl);
  const todos = await res.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.Completed ? 'completed' : '';
    li.textContent = todo.Title;

    const btn = document.createElement('button');
    btn.textContent = '✖';
    btn.onclick = () => deleteTodo(todo.Id);

    li.onclick = () => toggleTodo(todo.Id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  input.value = '';
  fetchTodos();
};

async function toggleTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'PATCH' });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

fetchTodos();
