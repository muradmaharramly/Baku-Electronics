import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { changePasswordSuccess, changePasswordFail } from "../tools/actions/userActions";
import bcrypt from "bcryptjs";
import { supabase } from "../services/supabaseClient";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector((state) => state.user.user?.email) || localStorage.getItem("email");
    
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [oldpassword, setOldPassword] = useState("");
    const [isOldPasswordFocused, setIsOldPasswordFocused] = useState(false);
    const [newpassword, setNewPassword] = useState("");
    const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
    const [againpassword, setAgainPassword] = useState("");
    const [isAgainPasswordFocused, setIsAgainPasswordFocused] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    
    const handleChangePassword = async () => {
        if (newpassword !== againpassword) {
            setError("Yeni şifrələr uyğun gəlmir!");
            return;
        }

        try {
            const { data: userData, error: fetchError } = await supabase
                .from("users")
                .select("password")
                .eq("email", userEmail)
                .single();

            if (fetchError || !userData) {
                throw new Error("İstifadəçi tapılmadı");
            }

            const passwordMatch = await bcrypt.compare(oldpassword, userData.password);
            if (!passwordMatch) {
                throw new Error("Köhnə şifrə düzgün deyil!");
            }

            const hashedPassword = await bcrypt.hash(newpassword, 10);

            const { error: updateError } = await supabase
                .from("users")
                .update({ password: hashedPassword })
                .eq("email", userEmail);

            if (updateError) {
                throw new Error("Şifrə yenilənmədi!");
            }

            dispatch(changePasswordSuccess());
            setSuccessMessage("Şifrə uğurla dəyişdirildi!");
            setTimeout(() => {
                setSuccessMessage(null);
                navigate("/user-profile");
            }, 3000);
        } catch (error) {
            setError(error.message);
            dispatch(changePasswordFail(error.message));
        }
    };
    
    return (
        <div className="user-profile">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><Link to="/user-profile">Şəxsi kabinetim</Link><RiArrowRightDoubleFill /><span>Şifrəni dəyiş</span></div>
            <div className="profile-page change-password">
                <main className="content">
                    <div className="tab-content">
                        <h3>Şifrəni dəyişdir</h3>
                        {error && <p className="error-message">{error}!</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <form>
                            <div className='form-group'>
                                <input
                                    type={isOldPasswordVisible ? 'text' : 'password'}
                                    value={oldpassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    onFocus={() => setIsOldPasswordFocused(true)}
                                    onBlur={() => setIsOldPasswordFocused(oldpassword !== '')}
                                    className="form-control"
                                    required
                                />
                                <label className={isOldPasswordFocused || oldpassword ? "clicked" : ""}>Köhnə şifrə</label>
                                <button className='pass-hider' type='button' onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}>
                                    {isOldPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>

                            <div className='form-group'>
                                <input
                                    type={isNewPasswordVisible ? 'text' : 'password'}
                                    value={newpassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onFocus={() => setIsNewPasswordFocused(true)}
                                    onBlur={() => setIsNewPasswordFocused(newpassword !== '')}
                                    className="form-control"
                                    required
                                />
                                <label className={isNewPasswordFocused || newpassword ? "clicked" : ""}>Yeni şifrə</label>
                                <button className='pass-hider' type='button' onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                                    {isNewPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>

                            <div className='form-group'>
                                <input
                                    type={isNewPasswordVisible ? 'text' : 'password'}
                                    value={againpassword}
                                    onChange={(e) => setAgainPassword(e.target.value)}
                                    onFocus={() => setIsAgainPasswordFocused(true)}
                                    onBlur={() => setIsAgainPasswordFocused(againpassword !== '')}
                                    className="form-control"
                                    required
                                />
                                <label className={isAgainPasswordFocused || againpassword ? "clicked" : ""}>Yeni şifrə təkrar</label>
                                <button className='pass-hider' type='button' onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                                    {isNewPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                        </form>
                        <div className="buttons">
                            <button className="save" onClick={handleChangePassword}>Yadda saxla</button>
                            <button className="cancel" onClick={() => navigate("/user-profile")}>Ləğv et</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ChangePassword;
