import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { supabase } from '../../services/supabaseClient';
import { loginSuccess, loginFail } from '../../tools/actions/userActions';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [localMessage, setLocalMessage] = useState(null);
    
    const dispatch = useDispatch();
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

    const handleEmailFocus = () => {
        setIsEmailFocused(true);
    };

    const handleEmailBlur = () => {
        if (!email) {
            setIsEmailFocused(false);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        if (!password) {
            setIsPasswordFocused(false);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Giriş prosesi başladı, email:", email);

        const { data, error } = await supabase
            .from('users')
            .select('password, emailConfirmed')
            .eq('email', email)
            .single();

        console.log("Supabase Cavabı:", data, error);

        if (error || !data) {
            setLocalError('Email və ya şifrə səhvdir');
            return dispatch(loginFail(null));  
        }

        if (!data.emailConfirmed) {
            setLocalError('Email təsdiqlənməyib');
            return dispatch(loginFail(null));
        }

        const isMatch = bcrypt.compareSync(password, data.password);
        console.log("Şifre Kontrolü:", isMatch);
        if (!isMatch) {
            setLocalError('Email və ya şifrə səhvdir');
            return dispatch(loginFail(null));
        }

        setLocalMessage('Giriş uğurlu oldu!');
        dispatch(loginSuccess(email));

        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className='login-page'>
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
                    <h1>Daxil ol</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                type='email'
                                value={email}
                                onChange={handleEmailChange}
                                onFocus={handleEmailFocus}
                                onBlur={handleEmailBlur}
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
                                onChange={handlePasswordChange}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                className="form-control"
                                required
                            />
                            <label className={isPasswordFocused || password ? "clicked" : ""}>Şifrə</label>
                            <button className='pass-hider' type='button' onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        <div className='forgot-pass'>
                            <Link to="/auth/reset-password" >Şifrəni unutmusan?</Link>
                        </div>
                        <button className='submit-btn' type='submit'>Daxil ol</button>
                    </form>
                    <p>Hesabınız yoxdur? <Link to="/auth/register" >Qeydiyyatdan keçin</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
