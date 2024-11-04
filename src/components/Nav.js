import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutAuthedUser } from '../actions/authedUser';

function Nav(props) {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    props.dispatch(logoutAuthedUser());
    navigate('/login');
  };

  return (
    <>
      <nav className="flex mt-2 items-center justify-between">
        <ul className="flex">
          <li>
            <NavLink
              data-testid="home-link"
              to="/"
              className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              data-testid="leaderboard-link"
              to="/leaderboard"
              className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink
              data-testid="new-poll-link"
              to="/new"
              className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
            >
              New Poll
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center">
          <li className="flex items-center">
            <span className="font-medium px-3 py-2 text-slate-700">
              <img
                className="h-10 w-10 inline"
                src={props.userData.avatarURL}
                alt="Author"
              />
            </span>
            <span data-testid="user-information">{props.userData.id}</span>
          </li>
          <li>
            <NavLink
              data-testid="logout-link"
              onClick={logout}
              className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr className="flex-grow h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  return { userData: users[authedUser] };
};

export default connect(mapStateToProps)(Nav);
