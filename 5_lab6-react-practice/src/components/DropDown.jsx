import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cookie from 'react-cookie';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.renderItem =this.renderItem.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderItem(){
    var count= this.props.num;
    var array = [];
    while ( count!=0){
      array.push(<DropdownItem>{cookie.load(count)}</DropdownItem>);
      count--;
    }
    return array;
  }


  render() {
      return ( <DropdownMenu>{this.renderItem()}</DropdownMenu>);
  }

}
