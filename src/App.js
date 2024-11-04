import { connect } from 'react-redux';
import { useEffect } from 'react';
import { handleInitialData } from './actions/shared';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PollPage from './components/PollPage';
import NewPoll from './components/NewPoll';
import Nav from './components/Nav';
import LeaderBoard from './components/LeaderBoard';
import PageNotFound from './components/PageNotFound';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  const location = useLocation();
  const authed = props.authedUser !== null;

  function ProtectedRoute({ children }) {
    return authed ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }

  return (
    <div className="container mx-auto py-4">
      {!authed ? null : <Nav />}
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          exact
          element={
            <ProtectedRoute>
              <NewPoll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:id"
          exact
          element={
            <ProtectedRoute>
              <PollPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <ProtectedRoute>
              <LeaderBoard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
