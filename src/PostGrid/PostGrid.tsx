import React from 'react';
import {PostProps, Post} from './Post';
import Grid from '@material-ui/core/Grid';

interface PostGridProps {
	posts: Array<PostProps>
	filterTag: (arg0: string) => void
}

const PostGrid = ({posts, filterTag}: PostGridProps) => {
	const postItems = posts.map((post, index) => {
		return (
			<Post 
				key={post.key}
				src={post.src}
				link={post.link}
				title={post.title}
				author={post.author}
				authorLink={post.authorLink}
				description={post.description}
				tags={post.tags}
				filterTag={filterTag}
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
