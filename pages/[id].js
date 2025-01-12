import { useEffect } from 'react';
import supabase from '../utils/supabase';

export async function getServerSideProps({ params }) {

  const { data: post, error } = await supabase
    .from('posts')
    .select('*, comments(*)')
    .eq('id', params.id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return {
    props: {
      post,
    },
  };
}



export default function PostPage({ post = {} }) {
  useEffect(() => {
    const subscription = supabase
      .from('comments')
      .on('INSERT', (payload) => {
        console.log(payload);
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}
