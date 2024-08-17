import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { resetLastAddedTimestamp } from '../store/formSlice'
import '../styles/Results.css'
import * as React from 'react'

export const ControlledForm = () => {
  const dispatch = useDispatch()
  const controlled = useSelector((state: RootState) => state.form.controlled)
  const lastAddedTimestamp = useSelector(
    (state: RootState) => state.form.lastAddedTimestamp,
  )
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lastAddedTimestamp) {
      const index = controlled.findIndex((item) => {
        if (item.timestamp !== undefined) {
          return new Date(item.timestamp).getTime() === lastAddedTimestamp
        }
        return false
      })

      setHighlightedIndex(index)
      const timeout = setTimeout(() => {
        setHighlightedIndex(null)
        dispatch(resetLastAddedTimestamp())
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [lastAddedTimestamp, controlled, dispatch])

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
          <tr
            key={index}
            className={`${highlightedIndex === index ? 'newItem_added' : ''}`}
          >
            <td>
              <img className="table_img" src={item.picture} alt="picture" />
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
