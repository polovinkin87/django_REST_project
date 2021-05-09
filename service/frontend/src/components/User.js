import React from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UserItem = ({user}) => {
   return (
       <tr>
           <td>
               {user.user_name}
           </td>
           <td>
               {user.first_name}
           </td>
           <td>
               {user.last_name}
           </td>
       </tr>
   )
}

const UserList = ({users}) => {
   return (
       <table>
           <tr>
                   <th>
                       User name
                   </th>
                   <th>
                       First name
                   </th>
                   <th>
                       Last Name
                   </th>
           </tr>
          {users.map((user) => <UserItem user={user} />)}
       </table>
   )
}

const UserList2 = ({users}) => {
    let { id } = useParams();
    let filtered_items = users.filter((item) => item.id == id)
   return (
       <table>
           <th>
               ID
           </th>
           <th>
               First name
           </th>
           <th>
               Last Name
           </th>
           <th>
               Email
           </th>
           {filtered_items.map((users) => <UserItem users={users} />)}
       </table>
   )
}


export {UserList, UserList2}