import React from 'react';
import { render } from '@testing-library/react';
import {PostProps} from './PostGrid/Post';
import App from './App';

test('calls getPosts on render', () => {
	const spy = jest.spyOn(App.prototype, 'getPosts');
  render(<App />);
	expect(spy).toHaveBeenCalled();
});

test('parsePost correctly parses a post', () => {
	const app = new App({});
	const posts: Array<PostProps> = [];
	const keys: Array<string> = [];
	app.parsePost({
		'title': 'Title',
		'link': 'https://www.flickr.com/photos/dog_s_day/49625443258/',
		'media': {'m':'https://live.staticflickr.com/65535/49625443258_e0ce17665a_m.jpg'},
		'description': '<p>1</p><p>2</p><p>Description</p> ',
		'author': 'nobody@flickr.com ("Dog \'s Day")',
		'author_id': '52949253@N05',
		'tags': 'test tags'
	}, posts, keys);
	expect(posts[0]).toEqual({
			key: 'dog_s_day/49625443258/',
			src: 'https://live.staticflickr.com/65535/49625443258_e0ce17665a_m.jpg',
			link: 'https://www.flickr.com/photos/dog_s_day/49625443258/',
			title: 'Title',
			author: 'Dog \'s Day',
			authorLink: 'https://www.flickr.com/people/52949253@N05',
			description: 'Description',
			tags: ['test', 'tags']
	});
	expect(keys[0]).toEqual('dog_s_day/49625443258/');
});

test('parsePost does not add the same post twice', () => {
	const app = new App({});
	const posts: Array<PostProps> = [];
	const keys: Array<string> = [];
	app.parsePost({
		'title': 'Title',
		'link': 'https://www.flickr.com/photos/dog_s_day/49625443258/',
		'media': {'m':'https://live.staticflickr.com/65535/49625443258_e0ce17665a_m.jpg'},
		'description': '<p>1</p><p>2</p><p>Description</p> ',
		'author': 'nobody@flickr.com ("Dog \'s Day")',
		'author_id': '52949253@N05',
		'tags': 'test tags'
	}, posts, keys);
	app.parsePost({
		'title': 'Title',
		'link': 'https://www.flickr.com/photos/dog_s_day/49625443258/',
		'media': {'m':'https://live.staticflickr.com/65535/49625443258_e0ce17665a_m.jpg'},
		'description': '<p>1</p><p>2</p><p>Description</p> ',
		'author': 'nobody@flickr.com ("Dog \'s Day")',
		'author_id': '52949253@N05',
		'tags': 'test tags'
	}, posts, keys);
	expect(posts[0]).toEqual({
			key: 'dog_s_day/49625443258/',
			src: 'https://live.staticflickr.com/65535/49625443258_e0ce17665a_m.jpg',
			link: 'https://www.flickr.com/photos/dog_s_day/49625443258/',
			title: 'Title',
			author: 'Dog \'s Day',
			authorLink: 'https://www.flickr.com/people/52949253@N05',
			description: 'Description',
			tags: ['test', 'tags']
	});
	expect(keys[0]).toEqual('dog_s_day/49625443258/');
	expect(posts[1]).toEqual(undefined);
	expect(keys[1]).toEqual(undefined);
});

test('getPosts calls loadPosts with current url', () => {
	const spy = jest.spyOn(App.prototype, 'loadPosts');
	const app = new App({});
	app.getPosts();
	expect(spy).toHaveBeenCalledWith('https://api.flickr.com/services/feeds/photos_public.gne?format=json');
});

// Can't test the whole flow because Flickr API timeous on jest
