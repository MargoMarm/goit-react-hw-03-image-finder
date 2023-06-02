import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  Form,
  FormButton,
  FormInput,
  Header,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();

	  this.props.onSubmit(this.state.value.trim().toLowerCase());
    this.setState({ value: '' });
  };

  render() {
    return (
      <Header>
        <Form type="submit" onSubmit={this.handleSubmit}>
          <FormButton>
            <FcSearch size="30"  />
          </FormButton>

          <FormInput
            onChange={this.handleChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
