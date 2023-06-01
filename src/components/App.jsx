import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getPictures } from './services/getPictures';

export class App extends Component {
  state = {
    serachQuery: '',
  };

	handleSerach = (serachQuery) => {
		this.setState({serachQuery})
	}
	
  render() {
    return (
      <div>
			 <Searchbar onSubmit={ this.handleSerach} />
      </div>
    );
  }
}
