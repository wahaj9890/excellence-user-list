import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./style.css";
import Card from "@material-ui/core/Card";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 6,
      pageNumber: 0,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    axios
      .get(`https://reqres.in/api/users?page=${this.state.currentPage + 1}`)
      .then((res) => {
        const postData = res.data.data.map((user) => (
          <React.Fragment>
            <div className="cardContainer">
              <img src={user.avatar} alt="" className="userImage" />

              <p>
                <b>UserName:</b>
                {user.first_name + "" + user.last_name}
              </p>
              <p>
                <b>Email:</b>
                {user.email}
              </p>
              <hr />
            </div>
          </React.Fragment>
        ));

        this.setState({
          pageCount: Math.ceil(res.data.total / this.state.perPage),

          postData,
        });
      });
  }
  handlePageClick = (e) => {
    debugger;
    const selectedPage = e.selected;

    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
        pageNumber: selectedPage,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
