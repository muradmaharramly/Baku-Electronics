import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../utils/sendEmail';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [lastName, setLastName] = useState("");
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [localMessage, setLocalMessage] = useState(null);
    const navigate = useNavigate();  

    useEffect(() => {
        if (localError || localMessage) {
            const timer = setTimeout(() => {
                setLocalError(null);
                setLocalMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [localError, localMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            return setLocalError('Şifrə ən az 8 simvol olmalıdır');
        }

        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return setLocalError('Email artıq istifadə olunub');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const { error } = await supabase
            .from('users')
            .insert([{ firstName, lastName, email, password: hashedPassword, emailConfirmed: false, verificationCode }]);

        if (error) {
            return setLocalError('Qeydiyyat zamanı xəta baş verdi');
        }

        sendEmail(email, verificationCode);
        setLocalMessage('Təsdiq kodu email adresinizə göndərildi.');
        
        localStorage.setItem('email', email); 
        setTimeout(() => {
            navigate('/auth/confirm-email');  
        }, 2000);
    };

    return (
        <div className='register-page'>
            <div className='left'>
                <Link to="/" ><img className='logo' src='https://new.bakuelectronics.az/img/auth-logo.png' /></Link>
                <div className='content'>
                    <h2>Arxayın al! </h2>
                    <div className='banner'>
                        <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fnews%2FARXAYNAL-slider1_KblwbsE_1.jpg&w=1920&q=75' />
                    </div>
                    <h3>Məhsulun dəyişdirmə və geri qaytarma müddəti 30 günə uzandı.</h3>
                    <Link>Ətraflı bax</Link>
                </div>
            </div>
            <div className='right'>
                {localError && <div className="error-popup">{localError}</div>}
                {localMessage && <div className="success-popup">{localMessage}</div>}
                <div className='links'>
                    <Link to="/">Ana səhifə</Link>
                    <Link to="/delivery-and-billing">Çatdırılma və ödəniş</Link>
                    <Link to="/loan-purchase">Nisyə alış</Link>
                </div>
                <div className='form-area'>
                    <h1>Qeydiyyatdan keç</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-double'>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onFocus={() => setIsFirstNameFocused(true)}
                                    onBlur={() => setIsFirstNameFocused(firstName !== '')}
                                    className="form-control"
                                    required
                                />
                                <label className={isFirstNameFocused || firstName ? "clicked" : ""}>Ad</label>
                                <FaRegUser />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onFocus={() => setIsLastNameFocused(true)}
                                    onBlur={() => setIsLastNameFocused(lastName !== '')}
                                    className="form-control"
                                    required
                                />
                                <label className={isLastNameFocused || lastName ? "clicked" : ""}>Soyad</label>
                                <FaRegUser />
                            </div>
                        </div>
                        <div className='form-group'>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(email !== '')}
                                className="form-control"
                                required
                            />
                            <label className={isEmailFocused || email ? "clicked" : ""}>Email</label>
                            <MdOutlineEmail />
                        </div>
                        <div className='form-group'>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(password !== '')}
                                className="form-control"
                                required
                            />
                            <label className={isPasswordFocused || password ? "clicked" : ""}>Şifrə</label>
                            <button className='pass-hider' type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        <button className='submit-btn' type='submit'>Qeydiyyatdan keçin</button>
                    </form>
                    <p>Hazırda hesabınız var? <Link to="/auth/login">Daxil ol</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register;
