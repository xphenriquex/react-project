import './App.css';
import { Component } from 'react';

class App extends Component {
  state = { 
    counter: 0,
    posts: [
      { 
        id: 1,
        title: 'O titulo 1',
        body: 'O corpo 1',
      },
      { 
        id: 2,
        title: 'O titulo 2',
        body: 'O corpo 2',
      },
      { 
        id: 3,
        title: 'O titulo 3',
        body: 'O corpo 3',
      },
    ]
  };

  timeoutUpdate = null;

  componentDidMount() {
    this.handleTimeout();
  }

  componentDidUpdate() {
    // this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate)
  }

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = 'titulo mudou';
    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 2000);
  }

  render() {
    const { posts, counter } = this.state;
  
    return (
      <div className="App">
        <h1>{counter}</h1>
        {
          posts.map(post => (
            <div key={post.id}>
              <h1>{post.title}</h1> 
              <p>{post.body}</p> 
            </div>
          ))
        }
      </div>
    );
  }

   // handlePClick = () => {
  //   this.setState({ name: 'Júnior' });
  // }

  // handleAClick = (event) => {
  //   event.preventDefault();
  //   const { counter } = this.state;
  //   this.setState({ counter: counter + 1 })
  // }
}


export default App;
