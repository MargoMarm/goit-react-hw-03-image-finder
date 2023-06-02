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
    isOpen: false,
    loading: false,
    modalImgSrc: '',
  };

  async componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchQuery;
    const prevPage = prevState.page;
    const { searchQuery, page } = this.state;

    //check if there are any changes in state (new search query or click on load more btn)
    if (prevSearch !== searchQuery || prevPage !== page) {
      this.setState({ loading: true });

      try {
			const response = await getPictures(searchQuery, page);
			console.log(response.data)
        const { hits, totalHits, total } = response.data;
        this.setState(prevState => ({
          pictures: page === 1 ? hits : [...prevState.pictures, ...hits],
          totalPics: totalHits,
          total,
        }));
		} catch (error) {
			this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSerach = searchQuery => {
    this.setState({
      searchQuery,
      pictures: [],
      page: 1,
      totalPics: 0,
      isOpen: false,
      modalImgSrc: '',
    });
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
    const { pictures, loading, totalPics, total, page, modalImgSrc, isOpen } =
      this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSerach} />

        <ImageGallery pictures={pictures} onClick={this.onModalOpen} />

        {total === 0 && <Error />}
        {loading && <Loader />}
        {totalPics / pictures.length > page && (
          <Button onClick={this.onBtnClick}></Button>
        )}
        {isOpen && <Modal imgSrc={modalImgSrc} onClose={this.onModalClose} />}
      </Container>
    );
  }
}
