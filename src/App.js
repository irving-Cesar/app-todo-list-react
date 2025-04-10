import './App.css';

import { useState, useEffect } from 'react'
import { BsTrash, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar as tarefas quando der load na page
  useEffect(() => {

    const loadData = async() =>{

      setLoading(true); // 'carregando'

      const res = await fetch(API + "/todos")
        .then((res) => res.json()) // obtendo resposta e transformando em json
        .then((data) => data) // recebendo dados 'res' e adicionando na lista
        .catch((err) => console.log(err)); // retorna se tiver algum erro

      setLoading(false);

      setTodos(res) // Recebendo valores da list
    }

    loadData(); // rodar GET api
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    //Enviando para a API
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => [...prevState, todo]); // Setando tarefas na div sem precisar atualizar a page
    
    setTitle("");
    setTime("");
  }

  const handleDelete = async(id) => {
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });

    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  const handleEdit = async(tarefa) => {
    tarefa.done = !tarefa.done;

    const data = await fetch(API + "/todos/" + tarefa.id, { // Receber valores do DB
      method: "PUT",
      body: JSON.stringify(tarefa),
      headers: {
        "Content-Type": "application/json", 
      },
    });

    setTodos((prevState) => prevState.map((t) => (t.id === data.id ? t = data : t))); 
  }

  if (loading) {
    return <p>Carregando...</p>
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
              value={title || ""}
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
              value={time || ""}
              required
            />
          </div>

          <input type="submit" value="Criar Tarefa"></input>
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
          ))
        }
      </div>
    </div>
  );
}

export default App;
