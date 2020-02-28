import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
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
	filterTag?: (arg0: string) => void
}

export const Post = ({src, link, title, author, authorLink, description, tags, filterTag}: PostProps) => {
	const onTagClick = (tag: string) => {
		if (filterTag) {
			filterTag(tag)
		}
	}
	const tagItems = tags.map((tag) =>
		<Button key={tag} onClick={onTagClick.bind({}, tag)} size="small">{tag} </Button>
	)
	return (
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
						Tags: {tagItems}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}
