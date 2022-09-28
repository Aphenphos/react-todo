
import { checkError, client } from './client';

async function getTodos() {
  const resp = await client.from('todos').select();
  console.log(resp);

  return checkError(resp);
}

async function createTodo(description) {
  const resp = await client.from('todos').insert([{ description }]);

  return checkError(resp);
}

async function completeTodo({ id, complete }) {
  await client.from('todos')
    .update({ complete: !complete })
    .match({ id })
    .single();

  return await getTodos();
}
export { getTodos, createTodo, completeTodo };