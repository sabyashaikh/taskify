import React, {useState} from 'react';
import "./App.css"
import InputField from "./components/InputField";
import {Todo} from "./model";
import TodoList from "./components/TodoList";
import {DragDropContext, DropResult} from "react-beautiful-dnd"

const App:React.FC =  ()=> {
    const [todo, setTodo] = useState<string>("")
    const [uniqueIndex, setUniqueIndex] = useState<number>(0)
    const [todos, setTodos] = useState<Todo[]>([])
    const [priorityTodos, setPriorityTodos] = useState<Todo[]>([])

    const handleAdd =(event: React.FormEvent)=>{
        event.preventDefault()
        if (todo){
            setTodos([...todos,{id:Date.now(), todo, isDone:false}])
            setTodo("")
        }
     }
    const onDragEnd=(results: DropResult)=>{
        const {source, destination} = results
        if(!destination) return
        if(destination.droppableId===source.droppableId && destination.index===source.index) return

        let add,
            active= todos,
            priority=priorityTodos

        if(source.droppableId==="TodoList"){
            add=active[source.index]
            active.splice(source.index, 1)
        }else{
            add=priority[source.index]
            priority.splice(source.index, 1)
        }
        if(destination.droppableId==="TodoList"){
            active.splice(destination.index, 0, add)
        }else{
            priority.splice(destination.index, 0, add)
        }
        setPriorityTodos(priority)
        setTodos(active)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Taskify</span>
                <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    priorityTodos={priorityTodos}
                    setPriorityTodos={setPriorityTodos}
                ></TodoList>
            </div>
        </DragDropContext>
    );
}

export default App;
