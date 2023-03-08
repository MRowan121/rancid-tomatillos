import React from "react";
import { Link } from 'react-router-dom'
import './Card.css'

type MyProps = {
    id: number,
    image: string,
    title: string,
}

const Card: React.FC<MyProps> = ({ id, image, title}) => {
    return(
        <Link to={`/${id}`}>
            <img className="card" src={image} alt={title} id={String(id)} />
        </Link>
    )
}

export default Card