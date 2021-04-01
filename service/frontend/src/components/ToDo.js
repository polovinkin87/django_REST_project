import React from 'react'


const ToDoListItem = ({item}) => {
    return (
        <tr>
            <td>{item.text}</td>
            <td>{item.create_at}</td>
            <td>{item.project}</td>
            <td>{item.creator}</td>
        </tr>
    )
}

const ToDoList = ({items}) => {
    return (
        <table>
            <tr>
                <th>Text</th>
                <th>Create_at</th>
                <th>Project</th>
                <th>Creator</th>
            </tr>
            {items.map((item) => <ToDoListItem item={item} />)}
        </table>
    )
}

export default ToDoList