import styles from '../styles/Home.module.css';
import supabase from '../utils/supabase';
import {useEffect, useState} from 'react';

const Index = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { posts, error } = await supabase
        .from('posts')
        .select('*');

      if (error) {
        setFetchError('Could not fetch posts');
        setPosts(null);
        console.log(error);
      }

      if (posts) {
        setPosts(posts);
        setFetchError(null);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      {fetchError && <p>{fetchError}</p>}
      {posts && (
        <div className="posts">
          {posts.map((posts) => (
            <p>{posts.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
