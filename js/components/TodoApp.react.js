import React, { Component } from 'react'
import Header from './Header.react'
import MainSection from './MainSection.react'
import Footer from './Footer.react'
import TodoStore from '../stores/TodoStore'

function getTodoState(){
  return {
    allTodos : TodoStore.getAllTodos(),
    areAllComplete : TodoStore.areAllComplete()
  }
}

class TodoApp extends Component{
  constructor(){
    super()
    this.state = getTodoState()
  }

  componentDidMount(){
    TodoStore.addChangeListener(this._onChange.bind(this))
  }

  componentWillUnmount(){
    TodoStore.removeChangeListener(this._onChange.bind(this))
  }

  _onChange(){
    this.setState(getTodoState())
  }

  render (){
    return (
      <div>
      <Header />
      <MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
      <Footer allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
      </div>
    )
  }
}

export default TodoApp
