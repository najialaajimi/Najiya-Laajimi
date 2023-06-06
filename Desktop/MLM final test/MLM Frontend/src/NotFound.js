import React from 'react'
import { useNavigate } from 'react-router-dom';
import { config } from './user/utils/config';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const navigate = useNavigate();
  /* const authState = useSelector(state => state.auth)
  console.log(authState.user.role.admin);
  const handleClick = () => {
    if (config) {
      navigate('/user') ;
    } else {
      window.location.href = "/"; 
    }
  } */
   
  const handleClick = () => {
    const role = localStorage.getItem('role');
    
    switch(role) {
      case 'admin':
        // Vérifier si l'administrateur est connecté
        if (isAdminConnected()) {
          navigate('/admin');
        } else {
          navigate('/connexion-admin');
        }
        break;
      case 'user':
        navigate('/user');
        break;
      default:
        navigate('/');
        break;
    }
  }
  
  function isAdminConnected() {
    // Vérifier si l'administrateur est connecté en vérifiant si son token est présent
    const adminToken = localStorage.getItem('adminToken');
    return (adminToken !== null && adminToken !== undefined);
  }
  
  return (
    <>
    {/* 
    <div className='imagesback' style={{backgroundImage: "url('/images/404.webp')"}} ></div>
    <h1>404</h1>
    <p>Oopps , page not found</p>
    */}
    <button onClick={handleClick} className='button404'>Retourner à la page d'accueil</button>
    <img src="/images/404.jpg" className='image404' alt="Erreur 404 : Page introuvable" /> 
    </>
  )
}

export default NotFound