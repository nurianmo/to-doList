import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component{
    constructor(props){
        super(props);
    }

    removeTodo(id){
        this.props.removeTodo(id);
    }

    render(){
        return(
            <div className="todoWrapper">
                <button className="btn btn-outline-danger btn-lg" onClick={(event) => this.removeTodo(this.props.id)}>Done </button>
                {this.props.todo.text}
            </div>
        )
    }

}

export default TodoItem;