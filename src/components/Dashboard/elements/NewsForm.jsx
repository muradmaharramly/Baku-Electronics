import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';

const categories = ["Xəbər", "Bloq", "Tanıtım" ];

const NewsForm = ({ existingNews, isEditMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImageLink] = useState('');
    const [viewCount, setViewCount] = useState('');
    const [imageError, setImageError] = useState('');
    const [viewError, setViewError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingNews) {
            setTitle(existingNews.title);
            setDescription(existingNews.description);
            setCategory(existingNews.category);
            setImageLink(existingNews.image);
            setViewCount(existingNews.viewCount);
        }
    }, [isEditMode, existingNews]);

    const validateForm = () => {
        let isValid = true;
        setImageError('');
        setViewError('');

        if (image && !/^https?:\/\//.test(image)) {
            setImageError('Şəkil linki "http" və ya "https" ilə başlamalıdır');
            isValid = false;
        }

        if (viewCount && (isNaN(viewCount) || parseFloat(viewCount) <= 0 || !Number.isInteger(parseFloat(viewCount)))) {
            setViewError('Baxış sayı müsbət tam ədəd olmalıdır');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const currentDate = new Date().toISOString(); 

        const newsData = { 
            title, 
            description, 
            category, 
            image, 
            viewCount: parseInt(viewCount, 10), 
            editDate: currentDate
        };

        let result;
        if (isEditMode) {
            const { error } = await supabase
                .from('news')
                .update(newsData)
                .eq('id', existingNews.id);
            result = error ? { success: false, message: error.message } : { success: true };
        } else {
            const { error } = await supabase.from('news').insert([newsData]);
            result = error ? { success: false, message: error.message } : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? 'Xəbər yeniləndi!' : 'Xəbər əlavə olundu!',
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
                navigate('/administrative/news');
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
        navigate('/administrative/news');
    };

    return (
        <div className="news-form">
            <form onSubmit={handleSubmit}>
                <div className="form-double">
                    <div className="form-group">
                        <label>Başlıq</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>                       
                    <div className="form-group">
                        <label>Şəkil linki</label>
                        <input type="text" value={image} onChange={(e) => setImageLink(e.target.value)} />
                        {imageError && <span className="error-message">{imageError}</span>}
                    </div>
                </div>
                <div className="form-double">
                    <div className="form-group">
                        <label>Kateqoriya</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Kateqoriya seçin</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Baxış sayı</label>
                        <input type="text" value={viewCount} onChange={(e) => setViewCount(e.target.value)} />
                        {viewError && <span className="error-message">{viewError}</span>}
                    </div>
                </div>
                <div className='form-first'>
                    <div className="form-group">
                        <label>Açıqlama</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>                    
                </div>
                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Ləğv et</button>
                    <button type="submit" className="submit-btn">
                        {isEditMode ? 'Yenilə' : 'Göndər'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm;
