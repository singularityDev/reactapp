import React from "react";
import "./TodoItem.css";
import { useDispatch } from "react-redux";
import {
  CheckTodoQuery,
  DeleteTodoQuery,
  TodosQuery,
} from "../../Queries/queries";
import { useMutation } from "@apollo/react-hooks";

export const TodoItem = ({ todo }) => {
  // checkTodo and deleteTodo mutations for each todo item
  const [checkTodo] = useMutation(CheckTodoQuery);
  const [deleteTodo] = useMutation(DeleteTodoQuery);
  let textColor;
  if (todo.priority === 1) {
    textColor = "red 4px solid";
  } else if (todo.priority === 2) {
    textColor = "green 4px solid";
  } else {
    textColor = "blue 4px solid";
  }
  const dispatch = useDispatch();

  // For toggling a todo check
  const onCheck = async (e) => {
    console.log("done todo");
    e.preventDefault();

    // GraphQL mutation request with variables to update
    const checkToggle = await checkTodo({
      variables: {
        id: todo.id,
        checked: !todo.checked,
      },
    });

    // Store update dispatch
    // one other way to dispatch is to use the available data as payload instead of waiting for the updated data from database to use as payload
    console.log("todoitem toggle check", checkToggle.data.checkTodo.checked);
    dispatch({
      type: "TODO_CHECKTOGGLE",
      payload: checkToggle.data.checkTodo,
    });
  };

  //Deleting a todo item
  const onDelete = (e) => {
    e.preventDefault();

    // GraphQL mutation request with variables to update
    deleteTodo({
      variables: {
        id: todo.id,
      },
      refetchQueries: [{ query: TodosQuery }],
    });
    console.log("delete todo");

    // Store update dispatch
    dispatch({
      type: "TODO_DELETE",
      payload: todo.name,
    });
  };
  return (
    <div className="todo-item">
      <li
        className={todo.checked ? "todo-item-done" : null}
        style={{ borderLeft: textColor }}
        onClick={onCheck}
      >
        {todo.name}{" "}
      </li>
      <button onClick={onDelete}>X</button>
    </div>
  );
};
