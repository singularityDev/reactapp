import React from "react";
import "./Todo.css";
import { AddTodo } from "../AddTodo/AddTodo";
export const Todo = () => {
  return (
    <div className="todo">
      <h1>Another Todo App</h1>
      <AddTodo />
    </div>
  );
};
