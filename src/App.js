import React, { useState, useEffect } from "react";
import InputTodoItem from "./InputTodoItem";
import TodoItem from "./TodoItem";
import "./css/App.css";

function App() {
  const [todoItems, addTodoItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getData = () => {
    fetch("http://localhost:3001/todoAll")
      .then((res) => res.json())
      .then((res) => addTodoItems([...res]));
  };
  /*useEffect(() => {
    if (localStorage.getItem("todos")) {
      addTodoItems(JSON.parse(localStorage.getItem("todos")));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);
  */
  useEffect(() => {
    getData();
  }, []);

  /*const handleDelete = (e) => {
    let id = parseInt(e.target.value);
    const afterDeleteArray = todoItems.filter((item) => {
      return item.id !== id;
    });
    addTodoItems([...afterDeleteArray]);
    localStorage.setItem("todos", JSON.stringify([...afterDeleteArray]));
  };
  */
  const handleDelete = (e) => {
    fetch("http://localhost:3001/todoDelete/" + e.target.value, {
      method: "DELETE",
    }).then((res) => {
      console.log("delete res", res);
      getData();
    });
  };
  /*const updateItem = (text, id, checked) => {
    let updateElemIndex = todoItems.findIndex(
      (item) => item.id === parseInt(id)
    );
    let temp = {
      text,
      id,
      checked,
    };
    let newArr = [...todoItems];
    newArr[updateElemIndex] = temp;
    addTodoItems([...newArr]);
    localStorage.setItem("todos", JSON.stringify([...newArr]));
  };*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  console.log("todoList", todoItems);

  return (
    <div className="container">
      <h1 className="heading">TODO WebApp</h1>
      <InputTodoItem
        addTodoItems={addTodoItems}
        todoItems={todoItems}
        getData={getData}
      />
      <section className="searchSection">
        Search Todo Task
        <input type="text" onChange={searchHandler} placeholder="Search" />
      </section>
      <div className="todoListHeading">Todo Tasks</div>
      {/*todoItems.map((item, index) => {
        if (item.text.search(searchValue) !== -1) {
          return (
            <TodoItem
              key={index}
              item={item}
              handleDelete={handleDelete}
              updateItem={updateItem}
            />
          );
        }
      })*/}
      {todoItems.map((item) => {
        return (
          <TodoItem item={item} handleDelete={handleDelete} getData={getData} />
        );
      })}
    </div>
  );
}

export default App;
