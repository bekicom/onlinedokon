import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

const TravelBook = () => {
  const [travelBook, setTravelBook] = useState([])
  const [id, setId] = useState('')

  const fetchData = async () => {
    const { data } = await axios.get("https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar")
    setTravelBook(data)
  }

  const deleteHandler = async (e) => {
    e.preventDefault()
    await axios.delete(`https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar/${id}`)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {travelBook.map((tb, index) => (
        <div key={index} className="card mb-3 mt-3">
          <img src={tb.image} className="card-img-top" alt={tb.title} />
          <div className="card-body">
            <h5 className="card-title">{tb.title}</h5>
            <p>{tb.id}</p>
            <p className="card-text">{tb.descr}</p>
            <div className='d-flex justify-content-start'>
              <Link className='btn btn-primary' to={`/update/${tb.id}`}>Update</Link>
              <form onSubmit={deleteHandler}>
                <button 
                  type='submit' 
                  className='btn btn-danger mx-2'
                  onClick={() => setId(tb.id)}  
                >Delete</button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

}


export default TravelBook
