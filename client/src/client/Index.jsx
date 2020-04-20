import React, { Component, Fragment } from "react";
import Appointment from "../components/Appointment";
import "../style/style.css";
import Picture1 from "../res/builder.jpg";
import Picture2 from "../res/builder2.jpg";
import Picture3 from "../res/builder3.jpg";

export default class Index extends Component {
  constructor() {
    super();
    this.handleModalStatus = this.handleModalStatus.bind(this);
    this.state = {
      modalStatus: false,
      _id: "",
    };
  }

  handleModalStatus() {
    this.setState(() => ({ modalStatus: !this.state.modalStatus }));
  }

  render() {
    return (
      <Fragment>
        <div className="col-md-12" id="header">
          <div className="row">
            <div className="col-md-12">
              <div className="container">
                <div className="container">
                  <div className="container">
                    <center className="text-light" id="index-text-center">
                      <h6>Building world for the better future</h6>
                      <h3>All things need to repair</h3>
                      <p>
                        Consequatur quam culpa et consequatur beatae. Est libero
                        occaecati. Harum laboriosam consectetur voluptates
                        excepturi incidunt aspernatur quia voluptas.
                      </p>
                      <button
                        disabled={!localStorage.getItem("_id")}
                        onClick={this.handleModalStatus}
                        className="btn btn-light"
                      >
                        Make an appointment
                      </button>
                      <Appointment
                        modalStatus={this.state.modalStatus}
                        handleModalStatus={this.handleModalStatus}
                      />
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-12"
          style={{ marginTop: "40px"}}
        >
          <h3 className="text-center" style={{marginBottom: "40px"}}>Our Services</h3>
          <div className="row">
            <div className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={Picture3} alt="oawkdoakwdok" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={Picture1} alt="oawkdoakwdok" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={Picture2} alt="oawkdoakwdok" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={Picture3} alt="oawkdoakwdok" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
