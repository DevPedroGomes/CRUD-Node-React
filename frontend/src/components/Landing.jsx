import React from 'react'
import { Link } from 'react-router-dom'; // Corrigindo a importação do Link

function Landing()  {
  return (
    <div className='jumbotron'>
      <h1>Welcome to Todo List!</h1>
      <p>Sign In and Start!</p>
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/register" className="btn btn-primary ml-3">Register</Link>
    </div>
  )
  
}

export default Landing
