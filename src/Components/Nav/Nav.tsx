import React from "react";
import logo from '../../Assets/logoRT.png'
import Form from "../Form/Form";
import './Nav.css'

interface MovieObj {
    average_rating: number,
    backdrop_path: string,
    id: number,
    poster_path: string,
    release_date: string,
    title: string
}

type MyProps = {
    movies: MovieObj[]
}

const Nav: React.FC<MyProps> = ({ movies }) => {
    return(
        <header>
            <img className='logo' alt='logo' src={logo} />
            <Form movies={movies}/>
        </header>
    )
}

export default Nav