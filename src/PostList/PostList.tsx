import React from 'react';
import Post from './Post';

interface PostListProps {
	posts: Array<Object>
}

const PostList = ({posts}: PostListProps) => {
	const postItems = posts.map((post) => {
		const tags = ['a', 'b'];
		return (
			<Post 
				src="google.com"
				link="wikipedia.org"
				title="Title"
				author="Author"
				authorLink="stackoverflow.com"
				description="long description"
				tags={tags}
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
