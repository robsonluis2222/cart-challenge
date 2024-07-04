import React from 'react';
import {api} from './api'

const TableRow = ({id, nome, categoria, quantidade, totalDele, preco, removeProduct, updateProduct}) => {


  return (
    <tr>
      <td>
        <div className='product'>
          <img src='https://picsum.photos/100/120' alt='' />
          <div className='info'>
            <div className='name'>{nome}</div>
            <div className='category'>{categoria}</div>
          </div>
        </div>
      </td>
      <td>R$ {preco}</td>
      <td>
        <div className='qty'>
          <button onClick={() => updateProduct('menos', id, nome, categoria, preco, quantidade)} disabled={quantidade < 2}>
            <i className='bx bx-minus'></i>
          </button>
          <span>{quantidade}</span>
          <button onClick={() => updateProduct('mais', id, nome, categoria, preco, quantidade)}>
            <i className='bx bx-plus'></i>
          </button>
        </div>
      </td>
      <td>R$ {totalDele}</td>
      <td>
        <button className='remove' onClick={() => removeProduct(id)}>
          <i className='bx bx-x'></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
