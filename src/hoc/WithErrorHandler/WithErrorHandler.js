import React, { Component } from "react";
import Wrapper from "../Wrapper/Wrapper";
import Modal from "../../UI/Modal/Modal";
// import Axios from "axios";

const WithErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      // Registering Interceptors For Request And Response
      this.reqInteceptorId = axios.interceptors.request.use((request) => {
        this.setState({
          error: null,
        });
        return request;
      });

      this.resInteceptorId = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
          });
        }
      );
    }

    componentWillUnmount() {
      //   Unregistering Interceptors
      axios.interceptors.request.eject(this.reqInteceptorId);
      axios.interceptors.response.eject(this.resInteceptorId);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null,
      });
    };

    render() {
      return (
        <Wrapper>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Wrapper>
      );
    }
  };
};

export default WithErrorHandler;
