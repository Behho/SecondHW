import React from 'react'
import "./ButtonStyle.scss"
class Button extends React.Component{
    render(){
        const {onClick, backgroundColor} = this.props 
        return(
            <>
            <button style={{background: backgroundColor}} onClick={onClick}>{this.props.children}</button>
            </>
        )
    }
}

export default Button