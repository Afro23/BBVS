import React from "react";
import * as fig from "./fing";
import "./vr.css";
// import "./sub";
class vReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sub = this.sub.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  sub(event) {
    // this.setState({
    //   voterName: event.target.voterName.value
    // });
    // figcode: event.target.figCode.value
    // this.setState({ aadhaarNumber: event.target.aadhaarNumber.value });
    // this.setState({ figcode: event.target.figCode.value });
    console.log(this.state.voterName);
    console.log(this.state.aadhaarNumber);
    console.log(this.state.dob);
    console.log(this.state.figCode);
    alert(this.state.voterName);
    alert(this.state.aadhaarNumber);
    alert(this.state.dob);
    alert(this.state.figCode);
    // event.preventDefault();
  }

  render() {
    return (
      <div>
        <center>
          <form onSubmit={this.sub}>
            <table>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <center>
                      <h2>Voter Deatils</h2>
                    </center>
                  </td>
                </tr>
                <tr>
                  <td>Enter Name:</td>
                  <td>
                    <input
                      type="text"
                      name="voterName"
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Enter Aadhaar No.:</td>
                  <td>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Enter DOB:</td>
                  <td>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <center>
                      <input
                        className=" btn btn-success"
                        type="button"
                        onClick={fig.captureFP}
                        value="Scan Finger"
                      />
                    </center>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <center>
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success"
                      />
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
            <img
              id="FPImage1"
              alt="Fingerpint Image"
              height="300"
              width="210"
              align="center"
              src="/pf.jpg"
            />
            <br />
            <span id="result" />
          </form>
        </center>
      </div>
    );
  }
}
export default vReg;
