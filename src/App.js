import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick'
import './App.css';

function getContentPromise() {
  return axios.get('/api/content/collection_groups/v1/06cec393-5bd2-4835-bbd5-89c8dbcae1ff/content');
}

function Thread(props) {
  const thread = props.thread;
  const coverCard = thread.properties.coverCard;
  const titleClass = coverCard.properties.colorTheme === 'dark' ? 'title' : 'title light'
  const style = {
    backgroundImage: `url(${coverCard.properties.squarishURL})`
  }
  
  return (
    <div className="thread" style={style}>
      <div className={titleClass}>
        {coverCard.properties.title}
        <span>{coverCard.properties.subtitle}</span>
      </div>
    </div>
  );
}

class ThreadList extends Component {
  render() {
    const settings = {
      infinite: true,
      centerMode: true,
      speed: 500,
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 5000
    }

    const threads = this.props.threads.map(function(t, i) {
      return <div className="thread-slide" key={i}><Thread thread={t} /></div>;
    });

    return threads.length > 0 
      ? <Slider {...settings}>{threads}</Slider>
      : <div className="no-threads">Loading Bootroom Content...</div>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      threads: []
    }
    this.getContent();
  }

  getContent() {
    const that = this;
    getContentPromise().then(function(response) {
        that.setState({
          threads: response.data.objects
        })
    });
  }

  render() {
    return <ThreadList threads={this.state.threads} />;
  }
}

export default App;
