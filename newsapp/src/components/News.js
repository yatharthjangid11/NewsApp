import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import { PropTypes } from 'prop-types'

const News =(props)=> {
    
    News.defaultPops={
        country:'in',
        pageSize: 8,
        category: 'general'
    }
    News.propTypes={
        country: PropTypes.string,
        pageSize: PropTypes,
        category: PropTypes.string
    }
    const capitalizeFirstLetter =(string)=>{                                         
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState([true])
    const [page, setPage]=useState(1)
    const [totalResults, setTotalResults] = useState(0);
    // document.title= `${capitalizeFirstLetter(props.category)}- NewsSlot`;

    const updateNews= async()=> {
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a2609abfed44b918e5aa22cef87841a&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parserData = await data.json();
        setArticles(parserData.articles)
        setTotalResults(parserData.totalResults)
        setLoading(false)
    }

    useEffect(() => {
      updateNews();
    }, [])
    

    const handlePrevClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a2609abfed44b918e5aa22cef87841a&page=${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parserData = await data.json();
        setLoading(false);
        setArticles(parserData.articles)
        setPage(page-1);
        updateNews();
    }

    const handleNextClick = async () => {
        console.log("Next");
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a2609abfed44b918e5aa22cef87841a&page=${page + 1}&pageSize=${props.pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            let parserData = await data.json();
            setLoading(false);
            setPage(page+1);
            setArticles(parserData.articles);
            setLoading(false);
        }
    }

        console.log("render");
        return (
            <div className='contianer my-3 mx-5'>
                <h2 style={{textAlign:'center', margin:'80px 20px 20px', alignItems:'center'}}>NewsSlot - Top Headlines on {capitalizeFirstLetter(props.category)} Categories</h2>
                <hr />
                {loading && <Spinner/>}
                <div className='row'>
                    {!loading && articles.map((element) => {
                        return <div className='col-md-3' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0,72): ""} description={element.description ? element.description.slice(0,72): ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <hr />
                <div className='contianer d-flex justify-content-between'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )

}

export default News
