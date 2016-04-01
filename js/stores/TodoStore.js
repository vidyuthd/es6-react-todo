import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import Assign from 'object-assign'
import TodoConstants from '../constants/TodoConstants'

const _todos = {}
const _CHANGE = "CHANGE"

function create(text){
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  }
}

function destroy(id){
  delete _todos[id]
}

function update(id,feature){
   _todos[id] = Assign({}, _todos[id], feature )
}

function updateAll(feature){
  for(var id in _todos){
    update(id,feature)
  }
}

function destroyCompleted(){
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}


const TodoStore = Assign({}, EventEmitter.prototype, {
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  getAllTodos(){
    return _todos
  },

  emitChange(){
      this.emit(_CHANGE)
  },

  addChangeListener(callback){
    this.on(_CHANGE,callback)
  },

  removeChangeListener(callback){
    this.removeListener(_CHANGE,callback)
  }
})

AppDispatcher.register((action) => {
  let text = null

  switch(action.actionType){
    case(TodoConstants.TODO_CREATE) :
      text = action.text.trim()
      if(text){
        create(text)
        TodoStore.emitChange()
      }
    break

    case(TodoConstants.TODO_DESTROY):
      destroy(action.id)
      TodoStore.emitChange()
    break

    case(TodoConstants.TODO_COMPLETE):
      update(action.id,{complete : true})
      TodoStore.emitChange()
    break

    case(TodoConstants.TODO_UPDATE_TEXT):
      text = action.text.trim()
      if (text !== '') {
        update(action.id, {text: text})
        TodoStore.emitChange()
      }
    break

    case(TodoConstants.TODO_UNDO_COMPLETE):
      update(action.id, {complete : false})
      TodoStore.emitChange()
    break

    case(TodoConstants.TODO_DESTROY_COMPLETED):
      destroyCompleted()
      TodoStore.emitChange()
    break

    case(TodoConstants.TODO_TOGGLE_COMPLETE_ALL):
      if(TodoStore.areAllComplete())
      {
        updateAll({complete:false})
      }
      else{
        updateAll({complete:true})
      }
      TodoStore.emitChange()
    break
  }
})

export default TodoStore
