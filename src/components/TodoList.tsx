import React from "react";
import "./styles.css";
import {Todo} from "../model";
import TodoCard from "./TodoCard";
import {Droppable} from "react-beautiful-dnd";


interface Props {
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>;
    priorityTodos: Todo[]
    setPriorityTodos:  React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<Props> = ({todos, setTodos, priorityTodos, setPriorityTodos})=> {
    return (
        <div className="container">
            <Droppable droppableId="TodoList">
                {(provided, snapshot)=>(
                    <div className={`todos ${snapshot.isDraggingOver?'dragactive':''}`}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        <span className="todos__heading"> Active Tasks</span>
                        { todos.map((todo, index)=>(
                            <TodoCard
                                index={index}
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
            <Droppable droppableId="PriorityList">
                {(provided, snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver?'dragcomplete':''}`}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        <span className="todos__heading"> Priority Tasks</span>
                        {priorityTodos.map((todo, index) => (
                            <TodoCard
                                index={index}
                                key={todo.id}
                                todo={todo}
                                todos={priorityTodos}
                                setTodos={setPriorityTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>)
                }
            </Droppable>
        </div>
    )
}

export default TodoList