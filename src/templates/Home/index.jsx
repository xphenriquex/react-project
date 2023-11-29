import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../components/utils/load-posts';
import { Button } from '../../components/Button';

class Home extends Component {
  state = { 
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  };

  timeoutUpdate = null;

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePost = () => {
    const { 
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage})
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className='container'>
        <Posts posts={posts} />
        <div className='button-container'>
          <Button 
            onClick={this.loadMorePost} 
            text="Load More Posts" 
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}


export default Home;
