import React from 'react'
import {
  Link,
  useParams
} from "react-router-dom";


const ProjectListItem = ({item}) => {
    let link_to = `/project/${item.id}`
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.text}</td>
        </tr>
    )
}

const ProjectList = ({items}) => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Text</th>
                <th></th>
            </tr>
            {items.map((item) => <ProjectListItem item={item} />)}
        </table>
    )
}

export {ProjectList}