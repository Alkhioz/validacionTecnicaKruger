import './modal.css';

const Modal=(props)=>{
    return(
        <div className="Modal" style={{display: props.show ?'grid':'none'}}>
            <div className="ModalCard">
                {props.children}
            </div>
        </div>
    );
}
export default Modal;