import React from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const DoubleGuarantee = () => {
    return (
        <div className='double-guarantee'>
            <div className="breadcrumb"><Link>Ana səhifə</Link><RiArrowRightDoubleFill /><span>İkiqat zəmanət</span></div>
            <div className='img-area'>
                <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fflat_page%2F2qat-slider.jpg&w=1920&q=75'></img>
            </div>
            <div className='text-area'>
                <h1>Qiymətlərimizə ikiqat zəmanət veririk!</h1>
                <h3>Bəyəndiyiniz məhsulu aşağı qiymətə tapsanız, fərqin iki qatını geri qaytarırıq!</h3>
                <p>Məhsulu bəyənmisiz, amma daha aşağı qiymətə taparam deyə düşünürsüz?</p>
                <p>Düşünməyin, çünki biz qiymətlərə ikiqat zəmanət veririk. Almaq istədiyiniz məhsulu aşağı qiymətə tapsanız, həm fərqi qaytarırıq, həm də fərq qədər keşbek veririk.</p>
                <p>Alış-verişin qalibi olmaq istəyirsinizsə, Baku Electronics-ə gəlin!</p>
                <p>İkiqat zəmanət haqqında ətraflı məlumat əldə etmək üçün şərtlərlə tanış olun.</p>
                <ul>
                    <li>İKİQAT ZƏMANƏT-in ŞƏRTLƏRİ</li>
                    <li>
                        “İkiqat zəmanət” satışdan öncə və ya cari satış tarixi müddətində müraciət etmiş və
                        şirkətin loyallıq proqramında iştirak edən istehlakçılara tətbiq edilir.
                    </li>
                    <li>
                        “İkiqat zəmanət” nağd, hissəli və taksitli (rəqiblə eyni şərtlər saxlanılmaqla) satışlara ödəniş tiplərindən asılı olmayaraq şamil edilir.
                    </li>
                    <li>
                        Layihə cari aksiya şərti ilə alınan yekun qiymətlə rəqib qiyməti arasındakı fərqə tətbiq edilir.
                        Bu halda alıcı fərqin 100 %-i qədər endirim və fərqin 100 %-i qədər keşbek qazanır.
                    </li>
                    <li>İstisna hallar aksiya elanı ilə müəyyən edilir.</li>
                    <li>
                        Rəqib şirkətin regionlara özəl aksiya şərtinin tətbiqi nəticəsində yaranmış fərqə görə kompensasiya yalnız həmin region
                        (rayon, şəhər nəzərdə tutulur) mağazalarında tətbiq edilir.
                    </li>
                    <li>
                        İstehlakçı bir məhsuldan yalnız 1 (bir) ədəd ala bilər
                        (ev əşyaları kateqoriyasına aid boşqab, fincan və ya digər komplekt şəklində satışı həyata keçirilən məhsullar istisnadır).
                    </li>
                    <li>
                        İstehlakçıya kompensasiyanın təqdim edilməsi üçün məhsula müəyyən edilən tələblər aşağıda sadalanıb:
                        <ul className='secondary-list'>
                            <li>Tamamilə eyni olmalıdır (modeli, rəngi, komplektasiyası və s.);</li>
                            <li>Tam komplektasiyalı olmalıdır;</li>
                            <li>Normal satışa yararlı olmalıdır (qüsurlu və ya standart satışa yararlı olmayan məhsul olmamalıdır).</li>
                        </ul>
                    </li>
                    <li>
                        İstehlakçı tərəfindən təqdim olunan qiymət fərqi aşağıda sadalanmış mənbələrin hər hansı birindən sübuta yetirilir:
                        <ul className='secondary-list'>
                            <li>Rəsmi veb-sayt;</li>
                            <li>Sosial şəbəkədəki rəsmi səhifə.</li>
                        </ul>
                    </li>
                    <li>
                        Rəqibə məxsus mənbələrdə qiymət fərqinin cari tarixə uyğun olması və məhsulun stokda mövcudluğu mütləqdir.
                    </li>
                    <li>Bu layihə üzrə satışı həyata keçirilən məhsula standart hesablanan keşbek şamil edilmir.</li>
                    <li>
                        Standart keşbek məbləği bu layihə çərçivəsində təqdim edilmiş şərtlərdən daha yüksək olarsa,
                        istehlakçı seçimi əsasında bu layihənin özəl şərti və ya standart satış tətbiq edilir.
                    </li>
                    <li>
                        Veb-saytdan sifariş verdikdə “Əlavə şərh” bölməsində rəqibin rəsmi veb-saytından və ya sosial şəbəkələrdən müvafiq link
                        və ya rəqibin adı, malın modeli və qiyməti qeyd edilməlidir.
                    </li>
                    <li>
                        Çağrı mərkəzi və ya sosial şəbəkə vasitəsilə sifariş verdikdə rəqibin adı, məhsulun modeli və qiymətini qeyd edilməlidir.
                    </li>
                    <li>
                        Mal qaytarıldığı halda qaydalara uyğun olaraq layihə nəticəsində qazanılan keşbeklər qaytarılır və ya istifadə
                        olunduğu halda əvəzi ödənilməsi təmin edilir.
                    </li>
                    <li>Kampaniya qaydaları əvvəlcədən xəbərdarlıq edilmədən dəyişdirilə bilər.</li>
                </ul>
                <h4>İkiqat zəmanət yanvarın 6-dan 2025 dayandırılıb.</h4>

            </div>

        </div>
    )
}

export default DoubleGuarantee;