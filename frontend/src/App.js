import React, { Component } from 'react';
import './App.css';
import Api from './services/Api';

const API_TICKER_ENDPOINT = 'http://178.128.245.253';

class App extends Component {
  state = {
    data: null
  };

  constructor() {
    super();
    this.timeout = null;
    this.ms = 3000;
  }

  componentDidMount() {
    Api.fetchDataFromEndpoint(API_TICKER_ENDPOINT).then(data => {
      console.log(data);
      this.setState({
        data: data
      }, () => {
        console.log(this.state.data)
      });
    });

    this.timeout = setTimeout(() => {
      this.prepareAndAppendData((data) => {
        this.setState({
          data: data,
        })
      })
    }, this.ms);
  }

  prepareAndAppendData(callback) {
    Api.fetchDataFromEndpoint(API_TICKER_ENDPOINT).then(data => {
      callback(data);
    });
  }

  componentWillUnmount() {
    this.setState({data: null});
    this.timeout = null;
  }

  render() {
    const data = this.state.data;

    console.log(data);

    return (
      <div>
        <h1>Kraken proxy server!</h1>
        {data === null ? <p>loading...</p> : (<div>{this.state.data.pair}</div>)}
        {data !== null && (<div>{this.state.data.asks.map((item) => {
          return <div>{item}</div>;
        })}</div>)}
      </div>
    );
  }
}

export default App;
