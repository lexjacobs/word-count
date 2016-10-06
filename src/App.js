import React from 'react';
import './App.css';
var axios = require('axios');
// import {Input} from 'react-bootstrap';
// import wordCounter from './wordCounter.js';
// var finnegan = require('./sources/finnegan.txt');
// const count = wordCounter(finnegan);

const App = React.createClass({
  handleSubmit(e) {
    this.setState({fulltext: 'loading'});
    e.preventDefault();
    axios.post('https://text-counter-server.herokuapp.com/count', this.state)
      .then((data) => {
        this.setState({'distribution': data.data.letterDistribution});
      });
  },
  getInitialState() {
    return {fileSelected: 'none', fulltext: 'the quick brown fox jumps over the lazy dog', distribution: null}
  },
  handleChange(e) {
    var context = this;
    var file = e.target.files[0];
    this.setState({'fileSelected': file})
    var reader = new FileReader();
    reader.onload = (function(e) {
      return function(e) {
        context.setState({'fulltext': e.target.result})
      };
    })(file);
    reader.readAsText(file);
  },
  render() {
    return (
      <form encType={'multipart/form-data'} onSubmit={this.handleSubmit}>
        <input onChange={(e) => this.handleChange(e)} type="file"></input>
        <button type="submit">submit</button>
        <div>
          file selected: {this.state.fileSelected.name}
          <br/>
          file type: {this.state.fileSelected.type}
          <br/>
          distribution: {JSON.stringify(this.state.distribution)}
          <br/>
          {this.state.fulltext}
        </div>
      </form>

    );
  }
})

export default App;
