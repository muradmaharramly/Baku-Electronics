import React from 'react'
import { Link } from 'react-router-dom'
import UserForm from '../elements/UserForm';
import { adduser } from '../../../tools/actions/userActions';

const AddUser = () => {

  const handleAddUser = (userData) => {
    adduser(userData);
  };
    return (
        <div className='add-user'>
            <div className='page-head'>
                <h3>İstifadəçi əlavə et</h3>
                <Link to="/administrative/users">İstifadəçilərə bax</Link>
            </div>
            <UserForm isEditMode={false} onSubmit={handleAddUser} />
        </div>
    )
}

export default AddUser