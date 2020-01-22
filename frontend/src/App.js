import React, { Component } from 'react';
import './App.css';
import Api from './services/Api';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    Api.fetchDataFromEndpoint('http://178.128.245.253').then(data => {
      this.setState({
        data: data
      }, () => {
        console.log(this.state.data)
      });
    });
  }

  componentWillUnmount() {
    this.setState({data: null});
  }

  render() {
    const data = this.state.data;
    const list = this.state.data.asks.map((item) => {
      return (<li>item</li>);
    });

    return (
      <div>
        <h1>Hello world!</h1>
        {data === null ? <p>loading...</p> : (<div>{this.state.data.pair}</div>)}
        {data !== null && list}
      </div>
    );
  }
}

export default App;
