import { useState } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useTodos } from '../../hooks/useTodos';
import { createTodo } from '../../services/todo';

export default function Todos() {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState('');
  const { todos, setTodos } = useTodos();
  const handleClick = async (todo) => {
    console.log(todo);
  };
  const handleNewTodo = async () => {
    try {
      await createTodo(description);
      setTodos((cur) => [...cur, { description }]);
      setDescription('');
    } catch (e) {
      console.error(e.message);
    }
  };
  if (!user) {
    return <Redirect to='/auth/sign-in'></Redirect>;
  }

  return (
    <><div id='wrapper'>
      <div id='inputs'>
        <input type='text'
          value={description}
          onChange={e => setDescription(e.target.value)}/>
        <button id='submit-new' onClick={handleNewTodo}>New Todo</button>
      </div>
    </div><div id='todo-container'>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.description}</h2>
          <input type='checkbox'
            checked={todo.complete}
            onClick={() => handleClick(todo)} />
        </div>
      ))}
    </div></>
  );
}