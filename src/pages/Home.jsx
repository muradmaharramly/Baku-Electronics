import React, { useState } from 'react'
import HeroSlider from "../components/sliders/HeroSlider"
import VideoRollSlider from "../components/sliders/VideoRollSlider"
import { PiHandPeace } from 'react-icons/pi'
import { MdOutlineCloudDone } from 'react-icons/md'
import { LuClipboardList } from 'react-icons/lu'
import { BsCalendar4Week } from 'react-icons/bs'
import NewsSlider from '../components/sliders/NewsSlider'
import ProductList from '../components/ProductList'
import FilteredProductList from '../components/FilteredProductList'
import { Link } from 'react-router-dom'
import BrandsSlider from '../components/sliders/BrandsSlider'

const Home = () => {
  const [rotation1, setRotation1] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
  const [rotation2, setRotation2] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });

  const handleMouseMove1 = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * 20;

    const shadowX = (e.clientX - left - width / 2) / 10;
    const shadowY = (e.clientY - top - height / 2) / 10;

    setRotation1({ x, y, shadowX, shadowY });
  };

  const handleMouseLeave1 = () => {
    setRotation1({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
  };
  const handleMouseMove2 = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * 20;

    const shadowX = (e.clientX - left - width / 2) / 10;
    const shadowY = (e.clientY - top - height / 2) / 10;

    setRotation2({ x, y, shadowX, shadowY });
  };

  const handleMouseLeave2 = () => {
    setRotation2({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
  };
  return (
    <div className='home-container'>
      <HeroSlider />
      <div className='why-us'>
        <div className='card'>
          <div><PiHandPeace /></div>
          <h2>Arxayın al!</h2>
          <p>30 gün müddətində istər dəyiş, istər geri qaytar.</p>
        </div>
        <div className='card'>
          <div><MdOutlineCloudDone /></div>
          <h2>Sürətli çatdırılma</h2>
          <p>24 saat ərzində çatdırılma</p>
        </div>
        <div className='card'>
          <div><LuClipboardList /></div>
          <h2>Qapıda ödəmə</h2>
          <p>Qapıda ödəmə rahatlığı ilə sifariş imkanı</p>
        </div>
        <div className='card'>
          <div><BsCalendar4Week /></div>
          <h2>Hissə-hissə ödəniş</h2>
          <p>Endirimli qiymətə indi al, 3 aya böl, hissə-hissə ödə!.</p>
        </div>
      </div>
      <div className="products-container">
        <div className="area-head">
          <p>Ən çox satılanlar</p>
          <h3>Ən çox satılanlar</h3>
        </div>
        <ProductList />
      </div>
      <FilteredProductList />
      <VideoRollSlider />
      <div className='preorder-container'>
        <div className='card' onMouseMove={handleMouseMove1}
          onMouseLeave={handleMouseLeave1}
          style={{
            transform: `perspective(1000px) rotateX(${-rotation1.y}deg) rotateY(${rotation1.x}deg)`,
            boxShadow: rotation1.shadowX === 0 && rotation1.shadowY === 0
              ? "0px 0px 5px rgba(0, 0, 0, 0.3)"
              : `${-rotation1.shadowX}px ${-rotation1.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
          }}>
          <div className='left'>
            <div className='text'>
              <span>Yeniliklər</span>
              <h1>Yeni MOTOROLA G75 modeli</h1>
            </div>
            <Link to="/products/smartfon-motorola-g75-8gb256gb-aqua-blue" onMouseMove={handleMouseMove1}
              onMouseLeave={handleMouseLeave1}
              style={{
                transform: `perspective(1000px) rotateX(${-rotation1.y}deg) rotateY(${rotation1.x}deg)`,
                boxShadow: rotation1.shadowX === 0 && rotation1.shadowY === 0
                  ? "0px 0px 5px rgba(0, 0, 0, 0.3)"
                  : `${-rotation1.shadowX}px ${-rotation1.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
              }}>İndi al</Link>
          </div>
          <div className='right' onMouseMove={handleMouseMove1}
            onMouseLeave={handleMouseLeave1}
            style={{
              transform: `perspective(1000px) rotateX(${-rotation1.y}deg) rotateY(${rotation1.x}deg)`,
              boxShadow: rotation1.shadowX === 0 && rotation1.shadowY === 0
                ? "0px 0px 5px rgba(0, 0, 0, 0.3)"
                : `${-rotation1.shadowX}px ${-rotation1.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
            }}>
            <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fnews%2F65331-motorola-moto-g75-3.jpg&w=1920&q=75' />
          </div>
        </div>
        <div className='card' onMouseMove={handleMouseMove2}
          onMouseLeave={handleMouseLeave2}
          style={{
            transform: `perspective(1000px) rotateX(${-rotation2.y}deg) rotateY(${rotation2.x}deg)`,
            boxShadow: rotation2.shadowX === 0 && rotation2.shadowY === 0
              ? "0px 0px 5px rgba(0, 0, 0, 0.3)"
              : `${-rotation2.shadowX}px ${-rotation2.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
          }}>
          <div className='left'>
            <div className='text'>
              <span>Kampaniya</span>
              <h1>Ev heyvanları üçün məhsul</h1>
            </div>
            <Link to="/products/petkit-kicik-itler-ve-pisikler-ucun-animal-bag-breezy-2-smart-cat-carrier-green-(p7704-green)" onMouseMove={handleMouseMove2}
              onMouseLeave={handleMouseLeave2}
              style={{
                transform: `perspective(1000px) rotateX(${-rotation2.y}deg) rotateY(${rotation2.x}deg)`,
                boxShadow: rotation2.shadowX === 0 && rotation2.shadowY === 0
                  ? "0px 0px 5px rgba(0, 0, 0, 0.3)"
                  : `${-rotation2.shadowX}px ${-rotation2.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
              }}>Burada</Link>
          </div>
          <div className='right' onMouseMove={handleMouseMove2}
            onMouseLeave={handleMouseLeave2}
            style={{
              transform: `perspective(1000px) rotateX(${-rotation2.y}deg) rotateY(${rotation2.x}deg)`,
              boxShadow: rotation2.shadowX === 0 && rotation2.shadowY === 0
                ? "0px 0px 5px rgba(0, 0, 0, 0.3)"
                : `${-rotation2.shadowX}px ${-rotation2.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
            }}>
            <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fnews%2Fanimal-bag-breezy-2-smart-cat-carrier-green-p7704-green-3_AcrWJ0G.jpg&w=1920&q=75' />
          </div>
        </div>
      </div>
      <NewsSlider />
      <BrandsSlider />
    </div>
  )
}

export default Home