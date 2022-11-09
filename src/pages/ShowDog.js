import { Autocomplete, Slider, TextField, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import Resource from "../components/Resource"

export default function ShowDog() {
  const [webURL, setWebURL] = useState('https://dog.ceo/api/breeds/image/random/12')
  const [text, setText] = useState("")
  const [sliderQty, setSliderQty] = useState(12)

  const searchForDog = async() => {
    if (text === "" || text.trim().length === 0) {
      setWebURL(`https://dog.ceo/api/breeds/image/random/${sliderQty}`)
    } else {
      console.log(text.trim())
      setWebURL(`https://dog.ceo/api/breed/${text.toLowerCase()}/images/random/${sliderQty}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchForDog()
  }

  const render = (data) => {
    if (data.loading === true) return <p>Loading ...</p>
    if (data.error === true) return <p>No results found</p>
    return (data.trans.message.map( (dog,key) => (
      <div key={key}>
          <img className='image' src={dog} height='350' width='350'/>
      </div>
    )))
  }

  return (
    <section>
      <div className="header">
        <img src={require("../img/logo.png")} height="120px"/>

        <form onSubmit={handleSubmit} autoComplete="off" className="searchForm">
          <TextField
            fullWidth
            id="outlined-basic" label="Search breed name" variant="outlined"
            onChange={(e) => setText(e.target.value)}
          />

          <Typography id="non-linear-slider" gutterBottom style={{marginTop: '30px'}}>
            Results: {sliderQty}
          </Typography>
          <Slider 
            defaultValue={12}
            min={1} max={50}
            valueLabelDisplay="auto"
            onChange={(e) => setSliderQty(e.target.value)}
          />
        </form>
      </div>

      <div>
        <div class="dogResults" key={webURL}>
          <Resource path={webURL} render={render} />
        </div>
      </div>
    </section>
  )
}