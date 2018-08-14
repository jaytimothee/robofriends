import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import {setSearchField, requestRobots} from '../action';

const mapStateToProps = state => {
  return {searchField: state.searchRobots.searchField, robots: state.requestRobots.robots, isPending: state.requestRobots.isPending, error: state.requestRobots.error}
}

const mapDispatchToProps = (dispatch) => {
  return {
    searching: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({robots: users}))
  }

  render() {
    const {robots} = this.state;
    const {searchField, searching} = this.props;
    const filterBots = robots.filter(bot => {
      return bot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    return !robots.length
      ? <h1>Loading Bots</h1>
      : (<div className="tc">
        <h1 className="f2">Robo Friends</h1>
        <SearchBox search={searching}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filterBots}/>
          </ErrorBoundary>
        </Scroll>
      </div>);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
