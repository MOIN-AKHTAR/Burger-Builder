import React, { Component } from "react";
import Classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Wrapper from "../../hoc/Wrapper/Wrapper";

class Modal extends Component {
  // Optimize Performance A Little Bit...
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.loading !== this.props.loading
    );
  }

  render() {
    return (
      <Wrapper>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={Classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-150%)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}
export default Modal;
