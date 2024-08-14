import React from 'react'

export const FormControlled = () => {
  return (
    <div className="form_wrapper">
      <form action="">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <label htmlFor="password">Confirm Password:</label>
        <input type="password" name="password" />
        <label htmlFor="country">Country:</label>
        <input type="text" name="country" />
        <label htmlFor="gender">Gender:</label>
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="terms">
          <input type="checkbox" name="terms" />
          Accept Terms and Conditions:
        </label>
        <label htmlFor="picture">
          Picture:
          <input type="file" name="picture" />
        </label>
        <button>sumbit</button>
      </form>
    </div>
  )
}
