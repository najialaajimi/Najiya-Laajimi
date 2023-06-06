import React from 'react'
import CustomInput from '../components/CustomInput'

const compte = () => {
  return (
    <>
        <div className='compte'>
          <h3 className="contact-title mb-4">Mon Compte</h3>
          <form
          className="d-flex gap-3 flex-column"
        >
          
    <CustomInput type="text" label="Saisir votre Nom" name="nom" id="nom"/>
    <CustomInput type="text" label="Saisir votre Prénom" name="prenom" id="prenom"/>
    <CustomInput type="text" label="Saisir votre Email" name="email" id="email"/>
    <CustomInput type="password" label="Saisir Mot de passe" name="password" id="password"/>
    <CustomInput type="text" label="Saisir votre Numéro de télephone" name="mobile" id="mobile"/>
              <button
                className="btn btn-success rounded-3 border-0 my-3"
                type="submit"
              >
                Modifier
              </button>
          </form>
        </div>
    </>
  )
}

export default compte