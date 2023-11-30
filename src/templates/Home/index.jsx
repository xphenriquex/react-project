import { Component } from 'react';

import './styles.css';

import { TextInput } from '../../components/TextInput';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../components/utils/load-posts';
import { Button } from '../../components/Button';

class Home extends Component {
  state = { 
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue 
      ? posts.filter(post => 
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : posts;

    return (
      <section className='container'>
       <div className='search-container'>
          {
            !!searchValue && (<h1>Search value: {searchValue}</h1>)
          }
          <TextInput 
            searchValue={searchValue}
            handleChange={this.handleChange}
          /> 
       </div>

        {
          filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )
        }
        
        {
          filteredPosts.length === 0 && (
            <p>Não existem post =(</p>
          )
        }

        <div className='button-container'>
          {
            !searchValue && (
              <Button 
                onClick={this.loadMorePost} 
                text="Load More Posts" 
                disabled={noMorePosts}
              />
            )
          }
        </div>
      </section>
    );
  }
}


export default Home;
