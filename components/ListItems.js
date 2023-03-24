import React, { useState } from "react";
import { Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  ListView,
  ListViewHidden,
  TodoText,
  TodoDate,
  HiddenButton,
  SwipedTodoText,
  colors,
} from "../styles/appStyles.js";

import { Entypo } from "@expo/vector-icons";

const ListItems = ({ todos, setTodos, handleTriggerEdit }) => {
  // for styling currently swiped todo
  const [swipedRow, setSwipedRow] = useState(null);
  const handleDeleteTodo = (rowMap, rowKey) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key == rowKey);
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };
  return (
    <>
      {todos.length == 0 && <TodoText>You have no todos Today</TodoText>}
      {todos.length != 0 && (
        <SwipeListView
          data={todos}
          renderItem={(data) => {
            const RowText =
              data.item.key == swipedRow ? SwipedTodoText : TodoText;
            return (
              <ListView underLayColor={colors.primary} onPress={() => {
                handleTriggerEdit(data.item)
              }}>
                <>
                  <RowText>{data.item.title}</RowText>
                  <TodoDate>{data.item.date}</TodoDate>
                </>
              </ListView>
            );
          }}
          renderHiddenItem={(data, rowMap) => {
            return (
              <ListViewHidden>
                <HiddenButton
                  onPress={() => {
                    handleDeleteTodo(rowMap, data.item.key);
                  }}
                >
                  <Entypo name="trash" size={25} color={colors.secondary} />
                </HiddenButton>
              </ListViewHidden>
            );
          }}
          leftOpenValue={80}
          previewRowKey={"1"}
          previewOpenValue={80}
          previewOpenDelay={3000}
          disableLeftSwipe={true}
          showVerticalScrollIndicator={false}
          onRowOpen={(rowKey) => {
            setSwipedRow(rowKey);
          }}
          onRowClose={(rowKey) => {
            setSwipedRow(null);
          }}
          style={{
            flex: 1,
            paddingBottom: 30,
            marginBottom: 40,
          }}
        />
      )}
    </>
  );
};

export default ListItems;
