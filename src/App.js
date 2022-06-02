import './App.css';

import { useState, useEffect } from 'react'
import { BsTrash, BsBookMarkCheck, BsBookMarkCheckFill } from 'react-icons/bs'

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviou!")
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
            <input type="text" name="title" placeholder="Título da tarefa" />
          </div>
          <input type="submit" value="enviar"></input>
        </form>
        <p>Formulário</p>
      </div>

      <div className="list-todo">
        <h2>Lista de tarefas</h2>
        {todos.length === 0 && <p>Não há tarefas</p>}
      </div>
    </div>
  );
}

export default App;
