import React, { useState } from "react";
import { Text } from "react-native";
import Header from "./Header.js";
import ListItems from "./ListItems.js";
import InputModal from "./inputModal";

const Home = () => {
  const initialTodos = [
    {
      title: "Get snack",
      date: "2-2-03",
      key: "1",
    },
    {
      title: "Get groceries",
      date: "2-2-03",
      key: "2",
    },
    {
      title: "Get the money",
      date: "2-2-03",
      key: "3",
    },
  ];

  const [todos, setTodos] = useState(initialTodos);
  // Clear All todos
  const handleClearTodos = () => {
    setTodos([]);
  };
  // Modal Visibilities and Input Values
  const [modalVisible, setModalVisible] = useState(false);
  const [todoInputValue, setTodoInputValue] = useState();

  // Function to add a new todo
  const handleAddTodo = (todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setModalVisible(false);
  };
  // Handle Editing
  const [todoToBeEdited, setTodoToBeEdited] = useState(null);
  const handleTriggerEdit = (item) => {
    setTodoToBeEdited(item);
    setModalVisible(true);
    setTodoInputValue(item.title);
  };
  const handleEditTodo = (editedTodo) => {
    const newTodos =[...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
    newTodos.splice(todoIndex, 1, editedTodo)
    setTodos(newTodos)
    setTodoToBeEdited(null)
    setModalVisible(false)
  }
  return (
    <>
      <Header handleClearTodos={handleClearTodos} />
      <ListItems
        todos={todos}
        setTodos={setTodos}
        handleTriggerEdit={handleTriggerEdit}
      />
      <InputModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        todoInputValue={todoInputValue}
        setTodoInputValue={setTodoInputValue}
        handleAddTodo={handleAddTodo}
        todos={todos}
        todoToBeEdited={todoToBeEdited}
        setTodoToBeEdited={setTodoToBeEdited}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
};

export default Home;
