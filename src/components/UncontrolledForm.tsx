import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/Results.css'

export const UncontrolledForm = () => {
  const uncontrolled = useSelector((state: RootState) => state.form.uncontrolled)
  const lastAddedTimestamp = useSelector((state: RootState) => state.form.lastAddedTimestamp);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);



  useEffect(() => {
    if (lastAddedTimestamp) {
      const index = uncontrolled.findIndex(item => {
        if (item.timestamp !== undefined) {
          return new Date(item.timestamp).getTime() === lastAddedTimestamp;
        }
        return false;
      });

      setHighlightedIndex(index);
      const timeout = setTimeout(() => {
        setHighlightedIndex(null);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [lastAddedTimestamp, uncontrolled])

  return  <table className="customers">
  <tr>
    <th>Image</th>
    <th>Name</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Email</th>
    <th>Country</th>
  </tr>
  {uncontrolled.map((item, index) => {
    return (
      <tr key={index} className={`${highlightedIndex === index && 'newItem_added'}`}>
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
}
