import React, { Component } from "react";
import { toast} from 'react-toastify';
import {HOST} from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';

export default class AdminInput extends Component{

    constructor(props){
        super(props);

        this.state = {
            teachers:[],
            grades:[],
            students:[],
            subjects:[],
            studentsubject:[],
            studentvalue:'',
            display:0,
        };
        this.gradeselectRef = React.createRef();
        this.filterstudentslist = React.createRef();
        this.filterstudentsinputid = React.createRef();
        
    }
    componentDidMount(){
        this.get_all_teacher_grades_students_subjects_studentsubject();
    }
    async get_all_teacher_grades_students_subjects_studentsubject(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get_all_teacher_grades_students_subjects_studentsubject/', {
            method: 'GET',
            headers: header ,
            })
            .then(res => {
                if(res.status == 400){
                    toast.error('Bad Request');
                    return
                }
                if(res.status == 401){
                    toast.error('Unauthorized');
                    return
                }
                if(res.status == 403){
                    toast.error('Forbidden');
                    return
                }
                console.log(res);
                return res.json();
            })
            .then((data) => {
                this.setState({
                    teachers:data.users,
                    grades:data.grades,
                    students:data.students,
                    subjects:data.subjects,
                    studentsubject:data.studentsubject,
                });
            }).catch(function(error) {
                toast.error("Something went Wrong!");
            });
    }
    
    edit_student_clicked = () => {
        this.setState({
            display:1,
        })
    }
    edit_student_subject_clicked = () => {
        this.setState({
            display:2,
        })
    }
    student_selected(e){
        let target = e.target;
        let value = target.attributes.value.value;
        this.setState({
            studentvalue: value,
        });
        this.addStudentToSubject(target, value);
        this.filterstudentsinputid.current.placeholder = this.state.students.find(std=>std.id == value).student_name;
    }
    filterStudents(e){
        let target = e.target;
        let filter = target.value.toUpperCase();
        let filterstudentslist = target.nextElementSibling.nextElementSibling.childNodes[0].childNodes[1].childNodes;
        this.state.students.forEach(student=>{
                if (student.student_name.toUpperCase().indexOf(filter) > -1) {
                    filterstudentslist.forEach((tr)=>
                        {
                            if(student.id == tr.attributes.value.value){
                                tr.style.display = ""
                            }
                        }
                      );
                  } else {
                      filterstudentslist.forEach((tr)=>
                        {
                            if(student.id == tr.attributes.value.value){
                                tr.style.display = "none"
                            }
                        } 
                      );
                  }
            }
        );
    }
    async addStudentToSubject(event, subject){
        let target = event.target;
        let value = target.attributes.value.value;
        this.setState({
            studentvalue: value,
        });
        this.filterstudentsinputid.current.placeholder = this.state.students.find(std=>std.id == value).student_name;
        if (value == ''){
            return
        }
        // event.target.value = null;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/addStudentToSubject/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'student': value,
                'subject': subject,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({studentsubject:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});
    }
    async deleteStudentFromSubject(student, subject){
        
        // event.target.value = null;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/deleteStudentFromSubject/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'student': student,
                'subject': subject,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({studentsubject:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});
    }

    async updateStudentName(event, student){
        let value = event.target.value;
        if (value == ''){
            return
        }
        event.target.value = null;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/updateStudentName/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'student_name': value,
                'student': student,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({students:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});
    }
    async updateStudentPhone(event, student){
        let value = event.target.value;
        if (value == ''){
            return
        }
        event.target.value = null;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/updateStudentPhone/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'phone': value,
                'student': student,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({students:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});

    }
    async updateStudentAddress(event, student){
        let value = event.target.value;
        if (value == ''){
            return
        }
        event.target.value = null;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/updateStudentAddress/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'address': value,
                'student': student,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({students:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});

    }
    async updateStudentDOB(event, student){
        let value = event.target.value;
        if (value == ''){
            return
        }
        event.target.value = null;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/updateStudentDOB/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'date_of_birth': value,
                'student': student,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({students:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});

    }
    async updateStudentGrade(event, student){
        let target = event.target;
        let value = target.value;
        if (value == 'none'){
            return
        }
        event.target.value = value;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/updateStudentGrade/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'student_grade': value,
                'student': student,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({students:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});

    }
    async updateSubjectTeacher(event, subject){
        let target = event.target;
        let value = target.value;
        if (value == 'none'){
            return
        }
        event.target.value = value;
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/updateSubjectTeacher/', {
            method: 'POST', headers: header , body:JSON.stringify({
                'teacher': value,
                'subject': subject,
                }),
            })
            .then(res => { if(res.status == 400){toast.error('Bad Request');return}
                if(res.status == 401){toast.error('Unauthorized');return}
                if(res.status == 403){toast.error('Forbidden');return}
                return res.json();
            })
            .then((data) => {this.setState({subjects:data});
            }).catch(function(error) {toast.error("Something went Wrong!");});

    }
    render(){
        let studentsedit = <div className="container">
            <table className= "table table-bordered table-responsive table-hover table-sm">
                <tbody>
                    <tr><td>Name</td><td>Phone</td><td>address</td><td>DOB</td><td>Grade</td></tr>
                    {
                    this.state.students.map((student, index)=>{
                        return <tr key={index}>
                            <td><input type="text" className="form-control form-control-sm" onBlur={(event)=>this.updateStudentName(event, student)} placeholder={student.student_name}/></td>
                            <td><input type="text" className="form-control form-control-sm" onBlur={(event)=>this.updateStudentPhone(event, student)} placeholder={student.phone}/></td>
                            <td><input type="text" className="form-control form-control-sm" onBlur={(event)=>this.updateStudentAddress(event, student)} placeholder={student.address}/></td>
                            <td><input type="text" className="form-control form-control-sm" onBlur={(event)=>this.updateStudentDOB(event, student)} placeholder={student.date_of_birth}/></td>
                            <td><select onChange={(event)=>this.updateStudentGrade(event, student)} ref={this.gradeselectRef} className="form-control form-control-sm my-auto" defaultValue="none">
                                <option value="none" disabled hidden>{this.state.grades.find(grade=>grade.id == student.student_grade).name}</option> 
                                    {
                                    this.state.grades.map((items, key) => 
                                        <option key={key} value={items.id}>{items.name}</option>
                                    )}
                                </select>
                            </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
        let student_search = <div className = "container">
            <div className="btn-group mx-auto my-auto">
                <div className="form-inline input-group input-group-sm dropdown mx-2">
                        <input type="text" className="form-control dropdown-toggle  my-auto" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder="Search and Add"
                        onKeyUp={(e)=>this.filterStudents(e)} ref={this.filterstudentsinputid} />
                        <span className="input-group-text" disabled><FontAwesomeIcon icon={faSearch} /></span>
                        <div  className="dropdown-menu overflow-auto studentsearcheditsubjectstudent" style={{height: 200 + 'px'}} >
                            <table className="table table-bordered table-striped table-hover table-sm">
                                <thead><tr><td>Students Name</td></tr></thead>
                                <tbody ref = {this.filterstudentslist}>{
                                this.state.students.map((items, key) => 
                                <tr key={key} value={items.id}><td onClick={ (e)=>this.addStudentToSubject(e, )} value={items.id}>{items.student_name}</td></tr>
                                )
                                }</tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
        let subjectsedit = <div className="container">
            <table className="table-responsive table table-bordered table-hover table-sm text-left">
                <tbody>
                    <tr><td>SN</td><td>CODE</td><td>Subject name</td><td>Teacher</td><td>Students</td></tr>
                    {
                        this.state.subjects.map(
                            (subject,index)=>{
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{subject.code}</td>
                                <td>{subject.name}</td>
                                <td><select onChange={(event)=>this.updateSubjectTeacher(event, subject)} ref={this.subjectselectRef} className="form-control form-control-sm my-auto" defaultValue="none">
                                    <option value="none" disabled hidden>{this.state.teachers.find(teacher=> teacher.id == subject.teacher).username}</option> 
                                    {
                                    this.state.teachers.map((items, key) => 
                                        <option key={key} value={items.id}>{items.username}</option>
                                    )}
                                </select>
                                </td>
                                <td className="width-60">
                                    <div className = "container">
                                        <div className="btn-group mx-auto my-auto">
                                            <div className="form-inline input-group input-group-sm dropdown mx-2">
                                                    <input type="text" className="form-control dropdown-toggle  my-auto" 
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder="Search and Add"
                                                    onKeyUp={(e)=>this.filterStudents(e)} ref={this.filterstudentsinputid} />
                                                    <span className="input-group-text" disabled><FontAwesomeIcon icon={faSearch} /></span>
                                                    <div  className="dropdown-menu overflow-auto studentsearcheditsubjectstudent" style={{height: 200 + 'px'}} >
                                                        <table className="table table-bordered table-striped table-hover table-sm">
                                                            <thead><tr><td>Students Name</td></tr></thead>
                                                            <tbody ref = {this.filterstudentslist}>{
                                                            this.state.students.map((items, key) =>{
                                                                
                                                               return (items.student_grade == subject.grade)?<tr key={key} value={items.id}><td onClick={ (e)=>this.addStudentToSubject(e, subject)} value={items.id}>{items.student_name}</td></tr>:null
                                                            })
                                                            }</tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                    </div> {
                                    this.state.studentsubject.map((studentsubject, ind)=>{
                                        if(studentsubject.subject == subject.id){
                                            return <span className="mx-1 btn-group btn-sm subjectstudentspan" key={ind}>
                                                {this.state.students.find(student=>student.id == studentsubject.student).student_name}
                                                <button className="btn btn-sm d-flex"><FontAwesomeIcon icon={faTimes} color="red" onClick={()=>this.deleteStudentFromSubject(studentsubject.student, subject.id)}/></button>
                                            </span>
                                        }
                                    })    
                                }</td>
                            </tr>
                            }
                        )
                    }

                </tbody>
            </table>
        </div>
        return <div className="container">
        <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light my-2">
            {/* <div className="navbar-brand btn-group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    
                </button>
                <div className="dropdown-menu">
                    <button className="dropdown-item" ></button>
                    
                </div>
            </div> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText1" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText1">
                <ul className="navbar-nav mr-auto">
                    <li> <button className="btn btn-sm mx-4" onClick={this.edit_student_clicked}>Edit Student Details</button></li>
                    <li> <button className="btn btn-sm mx-4" onClick={this.edit_student_subject_clicked}>Edit Student Subject</button></li> 
                </ul>
            </div>    
        </nav>
    </div>
    { console.log('Admin Input: ')}
    {(this.state.display == 1)?studentsedit:(this.state.display == 2)?subjectsedit:null}
    
</div>
    }
}