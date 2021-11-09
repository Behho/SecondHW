import React from 'react'
import Product from './Product.js'
import "./ProductsList.scss"

class ProductsList extends React.Component{
    render(){
        const {products} = this.props
        return(
            <div className="products-list-wrapper">
                <div className="products-list">
                    {products.map(product => <Product onClick={this.props.onClick} product={product} key={product.id}></Product>)}
                </div>
            </div>
        )
    }
}
export default ProductsList