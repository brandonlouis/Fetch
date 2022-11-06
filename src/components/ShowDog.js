import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const ShowDog = (props) => {

  // let webURL = 'https://dog.ceo/api/breeds/image/random/20';
  const [response, setResponse] = useState([])

  const fetchDog = async() => {
    const res = await axios.get(`https://dog.ceo/api/breed/african/images/random/20`);
    setResponse(res.data.message);
  }

  const listDogs = response.map(response => 
    <div key={response}>
      <img src={response} width="350" height="350"/>
    </div>
  )
  
  return (
    <div>
      <button onClick={fetchDog}>Gen Dog</button>
      <div class="dogResults">
        <div class="showList">
          {listDogs}
        </div>
      </div>
    </div>
  )
}

export default ShowDog