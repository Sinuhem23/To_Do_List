import React, { useRef, useEffect, useState } from 'react';
import useLocalStorage from './Hooks/useLocalStorage';
import './App.css';

export default function App() {
  // Using useState
  // const [todo, setTodo] = useState([
  // Using LocalStorage instead of useState (check the localStorage file)
  const [todo, setTodo] = useLocalStorage('todos', [
    {
      listItem: 'Wake up',
      isChecked: true,
    },
    {
      listItem: 'Brush your teeth',
      isChecked: true,
    },
    {
      listItem: 'Get dressed',
      isChecked: false,
    },
  ]);

  // const [todo, setTodo] = useState([]);

  let addItemRef = useRef();

  useEffect(() => {
    addItemRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = [
      {
        addItem: addItemRef.current.value,
      },
    ];
    // console.log(formData.addItem)
    // console.log(formData)

    setTodo((prevState) => prevState.concat(formData));
    addItemRef.current.value = '';

    console.log(todo);
  };

  // Delete
  const deleteId = (id) => {
    setTodo((prevState) => prevState.filter((_, index) => index !== id));
  };

  const updateListOfItems = (isChecked, newsChecked) => {
    const updatedListOfItems = [...todo];
    updatedListOfItems[isChecked].isChecked = true;
    setTodo(updatedListOfItems);
  };

  // const addItem ()
  console.log('Outside of handleSubmit ', todo);
  return (
    <div id='App'>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add Item:</label>
        <input id='addItem' ref={addItemRef} type='text' required />
        <button>Add Todo</button>
      </form>
      <ol>
        {todo.map((list, idx) => (
          <li key={idx} className={list.isChecked ? 'done' : ''}>
            <input
              checked={list.isChecked}
              type='checkbox'
              onChange={() => updateListOfItems(idx, !list.isChecked)}
            />
            {list.listItem}
            {list.addItem}
            <button onClick={() => deleteId(idx)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
