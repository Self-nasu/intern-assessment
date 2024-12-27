import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TotalUsersCard from '../components/TotalUsersCard';
import UsersProfileCard from '../components/UsersProfileCard';
import axios from 'axios';
import UsersTable from '../components/UsersTable';

function Home() {
    const [user, setUser] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must log in to access this page.');
            navigate('/');
        } else {
            // current user detail
            axios
                .get('http://localhost:5000/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => setUser(response.data))
                .catch((error) => {
                    console.error(error);
                    alert('Failed to fetch user data.');
                });

            // total no of users
            axios
                .get('http://localhost:5000/api/total-users')
                .then((response) => setTotalUsers(response.data.totalUsers))
                .catch((error) => {
                    console.error(error);
                    alert('Failed to fetch total users count.');
                });

            // fetch users list
            axios
                .get('http://localhost:5000/api/users')
                .then((response) => setUsers(response.data))
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, [navigate]);

    const handleUpdate = (updatedUser) => {
        const token = localStorage.getItem('token');
        axios
            .put('http://localhost:5000/api/user', updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert('User updated successfully');
                setUser(response.data);

                axios
                    .get('http://localhost:5000/api/users')
                    .then((response) => setUsers(response.data))
                    .catch((error) => console.error("Error fetching users:", error));
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to update user.');
            });
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios
            .delete('http://localhost:5000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert('User deleted successfully');
                localStorage.removeItem('token');
                navigate('/');

                axios
                    .get('http://localhost:5000/api/users')
                    .then((response) => setUsers(response.data))
                    .catch((error) => console.error("Error fetching users:", error));
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to delete user.');
            });
    };

    return (
        <>
            <NavBar />
            <div className="container-fluid p-3 d-flex gap-3">
                <div className="w-50">
                    <TotalUsersCard noofusers={totalUsers} />
                </div>
                <div className="w-50">
                    {user && (
                        <UsersProfileCard
                            Name={user.name}
                            Phone={user.phone}
                            email={user.email}
                            imglink={user.profileImage}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
            <div className='container-fluid p-3'>
                <UsersTable users={users} />
            </div>
        </>
    );
}

export default Home;
