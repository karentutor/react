import React, { Component } from 'react';
import auth from './services/authService';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ContactForm from './components/forms/contactForm';
import Portfolio from './components/portfolio';
import ProtectedRoute from './components/common/protectedRoute';
import RegisterForm from './components/forms/registerForm';
import Entries from './components/entries';
import NotFound from './components/notFound';
import LoginForm from './components/forms/loginForm';
import Logout from './components/logout';
import Resume from './components/resume';
import NavBar from './components/navBar';
import Home from './components/home';
import Footer from './components/footer';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {

    const { user } = this.state;

    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/contact" component={ContactForm} />
          <Route path="/users" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/entries" component={Entries} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
             
      </>
    );
  }
}
export default App;
