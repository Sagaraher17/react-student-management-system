import React, { Component } from 'react';
import StudentDetails from './StudentDetails';
import './StudentDashboard.css';

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    console.log('[Parent] constructor');

    this.state = {
      students: [
        { id: 1, name: 'Rahul ', course: 'React', status: 'Active' },
        { id: 2, name: 'Priya', course: 'Angular', status: 'Active' },
        { id: 3, name: 'Amit', course: 'JavaScript', status: 'Inactive' },
        { id: 4, name: 'Sakshi', course: 'React', status: 'Active' },
      ],
      welcomeMessage: '',
      selectedStudent: null,
      showDetails: false,
      elapsedSeconds: 0,
    };
  }
  componentDidMount() {
    console.log('[Parent] StudentDashboard mounted successfully.');

    this.setState({ welcomeMessage: 'Welcome to the Student Management System!' });

    this.timerId = setInterval(() => {
      this.setState((prevState) => ({
        elapsedSeconds: prevState.elapsedSeconds + 1,
      }));
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('[Parent] StudentDashboard updated.');
    console.log('[Parent] Previous state:', prevState);
    console.log('[Parent] Current state:', this.state);
  }
  componentWillUnmount() {
    console.log('[Parent] StudentDashboard unmounting.');
    clearInterval(this.timerId);
  }
  handleSelectStudent = (student) => {
    this.setState({ selectedStudent: student });
  };
  handleChangeCourse = (studentId) => {
    this.setState((prevState) => {
      const updatedStudents = prevState.students.map((student) => {
        if (student.id === studentId) {
          const newCourse = student.course === 'React' ? 'Angular' : 'React';
          return { ...student, course: newCourse };
        }
        return student;
      });
      let updatedSelected = prevState.selectedStudent;
      if (prevState.selectedStudent && prevState.selectedStudent.id === studentId) {
        updatedSelected = {
          ...prevState.selectedStudent,
          course: prevState.selectedStudent.course === 'React' ? 'Angular' : 'React',
        };
      }
      return {
        students: updatedStudents,
        selectedStudent: updatedSelected,
      };
    });
  };
  toggleShowDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };
  render() {
    console.log('[Parent] render');
    const { students, welcomeMessage, selectedStudent, showDetails, elapsedSeconds } = this.state;

    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Student Management System</h2>

        {welcomeMessage && <h4 className="dashboard-welcome">{welcomeMessage}</h4>}

        <div className="dashboard-stats">
          <p><strong>Dashboard Active For:</strong> {elapsedSeconds} seconds</p>
          <p><strong>Total Students:</strong> {students.length}</p>
        </div>
        <div className="toggle-btn-container">
          <button className="btn-toggle" onClick={this.toggleShowDetails}>
            {showDetails ? 'Hide Student Details' : 'Show Student Details'}
          </button>
        </div>
        <div className="student-list">
          {students.map((student) => {
            const isActive = student.status === 'Active';

            return (
              <div key={student.id} className="student-card">
                <div className="student-info">
                  <span className="student-id">#{student.id}</span>
                  <strong className="student-name">{student.name}</strong>
                  <span className="badge-course">{student.course}</span>
                  <span className={`badge-status ${isActive ? 'status-active' : 'status-inactive'}`}>
                    ● {student.status}
                  </span>
                </div>
                <div className="student-actions">
                  <button className="btn-action" onClick={() => this.handleSelectStudent(student)}>
                    View Details
                  </button>
                  <button className="btn-action" onClick={() => this.handleChangeCourse(student.id)}>
                    Change Course
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {showDetails && <StudentDetails student={selectedStudent} />}
      </div>
    );
  }
}

export default StudentDashboard;