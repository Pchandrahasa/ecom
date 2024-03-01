import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {productData: [], similarProductList: []}

  componentDidMount() {
    this.getSimilarProducts()
  }

  getSimilarProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'Get',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const UpdatedDta = {
      id: data.id,
      imageUrl: data.image_url,
      description: data.description,
      price: data.price,
      rating: data.rating,
      brand: data.brand,
      availability: data.availability,
      title: data.title,
      totalReviews: data.total_reviews,
    }

    const updatedSimilarProductList = data.similar_products.map(i => ({
      id: i.id,
      availability: i.availability,
      brand: i.brand,
      imageUrl: i.image_url,
      price: i.price,
      rating: i.rating,
      style: i.style,
      title: i.title,
    }))

    console.log(updatedSimilarProductList)

    this.setState({
      productData: UpdatedDta,
      similarProductList: updatedSimilarProductList,
    })
  }

  render() {
    const {productData, similarProductList} = this.state
    const {
      description,
      imageUrl,
      price,
      rating,
      brand,
      availability,
      title,
      totalReviews,
    } = productData
    return (
      <>
        <Header />
        <div className="product-container">
          <img src={imageUrl} alt="" className="product-image" />
          <div className="product-card-container">
            <h1>{title}</h1>
            <h1>Rs {price}/- </h1>
            <div className="ratingContainer">
              <p>{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                className="star-image"
                alt=""
              />
              <p>
                {totalReviews} <span>Reviews</span>
              </p>
            </div>

            <p className="para">{description}</p>
            <p>
              <span>Availability</span>: {availability}
            </p>
            <p>
              <span>Brand</span>: {brand}
            </p>
            <hr />
            <div className="add-container">
              <button type="button" className="add-button">
                -
              </button>
              <p>1</p>
              <button type="button" className="add-button">
                +
              </button>
            </div>
            <button className="add-to-cart" type="button">
              Add To Cart
            </button>
          </div>
        </div>
        <div>
          <h1 className="header">Similar Products</h1>
          <ul className="similar-list">
            {similarProductList.map(i => (
              <SimilarProductItem similarProductList={i} key={i.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default ProductItemDetails
