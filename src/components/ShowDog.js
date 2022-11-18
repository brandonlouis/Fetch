import { IconButton, InputAdornment, Box, Modal, Autocomplete, CircularProgress, Grid, Slider, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from "react"
import Resource from "./Resource"

export default function ShowDog() {
  const [webURL, setWebURL] = useState('https://dog.ceo/api/breeds/image/random/12')
  const [text, setText] = useState("")
  const [sliderQty, setSliderQty] = useState(12)
  const [dogList, setDogList] = useState([])
  const [modalURL, setModalURL] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    const fetchDogData = async () => {
      if (dogList.length === 0) {
        try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await res.json()
        
        Object.keys(data.message).map((key) => {
          if (data.message[key].length > 0) {
            data.message[key].map((subKey) => {
              setDogList(dogList => [...dogList, `${subKey.charAt(0).toUpperCase() + subKey.slice(1)} ${key.charAt(0).toUpperCase() + key.slice(1)}`])
            })
          } else {
            setDogList((dogList) => [...dogList, key.charAt(0).toUpperCase() + key.slice(1)])
          }
        })
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchDogData()
  }, [])

  const searchForDog = async () => {
    if (!text || text.trim().length === 0) {
      setWebURL(`https://dog.ceo/api/breeds/image/random/${sliderQty}`)
    } else {
      const breedName = text.trim().toLowerCase()

      if (breedName.split(" ").length > 1) {
        setWebURL(`https://dog.ceo/api/breed/${breedName.split(/\s+/).reverse().join("/")}/images/random/${sliderQty}`)
      } else {
        setWebURL(`https://dog.ceo/api/breed/${breedName}/images/random/${sliderQty}`)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchForDog()
  }

  const urlToBreed = (url) => {
    const urlBreedName = url.split("/")[4].split('-').reverse()

    if (urlBreedName.length > 1) {
      return `${urlBreedName[0].charAt(0).toUpperCase() + urlBreedName[0].slice(1)} ${urlBreedName[1].charAt(0).toUpperCase() + urlBreedName[1].slice(1)}`
    } else {
      return urlBreedName[0].charAt(0).toUpperCase() + urlBreedName[0].slice(1)
    }
  }

  const render = (data) => {
    if (data.loading === true) return <CircularProgress color="error"/>
    if (data.error === true) return <p><b>No results found</b></p>

    return (data.trans.message.map( (dog,key) => (
      <div className="dogCard" key={key}>
        <div className="imgCard">
          <img className="image" src={dog} onClick={(e) => {setModalURL(dog); openModal(e)}}/>
        </div>
        <div className="breedCard">
          <p><b>{urlToBreed(dog)}</b></p>
        </div>
      </div>
    )))
  }

  return (
    <section>
      <div className="header">
        <div className="logoSwipe">
          <a href="/"><img src={process.env.PUBLIC_URL + '/logo.png'}/></a>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="searchForm">
          <p style={{marginBottom: '5px'}}>
            Number of images: {sliderQty}
          </p>
          <Slider
            defaultValue={12}
            min={1} max={50}
            valueLabelDisplay="auto"
            color="error"
            onChange={(e, value) => setSliderQty(value)}
          />

          <Autocomplete
            freeSolo
            disablePortal
            id="searchDropdown"
            options={dogList}
            forcePopupIcon={false}
            disableClearable
            onChange={(e, value) => setText(value)}
            renderInput={(params) => 
              <TextField
                {...params}
                style={{marginTop: '20px'}}
                fullWidth
                id="searchText" color="common" label="Search breed name" variant="outlined"
                onChange={(e, value) => setText(value)} // To allow users to search blank to revert back to totally random images
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={searchForDog}>
                        <SearchIcon/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />}
          />
        </form>
      </div>

      <div>
        <Grid container spacing={0} gap={3} className="dogResults" key={webURL}>
          <Resource path={webURL} render={render}/>
        </Grid>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
      >
        <Box className="modalPicture">
          <img src={modalURL}/>
        </Box>
      </Modal>
    </section>
  )
}