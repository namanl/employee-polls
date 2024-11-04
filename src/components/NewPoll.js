import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handleAddQuestion } from '../actions/questions';

const NewPoll = ({ dispatch }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const isDisabled = firstOption === '' || secondOption === '';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(firstOption, secondOption));
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-9">Would You Rather</h1>
      <h3 className="text-center font-extralight text-lg">
        Create Your Own Poll
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label
            htmlFor="firstOption"
            data-testid="firstOptionLabel"
            className="block text-sm font-medium text-slate-700 text-center"
          >
            First Option
          </label>
          <div className="mt-1">
            <input
              value={firstOption}
              onChange={(e) => setFirstOption(e.target.value)}
              type="text"
              name="firstOption"
              id="firstOption"
              data-testid="firstOption"
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="secondOption"
            data-testid="secondOptionLabel"
            className="block text-sm font-medium text-slate-700 text-center"
          >
            Second Option
          </label>
          <div className="mt-1">
            <input
              value={secondOption}
              onChange={(e) => setSecondOption(e.target.value)}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="secondOption"
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="m-6 text-center">
          <button
            disabled={isDisabled}
            type="submit"
            data-testid="submit"
            className={`${
              isDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-lime-500 hover:bg-lime-700'
            }  px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect()(NewPoll);
