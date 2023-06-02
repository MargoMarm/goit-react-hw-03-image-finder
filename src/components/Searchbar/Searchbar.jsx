import { Component } from 'react';
import {
  Form,
  FormButton,
  ButtonLabel,
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
            <ButtonLabel>Search</ButtonLabel>
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
