import React from 'react'
import { useNavigate } from 'react-router'
import { ControlledForm } from '../components/ControlledForm'
import { UncontrolledForm } from '../components/UncontrolledForm'
import '../styles/Main.css'

export const Main = () => {
  const navigate = useNavigate()

  return (
    <div className="main_container">
      <h1 className="main_title">Main Page</h1>
      <div className="form_wrapper">
        <div
          className="controlled_form form"
          onClick={() => navigate('/form-controlled')}
        >
          <h2 className="form_title">Controlled Form</h2>
          <ControlledForm />
        </div>
        <div
          className="uncontrolled_form form"
          onClick={() => navigate('/form-uncontrolled')}
        >
          <h2 className="form_title">Uncontrolled Form</h2>
          <UncontrolledForm />
        </div>
      </div>
    </div>
  )
}
