import React from 'react'
import { Button, TextField } from '@mui/material'
import ShowDog from './ShowDog'

const Header = () => {

    const [breed, setBreed] = React.useState('');

    const searchBreed = (e) => {
        <ShowDog breed={breed.toLowerCase()} />
    }

    return (
        <div class="searchContainer">
            <TextField id="outlined-basic" label="Search by Species" variant="outlined" onChange={(dogBreed) => setBreed(dogBreed.target.value)}/>
            <Button variant="contained" onClick={searchBreed}>Search</Button>
        </div>
    )
}

export default Header