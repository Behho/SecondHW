import React from 'react'
import './Product.scss'
import { BsBookmarkStarFill } from 'react-icons/bs';
import Buttons from './Buttons/Buttons'
import Modal from './Modal/Modal.js'

class Product extends React.Component{
constructor(props){
    super(props)
    this.state = {
        isFavorite: false,
        button:{id:1,text:"Add to cart",backgroundColor:'rgb(216, 87, 64)' ,activeType:'OkCance'},
        modals:[{id:1,closeButton:true, 
            header:'You want to add', 
            text:``, 
            isUse:false ,type:'OkCance',
            modalBackground:'rgb(216, 87, 64)'}]
    }
    this.ModalVisible = this.ModalVisible.bind(this)
    this.AddTocart = this.AddTocart.bind(this)
}
AddTocart(id ,activeType){
    const Cart = []
    const Storage = JSON.parse(localStorage.getItem('Cart'))
    const products = JSON.parse(localStorage.getItem('products'))
    const inCart = products.find((product => product.id === id))
    if(Storage === null){
      Cart.push(inCart)
      localStorage.setItem('Cart', JSON.stringify(Cart))
    }else{
      Cart.push(...Storage)
      Cart.push(inCart)
      localStorage.setItem('Cart', JSON.stringify(Cart))
    }
    this.ModalVisible(activeType)
  }
    componentDidMount(){
        const favorite = JSON.parse(localStorage.getItem('favorite'))
        if(favorite != null){
        const fav = favorite.some(fee => fee.id === this.props.product.id)
        this.setState({isFavorite:fav})
        }
    }
    MarkAsFavorite(){
        this.setState({isFavorite:!this.state.isFavorite})
    }
    ModalVisible(activeType){
        const active = this.state.modals.map((modal) => {
          if(activeType === modal.type){
            return{
              ...modal,isUse:!modal.isUse
            }
          }
          return modal
        })
        this.setState({modals:active})
      }
    render(){
        const {product} = this.props
        const clickModalVisibleHeandler = activeType => () => this.ModalVisible(activeType)
        return(
            <div className="product">
                <img src={product.img} className="product-img" alt="product img"/>
                <div className="product-title">
                    <h4 className="product-title_head">{product.name}</h4>
                    <p className="product-title_product-creator"> by {this.props.creator}</p>
                    <p className="product-prise">{product.prise}</p>
                    <BsBookmarkStarFill 
                    className="product-fav-icon"
                    cursor="pointer"
                    size="50px" onClick={(id) => {this.props.onClick(product.id); this.MarkAsFavorite()}} 
                    color={this.state.isFavorite ? "#f5e945" : "black"}/>
                    <Buttons button={this.state.button} onClick={clickModalVisibleHeandler}/>
                </div>
                <Modal onClick={clickModalVisibleHeandler} 
                AddTocart={this.AddTocart}  modals={this.state.modals} 
                product={product}></Modal>
            </div>
        )
    }
}
Product.defaultProps = {
    creator: "creator"
  };


export default Product