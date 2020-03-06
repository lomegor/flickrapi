import React from 'react';
import { render } from '@testing-library/react';
import {Post} from './Post';

test('renders a post', () => {
	const post = {
		key: 'dog_s_day/49625443258/',
		src: 'https://live.staticflickr.com/65535/49625443258_e0ce17665a_m.jpg',
		link: 'https://www.flickr.com/photos/dog_s_day/49625443258/',
		title: 'Title',
		author: 'Dog \'s Day',
		authorLink: 'https://www.flickr.com/people/52949253@N05',
		description: 'Description',
		tags: ['test', 'tags']
	};
	const { getByText } = render(
		<Post 
			key={post.key}
			src={post.src}
			link={post.link}
			title={post.title}
			author={post.author}
			authorLink={post.authorLink}
			description={post.description}
			tags={post.tags}
		/>
	)
	expect(getByText('Title')).toBeInTheDocument();
	expect(getByText('Description')).toBeInTheDocument();
	expect(getByText('Dog \'s Day')).toBeInTheDocument();
	expect(getByText('test')).toBeInTheDocument();
	expect(getByText('tags')).toBeInTheDocument();
});
