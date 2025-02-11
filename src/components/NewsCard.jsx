import React from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'
import slugify from 'slugify'

const NewsCard = ({ singlenews }) => {
    return (
        <Link to={`/news/${slugify(singlenews.title, { lower: true })}`}>
            <div className='news-card'>

                <div className='img-div'>
                    <img src={singlenews.image} />
                </div>
                <h5>{singlenews.title.substring(0, 30)}...</h5>
                <p>Xeberler</p>
                <div className='card-ending'>
                    <span>{singlenews.date.slice(0, 10)}</span>
                    <Link>Bax<MdArrowRightAlt /></Link>
                </div>
            </div>
        </Link>
    )
}

export default NewsCard