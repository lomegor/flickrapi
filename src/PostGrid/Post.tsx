import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import './Post.css'

export interface PostProps {
	key: string
	src: string
	link: string
	title: string
	author: string
	authorLink: string
	description: string
	tags: Array<string>
}

export const Post = ({src, link, title, author, authorLink, description, tags}: PostProps) =>
<Grid item lg={3} md={4} xs={6}>
	<Card className="post">
		<a href={link} className="image">
			<CardMedia image={src} />
		</a>
		<CardContent className="details">
			<Typography className="heading" paragraph={true}>
				<Link href={link} className="title">{title}</Link>
				<span> by </span>
				<Link href={authorLink} className="author">{author}</Link>
			</Typography>
			<Typography className="description" color="textSecondary" variant="body2" paragraph={true}>
				{description}
			</Typography>
			<Typography className="tags" variant="caption" color="textPrimary">
				Tags: {tags.join(' ')}
			</Typography>
		</CardContent>
	</Card>
</Grid>
