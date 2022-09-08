import {useState, useEffect} from "react"
import React from "react"
import style from "../pages/style.css"
import {BsTrash, BsBookmarkCheck, BsFillBookmarkCheckFill} from "react-icons/bs"

function TodoPage(){
    const [title, setTitle] = useState([])
    const [time, setTime] = useState([])
    const [todo, setTodo] =  useState([])

    
    useEffect(()=>{
        const stored = JSON.parse(localStorage.getItem("todos"));
        setTodo(stored);
    },[])

    function handleSubmit (e){
        e.preventDefault()

        const todoList = {id: new Date().getTime(), title: title, time: time, done: false}
        setTodo([...todo].concat(todoList))
        localStorage.setItem("todos",JSON.stringify([...todo].concat(todoList)));
    
        setTime("")
        setTitle("")
    }
    
    function handleDelete(id){
        const deleteTodos = [...todo].filter((todo)=> todo.id !== id)
        setTodo(deleteTodos)
        localStorage.setItem("todos", JSON.stringify(deleteTodos))
        
    }

    function handleDone(todo){
        todo.done = !todo.done;
        const data =  {id: 14}
        setTodo((prevState)=> prevState.map((t)=> (t.id === data.id ? (t = data) : t)));
    }


    return(
        <section>
        <h2>Todo-List</h2>
        <form onSubmit={handleSubmit}>
            <div className="tasks">
                <span>Tarefa: </span>
                <input required name="task" type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
            </div>

            <div className="time">
                <label htmlFor="time">Duração da tarefa: </label>
                <input required name="time" type="text" value={time} onChange={(e) => {setTime(e.target.value)}}/>
            </div>

            <div  className="inputSubmit">
                <input type="submit"/>
            </div>
        </form>
        <div className="tasksContainer">
                <h3>Sua Lista de tarefas:</h3>
                {Array.from(todo).map((todos) => (
                    <div className="todosRender" key={todos.id}>
                        <p className={todos.done ? "todoDone" : ""}>Tarefa: {todos.title}</p>
                        <p className={todos.done ? "todoDone" : ""}>Você tem: {todos.time} de duração</p>

                        <div className="actions">
                            <span onClick={()=> handleDone(todos)}>{!todos.done ? <BsBookmarkCheck/> : <BsFillBookmarkCheckFill/>}</span>
                            <BsTrash className="trash"  onClick={() => handleDelete(todos.id)}/>
                        </div>
                    </div>
                   
                ))}

            </div>
    </section>
        
    )
}


export default TodoPage
