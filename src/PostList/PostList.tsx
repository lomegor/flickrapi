import React from 'react';
import {PostProps, Post} from './Post';

interface PostListProps {
	posts: Array<PostProps>
}

const PostList = ({posts}: PostListProps) => {
	const postItems = posts.map((post, index) => {
		return (
			<Post 
				key={post.link.replace('https://www.flickr.com/photos/', '')}
				src={post.src}
				link={post.link}
				title={post.title}
				author={post.author}
				authorLink={post.authorLink}
				description={post.description}
				tags={post.tags}
			/>
		)
	});
	return (
		<div className="post-list">
			{postItems}
		</div>
	)
}

export default PostList
