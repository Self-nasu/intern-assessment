import React from 'react';

function TotalUsersCard({ noofusers }) {
    return (
        <div className='container-fluid w-100 p-4 h-100 shadow-sm rounded border d-flex justify-content-between align-items-center'>
            <p className='h1 mb-0'>Total Users</p>
            <p className='h1 mb-0 text-primary'>{noofusers}</p>
        </div>
    );
}

export default TotalUsersCard;
