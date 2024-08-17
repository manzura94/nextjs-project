import { useSelector } from 'react-redux'
import { RootState } from '../store'
import '../styles/Results.css'

export const ControlledForm = () => {
  const controlled = useSelector((state: RootState) => state.form.controlled)
  return (
    <table className="customers">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Email</th>
        <th>Country</th>
      </tr>
      {controlled.map((item, index) => {
        return (
          <tr key={index}>
            <td >
              
              <img className='table_img' src={item.picture} alt="picture" />
            </td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.email}</td>
            <td>{item.country}</td>
          </tr>
        )
      })}
    </table>
  )
}
