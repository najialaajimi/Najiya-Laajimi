import React from 'react'
import CustomInput from '../components/CustomInput'

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" , minHeight:"100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Mot de passe oublié</h3>
        <p className="text-center">Veuillez entrer votre e-mail d'inscription pour recevoir un e-mail de réinitialisation du mot de passe.
        </p>
        <form action="">
          <CustomInput type="text" placeholder="Email Address" id="email" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ background: "#ffd333" }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword