import {useState, useEffect} from "react"
import React from "react"
import style from "../pages/style.css"
import {BsTrash, BsBookmarkCheck, BsFillBookmarkCheckFill} from "react-icons/bs"

function TodoPage(){
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [todo, setTodo] =  useState([])
    const [loading, setLoading] = useState(false)

    function handleSubmit (e){
        e.preventDefault()

        const todoList = {id: new Date().getTime(), title, time, done: false}


        //por algum motivo, a build the produção estava setando o todo como null, então esse if tratou desse problema
        if(todo !== null){
            setTodo([...todo, todoList])
            localStorage.setItem("todos",JSON.stringify([...todo, todoList]));
        }else{
            setTodo([todoList])
            localStorage.setItem("todos",JSON.stringify([todoList]));
        }
 
        console.log(localStorage)
        console.log(todoList)
    
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

    useEffect(()=>{
        setLoading(true)
        const stored = JSON.parse(localStorage.getItem("todos"));
        setTodo(stored);
        setLoading(false)
    },[])

    
    if (loading){
        return(<p>carregando componentes</p>)
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
                {todo !== null ? todo.map((todos) => (
                    <div className="todosRender" key={todos.id}>
                        <p className={todos.done ? "todoDone" : ""}>Tarefa: {todos.title}</p>
                        <p className={todos.done ? "todoDone" : ""}>{todos.time} de duração</p>

                        <div className="actions">
                            <span onClick={()=> handleDone(todos)}>{!todos.done ? <BsBookmarkCheck/> : <BsFillBookmarkCheckFill/>}</span>
                            <BsTrash className="trash"  onClick={() => handleDelete(todos.id)}/>
                        </div>
                    </div>
                   
                )): "Esperando tarefas..."}

            </div>
    </section>
        
    )
}


export default TodoPage
