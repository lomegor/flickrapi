import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
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
	existingKeys: Array<string>
	posts: Array<PostProps>
	hasMore: boolean
}

export default class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			existingKeys: [],
			posts: [],
			hasMore: true
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
			const oldLength = this.state.posts.length;
			const newPosts = this.state.posts;
			const newKeys = this.state.existingKeys;
			json.items.forEach((post: FlickrPost) => {
				// Parse the description since it contains info added by Flickr and since we don't want to risk XSS
				const element = document.createElement('div');
				element.innerHTML = post['description']
				let description = '';
				if (element.children[2]) {
					const descriptionP = element.children[2] as HTMLElement;
					description = descriptionP.innerText;
				}
				// Convert to our format in case it changes
				const key = post.link.replace('https://www.flickr.com/photos/', '');
				if (newKeys.indexOf(key) === -1) {
					newPosts.push({
						key: key,
						src: post['media']['m'],
						link: post['link'],
						title: post['title'] === ' ' ? 'Untitled' : post['title'],
						author: post['author'].replace(/.*\("(.*)"\)/, '$1'),
						authorLink: 'https://www.flickr.com/people/' + post['author_id'],
						description: description,
						tags: post['tags'].split(' ')
					})
					newKeys.push(key)
				}
			})
			const newHasMore = this.state.posts.length > oldLength;
			this.setState({
				existingKeys: newKeys,
				posts: newPosts,
				hasMore: newHasMore
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
					<InfiniteScroll
							loadMore={this.getPosts.bind(this)}
							loader={<h4>Loading...</h4>}
							hasMore={this.state.hasMore}
							>
						<PostGrid posts={this.state.posts} />
					</InfiniteScroll>
				</main>
			</>
		)
  }
}
