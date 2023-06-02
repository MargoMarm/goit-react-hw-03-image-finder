import { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import getPictures from '../services/getPictures';
import Error from 'components/Error/Error';

export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    totalPics: 0,
    status: 'idle',
    isOpen: false,
    modalImgSrc: '',
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchQuery;
    const prevPage = prevState.page;
    const { searchQuery, page } = this.state;

    if (prevSearch !== searchQuery || prevPage !== page) {
      this.setState({ status: 'pending' });
      getPictures(searchQuery, page)
        .then(response => response.json())
        .then(({ hits, totalHits, total }) => {
          this.setState(prevState => ({
            pictures: page === 1 ? hits : [...prevState.pictures, ...hits],
            totalPics: totalHits,
            total,
            status: 'resolved',
          }));
        });
    }
  }

  handleSerach = searchQuery => {
    this.setState({ searchQuery, totalPics: 0 });
  };

  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onModalOpen = ({ target }) => {
    this.setState({ isOpen: true, modalImgSrc: target.dataset.src });
  };

  onModalClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { pictures, totalPics, total, page, status, modalImgSrc, isOpen } =
      this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSerach} />
        {status === 'resolved' && (
          <ImageGallery pictures={pictures} onClick={this.onModalOpen} />
        )}
        {total === 0 && <Error />}
        {status === 'pending' && <Loader />}
        {totalPics / pictures.length > page && (
          <Button onClick={this.onBtnClick}></Button>
        )}
        {isOpen && <Modal imgSrc={modalImgSrc} onClose={this.onModalClose} />}
      </Container>
    );
  }
}
