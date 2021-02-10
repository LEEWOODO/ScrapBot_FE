import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
// react router import 
import { Switch, Route } from 'react-router-dom';

// Import pages
import Home from './components/pages/Home';

import Contacts from './components/pages/Contacts';
import Details from './components/pages/Details';
import NotFoundPage from './components/pages/NotFoundPage';
import Keywords from './components/pages/Keywords';
import News from './components/pages/News';
import NewsSelect from './components/pages/NewsSelect.jsx';
import login from './components/apis/ouath/login';


// 자동정렬 : 시프트 + 옵션 + F

class App extends Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);

    // Quiz 자체에 state를 할당하고, items에 기본값을 줍니다.
    this.state = {
      isLogin: false,
      email: "",
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/news" exact component={News} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/details" component={Details} />
          <Route path="/keywords" component={Keywords} />
          <Route path='/news-config' component={NewsSelect} />
          <Route component={login} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
