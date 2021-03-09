import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import Footer from './components/Footer.js'
import Navibar from './components/Navibar.js'
import axios from "axios"
import {Home} from './Home';
import {Users} from './Users';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': []
       }
   }

    componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/users')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users
                   }
               )
           }).catch(error => console.log(error))
   }

   render () {
       return (
           <>
            <Router>
            <Navibar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />
            </Switch>
            </Router>
            <div>
               <UserList users={this.state.users} />
            </div>
            <Footer />
           </>
       )
   }
}

export default App;