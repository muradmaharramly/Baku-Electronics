import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import emailjs from "@emailjs/browser";
import { MdOutlineEmail } from 'react-icons/md';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
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

        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (error || !data) {
            return setLocalError('Bu email ilə istifadəçi tapılmadı.');
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        await supabase
            .from('users')
            .update({ resetCode, resetCodeConfirmed: false })
            .eq('email', email);

        const templateParams = {
            to_email: email,
            message: resetCode,
        };

        await emailjs.send(
            "service_5a6i1gc", 
            "template_8npvi3h", 
            templateParams,
            "kK2cdPoiL4pT-YY8i"
        );

        setLocalMessage('Şifrə sıfırlama kodu email adresinizə göndərildi.');

        setTimeout(() => {
            navigate('/auth/confirm-reset');
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
                        <button className='submit-btn' type='submit'>Təsdiq kodu göndər</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
