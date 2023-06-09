import React from 'react'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" , minHeight:"100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Connexion</h3>
        <p className="text-center">
          Veuillez entrer votre nouveau mot de passe.
        </p>
        <form action="">
          <CustomInput type="Password" label="New Password" id="pass" />
          <CustomInput type="Password" label="Confirm Password" id="pass" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ background: "#ffd333" }}
          >
            réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword