import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa6';
import { MdOutlineEmail, MdOutlineVerifiedUser } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

const UserForm = ({ existingUser, isEditMode }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingUser) {
            setFirstName(existingUser.firstName);
            setLastName(existingUser.lastName);
            setPassword('');
            setPhoneNumber(existingUser.phoneNumber || '');
        }
    }, [isEditMode, existingUser]);

    const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'Ad boş ola bilməz';
            isValid = false;
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Soyad boş ola bilməz';
            isValid = false;
        }

        if (!isEditMode) {
            if (!email.trim()) {
                newErrors.email = 'Email boş ola bilməz';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = 'Düzgün email daxil edin';
                isValid = false;
            }

            if (!password) {
                newErrors.password = 'Şifrə boş ola bilməz';
                isValid = false;
            } else if (password.length < 8) {
                newErrors.password = 'Şifrə minimum 8 simvol olmalıdır';
                isValid = false;
            }
        }

        if (phoneNumber && !/^[0-9]+$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const userData = {
            firstName,
            lastName,
            phoneNumber: phoneNumber || null,
        };

        if (!isEditMode) {
            userData.email = email;
            userData.emailConfirmed = emailConfirmed;
            userData.verificationCode = emailConfirmed ? generateVerificationCode() : null;
            userData.password = hashedPassword;
        }

        let result;
        if (isEditMode) {
            const { error } = await supabase.from('users').update(userData).eq('id', existingUser.id);
            result = error ? { success: false, message: error.message } : { success: true };
        } else {
            const { error } = await supabase.from('users').insert([userData]);
            result = error ? { success: false, message: error.message } : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? 'İstifadəçi yeniləndi!' : 'İstifadəçi əlavə olundu!',
                text: 'Əməliyyat uğurla başa çatdı.',
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text"
                }
            }).then(() => {
                navigate('/administrative/users');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: result.message,
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text"
                }
            });
        }
    };

    const handleCancel = () => {
        navigate('/administrative/products');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div className="user-form">
            <form onSubmit={handleSubmit}>
                <div className='form-triple'>
                    <div className='form-group'>
                        <label>Ad</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        <FaRegUser />
                    </div>
                    <div className='form-group'>
                        <label>Soyad</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                        <FaRegUser />
                    </div>
                    {!isEditMode && (
                        <div className='form-group'>
                            <label>Email</label>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                            <MdOutlineEmail />
                        </div>
                    )}
                </div>
                <div className='form-triple'>
                    {!isEditMode && (
                        <div className='form-group'>
                            <label>Email təsdiqi</label>
                            <select value={emailConfirmed} onChange={(e) => setEmailConfirmed(e.target.value === 'true')}>
                                <option value="false">Email təsdiqlənmədi</option>
                                <option value="true">Email təsdiqləndi</option>
                            </select>
                        </div>
                    )}

                    {!isEditMode && (
                        <div className='form-group'>
                            <label>Təsdiq kodu</label>
                            <input type="text" placeholder="Təsdiq Kodu" value={verificationCode} disabled />
                            <MdOutlineVerifiedUser />
                        </div>

                    )}
                    {!isEditMode && (
                        <div className='form-group'>
                            <label>Şifrə</label>
                            <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='pass-hider' type='button' onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>
                    )}

                </div>
                {isEditMode && (
                    <div className='form-double'>
                        <div className='form-group'>
                            <label>Şifrə</label>
                            <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='pass-hider' type='button' onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>
                        <div className='form-group'>
                            <label>Tel</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                            <FiPhone />
                        </div>
                    </div>

                )}
                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Ləğv et</button>
                    <button type="submit" className="submit-btn">{isEditMode ? 'Yenilə' : 'Göndər'}</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;