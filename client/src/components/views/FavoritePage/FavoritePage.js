import React,{useEffect, useState} from 'react';
import './FavoritePage.css';
import axios from 'axios';
import {Button} from 'antd';
import {IMAGE_URL} from '../../Config';

const FavoritePage = () =>{

    const [Favorite, setFavorite] = useState([]);

    const variables = {
        userFrom:localStorage.getItem('userId')
    };

    useEffect(()=>{ 
        axios.post('/api/favorite/getFavoriteMovie',variables)
        .then(response => {
            if(response.data.success){
                setFavorite(response.data.favorites);
            }else{
                alert("Empty list of favorite movies");
            }
        })
    });

    const renderTableBody = () =>{
        return Favorite.map((movie,index)=>{
            return(
                <tr key={index}>
                    <td>{movie.movieTitle}</td>
                    <td>{movie.movieRunTime}</td>
                    <td><Button onClick={() => removeMovie(movie.movieId)}>Remove from the favorites</Button></td>
                </tr>
            );
        })
    };

    const removeMovie = (movieId) =>{
        const variable = {
            movieId:movieId,
            userFrom:localStorage.getItem('userId')
        };
        
        axios.post('/api/favorite/removeFromFavorite',variable)
            .then(response => {
                if(response.data.success){
                    
                }else{
                    alert("Failed to remove from favorites");
                }
            });
    };

    return (
        <>
            <div style={{width:'85%', margin:'3rem auto'}}>
                <h3>Favorites Movies By Me</h3>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Ttile</th>
                            <th>Movie Run Time</th>
                            <th>Remove From Favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableBody()}
                    </tbody>
                </table>
            </div>  
        </>
    )
};

export default FavoritePage;
