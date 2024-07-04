import React, { useEffect, useRef, useState } from 'react';
import {api} from './api'
import './Summary.css'

const Summary = ({total}) => {

  const [cupom, setCupom] = useState(0)
  const [isValid, setIsValid] = useState(false)

  const descontoRef = useRef()

  const applyDesconto = () => {
    if(isValid) {
      setCupom(20)
      closeDesconto()
    }
  }

  const handleChange = (e) => {
    let insert = e.target.value;
    if(insert.toUpperCase() === "DEV24"){
      setIsValid(true)
    } else{
      setIsValid(false)
    }
  }

  const closeDesconto = () => {
    descontoRef.current.style.display = "none";
  }

  const addDesconto = () => {
    descontoRef.current.style.display = "flex";
  }


  return (
    <>
      <div className='box'>
        <div className='desconto-div' ref={descontoRef}>
          <i className='bx bx-x' onClick={closeDesconto}></i>
          <span>Adicione seu cumpom:</span>
          <input type="text" placeholder='Cupom' onChange={handleChange} />
          {isValid === true ? <span>Cupom válido!</span> : <span>Nenhum cupom encontrado</span>}
          <button disabled={isValid === false} onClick={applyDesconto}>Aplicar</button>
        </div>
        
        <header>Resumo da compra</header>
        <div className='info'>
          <div>
            <span>Sub-total</span>
            <span>R$ {total}</span>
          </div>
          <div>
            <span>Desconto</span>
            <span>R$ {cupom}</span>
          </div>
          <div>
            <button onClick={addDesconto}>
              Adicionar cupom de desconto
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {total - cupom}</span>
        </footer>
      </div>
      <button>Finalizar Compra</button>
    </>
  );
};

export default Summary;
