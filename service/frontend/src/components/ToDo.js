import React from 'react'


const ToDoListItem = ({todos, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todos.project}
            </td>
            <td>
                <button onClick={() => deleteToDo(todos.id)} type='button'>Delete</button>
            </td>
            <td>
                {todos.text}
            </td>
            <td>
                {JSON.stringify(todos.creator)}
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <table>
            <th>
                ProjectName
            </th>
            <th>
                ProjectText
            </th>
            <th>
                ProjectUsers
            </th>
            {todos.map((todos) => <ToDoListItem todos={todos} deleteToDo={deleteToDo}/>)}
        </table>
    )
}

export default ToDoList