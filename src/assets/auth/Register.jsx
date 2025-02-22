import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa6'
import { MdOutlineEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState("");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [surname, setSurname] = useState("");
    const [isSurnameFocused, setIsSurnameFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleUsernameFocus = () => {
        setIsUsernameFocused(true);
    };

    const handleUsernameBlur = () => {
        if (!username) {
            setIsUsernameFocused(false);
        }
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handleSurnameFocus = () => {
        setIsSurnameFocused(true);
    };

    const handleSurnameBlur = () => {
        if (!surname) {
            setIsSurnameFocused(false);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

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
                <div className='links'>
                    <Link to="/">Ana səhifə</Link>
                    <Link to="/delivery-and-billing">Çatdırılma və ödəniş</Link>
                    <Link to="/loan-purchase">Nisyə alış</Link>
                </div>
                <div className='form-area'>
                    <h1>Qeydiyyatdan keç</h1>
                    <form>
                        <div className='form-double'>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onFocus={handleUsernameFocus}
                                    onBlur={handleUsernameBlur}
                                    className="form-control"
                                    required
                                />
                                <label className={isUsernameFocused || username ? "clicked" : ""}>Ad</label>
                                <FaRegUser />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    value={surname}
                                    onChange={handleSurnameChange}
                                    onFocus={handleSurnameFocus}
                                    onBlur={handleSurnameBlur}
                                    className="form-control"
                                    required
                                />
                                <label className={isSurnameFocused || surname ? "clicked" : ""}>Soyad</label>
                                <FaRegUser />
                            </div>
                        </div>
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
                        <button className='submit-btn' type='submit'>Qeydiyyatdan keçin</button>
                    </form>
                    <p>Hazırda hesabınız var? <Link to="/auth/register">Daxil ol</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register;
