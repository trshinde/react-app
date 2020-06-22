import React,{useState, useEffect} from 'react';
import {Button} from 'antd';
import axios from 'axios';

const Favorite = (props) =>{

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    };

    useEffect(()=>{
        axios.post('/api/favorite/favoriteNumber',variable)
        .then(response =>{
            if(response.data.success){
                setFavoriteNumber(response.data.FavoriteNumber);
            }else{
                alert('Failed to get data!!!');
            }
        });

        axios.post('/api/favorite/favorited',variable)
        .then(response =>{
            if(response.data.success){
                setFavorited(response.data.favorited)
            }else{
                alert('Failed to get favorite data!!!');
            }
        })
    });

    const handleClickFavorite = () =>{
        if(Favorited){
            /// when already added to arr: now remove it.
            axios.post('/api/favorite/removeFromFavorite',variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited);
                }else{
                    alert("Failed to remove from favorites");
                }
            })

        }else{
            /// when not already added.
            axios.post('/api/favorite/addToFavorite',variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                }else{
                    alert("Failed to add to favorites");
                }
            })
        }
    };

    return (
        <>
            <div>
                <Button onClick={handleClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
            </div>
        </>
    )
};

export default Favorite;
