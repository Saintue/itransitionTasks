import { useState } from 'react';
import { Posts } from '../../posts/posts';

export function RegisterComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let newUser = {};
  async function handleSubmit(e) {
    e.preventDefault();
    let today = new Date();
    newUser = {
      name: name,
      email: email,
      password: password,
      status: 'true',
      regTime: today,
      lastLogin: 'none',
    };
    try {
      await Posts.registerUser(newUser);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className={'align-items-center d-flex flex-column'}
      style={{ width: '300px' }}
      onSubmit={handleSubmit}>
      <label htmlFor="name">name</label>
      <input
        type="name"
        placeholder="name567"
        id="name"
        name="name"
        style={{ maxWidth: '200px' }}
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
