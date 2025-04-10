import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

const API = "https://todo-api-9qd3.onrender.com";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API}/todos`);
        const data = await res.json();

        // Fallback para quando a resposta for um objeto: { todos: [...] }
        const lista = Array.isArray(data) ? data : data.todos || [];
        setTodos(lista);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    await fetch(`${API}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prev) => [...prev, todo]);
    setTitle("");
    setTime("");
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = async (tarefa) => {
    tarefa.done = !tarefa.done;

    const res = await fetch(`${API}/todos/${tarefa.id}`, {
      method: "PUT",
      body: JSON.stringify(tarefa),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updated = await res.json();

    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React Todo</h1>
      </div>

      <div className="form-todo">
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer?</label>
            <input
              type="text"
              name="title"
              placeholder="Título da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="time">Duração da tarefa:</label>
            <input
              type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              required
            />
          </div>

          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>

      <div className="list-todo">
        <h2>Lista de tarefas</h2>
        {todos.length === 0 && <p>Não há tarefas</p>}
        {todos.map((tarefa) => (
          <div className="tarefas" key={tarefa.id}>
            <h3 className={tarefa.done ? "tarefa-done" : ""}>{tarefa.title}</h3>
            <p>Duração: {tarefa.time}</p>
            <div className="actions">
              <span onClick={() => handleEdit(tarefa)}>
                {!tarefa.done ? <BsXCircleFill /> : <BsFillCheckCircleFill />}
              </span>
              <BsTrash onClick={() => handleDelete(tarefa.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
