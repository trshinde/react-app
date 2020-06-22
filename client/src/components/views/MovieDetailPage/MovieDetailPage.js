import React,{useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../../Config';
import HomeImagePage from '../LandingPage/Sections/HomeImagePage';
import {Descriptions, Button,Row} from 'antd';
import GridLayoutPage from '../LandingPage/Sections/GridLayoutPage';
import Favorite from './Sections/Favorite';

const MovieDetailPage = (props) =>{
    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    console.log(Movie);
    useEffect(()=>{
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(response =>{
            setMovie(response);
            fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response =>{
                setCasts(response.cast);
            })
        })
    });

    const handleClick = () =>{
        setActorToggle(!ActorToggle);
    };

    return (
        <>
            <div>
                {Movie ? 
                <HomeImagePage 
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
                    text={Movie.overview}
                    title={Movie.original_title}
                />
                : ''}

                <div style={{width:'85%',margin:'1rem auto'}}>
                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <Favorite 
                            userFrom={localStorage.getItem('userId')} 
                            movieId={movieId} 
                            movieInfo={Movie}/>
                    </div>


                    <Descriptions title="Movie Info" bordered>
                        <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                        <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
                        <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
                        <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
                        <Descriptions.Item label="vote_average">{Movie.vote_average}</Descriptions.Item>
                        <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
                        <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
                        <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
                    </Descriptions>
                    <br />

                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Button onClick={handleClick}>Click to view actors</Button>
                    </div><br />

                    {ActorToggle ? 
                        <Row gutter={[16,16]}>
                            {Casts && Casts.map((cast,index)=>(
                                <React.Fragment key={index}>
                                    {cast.profile_path ? 
                                        <GridLayoutPage 
                                            actor image={`${IMAGE_URL}w500${cast.profile_path}`}
                                        >
                                        </GridLayoutPage>
                                    : '' }
                                </React.Fragment>
                            ))}
                        </Row>
                        : ''}
                 <br/>
                </div>
            </div>
        </>
    )
};



export default MovieDetailPage;
