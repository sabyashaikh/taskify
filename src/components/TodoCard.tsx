import React, {useEffect, useRef, useState} from "react";
import "./styles.css";
import {Todo} from "../model";
import {AiFillEdit, AiFillDelete } from "react-icons/ai"
import {MdDone} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";

type Props = {
    index: number
    todo: Todo
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard = ({index, todo, todos, setTodos}: Props)=> {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone=(todoId: number)=>{
        setTodos(todos.map((todo)=>
         todo.id===todoId?{...todo, isDone:!todo.isDone}: todo
        ))
    }

    const handleDelete=(todoId: number)=>{
        setTodos(todos.filter((todo)=> todo.id===todoId))
    }

    const handleEdit=(event:React.FormEvent,  todoId: number)=>{
        event.preventDefault()
        setTodos(todos.map((todo)=>
         todo.id===todoId?{...todo, todo:editTodo}: todo
        ))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        inputRef.current?.focus()
    },[edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided,snapshot)=>(
                <form
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`todos__single ${snapshot.isDragging?'drag':''}`}
                    onSubmit={(event)=> handleEdit(event, todo.id)}
                >
                    {edit ? (
                        <input ref={inputRef}
                               className="todos__single--text"
                               value={editTodo}
                               onChange={(event)=> setEditTodo(event.target.value)}
                        />
                    ): (
                        todo.isDone? (
                            <s className="todos__single--text">{todo.todo}</s>
                        ) : (
                            <span className="todos__single--text">{todo.todo}</span>
                        )
                     )
                    }
                    <div>
                        <span className="icon" onClick={()=>{
                            if(!edit && !todo.isDone){
                                setEdit(!edit)
                            }
                        }}>
                            <AiFillEdit/>
                        </span>
                        <span className="icon" onClick={()=>handleDelete(todo.id)}>
                            <AiFillDelete/>
                        </span>
                        <span className="icon" onClick={()=>handleDone(todo.id)}>
                            <MdDone/>
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default TodoCard