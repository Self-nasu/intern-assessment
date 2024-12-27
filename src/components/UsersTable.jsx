import React from 'react';

const UsersTable = ({ users }) => {
  return (
    <div className='p-3 shadow-sm border rounded'>
      <h2>User List</h2>
      <table className="table table-bordered border">
        <thead>
          <tr className='bg-primary text-light'>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.profileImage || 'https://via.placeholder.com/50'}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                  style={{ height: '36px' }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
