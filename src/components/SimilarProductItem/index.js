import './index.css'

const SimilarProductItem = props => {
  const {similarProductList} = props
  const {imageUrl, brand, price, rating, title} = similarProductList
  return (
    <li className="similar-container">
      <img src={imageUrl} className="similar-image" alt="" />
      <h1>{title}</h1>
      <p>By {brand}</p>
      <div className="price-rating">
        <h1>Rs {price}/-</h1>
        <div className="star-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png "
            className="star-image"
            alt=""
          />
          <p>{rating}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
