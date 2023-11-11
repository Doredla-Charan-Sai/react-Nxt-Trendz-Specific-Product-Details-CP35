// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {simiProDetails} = props
  const {imageUrl, title, price, rating, brand} = simiProDetails

  return (
    <li className="simi-pro-card">
      <img className="simi-pro-mg" src={imageUrl} alt="similar product" />
      <h1 className="title" style={{fontSize: '25px'}}>
        {title}
      </h1>
      <p className="simi-pro-brand">by {brand}</p>
      <div className="rate-price-cont">
        <p className="price-spe-pro">Rs. {price}/-</p>
        <div className="rating-cont pro-cont">
          <p className="rating-spe-pro">{rating}</p>
          <img
            className="rating-star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
