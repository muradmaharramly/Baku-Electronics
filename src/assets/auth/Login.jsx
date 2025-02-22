import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { MdOutlineEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                <div className='links'>
                    <Link to="/">Ana səhifə</Link>
                    <Link to="/delivery-and-billing">Çatdırılma və ödəniş</Link>
                    <Link to="/loan-purchase">Nisyə alış</Link>
                </div>
                <div className='form-area'>
                    <h1>Daxil ol</h1>
                    <form>
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
                            <Link>Şifrəni unutmusan?</Link>
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
