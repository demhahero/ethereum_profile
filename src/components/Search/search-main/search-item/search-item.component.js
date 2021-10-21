import React, { Component } from "react";
import "./search-item.component.scss";
import Config from "../../../../config";

class SearchItemComponent extends Component {
  render() {
    return (
      <div className="container">
        <a href={"./Profile?id=" + this.props.id}>
          <img
            className="container__image"
            alt="text"
            src={Config.UPLOAD_Folder_URL + this.props.address + ".png"}
          />
        </a>
        <div className="container__text">
          {this.props.id} - {this.props.address} - {this.props.email}
        </div>
      </div>
    );
  }
}

export default SearchItemComponent;
