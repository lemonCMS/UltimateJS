import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';

class Search extends React.Component {

  constructor() {
    super();
    this.pushSearch = this.pushSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = {
      q: '',
      skip: 0
    };
  }

  static propTypes = {
    'pushSearch': PropTypes.func,
    'query': PropTypes.string
  };

  componentWillMount() {
    this.setState({
      q: this.props.query,
      skip: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.skip === 0) {
      this.setState({q: nextProps.query});
    }

    if (this.state.skip > 0) {
      this.setState({skip: this.state.skip - 1});
    }
  }

  pushSearch(e) {
    const value = e.target.value;
    this.setState({q: value, skip: 6}, () => {
      this.props.pushSearch(value);
    });
  }

  clearSearch() {
    this.setState({
      q: ''
    }, this.props.pushSearch(''));
  }

  render() {
    return (
      <FormGroup
        controlId="q"
      >
        <ControlLabel>Zoeken</ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={this.state.q}
            placeholder="Zoeken"
            onChange={this.pushSearch}
          />
          <InputGroup.Button>
            <Button disabled={this.state.q === ''} onClick={this.clearSearch}>
              <i className="fa fa-remove" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default Search;
