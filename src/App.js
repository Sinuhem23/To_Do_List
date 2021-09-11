import React, { useRef, useEffect, useState } from 'react';
import useLocalStorage from './Hooks/useLocalStorage';
import './App.css';

export default function App() {
  // Using useState
  // const [todo, setTodo] = useState([
  // Using LocalStorage instead of useState (check the localStorage file)
  const [todo, setTodo] = useLocalStorage('todos', [
    {
      defaultItem: 'Wake up',
      isChecked: true,
    },
    {
      defaultItem: 'Brush your teeth',
      isChecked: true,
    },
    {
      defaultItem: 'Get dressed',
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
    if (todo.length > 7) {
      alert('List is full!');
      // Not fully working yet
      deleteId([todo.length] < 7);
    }

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
    <div className='all_container'>
      <div id='App'>
        <form onSubmit={handleSubmit}>
          <h1>To Do List</h1>

          <label htmlFor='addItem'>Add Item:</label>
          <input id='addItem' ref={addItemRef} type='text' required />
          <button className='addTodoBtn'>Add Todo</button>
        </form>
        <div className='inner_container container_scroll'>
          <ol>
            {todo.map((list, idx) => (
              <li key={idx} className={list.isChecked ? 'done' : 'boxCheck'}>
                <input
                  checked={list.isChecked}
                  type='checkbox'
                  onChange={() => updateListOfItems(idx, !list.isChecked)}
                />
                {list.defaultItem}
                {list.addItem}
                <button className='removeBtn' onClick={() => deleteId(idx)}>
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
