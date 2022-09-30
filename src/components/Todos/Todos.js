import { useState } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useTodos } from '../../hooks/useTodos';
import { supaSignOut } from '../../services/auth';
import { completeTodo, createTodo } from '../../services/todo';

export default function Todos() {
  const { user, setUser } = useContext(UserContext);
  const [description, setDescription] = useState('');
  const { todos, setTodos } = useTodos();
  const handleClick = async (todo) => {
    const updated = await completeTodo(todo);
    setTodos(updated);
  };
  const handleNewTodo = async () => {
    try {
      await createTodo(description);
      setTodos((cur) => [...cur, { description }]);
      setDescription('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const signOut = async () => {
    supaSignOut();
    setUser(null);
  };

  if (!user) {
    return <Redirect to='/auth/sign-in'></Redirect>;
  }

  return (
    <><div id='wrapper'>
      <button id='sign-out-button' onClick={signOut}>SIGN OUT</button>
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
            onChange={() => handleClick(todo)} />
        </div>
      ))}
    </div></>
  );
}