import React from 'react'
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

const Home = () => {
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
        <div className='card'>
          <div className='left'>
            <div className='text'>
              <span>Yeniliklər</span>
              <h1>Yeni MOTOROLA G75 modeli</h1>
            </div>
            <Link>İndi al</Link>
          </div>
          <div className='right'>
            <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fnews%2F65331-motorola-moto-g75-3.jpg&w=1920&q=75' />
          </div>
        </div>
        <div className='card'>
          <div className='left'>
            <div className='text'>
              <span>Kampaniya</span>
              <h1>Ev heyvanları üçün məhsul</h1>
            </div>
            <Link>Burada</Link>
          </div>
          <div className='right'>
            <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fnews%2Fanimal-bag-breezy-2-smart-cat-carrier-green-p7704-green-3_AcrWJ0G.jpg&w=1920&q=75' />
          </div>
        </div>
      </div>
      <NewsSlider />
    </div>
  )
}

export default Home