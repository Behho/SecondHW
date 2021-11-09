import React from 'react'
import servercall from '../../server/servercall'
import ProductsList from '../ProductsList'

class HomePage extends React.Component{  
constructor(){
    super()
    this.state = {
      products:[],
      isLoading:true
    }
    this.AddToFavorite = this.AddToFavorite.bind(this)
  }

  componentDidMount(){
    servercall("server.json").then((item) => localStorage.setItem('products', JSON.stringify(item)))
    .then(() => this.setState({products:JSON.parse(localStorage.getItem("products"))}))
    this.setState({isLoading:false})
  }

  AddToFavorite(id){
  const favorite = []
  const Storege = JSON.parse(localStorage.getItem('favorite'))
  const inFavorite = this.state.products.find((product => product.id === id))
    if(Storege === null){
      favorite.push(inFavorite)
      localStorage.setItem('favorite', JSON.stringify(favorite))
    }if(Storege){
     const index =  Storege.findIndex(product => product.id === id)
    if(index === -1){
      favorite.push(inFavorite)
      favorite.push(...Storege)
    }else{
      Storege.splice(index, 1)
      favorite.push(...Storege)
    }
    localStorage.setItem('favorite', JSON.stringify(favorite)) 
    }
  }


  
  render(){
    const {products, isLoading} = this.state
    return(
      <>
      {isLoading ? 'Loading' :
       <ProductsList onClick={this.AddToFavorite} products={products}/>
      }
      </>
    )
  }
}

export default HomePage