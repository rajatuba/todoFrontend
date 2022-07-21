import React, { useState } from "react";

const InputTodoItem = (props) => {
  const [newItem, setNewItem] = useState("");
  let formData = new FormData();
  const ChangeNewItem = (e) => {
    setNewItem(() => {
      return e.target.value;
    });
  };
  /*const AddItem = async () => {
    if (newItem !== "") {
      let temp = {
        id: new Date().getTime(),
        text: newItem,
        checked: false,
      };
      props.addTodoItems((prev) => {
        return [...prev, temp];
      });

      localStorage.setItem("todos", JSON.stringify([...props.todoItems, temp]));
      setNewItem("");
    }
  };
  */
  const AddItem = () => {
    formData.append("title", newItem);
    fetch("http://localhost:3001/todoAdd", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("post req:", res);
        props.getData();
      });
  };

  return (
    <div>
      <div className="addHeading">Add Todo Task</div>
      <div className="addInput">
        <input
          type="text"
          value={newItem}
          onChange={ChangeNewItem}
          placeholder="Add Task"
        />

        <button
          onClick={AddItem}
          disabled={newItem === ""}
          className="addButton"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default InputTodoItem;
