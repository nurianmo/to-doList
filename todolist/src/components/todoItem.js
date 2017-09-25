import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component{
    constructor(props){
        super(props);

        this.state = {
           done: this.props.todo.done
        };

        this.removeTodo = this.removeTodo.bind(this);
        this.doneTodo = this.doneTodo.bind(this);
    }

    //Calls this function when the user click on remove button
    removeTodo(id){
        //Call the parent function removeTodo
        this.props.removeTodo(id);
    }

    //Calls this function when the user click on done button
    doneTodo(id){
        //Call the parent function doneTodo
        //this.setState({done: this.state.done ? true : false});
        this.props.doneTodo(id);
    }

    render(){
        return(
            <div className={this.props.todo.done ? "todoWrapper done row" : "todoWrapper row"}>
                <div className= "text col-lg-9"> {this.props.todo.text} </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-md btn-success" onClick={(event) => this.doneTodo(this.props.id)}> ✓ </button>
                    <button className="btn btn-md btn-danger" onClick={(event) => this.removeTodo(this.props.id)}> X </button>
                </div>
              
            </div>
        )
    }
}

export default TodoItem;