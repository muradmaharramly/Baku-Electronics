import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

const ConfirmEmail = () => {
    const [code, setCode] = useState("");
    const [isCodeFocused, setIsCodeFocused] = useState(false);
    const [isCodeVisible, setIsCodeVisible] = useState(false);
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

    const handleCodeFocus = () => {
        setIsCodeFocused(true);
    };

    const handleCodeBlur = () => {
        if (!code) {
            setIsCodeFocused(false);
        }
    };

    const handleCodeChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d{0,6}$/.test(inputValue)) {
            setCode(inputValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userEmail = localStorage.getItem('email'); 
        if (!userEmail) {
            return setLocalError('Email tapılmadı. Yenidən qeydiyyatdan keçin.');
        }

        const { data, error } = await supabase
            .from('users')
            .select('verificationCode')
            .eq('email', userEmail)
            .single();

        if (error || !data || data.verificationCode !== code) {
            return setLocalError('Yanlış təsdiq kodu');
        }

        await supabase
            .from('users')
            .update({ emailConfirmed: true, verificationCode: code })
            .eq('email', userEmail);

        setLocalMessage('Hesab uğurla təsdiqləndi!');

        setTimeout(() => {
            navigate('/auth/login');
        }, 2000);
    };

    const toggleCodeVisibility = () => {
        setIsCodeVisible(prevState => !prevState);
    };

    return (
        <div className='confirm-page'>
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
                    <h1>Təsdiq kodu</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                type={isCodeVisible ? 'text' : 'password'}
                                value={code}
                                onChange={handleCodeChange}
                                onFocus={handleCodeFocus}
                                onBlur={handleCodeBlur}
                                className="form-control"
                                maxLength="6"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                aria-label="Təsdiq kodu"
                                required
                            />
                            <label className={isCodeFocused || code ? "clicked" : ""}>Təsdiq kodu</label>
                            <button className='pass-hider' type='button' onClick={toggleCodeVisibility}>
                                {isCodeVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        <span className='code-text'>Təsdiq kodunu daxil etmək üçün maili yoxlayın.</span>
                        <button className='submit-btn' type='submit'>Hesab yaradın</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmail;
