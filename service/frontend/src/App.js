import React from "react";
import './App.css';
import UserList from './components/User.js'
import Footer from './components/Footer.js'
import Navibar from './components/Navibar.js'
import {ProjectList} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': []
       }
   }

    componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/users')
           .then(response => {
                this.setState({users: response.data.results})
           }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/projects')
       .then(response => {
            this.setState({projects: response.data.results})
       }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/todos')
       .then(response => {
            this.setState({todos: response.data.results})
       }).catch(error => console.log(error))
   }

   render () {
       return (
            <Router>
                <header>
                    <Navibar />
                </header>
                <main>
                    <div>
                        <Switch>
                            <Route exact path='/'>
                                <UserList users={this.state.users} />
                            </Route>
                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects} />
                            </Route>
                            <Route exact path='/todos'>
                                <ToDoList items={this.state.todos} />
                            </Route>
                        </Switch>
                    </div>
                </main>
                <Footer />
            </Router>
       )
   }
}

export default App;