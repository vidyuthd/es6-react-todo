import React, { Component } from 'react'
import TodoActions from '../actions/TodoActions'
import TodoTextInput from './TodoTextInput.react'
import classNames from 'classnames'

class TodoItem extends Component{
  constructor(){
      super()
      this.state = {
        isEditing : false
      }
  }

  _onSave(text){
    TodoActions.update(this.props.todo.id,text)
    this.setState({
      isEditing : false
    })
  }

  _onToggleComplete(){
    TodoActions.toggleComplete(this.props.todo)
  }

  _onDoubleClick(){
    this.setState({
      isEditing : true
    })
  }

  _onDestroyClick(){
    TodoActions.destroy(this.props.todo.id)
  }

  render(){
    const todo = this.props.todo

    let input
    if(this.state.isEditing){
      input = <TodoTextInput
              className="edit"
              onSave={(value) => this._onSave(value)}
              value={todo.text}
              />
    }
    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={() => this._onToggleComplete()}
          />
          <label onDoubleClick={() => this._onDoubleClick()}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => this._onDestroyClick()} />
        </div>
        {input}
      </li>
    )
  }
}

export default TodoItem
