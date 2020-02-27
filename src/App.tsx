import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
import {PostProps} from './PostList/Post';
import PostList from './PostList/PostList';
import './App.css';

interface FlickrPost {
	media: {
		m: string
	}
	link: string
	title: string
	author: string
	description: string
	tags: string
	author_id: string
}

interface AppState {
	posts: Array<PostProps>
}

export default class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			posts: []
		}
		this.getPosts()
	}
	getPosts() {
		fetchJsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json', {
			jsonpCallbackFunction: 'jsonFlickrFeed'
		}).then((response) => {
			return response.json()
		}).then((json) => {
			this.setState({
				posts: json.items.map((post: FlickrPost) => {
					// Parse the description since it contains info added by Flickr and since we don't want to risk XSS
					const element = document.createElement('div');
					element.innerHTML = post['description']
					let description = '';
					if (element.children[2]) {
						const descriptionP = element.children[2] as HTMLElement;
						description = descriptionP.innerText;
					}
					// Convert to our format in case it changes
					return {
						src: post['media']['m'],
						link: post['link'],
						title: post['title'],
						author: post['author'].replace(/.*\("(.*)"\)/, '$1'),
						authorLink: 'https://www.flickr.com/people/' + post['author_id'],
						description: description,
						tags: post['tags'].split(' ')

					}
				})
			})
		}).catch((error) => {
			console.error(error)
		})
	}
  render() {
		return (
			<>
				<header><h1>Flickr Photo Stream</h1></header>
				<main role="main">
					<PostList posts={this.state.posts} />
				</main>
			</>
		)
  }
}
