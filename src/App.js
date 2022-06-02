import './App.css';

import { useState, useEffect } from 'react'
import { BsTrash, BsBookMarkCheck, BsBookMarkCheckFill } from 'react-icons/bs'

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
        .then((data) => data) // recebendo dados 'res' e add na lista
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
    
    setTitle("");
    setTime("");
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

          <input type="submit" value="enviar"></input>
        </form>
      </div>
    
      <div className="list-todo">
        <h2>Lista de tarefas</h2>
        {todos.length === 0 && <p style={{textAlign: "center"}}>Não há tarefas</p>}
        {/*Mostrando tarefas criadas*/}
        {useEffect(() => {
          todos.map((tarefa) => tarefa.title)
        })}
      </div>
    </div>
  );
}

export default App;
