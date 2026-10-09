import React, { Component } from 'react';

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    console.log('[Child] constructor');
  }
  componentDidMount() {
    console.log('[Child] StudentDetails mounted.');
  } 
  componentDidUpdate(prevProps, prevState) {
    console.log('[Child] StudentDetails updated.');
    if (prevProps.student !== this.props.student) {
      console.log('[Child] Props changed - Selected student:', this.props.student);
    }
  }
  componentWillUnmount() {
    console.log('[Child] StudentDetails unmounted (componentWillUnmount).');
  }
  render() {
    console.log('[Child] render');
    const { student } = this.props;
    if (!student) {
      return (
        <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px', borderRadius: '5px' }}>
          <h3>Student Details</h3>
          <p>Please select a student to view details.</p>
        </div>
      );
    }
    return (
      <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px', borderRadius: '5px' }}>
        <h3>Student Details</h3>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Status:</strong> {student.status}</p>
      </div>
    );
  }
}

export default StudentDetails;