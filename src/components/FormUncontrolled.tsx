import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { validation } from '../validation'
import { addUncontrolledData } from '../store/formSlice'
import '../styles/Form.css'
import * as Yup from 'yup'

export const FormUncontrolled = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state: RootState) => state.form.countries)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)
  const pictureRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)

  const handleFormSumbit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value || 0),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files ? pictureRef.current.files[0] : null,
      country: countryRef.current?.value || '',
    }

    try {
      await validation.validate(data, { abortEarly: false })

      dispatch(addUncontrolledData(data))
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {}
        error.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message
        })
        setErrors(validationErrors)
        console.log(validationErrors)
      }
    }
  }

  return (
    <div className="form_wrapper">
      <form onSubmit={handleFormSumbit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameRef} />
          {errors.name && <span>{errors.name.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" ref={ageRef} />
          {errors.age && <span>{errors.age.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} />
          {errors.email && <span>{errors.email.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} />
          {errors.password && <span>{errors.password.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="password2">Confirm Password:</label>
          <input type="password" id="password2" ref={confirmPasswordRef} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.toLowerCase()}</span>
          )}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            list="country-list"
            ref={countryRef}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <span>{errors.country.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select ref={genderRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" ref={termsRef} />
            Accept Terms and Conditions:
          </label>
          {errors.terms && <span>{errors.terms.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="picture">
            Picture:
            <input type="file" id="picture" ref={pictureRef} />
          </label>
          {errors.picture && <span>{errors.picture.toLowerCase()}</span>}
        </div>
        <button >sumbit</button>
      </form>
    </div>
  )
}
// disabled={Object.keys(errors).length > 0}
