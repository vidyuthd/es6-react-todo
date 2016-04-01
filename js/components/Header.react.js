import React,{ Component } from 'react'
import TodoActions from '../actions/TodoActions'
import TodoTextInput from './TodoTextInput.react'

class Header extends Component{
  render(){
    return (
      <header id="header">
        <h1> todos </h1>
        <TodoTextInput
          id="new-todo"
          placeholder=" What needs to be done? "
          onSave = {(text) => this.onSave(text)}
          value = ""
        />
        </header>
    )
  }

  onSave(text){
    if(text.trim()){
      TodoActions.create(text)
    }
  }
}

export default Header
