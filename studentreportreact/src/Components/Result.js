import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
import {calculategrade} from './calculategrade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

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
            studentresultsmulti1:[],
            studentresultsmulti2:[],
            studentresultsmulti3:[],
            resultcomments:[],
            examvalue:null,
            examvaluemulti1:null,
            examvaluemulti2:null,
            examvaluemulti3:null,
            gradevalue:null,
            studentvalue:null,
            classteacher:false,
            studentresultclicked:true,
            gradestudentresultclicked:false,
            
            finalreportclicked:false,
            gradestudentfinalreportclicked:false,
        };
        this.gradeselectRef = React.createRef();
        this.examselectRef = React.createRef();
        this.examselectRef1 = React.createRef();
        this.examselectRef2 = React.createRef();
        this.examselectRef3 = React.createRef();
        this.studentselectRef = React.createRef();
        this.filterstudentsinputid = React.createRef();
        this.filterstudentslist = React.createRef();
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

    async get_student_result(student, exam, exammulti){
        
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
                if(exammulti == 0){
                    this.setState({studentresults:data});
                }else if(exammulti == 1){
                    this.setState({studentresultsmulti1:data});
                }else if(exammulti == 2){
                    this.setState({studentresultsmulti2:data});
                }else if(exammulti == 3){
                    this.setState({studentresultsmulti3:data});
                }
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
            studentresultsmulti1:[],
            studentresultsmulti2:[],
            studentresultsmulti3:[],
        });
        if(this.state.gradestudentresultclicked || this.state.gradestudentfinalreportclicked){
            this.get_subjects_by_grade(e.target.value);
        }
        if(this.examselectRef1.current){ this.examselectRef1.current.selectedIndex=0}
        if(this.examselectRef2.current){ this.examselectRef2.current.selectedIndex=0}
        if(this.examselectRef3.current){ this.examselectRef3.current.selectedIndex=0}

    }

    student_selected(e){
        this.setState({
            studentvalue: e.target.attributes.value.value,
            studentresults:[],
            studentresultsmulti1:[],
            studentresultsmulti2:[],
            studentresultsmulti3:[],
        });
        this.filterstudentsinputid.current.placeholder = this.state.students.find(std=>std.id == e.target.attributes.value.value).student_name;
        console.log(
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    filterStudents(e){
        let filter = e.target.value.toUpperCase();
        this.state.students.forEach(student=>{
                if (student.student_name.toUpperCase().indexOf(filter) > -1) {
                    this.filterstudentslist.current.childNodes.forEach((tr)=>
                        {
                            if(student.id == tr.attributes.value.value){
                                tr.style.display = ""
                            }
                        }
                      );
                  } else {
                      this.filterstudentslist.current.childNodes.forEach((tr)=>
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

    exam_selected(e, exammulti){
        if(exammulti == 0){
            this.setState({
                examvalue: e.target.value,
                studentresults:[],
                
            });
        }else if(exammulti == 1){
            this.setState({
                examvaluemulti1: e.target.value,
                studentresultsmulti1:[],
                
            });
        }else if(exammulti == 2){
            this.setState({
                examvaluemulti2: e.target.value,
                studentresultsmulti2:[],
                
            });
        }else if(exammulti == 3){
            this.setState({
                examvaluemulti3: e.target.value,
                studentresultsmulti3:[],
                
            });
        } 
        if(this.state.studentresultclicked || this.state.finalreportclicked){
            let studentid =  this.state.studentvalue;
            this.get_student_result(studentid, e.target.value, exammulti);
            let studentgrade = this.state.students.find(std=>std.id==studentid).student_grade;
            this.get_subjects_by_grade(studentgrade);
        }
        else if(this.state.gradestudentresultclicked || this.state.gradestudentfinalreportclicked){
            // here filter students by grade.
            let current_grade = this.state.gradevalue;
            this.state.students.map((student, index)=>{
                if(student.student_grade == current_grade){ 
                    this.get_student_result_calledbyall(student.id, e.target.value, 'results'+index+exammulti );
                }
            });
        }
        
        this.find_result_comment(e.target.value);
    }

    student_result_clicked = () =>{
        this.setState({
            examvalue:null,
            examvaluemulti1:null,
            examvaluemulti2:null,
            examvaluemulti3:null,
            studentresultclicked:true,
            gradevalue:null,
            studentvalue:null,
            gradestudentresultclicked:false,
            finalreportclicked:false,
            gradestudentfinalreportclicked:false,
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
            examvaluemulti1:null,
            examvaluemulti2:null,
            examvaluemulti3:null,
            studentresultclicked:false,
            gradestudentresultclicked:true,
            finalreportclicked:false,
            gradestudentfinalreportclicked:false,
        });
        console.log(
            (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    final_report_clicked=()=>{
        this.setState({
            // exams:[],
            // students:[],
            // grades:[],
            gradestudents:[],
            graderesults:[],
            gradesubjects:[],
            studentresults:[],
            studentresultsmulti1:[],
            studentresultsmulti2:[],
            studentresultsmulti3:[],
            resultcomments:[],
            examvalue:null,
            examvaluemulti1:null,
            examvaluemulti2:null,
            examvaluemulti3:null,
            gradevalue:null,
            studentvalue:null,
            classteacher:false,
            studentresultclicked:false,
            gradestudentresultclicked:false,
            
            finalreportclicked:true,
            gradestudentfinalreportclicked:false,
        });
        console.log("Final report");
    }
    grade_student_final_report_clicked=()=>{
        this.setState({
            // exams:[],
            // students:[],
            // grades:[],
            gradestudents:[],
            graderesults:[],
            gradesubjects:[],
            studentresults:[],
            studentresultsmulti1:[],
            studentresultsmulti2:[],
            studentresultsmulti3:[],
            resultcomments:[],
            examvalue:null,
            examvaluemulti1:null,
            examvaluemulti2:null,
            examvaluemulti3:null,
            gradevalue:null,
            studentvalue:null,
            classteacher:false,
            studentresultclicked:false,
            gradestudentresultclicked:false,
            
            finalreportclicked:false,
            gradestudentfinalreportclicked:true,
            
        });
        console.log("all student Final report");
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
            if(exam){
                let exam_title = this.state.exams.find(item=> item.id == exam).name;
                let students = this.state.students;
                let payload = [];
                let results = [];
                let current_grade = this.state.gradevalue;
                students.map((student, index)=>{
                    if(student.student_grade == current_grade){
                        
                    const stateindex = 'results'+index+0;
                    results[index] = this.state[stateindex];
                    let cgpa = [];
                    let count = 0;
                                    
                    let data = <div className="container mt-2" key={index}>
                        <div className="container result">
                        <div><img src="/schoolHeader.jpg"/></div>
                    <div><h3>Exam Report: {exam_title}</h3></div>
                    <table className="table table-bordered table-striped table-hover table-sm">
                    <tbody>
                        <tr><td colSpan="5">Name: {student.student_name}</td>
                            <td colSpan="2">Class: {this.state.grades.find(grade=>grade.id == student.student_grade).name}</td>
                            <td>Class Teacher Remarks</td>
                        </tr>
                        <tr><td>SN</td><td>Subjects</td><td>Theory</td><td>Practical</td><td>Total</td><td>GPA</td><td>Grade</td>
                            <td rowSpan="0" >{
                                (this.state.grades.find(grade=>grade.classteacher == this.props.userid))?
                                <textarea rows="4" placeholder={this.resultcomment(student.id, exam)} className="form-control form-control-sm" onBlur={(e)=>this.update_result_comment(e, student.id, exam)}/>
                                : this.resultcomment(student.id, exam)
                            }</td>
                        </tr>
                        {console.log("stateindex",results, stateindex)}
                        {(results[index])?results[index].map((result,ind)=>{
                            if(this.state.gradesubjects.find(subject=> subject.id==result.subject)){
                                let theory = Math.round(0.6*parseFloat(result.mark));
                                let practical = Math.round( 0.4*parseFloat(result.cas));
                                let total = theory +practical;
                                let gpa = calculategrade(total);
                                cgpa.push(gpa.gpa);
                                (ind)?count+=1:count=1;
                                return <tr key={ind}>
                                    <td>{ind+1}</td>
                                    {/* Correct here and in home class mark display map */}
                                    <td>{this.state.gradesubjects.map(subject=> (subject.id == result.subject)?subject.name:null)}</td>
                                    <td>{theory}</td><td>{practical}</td><td>{total}</td><td>{gpa.gpa}</td><td>{gpa.grade}</td>
                                    </tr>
                                }
                            }):null
                        }
                        </tbody>
                        <tfoot>
                        <tr><td colSpan="5"></td><th colSpan="2">GPA: {(!cgpa.length)?"N/A":(cgpa.reduce((sum, gpa) => (gpa != 'FAIL')? sum + parseFloat(gpa): sum, 0)/cgpa.length).toFixed(2)}</th><td></td></tr>
                        </tfoot>
                    </table>
                        <div className="row signature-div">
                            <div className="col-md-6 d-flex justify-content-end">
                                <b className="signature">Class Teacher</b>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center">
                                <b className="signature">Principal</b>
                            </div>
                        </div>
                    </div>
                    </div>
                    payload.push(data);
                    }
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
                let count = 0;
                                
                return (<div className="container mt-2"><div className="container result">
                    <div><img src="/schoolHeader.jpg"/></div>
                    <div><h3>Exam Report: {exam_title}</h3></div>
                <table className="table table-bordered table-striped table-hover table-sm">
                    <tbody>
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
                                <textarea rows="4" placeholder={this.resultcomment(student.id, exam)} className="form-control form-control-sm" onBlur={(e)=>this.update_result_comment(e, student.id, exam)}/>
                                : this.resultcomment(student.id, exam)
                            }</td>
                        </tr>
                        {
                            (results.length>0)?results.map((result,index)=>{
                                if(gradesubjects.find(subject=> subject.id==result.subject)){
                                    let theory = Math.round(0.6*parseFloat(result.mark));
                                    let practical = Math.round( 0.4*parseFloat(result.cas));
                                    let total = theory +practical;
                                    let gpa = calculategrade(total);
                                    cgpa.push(gpa.gpa);
                                    (index)?count+=1:count=1;
                                    return <tr key={index}>
                                        <td>{count}</td>
                                        {/* Correct here and in home class mark display map */}
                                        <td>{gradesubjects.map(subject=> (subject.id == result.subject)?subject.name:null)}</td>
                                        <td>{theory}</td>
                                        <td>{practical}</td>
                                        <td>{total}</td>
                                        <td>{gpa.gpa}</td>
                                        <td>{gpa.grade}</td>

                                    </tr>
                                }
                            }
                            ):null          
                        }
                    </tbody>
                    <tfoot>
                    <tr><td colSpan="5"></td><th colSpan="2">GPA: {(!cgpa.length)?"N/A":(cgpa.reduce((sum, gpa) => (gpa != 'FAIL')? sum + parseFloat(gpa): sum, 0)/cgpa.length).toFixed(2)}</th><td></td></tr>
                    </tfoot>
                </table>
                    <div className="row signature-div">
                        <div className="col-md-6 d-flex justify-content-end">
                            <b className="signature">Class Teacher</b>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center">
                            <b className="signature">Principal</b>
                        </div>
                    </div>
                </div>
                </div>
                );
            }
        }
        
    }
    student_report_table(){
        let exam1 = this.state.examvaluemulti1;
        let exam2 = this.state.examvaluemulti2;
        let exam3 = this.state.examvaluemulti3;
        if(exam1 && exam2 && exam3){
            let gradesubjects = this.state.gradesubjects;
            let results1 = this.state.studentresultsmulti1;
            let results2 = this.state.studentresultsmulti2;
            let results3 = this.state.studentresultsmulti3;
            let students = this.state.students;
            let studentselected = this.state.studentvalue;
            let student = students.find(std => std.id == studentselected);
            let cgpa = [];
            let count = 0;
            
            return <div className="container">
                <div className="report">
                <div><img src="/schoolHeader.jpg"/></div>
                    <div><h3>Progress Report</h3></div>
                    <div className="row text-left">
                        <div className="col-md-5" ><b className="mx-4">Name:{student.student_name}</b></div>
                        <div className="col-md-6"><b  className="mx-4">Grade:{this.state.grades.find(grade=>grade.id == student.student_grade).name}</b></div>
                    </div>
                    <div className="container">
                        <table className="table table-bordered table-sm">
                            <tbody>
                                <tr><td rowSpan="2">Subjects</td><td>1ST TERM</td><td>2ND TERM</td><td>3RD TERM</td><td>AVERAGE</td><td rowSpan="2">GPA</td><td rowSpan="2">GRADE</td></tr>
                                <tr><td>20%</td><td>30%</td><td>50%</td><td>100%</td></tr>
                                {
                                    gradesubjects.map(subject=>{
                                        let res1 = results1.find(res=> res.student == student.id && res.subject == subject.id);
                                        let res2 = results2.find(res=> res.student == student.id && res.subject == subject.id); 
                                        let res3 = results3.find(res=> res.student == student.id && res.subject == subject.id);
                                        if(!res1) res1= {};
                                        if(!res2) res2= {};
                                        if(!res3) res3= {};
                                        let mark1 = Math.round(0.6*parseFloat(res1.mark)) + Math.round( 0.4*parseFloat(res1.cas));
                                        let mark2 = Math.round(0.6*parseFloat(res2.mark)) + Math.round( 0.4*parseFloat(res2.cas));
                                        let mark3 = Math.round(0.6*parseFloat(res3.mark)) + Math.round( 0.4*parseFloat(res3.cas));
                                        let mark20 = Math.round(0.2*mark1);
                                        let mark30 = Math.round(0.3*mark2);
                                        let mark50 = Math.round(0.5*mark3);
                                        let marksum = mark20 + mark30 + mark50;
                                        let gpa = calculategrade(marksum);
                                        cgpa.push(gpa.gpa);
                                        return <tr>
                                            <td>{subject.name}</td>
                                            <td>{mark20.toString()}</td>
                                            <td>{mark30.toString()}</td>
                                            <td>{mark50.toString()}</td>
                                            <td>{marksum.toString()}</td>
                                            <td>{gpa.gpa}</td>
                                            <td>{gpa.grade}</td>

                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center ">
                            <table className="table table-sm col-md-6 grade_to_gpa">
                                <tbody>
                                    <tr><td>Grade</td><td>GPA</td></tr>
                                    <tr><td>A+</td><td>Outstanding 4.0</td></tr>
                                    <tr><td>A</td><td>Excellent 3.6</td></tr>
                                    <tr><td>B+</td><td>Very Good 3.2</td></tr>
                                    <tr><td>B</td><td>Good 2.8</td></tr>
                                    <tr><td>C+</td><td>Satisfactory 2.4</td></tr>
                                    <tr><td>C</td><td>Acceptable 2.0</td></tr>
                                    <tr><td>D+</td><td>Partially Acceptable 1.6</td></tr>
                                    <tr><td>D</td><td>Insufficient 1.2</td></tr>
                                    <tr><td>E</td><td>Very Insufficient 0.8</td></tr>
                                </tbody>
                            </table>
                            
                        </div>
                        <div className="col-md-6">
                            <div><b>GPA: {(!cgpa.length)?"N/A":(cgpa.reduce((sum, gpa) => (gpa != 'FAIL')? sum + parseFloat(gpa): sum, 0)/cgpa.length).toFixed(2)}</b></div>
                            <div className="row signature-div">
                                <span className="col-md-6"><b className="signature">Class Teacher</b></span>
                                <span className="col-md-6"><b className="signature">Principal</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
    grade_student_report_table(){
        let exam1 = this.state.examvaluemulti1;
        let exam2 = this.state.examvaluemulti2;
        let exam3 = this.state.examvaluemulti3;
        if(exam1 && exam2 && exam3){
            let gradesubjects = this.state.gradesubjects;
            let students = this.state.students;
            let payload = [];
            let current_grade = this.state.gradevalue;
                
            students.map((student, index)=>{
                if(student.student_grade == current_grade){
                let cgpa = [];
                
                let data = <div className="container mt-2" key={index}>
                <div className="report">
                <div><img src="/schoolHeader.jpg"/></div>
                    <div><h3>Progress Report</h3></div>
                    <div className="row text-left">
                        <div className="col-md-5" ><b className="mx-4">Name:{student.student_name}</b></div>
                        <div className="col-md-6"><b  className="mx-4">Grade:{this.state.grades.find(grade=>grade.id == student.student_grade).name}</b></div>
                    </div>
                    <div className="container">
                        <table className="table table-bordered table-sm">
                            <tbody>
                                <tr><td rowSpan="2">Subjects</td><td>1ST TERM</td><td>2ND TERM</td><td>3RD TERM</td><td>AVERAGE</td><td rowSpan="2">GPA</td><td rowSpan="2">GRADE</td></tr>
                                <tr><td>20%</td><td>30%</td><td>50%</td><td>100%</td></tr>
                                {
                                    gradesubjects.map((subject, ind)=>{
                                        const stateindex1 = 'results'+index+1;
                                        const stateindex2 = 'results'+index+2;
                                        const stateindex3 = 'results'+index+3;
                                        
                                        if (this.state[stateindex1] && this.state[stateindex2] && this.state[stateindex3]){
                                            let res1 = this.state[stateindex1].find(res=> res.student == student.id && res.subject == subject.id);
                                            let res2 = this.state[stateindex2].find(res=> res.student == student.id && res.subject == subject.id); 
                                            let res3 = this.state[stateindex3].find(res=> res.student == student.id && res.subject == subject.id);
                                            console.log(res1,res2,res3);
                                            if(!res1) res1= {};
                                            if(!res2) res2= {};
                                            if(!res3) res3= {};
                                            let mark1 = Math.round(0.6*parseFloat(res1.mark)) + Math.round( 0.4*parseFloat(res1.cas));
                                            let mark2 = Math.round(0.6*parseFloat(res2.mark)) + Math.round( 0.4*parseFloat(res2.cas));
                                            let mark3 = Math.round(0.6*parseFloat(res3.mark)) + Math.round( 0.4*parseFloat(res3.cas));
                                            let mark20 = Math.round(0.2*mark1);
                                            let mark30 = Math.round(0.3*mark2);
                                            let mark50 = Math.round(0.5*mark3);
                                            let marksum = mark20 + mark30 + mark50;
                                            let gpa = calculategrade(marksum);
                                            cgpa.push(gpa.gpa);
                                            return <tr key={ind}>
                                                <td>{subject.name}</td>
                                                <td>{mark20.toString()}</td>
                                                <td>{mark30.toString()}</td>
                                                <td>{mark50.toString()}</td>
                                                <td>{marksum.toString()}</td>
                                                <td>{gpa.gpa}</td>
                                                <td>{gpa.grade}</td>

                                            </tr>
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center ">
                            <table className="table table-sm col-md-6 grade_to_gpa">
                                <tbody>
                                    <tr><td>Grade</td><td>GPA</td></tr>
                                    <tr><td>A+</td><td>Outstanding 4.0</td></tr>
                                    <tr><td>A</td><td>Excellent 3.6</td></tr>
                                    <tr><td>B+</td><td>Very Good 3.2</td></tr>
                                    <tr><td>B</td><td>Good 2.8</td></tr>
                                    <tr><td>C+</td><td>Satisfactory 2.4</td></tr>
                                    <tr><td>C</td><td>Acceptable 2.0</td></tr>
                                    <tr><td>D+</td><td>Partially Acceptable 1.6</td></tr>
                                    <tr><td>D</td><td>Insufficient 1.2</td></tr>
                                    <tr><td>E</td><td>Very Insufficient 0.8</td></tr>
                                </tbody>
                            </table>
                            
                        </div>
                        <div className="col-md-6">
                            <div><b>GPA: {(!cgpa.length)?"N/A":(cgpa.reduce((sum, gpa) => (gpa != 'FAIL')? sum + parseFloat(gpa): sum, 0)/cgpa.length).toFixed(2)}</b></div>
                            <div className="row signature-div">
                                <span className="col-md-6"><b className="signature">Class Teacher</b></span>
                                <span className="col-md-6"><b className="signature">Principal</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                payload.push(data);
                }
            });
            return payload;
        }
    }
    render(){
        let grade_select = <li className="btn-group mx-2 my-auto">
                <span className="my-auto">Grade</span>
                <select onChange={(e)=>this.grade_selected(e)} ref={this.gradeselectRef} className="form-control form-control-sm my-auto" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.grades.map((items, key) => 
                    <option key={key} value={items.id}>{items.name}</option>
                    )}
                </select>
                </li>
                        

        let student_select = <li className="btn-group mx-auto my-auto">
                <span className="my-auto">Student</span>
                <div className="form-inline input-group dropdown mx-2">
                        <input type="text" className="form-control dropdown-toggle form-control-sm my-auto" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder="Search Student"
                        onKeyUp={(e)=>this.filterStudents(e)} ref={this.filterstudentsinputid} />
                        <span className="input-group-text form-control-sm" disabled><FontAwesomeIcon icon={faSearch} /></span>
                        <div  className="dropdown-menu overflow-auto" style={{height: 200 + 'px'}} >
                            <table className="table table-bordered table-striped table-hover table-sm">
                                <thead><tr><td>Students Name</td></tr></thead>
                                <tbody ref = {this.filterstudentslist}>{
                                this.state.students.map((items, key) => 
                                <tr key={key} value={items.id}><td onClick={ (e)=>this.student_selected(e)} value={items.id}>{items.student_name}</td></tr>
                                )
                                }</tbody>
                            </table>
                        </div>
                    </div>
                </li>
        let exam_select = <li className="btn-group mx-2" key="es0">
                <span className="mx-2">Exam</span>
                <select onChange={(e)=>this.exam_selected(e, 0)} ref={this.examselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.exams.map((items, key) => 
                    <option key={key} value={items.id}>{items.name}</option>
                    )}
                </select>
                </li>
        let exam_select_multi1 = <li className="form-group mx-1" key="es1">
        <span className="mx-1">1st Term</span>
        <select onChange={(e)=>this.exam_selected(e, 1)} ref={this.examselectRef1}  className="form-control form-control-sm" defaultValue="none">
            <option value="none" disabled hidden>Select an Option </option> 
            {
            this.state.exams.map((items, key) => 
            (items.exam_term == '1st')?<option key={key} value={items.id}>{items.name}</option>:null
            )}
        </select>
        </li>
        
        let exam_select_multi2 = <li className="form-group mx-1" key="es2">
        <span className="mx-1">2nd Term</span>
        <select onChange={(e)=>this.exam_selected(e, 2)} ref={this.examselectRef2}  className="form-control form-control-sm" defaultValue="none">
            <option value="none" disabled hidden>Select an Option </option> 
            {
            this.state.exams.map((items, key) => 
            (items.exam_term == '2nd')?<option key={key} value={items.id}>{items.name}</option>:null
            )}
        </select>
        </li>
        let exam_select_multi3 = <li className="form-group mx-1" key="es3">
        <span className="mx-1">3rd Term</span>
        <select onChange={(e)=>this.exam_selected(e, 3)} ref={this.examselectRef3}  className="form-control form-control-sm" defaultValue="none">
            <option value="none" disabled hidden>Select an Option </option> 
            {
            this.state.exams.map((items, key) => 
            (items.exam_term == '3rd')?<option key={key} value={items.id}>{items.name}</option>:null
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
                                (this.state.studentresultclicked)?'Student result ':(this.state.gradestudentresultclicked)?'Grade all students result ':(this.state.finalreportclicked)?'Final Report ':(this.state.gradestudentfinalreportclicked)?'Grade all students Final report ':'Menu '
                            }
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={this.student_result_clicked}>Student result</button>
                            <button className="dropdown-item" onClick={this.grade_student_result_clicked}>Grade all student result</button>
                            <button className="dropdown-item" onClick={this.final_report_clicked}>Final report</button>
                            <button className="dropdown-item" onClick={this.grade_student_final_report_clicked}>Grade all students Final report</button>
                            <button className="dropdown-item" onClick={this.props.show_home}>Go to marks input form</button>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText1" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText1">
                        <ul className="navbar-nav mr-auto">
                            {(this.state.gradestudentresultclicked || this.state.gradestudentfinalreportclicked)?grade_select:null}
                            {(this.state.gradestudentresultclicked && this.state.gradevalue)?exam_select:null}
                            {(this.state.gradestudentfinalreportclicked && this.state.gradevalue)?[exam_select_multi1, exam_select_multi2, exam_select_multi3]:null}
                            {(this.state.studentresultclicked || this.state.finalreportclicked)?student_select:null}
                            {(this.state.studentresultclicked && this.state.studentvalue)?exam_select:null}
                            {(this.state.finalreportclicked && this.state.studentvalue)?[exam_select_multi1, exam_select_multi2, exam_select_multi3]:null}
                        </ul>
                    </div>    
                </nav>
            </div>
            { console.log('com: ', this.state.studentresultclicked)}
            {(this.state.studentresultclicked || this.state.gradestudentresultclicked)?this.result_table():null}
            {(this.state.finalreportclicked)?this.student_report_table():null}
            {(this.state.gradestudentfinalreportclicked)?this.grade_student_report_table():null}
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