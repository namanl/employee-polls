import { useState } from 'react';
import { connect } from 'react-redux';
import Card from './Card';

function Dashboard({ authedUser, questions, users }) {
  const [showDone, setShowDone] = useState(false);

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser) &&
    !question.optionTwo.votes.includes(authedUser);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser);

  return (
    <div>
      <label
        data-testid="toggle"
        className="inline-flex items-center cursor-pointer left"
      >
        <input
          type="checkbox"
          className="sr-only peer"
          value={showDone}
          onChange={() => setShowDone(!showDone)}
        />
        <div className="relative w-11 h-6  text-gray-900 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          Show Done
        </span>
      </label>
      {!showDone ? (
        <>
          <h1
            data-testid="dashboard-heading"
            className="border border-solid border-slate-500 text-2xl text-center font-bold mt-6 mb-6 pt-2 pb-2"
          >
            New Questions
          </h1>
          <ul className="border border-solid border-slate-500 grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 pb-2">
            {questions.filter(unanswered).map((question) => (
              <li key={question.id} className="pt-2 pb-2">
                <Card question={question} author={users[question.author]} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="border border-solid border-slate-500 text-2xl text-center font-bold mt-6 mb-6 pt-2 pb-2">
            Done
          </h1>
          <ul className="border border-solid border-slate-500 grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 pb-2">
            {questions.filter(answered).map((question) => (
              <li key={question.id} className="pb-2">
                <Card question={question} author={users[question.author]} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
