import { Component } from 'react';
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import getPictures from '../services/getPictures';
import Error from 'components/Error/Error';
import { notification } from 'components/Notification/Notification';


export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    totalPics: null,
    isOpen: false,
    loading: false,
	  modalImgSrc: '',
	  error: null,
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
			const { hits, totalHits } = response.data;
			console.log(response.data)
        this.setState(prevState => ({
          pictures: page === 1 ? hits : [...prevState.pictures, ...hits],
          totalPics: totalHits,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

	handleSerach = searchQuery => {
		if (searchQuery === this.state.searchQuery) {
			notification(
        `Images of ${searchQuery} have already been displayed.`
		  );
		  return;
	  }
    this.setState({
      searchQuery,
      pictures: [],
      page: 1,
      totalPics: null,
      isOpen: false,
      loading: false,
      modalImgSrc: '',
      error: null,
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
    const { pictures, loading, totalPics,  error, page, modalImgSrc, isOpen } =
		 this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSerach} />

        <ImageGallery pictures={pictures} onClick={this.onModalOpen} />

        {totalPics === 0 && (
          <Error errorText={'Sorry, nothing has been found at your request'} />
        )}
        {error && (
          <Error
            errorText={`Something went wrong... ${error}. Please try again.`}
          />
        )}
        {loading && <Loader />}
        {totalPics / pictures.length > page && (
          <Button onClick={this.onBtnClick}></Button>
        )}
        {isOpen && <Modal imgSrc={modalImgSrc} onClose={this.onModalClose} />}
        <ToastContainer />
      </Container>
    );
  }
}
