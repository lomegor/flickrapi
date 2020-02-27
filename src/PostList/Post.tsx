import React from 'react';

export interface PostProps {
	src: string
	link: string
	title: string
	author: string
	authorLink: string
	description: string
	tags: Array<string>
}

export const Post = ({src, link, title, author, authorLink, description, tags}: PostProps) => <div className="post">
	<a href={link}>
		<img src={src} alt={title} />
	</a>
	<span className="heading">
		<a href={link} className="title">{title}</a>
		<span> by </span>
		<a href={authorLink} className="author">{author}</a>
	</span>
	<p className="description">
		{description}
	</p>
	<span className="tags">
		Tags: {tags.join(',')}
	</span>
</div>
