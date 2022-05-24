import React from "react";
import "./App.css";
import Course from "./Course";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from "react-bootstrap/Modal";

class CourseArea extends React.Component {
  constructor(props){
    super(props)
    this.state = { showComplete: false,
                   showSearchCart: false,
                   showRatings: false}
  }

  openComplete() {
    // Sets the expanded state of the course
    this.setState({
      showComplete: true
     })
  }

  closeComplete() {
    this.setState({
      showComplete: false
     })
  }

  openSearchCart() {
    // Sets the expanded state of the course
    this.setState({
      showSearchCart: true
     })
  }

  closeSearchCart() {
    this.setState({
      showSearchCart: false
     })
  }


  openRatings() {
    // Sets the expanded state of the course
    this.setState({
      showRatings: true
     })
  }

  closeRatings() {
    this.setState({
      showRatings: false
     })
  }
  getCourses() {
    let courses = [];

    if (this.props.mode === "cart") {
      // If the mode is cart, then we want to display the courses in the compact view.
      // They should also allow the user to remove the course from the cart.
      courses = this.props.cartCourses.map((course) => (
        <Course
          key={course.number}
          data={course}
          compactView={true}
          cartCourses={this.props.cartCourses}
          addCartCourse={this.props.addCartCourse}
          removeCartCourse={(data) => this.props.removeCartCourse(data)}
        />
      ));
    } else {
      // If the mode is completed courses, then we want to display the courses in the compact view.
      // Completed courses should allow the user to give the course a rating.
      if (this.props.mode === "completed") {
        courses = this.props.data.map((course) => (
          <Course
            key={course.number}
            data={course}
            compactView={true}
            ratingMode={true}
            setRating={this.props.setRating}
          />
        ));
      } else {
        // If no mode is specified, then we want to display the courses in the expanded view.
        // The user should be able to add/remove the course to/from the cart.
        courses = this.props.data.map((course) => (
          <Course
            key={course.number}
            data={course}
            compactView={false}
            cartCourses={this.props.cartCourses}
            addCartCourse={this.props.addCartCourse}
            removeCartCourse={this.props.removeCartCourse}
          />
        ));
      }
    }

    return courses;
  }

  getButton() {
    if (this.props.mode === "completed") {
      return(
        <>
      <ButtonGroup size="lg" style={{ margin: "5px"}}>
        <Button onClick={() => this.openSearchCart()}>Return to Search</Button>
        <Button variant="success" onClick={() => this.openComplete()}>Complete Registration</Button>
      </ButtonGroup>
         <Modal show={this.state.showComplete}> 
            <Modal.Header>
              <Modal.Title>Registration Complete!</Modal.Title>
             </Modal.Header>
               <Modal.Body>
                  <p>You will be enrolled in the courses present in your cart and your ratings will be submitted</p>
               </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.closeComplete()} >Close</Button>
           </Modal.Footer>
          </Modal>
          </>)
    }
    else if(this.props.mode === "cart"){
      return(
        <>
      <ButtonGroup size="lg" style={{ margin: "5px"}}>
        <Button onClick={() => this.openSearchCart()}>Return to Search</Button>
        <Button variant="success" onClick={() => this.openRatings()}>Continue to Ratings</Button>
      </ButtonGroup>
        </>
      )
    }

  }

  render() {
    return (
      <>
      <div>{this.getButton()}</div>
      <div style={{ margin: "5px",}}>{this.getCourses()}</div>
      <Modal show={this.state.showSearchCart}>
            <Modal.Header>
              <Modal.Title>Woops!</Modal.Title>
             </Modal.Header>
               <Modal.Body>
                  <p>There was an error getting this button to switch tabs, you can still access the search page via the "Search" tab in the top left corner.</p>
               </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.closeSearchCart()}>Close</Button>
           </Modal.Footer>
          </Modal>

          <Modal show={this.state.showRatings}>
            <Modal.Header>
              <Modal.Title>Woops!</Modal.Title>
             </Modal.Header>
               <Modal.Body>
                  <p>There was an error getting this button to switch tabs, you can still access the completed courses via the "Completed Courses" tab in the top left corner.</p>
               </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.closeRatings()}>Close</Button>
           </Modal.Footer>
          </Modal>
    </>
    );
  }
}

export default CourseArea;
