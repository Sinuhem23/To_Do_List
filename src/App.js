import React, { useRef, useEffect } from 'react';
import useLocalStorage from './Hooks/useLocalStorage';

export default function App() {
  // const [checked, setChecked] = useState(false);

  const [todo, setTodo] = useLocalStorage('todos', [
    {
      listItem: 'Wake up',
    },
    {
      listItem: 'Brush your teeth',
    },
    {
      listItem: 'Get dressed',
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
          <li type='checkbox' key={idx}>
            <input id='' type='checkbox' />

            {list.listItem}
            {list.addItem}
            <button onClick={() => deleteId(idx)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
