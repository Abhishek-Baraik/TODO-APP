import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)  

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
     setShowFinished(!showFinished) 
    }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    console.log(id);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="md:container bg-slate-300 rounded-xl my-5 md:mx-auto min-h-[85vh] p-5 md:w-10/12">
        <h2 className='font-bold my-2 text-center text-3xl'>Add a Todo</h2>
        <div className="addTodo flex gap-4 my-4 justify-center">
          <input onChange={handleChange} value={todo} type="text" className='w-1/2 rounded-sm' />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-700 py-1 p-2 text-white rounded-md hover:bg-violet-950 '>Add</button>
        </div>
        <div className='flex justify-center gap-2 items-center w-[45vw]'><input className='size-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished</div>
        <div className="todos flex flex-col items-center">
          <h2 className='font-bold my-5 text-2xl'>Your Todos</h2>
          {todos.length == 0 && <div className='text-slate-600 text-xl'>No Todos to Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-3 justify-between md:w-1/2 my-2">
              <div className='flex gap-4 items-center'>
                <input type="checkbox" className='size-4' onChange={handleCheckBox} checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
              </div>
              <div className="buttons flex gap-2">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-700 py-1 p-2 text-white rounded-md hover:bg-violet-950 '><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 py-1 p-2 text-white rounded-md hover:bg-violet-950 '><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
