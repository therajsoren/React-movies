import React from 'react';
import heroImage from './assets/hero.png';

const App = () => {
  return (
   <main>
    <div className='pattern' />
    <div className='wrapper'/>
    <header>
      {/* <img src='./assets/hero.png'/> not working */}
      <img src={heroImage}/>
      
      <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
    </header>

    <p>Search</p>
   </main>
  )
}


export default App