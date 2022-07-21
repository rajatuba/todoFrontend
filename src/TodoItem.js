import React, { useEffect, useState } from "react";
import "./css/TodoItem.css";
const TodoItem = (props) => {
  //console.log("props", props);
  const { item } = props;
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  let formData = new FormData();

  useEffect(() => {
    setEditValue(item.title);
    setChecked(item.status);
  }, [item.id]);

  const handleCheckbox = () => {
    //props.updateItem(editValue, item.id, !checked);
    fetch("http://localhost:3001/todo/status/" + item.id).then((res) => {
      console.log("delete res", res.json());
    });
    setChecked((prev) => {
      return !prev;
    });
  };

  const handleEdit = () => {
    setEdit((prev) => {
      return !prev;
    });
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  /*const handleUpdate = () => {
    props.updateItem(editValue, item.id, checked);
    handleEdit();
  };*/
  const handleUpdate = () => {
    formData.append("title", editValue);
    formData.append("id", props.item.id);
    fetch("http://localhost:3001/todoUpdate", {
      method: "POST",
      body: formData,
    }).then((res) => {
      console.log("post req:", res);
      props.getData();
      handleEdit();
    });
  };

  const style1 = !edit ? { display: "inline-block" } : { display: "none" };
  const style2 = edit ? { display: "inline-block" } : { display: "none" };
  return (
    <div className="itemContainer">
      <div className="checkContainer">
        <input type="checkbox" onChange={handleCheckbox} checked={checked} />
      </div>
      <div className="itemText">
        <p className={checked ? "underline" : null} style={style1}>
          {item.title}
        </p>
        <p style={{ display: "inline-block" }}>
          <input
            style={style2}
            value={editValue}
            onChange={handleEditChange}
            type="text"
            size="50"
          />
        </p>
      </div>
      <button
        onClick={handleEdit}
        style={style1}
        disabled={checked}
        className="itemButton editButton"
      >
        Edit
      </button>
      <button
        onClick={handleUpdate}
        style={style2}
        className="itemButton UpdateButton"
      >
        Update
      </button>
      <button
        value={item.id}
        onClick={props.handleDelete}
        className="itemButton deleteButton"
      >
        Delete
      </button>
    </div>
  );
};
export default TodoItem;
