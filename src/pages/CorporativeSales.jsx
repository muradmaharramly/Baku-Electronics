import React from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const CorporativeSales = () => {
    return (
        <div className='corporative-sales'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Korporativ satışlar</span></div>
            <div className='img-area'>
                <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fflat_page%2Fbe_corp.jpg&w=1920&q=75'></img>
            </div>
            <div className='text-area'>
                <h1>Korporativ satışlar</h1>
                <p className='title'>İşinizi bir addım irəli aparaq!</p>
                <p className='text'>Baku Electronics MMC, Azərbaycanda elektronika sahəsində ən böyük pərakəndə satış şəbəkələrindən biri olmaqla yanaşı, korporativ müştərilərlə əməkdaşlığa da xüsusi önəm verir.
                    Uzunmüddətli təcrübəmiz, etibarlılığımız və peşəkarlığımız sayəsində ölkənin aparıcı ticarət şirkətləri, dövlət müəssisələri və özəl sahibkarlar bizi öz bizneslərinin etibarlı tərəfdaşı kimi seçirlər.
                    Saytımızda gördüyünüz məhsullarla yanaşı əlavə olaraq, rəsmi distribyutor olduğumuz markaların otel TV-ləri, video-divarlar, 7/24 işləyən displeylər, ağıllı lövhələr, bu kimi digər peşakar avadanlıqların korporativ satışını həyata keçiririk.
                </p>
                <p className='p-b'>Korporativ müştərilərimizə təqdim etdiyimiz üstünlüklər:</p>
                <ul>
                    <li>Eksklüziv şərtlər və xüsusi endirimli qiymətlər </li>
                    <li>Fərdi yanaşma prinsipi</li>
                    <li>Operativ və peşəkar dəstək</li>
                </ul>
                <p>Hər bir müştərimizə fərdi menecer təyin etməklə, həm ticarət, həm də təşkilati məsələlərin ən qısa zamanda həllini təmin edirik.</p>
                <p className='p-b'>Bizimlə əlaqə saxlayın:</p>
                <span>📞+99455 333-41-13</span>
                <span>📞+99455 208-50-03</span>
                <span>📞+99455 205-59-39</span>

                <span className='mail'>📧corp@bakuelectronics.az</span>
                <span>Sizin şirkətinizin elektronika dostu olmaqdan qürur duyuruq!</span>
            </div>

        </div>
    )
}

export default CorporativeSales