/* global require */
import React from 'react';
import './App.css';
var axios = require('axios');
// import {Input} from 'react-bootstrap';
// import wordCounter from './wordCounter.js';
// var finnegan = require('./sources/finnegan.txt');
// const count = wordCounter(finnegan);
import {Table} from 'reactable';

const App = React.createClass({
  handleSubmit(e) {
    this.setState({loading: true, distribution: []});
    e.preventDefault();
    axios.post('https://text-counter-server.herokuapp.com/count', {fulltext: this.state.fulltext}).then((data) => {
      this.setState({
        distribution: this.prepareDistribution(data.data.letterDistribution),
        loading: false
      });
    }).catch((err) => {
      console.error(err);
      this.setState({loading: false});
    });
  },
  getInitialState() {
    return {ditsribution: [], loading: false, fileSelected: '', fulltext: ''};
  },
  handleChange(e) {
    var context = this;
    var file = e.target.files[0];
    this.setState({'fileSelected': file});
    var reader = new FileReader();
    reader.onload = (function() {
      return function(e) {
        context.setState({'fulltext': e.target.result});
      };
    })(file);
    reader.readAsText(file);
  },
  prepareDistribution(data) {
    var result = [];
    for (var letter in data) {
      if (data.hasOwnProperty(letter)) {
        result.push({letter: JSON.stringify(letter), frequency: data[letter]});
      }
    }
    return result;
  },
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={(e) => this.handleChange(e)} type="file"></input>
          <button type="submit">submit</button>
          <div>
            file selected: {this.state.fileSelected.name}
            <br/>
            file type: {this.state.fileSelected.type}
            <br/>
            file contents (truncated): {this.state.fulltext.substring(0, 50)}
            ...
            <br/> {this.state.loading === true
              ? 'LOADING'
              : ''}
          </div>
        </form>

        <br/>
        <br/> {this.state.distribution
          ? 'click column headings to sort'
          : ''}
        <br/>

        <Table className="table" data={this.state.distribution} itemsPerPage={140} pageButtonLimit={10} sortable={true}/>

      </div>
    );
  }
});

export default App;
