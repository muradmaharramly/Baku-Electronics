import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import bcrypt from 'bcryptjs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const SetPassword = () => {
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordAgainFocused, setIsPasswordAgainFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
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

        const userEmail = localStorage.getItem('email');
        if (!userEmail) {
            return setLocalError('Email tapılmadı. Yenidən qeydiyyatdan keçin.');
        }

        if (password.length < 8) {
            return setLocalError('Şifrə ən az 8 simvol olmalıdır.');
        }

        if (password !== confirmPassword) {
            return setLocalError('Şifrələr uyğun deyil.');
        }

        const { data, error } = await supabase
            .from('users')
            .select('resetCodeConfirmed')
            .eq('email', userEmail)
            .single();

        if (error || !data || !data.resetCodeConfirmed) {
            return setLocalError('Təsdiq kodu doğrulanmayıb, yenidən sınayın.');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await supabase
            .from('users')
            .update({ password: hashedPassword, resetCodeConfirmed: false, resetCode: null })
            .eq('email', userEmail);

        setLocalMessage('Şifrə uğurla dəyişdirildi!');

        setTimeout(() => {
            navigate('/auth/login');
        }, 2000);
    };

    return (
        <div className='reset-page'>
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
                    <h1>Şifrəni yenilə</h1>
                    <form onSubmit={handleSubmit}>
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
                            <label className={isPasswordFocused || password ? "clicked" : ""}>Yeni Şifrə</label>
                            <button className='pass-hider' type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        <div className='form-group'>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setIsPasswordAgainFocused(true)}
                                onBlur={() => setIsPasswordAgainFocused(confirmPassword !== '')}
                                className="form-control"
                                required
                            />
                            <label className={isPasswordAgainFocused || confirmPassword ? "clicked" : ""}>Şifrəni Təsdiqlə</label>
                            <button className='pass-hider' type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        <button className='submit-btn' type='submit'>Şifrəni dəyiş</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SetPassword;
