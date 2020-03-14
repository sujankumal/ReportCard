import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';

class StudentResult extends Component{

    constructor(props){
        super(props);
        this.state = {
            exams:[],
            students:[],
            grades:[],
            gradestudents:[],
            examvalue:null,
            gradevalue:null,
            studentvalue:null,
            studentresultclicked:true,
            gradestudentresultclicked:false
        };
        this.gradeselectRef = React.createRef();
        this.examselectRef = React.createRef();
        this.studentselectRef = React.createRef();
    }

    async get_grades(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/view-grades/', {
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
                this.setState({grades:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ typeof(error)+ error);
            });
    }
    async teacher_get_exams(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-exams/', {
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
                console.log(data);
                this.setState({exams:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    async get_all_students(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get-all-students/', {
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
                console.log(data);
                this.setState({students:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    componentDidMount(){
        this.get_grades();
        this.teacher_get_exams();
        this.get_all_students();
    }

    grade_selected(e){

    }

    student_selected(e){

    }

    exam_selected(e){

    }

    student_result_clicked = () =>{
        this.setState({
            examvalue:null,
            studentresultclicked:true,
            gradevalue:null,
            studentvalue:null,
            gradestudentresultclicked:false
        });
        console.log(
            (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    grade_student_result_clicked = () =>{
        this.setState({
            gradevalue:null,
            studentvalue:null,
            examvalue:null,
            studentresultclicked:false,
            gradestudentresultclicked:true,
        });
        console.log(
            (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    render(){
        let grade_select = <td className="input-group col-md-3">
                <label className="form-control-sm">Grade</label>
                <select onChange={(e)=>this.grade_selected(e)} ref={this.gradeselectRef} className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.grades.map((items, key) => 
                    <option key={key} value={items.id}>{items.name}</option>
                    )}
                </select>
                </td>
                        

        let student_select = <td className="input-group col-md-3">
                <label className="form-control-sm">Student</label>
                <select onChange={(e)=>this.student_selected(e)} ref={this.studentselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.students.map((items, key) => 
                    <option key={key} value={items.id}>{items.student_name}</option>
                    )}
                </select>
                </td>
        let exam_select = <td className="input-group col-md-3">
                <label className="form-control-sm">Exam</label>
                <select onChange={(e)=>this.exam_selected(e)} ref={this.examselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.exams.map((items, key) => 
                    <option key={key} value={items.id}>{items.name}</option>
                    )}
                </select>
                </td>
    
        
        return (
            <div className="container">
                <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                <table className="table table-sm">
                <tbody>
                <tr className="navbar-nav form-group">
                    <td className="btn-group" >
                        <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {
                                (this.state.studentresultclicked)?'Student result':(this.state.gradestudentresultclicked)?'Grade all student result':'Menu'
                            }
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={this.student_result_clicked}>Student result</button>
                            <button className="dropdown-item" onClick={this.grade_student_result_clicked}>Grade all student result</button>
                            <button className="dropdown-item" onClick={this.props.show_home}>Go to result input form</button>
                        </div>
                    </td>

                    {(this.state.gradestudentresultclicked )?grade_select:null}
                    {(this.state.gradestudentresultclicked && this.state.gradevalue)?exam_select:null}
                    {(this.state.gradestudentresultclicked && this.state.gradevalue && this.state.examvalue)?student_select:null}
                    {(this.state.studentresultclicked)?student_select:null}
                    
                </tr>
                </tbody>
                </table>    
            </nav>
            </div>
            {/* {(this.state.inputresultclicked)? (this.state.subjectvalue)?result_form:null:(this.state.classmarksclicked && this.state.subjects.length != 0)?class_marks_diaplay:null} */}
            {/* {(this.state.inputresultclicked)? (this.state.subjectvalue)?result_form:null:(this.state.studentresultclicked && this.state.studentvalue)?student_result_display:(this.state.classmarksclicked && this.state.subjects.length != 0)?class_marks_diaplay:null} */}
        </div>
            )
    }
}

class AllStudentResult extends Component{

    constructor(props){
        super(props);
    }
    render(){

        return <div></div>
    }
}


export default StudentResult;