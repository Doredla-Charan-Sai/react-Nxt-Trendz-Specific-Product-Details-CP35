// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    specificProduct: {},
    apiStatusFroSpePro: apiStatusConstants.initial,
    count: 1,
  }

  componentDidMount() {
    this.getProductAPI()
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onContinue = () => {
    const {history} = this.props
    history.push('/products')
  }

  getProductAPI = async () => {
    this.setState({apiStatusFroSpePro: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productAPTUrl = `https://apis.ccbp.in/products/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(productAPTUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedProductData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products.map(eachSimiItem => ({
          availability: eachSimiItem.availability,
          brand: eachSimiItem.brand,
          description: eachSimiItem.description,
          id: eachSimiItem.id,
          imageUrl: eachSimiItem.image_url,
          price: eachSimiItem.price,
          rating: eachSimiItem.rating,
          style: eachSimiItem.style,
          title: eachSimiItem.title,
          totalReviews: eachSimiItem.total_reviews,
        })),
      }
      this.setState({
        specificProduct: updatedProductData,
        apiStatusFroSpePro: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusFroSpePro: apiStatusConstants.failure})
    }
  }

  renderCases = () => {
    const {apiStatusFroSpePro} = this.state
    switch (apiStatusFroSpePro) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-cont">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {specificProduct, count} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
      similarProducts,
    } = specificProduct
    console.log(similarProducts)
    return (
      <div className="product-spe-cont">
        <div className="pro-cont">
          <img className="product-mg" src={imageUrl} alt="product" />
          <div className="text-cont">
            <h1 className="title">{title}</h1>
            <p className="price-spe-pro">Rs. {price}/-</p>
            <div className="pro-cont">
              <div className="pro-cont rating-cont">
                <p className="rating-spe-pro">{rating}</p>
                <img
                  className="rating-star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="review-spe-pro">{totalReviews} Reviews</p>
            </div>
            <p className="des-spe-pro">{description}</p>
            <p className="avail-spe-pro">
              <span style={{fontWeight: 'bold'}}>Available:</span>{' '}
              {availability}
            </p>
            <p className="brand-spe-pro">
              <span style={{fontWeight: 'bold'}}>Brand:</span> {brand}
            </p>
            <hr className="line" />
            <div className="pro-cont">
              <button
                data-testid="minus"
                type="button"
                className="count-btn"
                onClick={this.onDecrement}
                label="minus"
              >
                <BsDashSquare className="plus-minus" />
              </button>

              <p className="spe-pro-count">{count}</p>
              <button
                type="button"
                className="count-btn"
                onClick={this.onIncrement}
                data-testid="plus"
                label="plus"
              >
                <BsPlusSquare className="plus-minus" />
              </button>
            </div>

            <button type="button" className="add-to-cart">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="simi-title">Similar Products</h1>
        <ul className="simi-pro-list">
          {similarProducts.map(eachSimiPro => (
            <SimilarProductItem
              simiProDetails={eachSimiPro}
              key={eachSimiPro.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-cont">
      <img
        className="failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1 className="fail-head">Product Not Found</h1>
      <button type="button" onClick={this.onContinue} className="add-to-cart">
        Continue Shopping
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderCases()}
      </>
    )
  }
}

export default ProductItemDetails
