import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem.react'
import TodoActions from '../actions/TodoActions'

class MainSection extends Component{
  _onToggleCompleteAll() {
    TodoActions.toggleCompleteAll()
  }

  render(){
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }
    
    const allTodos = this.props.allTodos
    const todos =  []

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={() => this._onToggleCompleteAll()}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    )
  }
}

export default MainSection
