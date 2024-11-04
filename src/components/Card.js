import { Link } from 'react-router-dom';

function Card({ question }) {
  return (
    <Link to={'questions/' + question.id}>
      <div className="border border-solid border-slate-500 mx-14 my-3  p-3 rounded-md shadow-md hover:shadow-xl transition max-w-sm  flex flex-col">
        <div className="text-xl text-center font-medium text-black">
          {question.author}
        </div>
        <div className="border-b-2 border-solid pb-3 text-sm text-center">
          {new Date(question.timestamp).toLocaleTimeString('en-uS')} |{' '}
          {new Date(question.timestamp).toLocaleDateString('en-uS')}
        </div>
        <button className="m-3 pt-1 pb-1 border rounded-md border-solid border-lime-600">
          Show
        </button>
      </div>
    </Link>
  );
}

export default Card;
