import React, { Component, PropTypes } from 'react'

const ENTER_KEY_CODE = 13

class TodoTextInput extends Component{
  constructor(props){
    super(props)
    this.state = {
      text :   props.value || ''
    }
  }

  onChange(event){
    this.setState({
      text : event.target.value
    })
  }

  keydown(event){
    if(event.keyCode === ENTER_KEY_CODE){
      this._onSave()
    }
  }

  _onSave(){
    this.props.onSave(this.state.text)
    this.setState({text: ''})
  }

  render(){
    const value = this.props.value ? this.props.value : this.state.text
    return (
      <input type="text"
      id = {this.props.id}
      placeholder={this.props.placeholder}
      onChange = {(event) => this.onChange(event)}
      onBlur = {() => this._onSave()}
      onKeyDown = {(event) => this.keydown(event)}
      value = {this.state.text}
      autoFocus = {true}
      className = {this.props.className}
      />
    )
  }
}

TodoTextInput.propTypes =  {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default TodoTextInput
