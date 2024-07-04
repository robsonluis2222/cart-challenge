import React from 'react';

const PageTitle = ({ data }) => {
  return <div className='page-title'>
    {data || '{insira um titulo}'}
    <p>cupom: DEV24</p>
  </div>;
};

export default PageTitle;
