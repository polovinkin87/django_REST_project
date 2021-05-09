import React from 'react'
import {
  BrowserRouter, Route, Link, Switch
} from "react-router-dom";


const ProjectListItem = ({projects, deleteProject}) => {
    return (
        <tr>
            <td>
                {projects.name}
            </td>
            <td>
                <button onClick={() => deleteProject(projects.id)} type='button'>Delete</button>
            </td>
            <td>
                {projects.text}
            </td>
            <td>
                {JSON.stringify(projects.users)}
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
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
                {projects.map((projects) => <ProjectListItem projects={projects} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/project/create'>Create</Link>
        </div>
    )
}

export default ProjectList