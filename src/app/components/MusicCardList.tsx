'use server';

import { getPosts } from '@/server/service/post';
import Image from 'next/image';
import Link from 'next/link';

export const MusicCardList = async () => {
  const posts = await getPosts();
  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <div>タイトル:{post.title}</div>
          <div>概要:{post.content}</div>
          <Link href={`/${post.userName}`}>投稿者名:{post.displayName}</Link>

          <div>タグ:</div>
          {post.tags.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
          <Image
            src={post.avatarUrl}
            alt="Picture of the author"
            width={500}
            height={500}
            priority={true}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};
