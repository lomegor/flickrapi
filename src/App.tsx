import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
import {PostProps} from './PostGrid/Post';
import PostGrid from './PostGrid/PostGrid';
import Typography from '@material-ui/core/Typography';
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
		// Tag 'safe' returns more nsfw than not having it
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
					console.log(post['description']);
					if (element.children[2]) {
						const descriptionP = element.children[2] as HTMLElement;
						description = descriptionP.innerText;
					}
					// Convert to our format in case it changes
					return {
						src: post['media']['m'],
						link: post['link'],
						title: post['title'] === ' ' ? 'Untitled' : post['title'],
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
				<header>
					<Typography variant="h1">
						Flickr Photo Stream
					</Typography>
				</header>
				<main role="main">
					<PostGrid posts={this.state.posts} />
				</main>
			</>
		)
  }
}
