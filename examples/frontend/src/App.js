import React from "react"
import './App.css'
import  {UserList, UserList2} from './components/User.js'
import Footer from './components/Footer.js'
import Navibar from './components/Navibar.js'
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import ProjectForm from './components/ProjectForm'


const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': [],
           'token': ''
       }
   }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

    get_headers() {
        let headers = {
          'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
       const headers = this.get_headers()
       axios.get('http://127.0.0.1:8000/api/users/', {headers})
           .then(response => {
                this.setState({users: response.data.results})
           }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/projects/', {headers})
       .then(response => {
            this.setState({projects: response.data.results})
       }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/todos/', {headers})
       .then(response => {
            this.setState({todos: response.data.results})
       }).catch(error => console.log(error))
   }

   deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
        .then(response => {
            this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
        }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers, headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(name, text, users) {
        const headers = this.get_headers()
        const data = {name: name, text: text, users: users}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_project = response.data
                const project = this.state.projects.filter((item) => item.id === new_project.project)[0]
                new_project.project = project
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

   componentDidMount() {
        this.get_token_from_storage()
   }

   render () {
       return (
            <Router>
                <header>
                    <nav>
                      <ul>
                        <li>
                          <Link to='/'>User</Link>
                        </li>
                        <li>
                          <Link to='/projects'>Project</Link>
                        </li>
                        <li>
                            <Link to='/project/create'>Create project</Link>
                        </li>
                        <li>
                          <Link to='/todos'>ToDo</Link>
                        </li>
                        <li>
                            {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                      </ul>
                    </nav>
                </header>
                <main>
                    <div>
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                         deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}
                                                                                 deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                            <Route path='/users/:id' component={() => <UserList2 users={this.state.users}/>}/>
                            <Route exact path='/project/create' component={() => <ProjectForm users={this.state.users}
                                                                                              createProject={(name, text, users) => this.createProject(name, text, users)}/>}/>
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
                                this.get_token(username, password)} />} />
                            <Route component={NotFound404} />
                        </Switch>
                    </div>
                </main>
                <Footer />
            </Router>
       )
   }
}

export default App;