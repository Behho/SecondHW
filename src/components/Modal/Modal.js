import React from 'react'
import './ModalStyle.scss'

class Modal extends React.Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        const {modals, onClick, product} = this.props
        const activeModal = modals.filter(({isUse}) => isUse)
        return(
            <>
            {activeModal.map(modal =><div className="modal" key={modal.id}>
            <div className="modal-bg" onClick={onClick(modal.type)}></div>
            <div className="modal-body" style={{background:modal.modalBackground}}>
                <div className="modal-header">
                    <h2 className="modal-header--headline">{modal.header}  "{product.name}" ?</h2>
                    <div onClick={onClick(modal.type)} className="modal-header--crose">
                        <span className="modal-header--crose__active"></span>
                    </div>
                </div>
                <div className="modal-main_content">
                    <p>{modal.text}</p>
                    <div className="modal-buttons">
                    <span onClick={(id ,activeType) => {this.props.AddTocart(product.id, modal.type)}}>Ok</span>
                    {modal.closeButton ? <span onClick={onClick(modal.type)}>Canse</span>: false}
                    </div>
                </div>
            </div>
            </div>)}
            </>
        )
    }
}

export default Modal