import AppDispatcher from '../dispatcher/AppDispatcher'
import TodoConstants from '../constants/TodoConstants'

const TodoActions = {
  create(text){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    })
  },

  update(id,text){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    })
  },

  destroy(id){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id : id
    })
  },

  toggleComplete(todo){
    const actionType = todo.complete ?
    TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE

    AppDispatcher.dispatch({
      actionType: actionType,
      id : todo.id
    })
  },

  undoComplete(id){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UNDO_COMPLETE,
      id : id
    })
  },

  destroyCompleted(){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    })
  },

  toggleCompleteAll(){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    })
  }
}

export default TodoActions
