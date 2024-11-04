import { connect } from 'react-redux';

const Leaderboard = ({ users }) => {
  return (
    <div>
      <table className="table-auto w-full text-sm mt-6 ">
        <thead className="table-header-group bg-white">
          <tr className="table-row">
            <th className="border border-slate-100 dark:border-slate-600 font-medium p-4 pl-8 text-left">
              User
            </th>
            <th className="border border-slate-100 dark:border-slate-600 font-medium p-4 pl-8 text-left">
              Answered
            </th>
            <th className="border border-slate-100 dark:border-slate-600 font-medium p-4 pl-8 text-left">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="items-center border border-slate-100 dark:border-slate-700 p-4 pl-8">
                <span className="font-medium px-3 py-2 text-slate-700">
                  <img
                    className="h-10 w-10 inline"
                    src={user.avatarURL}
                    alt="Author"
                  />
                </span>
                <span className="font-bold">{`(${user.id}) ${user.name}`}</span>
              </td>
              <td className="border border-slate-100 dark:border-slate-700 p-4 pl-8">
                {Object.keys(user.answers).length}
              </td>
              <td className="border border-slate-100 dark:border-slate-700 p-4 pl-8">
                {user.questions.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapStateToProps)(Leaderboard);
