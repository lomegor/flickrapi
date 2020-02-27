import React from 'react';
import {PostProps, Post} from './Post';
import Grid from '@material-ui/core/Grid';

interface PostGridProps {
	posts: Array<PostProps>
}

const PostGrid = ({posts}: PostGridProps) => {
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
		<Grid container spacing={4}>
			{postItems}
		</Grid>
	)
}

export default PostGrid
