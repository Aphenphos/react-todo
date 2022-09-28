import { checkError, client } from './client';

async function getTodos() {
  const response = await client.from('?').select();

  return checkError(response);
}

export { getTodos };