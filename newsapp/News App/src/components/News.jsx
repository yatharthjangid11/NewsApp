import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { PropTypes } from "prop-types";
export class News extends Component {
  static defaultPops = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes,
    category: PropTypes.string,
    apiKey: PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log("Hello i am a constructor from news component");
    this.state = {};
  }
  async componentDidMount() {
    console.log("cdm");

    let url = `https://newsnow.p.rapidapi.com/newsv2`;
    this.setState({ loading: true });
    let data = await fetch(url, {
      headers: {
        "X-Api-Key": "91d1f47581msh4ff29b5c4f5b5c2p1e00f2jsn00f399609fbe",
      },
    });
    let parserData = await data.json();
    console.log(parserData);
    this.setState({});
  }
  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsnow.p.rapidapi.com/newsv2`;
    this.setState({ loading: true });
    let data = await fetch(url, {
      headers: {
        "X-Api-Key": "91d1f47581msh4ff29b5c4f5b5c2p1e00f2jsn00f399609fbe",
      },
    });
    let parserData = await data.json();
    this.setState({ loading: false });
    this.setState({ articles: parserData.articles });
    this.setState({
      page: this.state.page - 1,
      loading: false,
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    console.log(this.props.apiKey);
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsnow.p.rapidapi.com/newsv2`;
      this.setState({ loading: true });
      let data = await fetch(url, {
        headers: {
          "X-Api-Key": "91d1f47581msh4ff29b5c4f5b5c2p1e00f2jsn00f399609fbe",
        },
      });
      let parserData = await data.json();
      this.setState({ loading: false });
      this.setState({
        page: this.state.page + 1,
        articles: parserData.articles,
        loading: false,
      });
    }
  };

  render() {
    console.log("render");
    return (
      <div className="contianer my-3 mx-5">
        <h2 style={{ textAlign: "center" }}>
          NewsSlot - Top Headlines on{" "}
          {this.capitalizeFirstLetter(this.props.category)} Categories
        </h2>
        <hr />
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 72) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 72)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <hr />
        <div className="contianer d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News
