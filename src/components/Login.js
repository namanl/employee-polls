import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const autheduser = Object.values(props.users).filter(
    (user) => user.id === username && user.password === password
  );

  const handleLogIn = (event) => {
    event.preventDefault();
    if (
      !autheduser ||
      username === '' ||
      password === '' ||
      autheduser.length === 0
    ) {
      setError('Please try to login again.');
      setUsername('');
      setPassword('');
    } else {
      props.dispatch(setAuthedUser(autheduser[0].id));
      navigate(state?.path || '/');
    }
  };

  const isEmpty = () => username === '' || password === '';

  return (
    <div>
      <h1
        className="m-4 text-center font-bold text-3xl"
        data-test-id="login-heading"
      >
        Employee Polls
      </h1>
      <img
        className="block mt-0 mb-0 ml-auto mr-auto w-[30%]"
        src="images.jpeg"
        alt="Employees"
      />
      <h2
        className="text-center m-4 font-bold text-2xl"
        data-testid="login-heading"
      >
        Login
      </h2>
      <form onSubmit={handleLogIn}>
        <div className="m-2">
          <label
            htmlFor="user"
            className="p-2 block text-center text-sm font-medium text-slate-700"
          >
            User
          </label>
          <input
            className="block w-full border border-gray-300 rounded-md p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            data-testid="username"
          />
        </div>
        <div className="m-2">
          <label
            htmlFor="password"
            className="p-2 block text-center text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            className="block w-full border border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            data-testid="password"
          />
        </div>
        <div className="m-6 text-center">
          <button
            disabled={isEmpty()}
            type="submit"
            data-testid="submit"
            className={`${
              isEmpty()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-lime-500 hover:bg-lime-700'
            }  px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white`}
          >
            Login
          </button>
          {error && (
            <p
              data-testid="error-message"
              className="mt-4 text-xl font-bold text-red-500"
            >
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (props) => props;

export default connect(mapStateToProps)(Login);
