import { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSerach = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSerach} />
        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
      </Container>
    );
  }
}
