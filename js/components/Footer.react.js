import React,{ Component } from 'react'
import TodoActions from '../actions/TodoActions'

class Footer extends Component{
  _onClearCompletedClick (){
    TodoActions.destroyCompleted()
  }

  render(){
    const todos = this.props.allTodos
    const total = Object.keys(todos).length;

    if (total === 0) {
      return null;
    }

    let completedTodos = 0
    for (var key in todos) {
      if (todos[key].complete) {
        completedTodos++;
      }
    }

    const itemsLeft = total - completedTodos
    const itemsLeftPhrase = itemsLeft > 0 && itemsLeft === 1 ?
     ' item left ' : ' items left '

     let clearCompletedButton
     if(completedTodos > 0){
       clearCompletedButton =
         <button
           id="clear-completed"
           onClick={() => this._onClearCompletedClick()}>
           Clear completed ({completedTodos})
         </button>
     }

     return (
        <footer id="footer">
          <span id="todo-count">
            <strong>
              {itemsLeft}
            </strong>
            {itemsLeftPhrase}
          </span>
          {clearCompletedButton}
        </footer>
      )
  }
}

export default Footer
