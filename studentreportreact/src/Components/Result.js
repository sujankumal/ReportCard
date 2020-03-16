import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
import {calculategrade} from './calculategrade';
class StudentResult extends Component{

    constructor(props){
        super(props);
        this.state = {
            exams:[],
            students:[],
            grades:[],
            gradestudents:[],
            graderesults:[],
            gradesubjects:[],
            studentresults:[],
            resultcomments:[],
            examvalue:null,
            gradevalue:null,
            studentvalue:null,
            classteacher:false,
            studentresultclicked:true,
            gradestudentresultclicked:false,
            allstudentsresultprocessisrunning:false,
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

    async get_student_result(student, exam){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get-student-result/'+student+'/'+exam+'/', {
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
                this.setState({studentresults:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }

    async get_subjects_by_grade(grade){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get-subjects-grade/'+grade+'/', {
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
                this.setState({gradesubjects:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    
    async find_result_comment(exam){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get-exam-comment/'+exam+'/', {
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
                this.setState({resultcomments: data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    async update_result_comment(e, student, exam){
        let comment = e.target.value;
        e.target.value = null;
        if(!comment){
            return
        }
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/update-result-comment/', {
            method: 'POST',
            headers: header ,
            body:JSON.stringify({
                'comment': comment,
                'student': student,
                'exam': exam,
            }),
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
                this.setState({resultcomments: data});
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
        this.setState({
            gradevalue: e.target.value,
            studentresults:[],
        });
    }

    student_selected(e){
        this.setState({
            studentvalue: e.target.value,
            studentresults:[],
        });
        console.log(
            // (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            // (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }

    exam_selected(e){
        this.setState({
            examvalue: e.target.value,
            studentresults:[],
            allstudentsresultprocessisrunning:false,
        });
        if(this.state.studentresultclicked){
            let studentid =  this.state.studentvalue;
            this.get_student_result(studentid, e.target.value);
            let studentgrade = this.state.students.find(std=>std.id==studentid).student_grade;
            this.get_subjects_by_grade(studentgrade);
        }
        this.find_result_comment(e.target.value);
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
            // (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
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
    resultcomment=(student, exam)=>{
        let val = this.state.resultcomments.find(
            comment=> comment.student == student && comment.exam == exam
        );
        // console.log("hell", val.result_comment);
        return (val)?val.result_comment:'';
    }

    async get_student_result_calledbyall(student, exam, index){
        const header =await this.props.auth_headers();
        // let payload = [];
        await fetch(HOST+'/get-student-result/'+student+'/'+exam+'/', {
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
                // payload = data;
                this.setState({
                    [index]:data,
                });
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
            // return payload;
    }

    async get_subjects_by_grade_calledbyall(grade, index){
        const header =await this.props.auth_headers();
        // const payload = [];
        await fetch(HOST+'/get-subjects-grade/'+grade+'/', {
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
                // payload = data;
                this.setState({
                    [index]:data,
                });
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
            // return payload;
    }
    result_table(){
        if(this.state.gradestudentresultclicked){
            // all students of grade
            let exam = this.state.examvalue;
            if(exam && !this.state.allstudentsresultprocessisrunning){
                this.setState({
                    allstudentsresultprocessisrunning:true,
                });
                let exam_title = this.state.exams.find(item=> item.id == exam).name;
                let students = this.state.students;
                // let studentselected = this.state.studentvalue;
                // let student = students.find(std => std.id == studentselected);
                this.get_subjects_by_grade(this.state.gradevalue);
                let payload = [];
                let results = [];
                students.forEach((student, index)=>{ 
                    this.get_student_result_calledbyall(student.id, exam, 'results'+index );
                    // this.get_subjects_by_grade_calledbyall()
                    // results[index] = [];
                    results[index] = this.state['student'+index];
                    let gradesubjects = this.state.gradesubjects;
                    let cgpa = [];
                    let data = <div className="container" key={index}>
                    <table className="table table-bordered table-striped table-hover table-sm">
                    <tbody>
                        <tr><td colSpan="10"><b>Exam Report: {exam_title}</b></td></tr>
                        <tr>
                            <td colSpan="5">Name: {student.student_name}</td>
                            <td colSpan="2">Class: {this.state.grades.find(grade=>grade.id == student.student_grade).name}</td>
                            <td>Class Teacher Remarks</td>
                        </tr>
                        <tr>
                            <td>SN</td>
                            <td>Subjects</td>
                            <td>Theory</td>
                            <td>Practical</td>
                            <td>Total</td>
                            <td>GPA</td>
                            <td>Grade</td>
                            <td rowSpan="0" >{
                                (this.state.grades.find(grade=>grade.classteacher == this.props.userid))?
                                <textarea rows="6" placeholder={this.resultcomment(student.id, exam)} className="form-control form-control-sm" onBlur={(e)=>this.update_result_comment(e, student.id, exam)}/>
                                : this.resultcomment(student.id, exam)
                            }</td>
                        </tr>
                        {
                            (results[index] && results[index].length>0)?results[index].map((result,ind)=>{
                                let theory = Math.round(0.6*parseFloat(result.mark));
                                let practical = Math.round( 0.4*parseFloat(result.cas));
                                let total = theory +practical;
                                let gpa = calculategrade(total);
                                cgpa.push(gpa.gpa);
                                return <tr key={ind}>
                                    <td>{ind+1}</td>
                                    {/* Correct here and in home class mark display map */}
                                    <td>{gradesubjects.map(subject=> (subject.id == result.subject)?subject.name:null)}</td>
                                    <td>{theory}</td>
                                    <td>{practical}</td>
                                    <td>{total}</td>
                                    <td>{gpa.gpa}</td>
                                    <td>{gpa.grade}</td>

                                </tr>
                                }
                                ):null          
                            }
                        </tbody>
                        <tfoot>
                        <tr><td colSpan="5"></td><th colSpan="2">GPA: {(cgpa.reduce((sum, gpa) => (gpa != 'FAIL')? sum + parseFloat(gpa): sum, 0)/cgpa.length).toFixed(2)}</th><td></td></tr>
                        <tr className="table-borderless">
                            <td colSpan="2" ></td>
                            <td colSpan="3" rowSpan="3">
                                <b className="signature">Class Teacher</b>
                            </td>
                            <td colSpan="3" rowSpan="3">
                                <b className="signature">Principal</b>
                            </td>
                        </tr>
                        
                        </tfoot>
                    </table>
                    </div>
                  payload.push(data);
                });
                return payload;
            }
        }else{
            // single student
            let exam = this.state.examvalue;
            if(exam){
                let exam_title = this.state.exams.find(item=> item.id == exam).name;
                let students = this.state.students;
                let studentselected = this.state.studentvalue;
                let student = students.find(std => std.id == studentselected);
                let results = this.state.studentresults;
                let gradesubjects = this.state.gradesubjects;
                let cgpa = [];
                return (<div className="container">
                <table className="table table-bordered table-striped table-hover table-sm">
                    <tbody>
                        <tr><td colSpan="10"><b>Exam Report: {exam_title}</b></td></tr>
                        <tr>
                            <td colSpan="5">Name: {student.student_name}</td>
                            <td colSpan="2">Class: {this.state.grades.find(grade=>grade.id == student.student_grade).name}</td>
                            <td>Class Teacher Remarks</td>
                        </tr>
                        <tr>
                            <td>SN</td>
                            <td>Subjects</td>
                            <td>Theory</td>
                            <td>Practical</td>
                            <td>Total</td>
                            <td>GPA</td>
                            <td>Grade</td>
                            <td rowSpan="0" >{
                                (this.state.grades.find(grade=>grade.classteacher == this.props.userid))?
                                <textarea rows="6" placeholder={this.resultcomment(student.id, exam)} className="form-control form-control-sm" onBlur={(e)=>this.update_result_comment(e, student.id, exam)}/>
                                : this.resultcomment(student.id, exam)
                            }</td>
                        </tr>
                        {
                            (results.length>0)?results.map((result,index)=>{
                                let theory = Math.round(0.6*parseFloat(result.mark));
                                let practical = Math.round( 0.4*parseFloat(result.cas));
                                let total = theory +practical;
                                let gpa = calculategrade(total);
                                cgpa.push(gpa.gpa);
                                return <tr key={index}>
                                    <td>{index+1}</td>
                                    {/* Correct here and in home class mark display map */}
                                    <td>{gradesubjects.map(subject=> (subject.id == result.subject)?subject.name:null)}</td>
                                    <td>{theory}</td>
                                    <td>{practical}</td>
                                    <td>{total}</td>
                                    <td>{gpa.gpa}</td>
                                    <td>{gpa.grade}</td>

                                </tr>
                                }
                                ):null          
                        }
                    </tbody>
                    <tfoot>
                    <tr><td colSpan="5"></td><th colSpan="2">GPA: {(cgpa.reduce((sum, gpa) => (gpa != 'FAIL')? sum + parseFloat(gpa): sum, 0)/cgpa.length).toFixed(2)}</th><td></td></tr>
                    <tr className="table-borderless">
                        <td colSpan="2" ></td>
                        <td colSpan="3">
                            <b className="signature">Class Teacher</b>
                        </td>
                        <td colSpan="3">
                            <b className="signature">Principal</b>
                        </td>
                    </tr>
                    
                    </tfoot>
                </table>
                </div>
                );
            }
        }
        
    }
    render(){
        let grade_select = <li className="btn-group mx-2">
                <span className="mx-2">Grade</span>
                <select onChange={(e)=>this.grade_selected(e)} ref={this.gradeselectRef} className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.grades.map((items, key) => 
                    <option key={key} value={items.id}>{items.name}</option>
                    )}
                </select>
                </li>
                        

        let student_select = <li className="btn-group  mx-2">
                <span className="mx-2">Student</span>
                <select onChange={(e)=>this.student_selected(e)} ref={this.studentselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.students.map((items, key) => 
                    <option key={key} value={items.id}>{items.student_name}</option>
                    )}
                </select>
                </li>
        let exam_select = <li className="btn-group mx-2">
                <span className="mx-2">Exam</span>
                <select onChange={(e)=>this.exam_selected(e)} ref={this.examselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.exams.map((items, key) => 
                    <option key={key} value={items.id}>{items.name}</option>
                    )}
                </select>
                </li>
    
        
        return (
            <div className="container">
                <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light my-2">
                    <div className="navbar-brand btn-group">
                        <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {
                                (this.state.studentresultclicked)?'Student result ':(this.state.gradestudentresultclicked)?'Grade all students result ':'Menu '
                            }
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={this.student_result_clicked}>Student result</button>
                            <button className="dropdown-item" onClick={this.grade_student_result_clicked}>Grade all student result</button>
                            <button className="dropdown-item" onClick={this.props.show_home}>Go to result input form</button>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText1" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText1">
                        <ul className="navbar-nav mr-auto">
                            {(this.state.gradestudentresultclicked )?grade_select:null}
                            {(this.state.gradestudentresultclicked && this.state.gradevalue)?exam_select:null}
                            {/* {(this.state.gradestudentresultclicked && this.state.gradevalue && this.state.examvalue)?student_select:null} */}
                            {(this.state.studentresultclicked)?student_select:null}
                            {(this.state.studentresultclicked && this.state.studentvalue)?exam_select:null}
                        </ul>
                    </div>    
                </nav>
            </div>
            { console.log('com: ', this.state.studentresultclicked)}
            {(this.state.studentresultclicked || this.state.gradestudentresultclicked)?this.result_table():null}
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