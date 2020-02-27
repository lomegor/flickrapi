import React, {Component} from 'react';
import PostList from './PostList/PostList';
import './App.css';

interface AppState {
	posts: Array<Object>
}

export default class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			posts: [1, 2, 3]
		}
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
