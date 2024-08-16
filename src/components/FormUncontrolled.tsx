import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { validation } from '../validation'
import { addUncontrolledData, FormData } from '../store/formSlice'
import '../styles/Form.css'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

export const FormUncontrolled = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state: RootState) => state.form.countries)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const navigate = useNavigate()
  console.log(
    useSelector((state: RootState) => state.form.uncontrolled),
    'uncontrol',
  )

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

    const data: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value || undefined),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      picture: '',
    }

    if (pictureRef.current?.files && pictureRef.current.files.length > 0) {
      const file = pictureRef.current.files[0]
      const reader = new FileReader()

      reader.onloadend = async () => {
        data.picture = reader.result as string

        try {
          await validation.validate(data, { abortEarly: false })
          dispatch(addUncontrolledData(data))
          navigate('/')
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const validationErrors: { [key: string]: string } = {}
            error.inner.forEach((err) => {
              if (err.path) validationErrors[err.path] = err.message
            })
            setErrors(validationErrors)
            console.log(validationErrors)
          }
        }
      }

      reader.readAsDataURL(file)
    } else {
      try {
        await validation.validate(data, { abortEarly: false })
        dispatch(addUncontrolledData(data))
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {}
          error.inner.forEach((err) => {
            if (err.path) validationErrors[err.path] = err.message
          })
          setErrors(validationErrors)
          console.log(validationErrors)
        }
      }
    }
  }

  return (
    <div className="form_wrapper">
      <form onSubmit={handleFormSumbit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            name="name"
            autoComplete="name"
          />
          {errors.name && <span>{errors.name.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            ref={ageRef}
            name="age"
            autoComplete="age"
          />
          {errors.age && <span>{errors.age.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            name="email"
            autoComplete="email"
          />
          {errors.email && <span>{errors.email.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            name="password"
            autoComplete="new-password"
          />
          {errors.password && <span>{errors.password.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            name="confirmPassword"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.toLowerCase()}</span>
          )}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            list="country-list"
            ref={countryRef}
            autoComplete="country"
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
          <select id="gender" ref={genderRef} name="gender" autoComplete="sex">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="terms">
            Accept Terms and Conditions:
            <input type="checkbox" id="terms" ref={termsRef} name="terms" />
          </label>
          {errors.terms && <span>{errors.terms.toLowerCase()}</span>}
        </div>
        <div>
          <label htmlFor="picture">Picture:</label>
          <input type="file" id="picture" ref={pictureRef} name="picture" />
          {errors.picture && <span>{errors.picture.toLowerCase()}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
// disabled={Object.keys(errors).length > 0}
