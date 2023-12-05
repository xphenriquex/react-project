import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { TextInput } from '../../components/TextInput';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../components/utils/load-posts';
import { Button } from '../../components/Button';

export const Home = () => {
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(4);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue 
      ? posts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
      : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage])

        
  const loadMorePost = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts)
    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }
  
  return (
    <section className='container'>
       <div className='search-container'>
          {
            !!searchValue && (<h1>Search value: {searchValue}</h1>)
          }
          <TextInput 
            searchValue={searchValue}
            handleChange={handleChange}
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
                onClick={loadMorePost} 
                text="Load More Posts" 
                disabled={noMorePosts}
              />
            )
          }
        </div>
      </section>
  );
}
export default Home;
