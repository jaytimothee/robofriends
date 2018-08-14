import React from 'react';

const SearchBox = ({search })=>{
  return(
    <div className='pa2'>
      <input className='pa3 ba b--green bg-light-blue' type='search' placeholder='search Bots' onChange={search}/>
    </div>
  );
}

export default SearchBox;
