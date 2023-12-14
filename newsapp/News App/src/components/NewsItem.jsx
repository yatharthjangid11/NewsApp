import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: '18rem', margin:'5px' }}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'80%', zIndex:'1'}}>{source}</span>
                    <img src={!imageUrl ? "https://tse1.mm.bing.net/th?id=OIP.rp1jaRMhXf7ZRzj1ddv1rwHaEk&pid=Api&P=0&h=180" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='blank' className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
