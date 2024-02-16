import { Posts } from '../../posts/posts';
import { useState } from 'react';

export function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let userToLogin = {};
  async function handleSubmit(e) {
    e.preventDefault();
    let today = new Date();
    userToLogin = {
      email: email,
      password: password,
      lastLogin: today,
    };
    userToLogin = {
      email: email,
      password: password,
      lastLogin: today,
    };
    try {
      let logginedUser = await Posts.loginUser(userToLogin);
      localStorage.setItem('currentUser', JSON.stringify(logginedUser.email));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className={'align-items-center d-flex flex-column'}
      style={{ width: '300px' }}
      onSubmit={handleSubmit}>
      <label htmlFor="email" className={'mt-2'}>
        email
      </label>
      <input
        type="email"
        placeholder="youremail@gmailsdf.com"
        id="email"
        name="email"
        className={''}
        style={{ maxWidth: '200px' }}
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor="password" className={'mt-2'}>
        password
      </label>
      <input
        type="password"
        placeholder="****"
        id="password"
        name="password"
        style={{ maxWidth: '200px' }}
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type={'submit'}
        value={'submit'}
        className={'mt-3'}
        style={{ maxWidth: '100px' }}
      />
    </form>
  );
}
