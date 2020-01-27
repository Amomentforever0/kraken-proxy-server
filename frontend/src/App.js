import React, { Component } from 'react';
import './App.css';
import Api from './services/Api';

const API_TICKER_ENDPOINT = 'http://178.128.245.253';

class App extends Component {
  state = {
    data: null,
  };

  constructor() {
    super();
    this.timeout = null;
    this.ms = 3000;
  }

  componentDidMount = () => {
    Api.fetchDataFromEndpoint(API_TICKER_ENDPOINT).then(data => {
      this.setState({
        data: data,
        updatesCount: 0
      }, () => {
        console.log("component was mounted");
      });
    });

    this.timeout = setInterval(() => {
      this.prepareAndAppendData(this.makeAnUpdate());
    }, this.ms);
  }

  makeAnUpdate = (data) => {
    this.setState({
      data: data
    }, () => {
      console.log(this.state.data)
    });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  prepareAndAppendData(callback) {
    Api.fetchDataFromEndpoint(API_TICKER_ENDPOINT).then(data => {
      callback(data);
    });

    this.setState({
      updatesCount: this.state.updatesCount++,
    })
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
        {data !== null && (<div>{this.state.data.asks.map((item, index) => {
          return <div key={index}>&#x2B06;{item}</div>;
        })}</div>)}
      </div>
    );
  }
}

export default App;
