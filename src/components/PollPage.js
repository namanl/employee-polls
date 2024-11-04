import { connect } from 'react-redux';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PollPage = ({ dispatch, authedUser, question, author }) => {
  if (!authedUser || !question || !author) {
    return <Navigate to="" />;
  }

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, 'optionOne'));
    //navigate("");
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, 'optionTwo'));
    //navigate("");
  };

  const percentage = (option, question) => {
    const totalVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case 'optionOne':
        return `${(question.optionOne.votes.length / totalVotes) * 100} %`;
      case 'optionTwo':
        return `${(question.optionTwo.votes.length / totalVotes) * 100} %`;
      default:
        return '';
    }
  };

  const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
  const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
  const isVoted = hasVotedOptionOne || hasVotedOptionTwo;

  return (
    <div>
      <h1 className="text-3xl text-center font-bold my-9">
        Poll by {author.id}
      </h1>

      <div className="flex justify-center">
        <img src={author.avatarURL} alt="Profile" className="h-24 w-24" />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold my-6">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={handleOptionOne}
          disabled={isVoted}
          className={
            'p-2 rounded-xl border hover:shadow-xl transition ' +
            (hasVotedOptionOne ? 'bg-lime-400' : '')
          }
        >
          <div className={hasVotedOptionOne ? 'chosen' : ''}>
            <p className="font-bold mb-2">{question.optionOne.text}</p>
            {!isVoted && (
              <p className="underline underline-offset-4 mb-3">Click</p>
            )}
            {isVoted && (
              <p className="text-xs">
                Votes: {question.optionOne.votes.length} (
                {percentage('optionOne', question)})
              </p>
            )}
          </div>
        </button>

        <button
          onClick={handleOptionTwo}
          disabled={isVoted}
          className={
            'p-2 rounded-xl border hover:shadow-xl transition ' +
            (hasVotedOptionTwo ? 'bg-lime-400' : '')
          }
        >
          <p className="font-bold mb-2">{question.optionTwo.text}</p>
          {!isVoted && (
            <p className="underline underline-offset-4 mb-3">Click</p>
          )}
          {isVoted && (
            <p className="text-xs">
              Votes: {question.optionTwo.votes.length} (
              {percentage('optionTwo', question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  try {
    const question = Object.values(questions).find(
      (question) => question.id === useParams().id
    );
    const author = Object.values(users).find(
      (user) => user.id === question.author
    );
    return { authedUser, question, author };
  } catch (e) {
    return <Navigate to="*" />;
  }
};

export default withRouter(connect(mapStateToProps)(PollPage));
