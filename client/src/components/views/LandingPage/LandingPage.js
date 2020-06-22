import React,{useEffect,useState} from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../../Config';
import {Typography,Row} from 'antd';
import HomeImagePage from './Sections/HomeImagePage';
import GridLayoutPage from './Sections/GridLayoutPage';
const {Title} = Typography;

const LandingPage = () =>{

    const [Movies, setMovies] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchMovies(endpoint);
    });

    const fetchMovies = (key) =>{
        fetch(key) 
            .then(response => response.json())
            .then(response => {
            setMovies([...Movies, ...response.results]);
            setCurrentPage(response.page);
      }); 
    };

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    };


    return (
        <>
            <div style={{width:'100%', margin:0}}>
                { Movies[0] ? <HomeImagePage 
                image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`} 
                title={Movies[0].original_title} 
                text={Movies[0].overview} />
                 : ''}
                

                 <div style={{width:'85%',margin:'1rem auto'}}>
                     <Title level={2}>Movies by latest</Title>
                     <hr />
                 </div>

                 <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie,index)=>(
                        <React.Fragment key={index}>
                            <GridLayoutPage 
                            image={movie.poster_path ? `${IMAGE_URL}w500${movie.poster_path}` : ''}
                            movieId={movie.id}
                            >
                            </GridLayoutPage>
                        </React.Fragment>
                    ))}
                 </Row>
                 <br/>

                 <div style={{display:'flex',justifyContent:'center'}}>
                     <button onClick={handleClick}>Load More</button>
                 </div>

            </div>
        </>
    )
};

export default LandingPage;
