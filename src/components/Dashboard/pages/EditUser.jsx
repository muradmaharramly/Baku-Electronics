import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../PreLoader';
import slugify from 'slugify';
import { editNews } from '../../../tools/actions/newsActions';
import { fetchUsers } from '../../../tools/request/fetchUsers';
import UserForm from '../elements/UserForm';
import { editUser } from '../../../tools/actions/userActions';

const EditUser = () => {
    const { slug } = useParams();  
    const [singleuser, setSingleUser] = useState(null); 
    const { user, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.length === 0) {
            fetchUsers(); 
        }
    }, [user.length]);

    useEffect(() => {
        if (user.length > 0) {
            const foundSingleUser = user.find(
                (p) => slugify(p.email, { lower: true }) === slug
            );
            setSingleUser(foundSingleUser || null); 
        }
    }, [slug, user]);  

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    if (!singleuser) {
        return <div>istifadəçi tapılmadı</div>; 
    }

    const handleEditUser = (updatedUser) => {
        editUser(updatedUser); 
    };

    return (
        <div className='edit-user'>
            <div className='page-head'>
                <h3>İstifadəçi redaktə et</h3>
                <Link to="/administrative/users"> İstifadəçilərə bax</Link>
            </div>
            <UserForm 
                isEditMode={true}  
                existingUser={singleuser} 
                onSubmit={handleEditUser}  
            />
        </div>
    );
}

export default EditUser;
