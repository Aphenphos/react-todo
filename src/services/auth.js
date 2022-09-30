import { client } from './client';

function getUser() {
  return client.auth.currentUser;
}

async function authUser(email, password, type) {
  let response;
  if (type === 'sign-up') {
    response = await client.auth.signUp({ email, password });
  } else {
    response = await client.auth.signIn({ email, password });
  }

  return response.user;
} 

async function supaSignOut() {
  await client.auth.signOut();
}

export { getUser, authUser, supaSignOut }; 