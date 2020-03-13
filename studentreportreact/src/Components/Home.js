import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            grades:[],
            students:[],
            gradestudents:[],
            subjects:[],
            exams:[],
            results:[],
            studentsresult:[],
            gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
            inputresultclicked:true,
            studnetresultclicked:false,
            classmarksclicked:false,
        }
        this.gradeselectRef = React.createRef();
        this.examselectRef = React.createRef();
        this.subjectselectRef = React.createRef();
    }
    
    async get_grades(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-grade/', {
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
    async teacher_get_subjects_by_grade(grade){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-subjects-grade/'+grade+'/', {
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
                this.setState({subjects:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }

    async teacher_get_students_marks(){
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        await fetch(HOST+'/teachers-view-students_marks/', {
            method: 'POST',
            headers: header ,
            body:JSON.stringify({
                'grade': this.state.gradevalue,
                'exam': this.state.examvalue,
                'subject': this.state.subjectvalue,
            })
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
                this.setState({studentsresult:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    
    async teacher_get_students_by_subject(subject){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-students-by-subject/'+subject+'/', {
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


    async teacher_get_students_by_grade(grade){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-students-by-grade/'+grade+'/', {
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
                this.setState({gradestudents:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
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


    async teacher_process_result(exam, student){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-process-results/'+exam+'/'+student+'/', {
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
                this.setState({results:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    componentDidMount(){
        this.get_grades();
        this.teacher_get_exams();
    }
    grade_selected(event){
        this.setState({
            gradevalue:event.target.value,
            // grades:[],
            students:[],
            subjects:[],
            // exams:[],
            results:[],
            studentsresult:[],
            // gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
        });
        this.teacher_get_subjects_by_grade(event.target.value);
        this.teacher_get_students_by_grade(event.target.value);
        console.log((this.subjectselectRef.current)?this.subjectselectRef.current.selectedIndex=0:'',
        (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'');
        
    }
    subject_selected(event){
        console.log(event.target.value);
        this.setState({
            subjectvalue:event.target.value,
        });
        this.teacher_get_students_by_subject(event.target.value);
        this.teacher_get_students_marks();
    }
    student_selected(event){
        console.log(event.target.value);
        this.setState({studentvalue:event.target.value});
    }
    exam_selected(event){
        this.setState({
            examvalue:event.target.value,
            // grades:[],
            // students:[],
            // subjects:[],
            // exams:[],
            results:[],
            studentsresult:[],
            // gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            // examvalue:'',
        });
        console.log((this.subjectselectRef.current)?this.subjectselectRef.current.selectedIndex=0:'');
    }
    
    async teachers_update_marks(event){
        let student = event.target.id;
        let marks = event.target.value;
        event.target.value = null;
        if(!marks){
            console.log('Marks null');
            return;
        }
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        let val = this.state.studentsresult.find(res=> res.student == student); 
        let data = {
            'grade': this.state.gradevalue,
            'exam': this.state.examvalue,
            'subject': this.state.subjectvalue,
            'student': student,
            'marks': marks,
            'cas':(val)?val.cas:0,
            'comment':(val)?val.teachers_comment:'',
        }
        await fetch(HOST+'/teachers-update-student-mark/', {
            method: 'POST',
            headers: header ,
            body:JSON.stringify(data),
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
                this.teacher_get_students_marks();
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    async teachers_update_cas(event){
        let student = event.target.id;
        let cas = event.target.value;
        event.target.value = null;
        if(!cas){
            console.log('CAS null');
            return;
        }
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        let val = this.state.studentsresult.find(res=> res.student == student); 
        let data = {
            'grade': this.state.gradevalue,
            'exam': this.state.examvalue,
            'subject': this.state.subjectvalue,
            'student': student,
            'marks': (val)?val.mark:0,
            'cas':cas,
            'comment':(val)?val.teachers_comment:'',
        }
        await fetch(HOST+'/teachers-update-student-cas/', {
            method: 'POST',
            headers: header ,
            body:JSON.stringify(data),
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
                this.teacher_get_students_marks();
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    async teachers_update_comment(event){
        let student = event.target.id;
        let comment = event.target.value;
        event.target.value = null;
        let val = this.state.studentsresult.find(res=> res.student == student); 
        if(!comment){
            console.log('Comment null');
            return;
        }
        let header = await this.props.auth_headers();
        header['Content-Type'] = 'application/json';
        let data = {
            'grade': this.state.gradevalue,
            'exam': this.state.examvalue,
            'subject': this.state.subjectvalue,
            'student': student, 
            'marks': (val)?val.mark:0,
            'cas':(val)?val.cas:0,
            'comment':comment,
        }
        await fetch(HOST+'/teachers-update-student-comment/', {
            method: 'POST',
            headers: header ,
            body:JSON.stringify(data),
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
                this.teacher_get_students_marks();
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    find_st_mark=(items)=>{
        let val = this.state.studentsresult.find(res =>res.student == items.id); 
        return (val)? val.mark:0;
    }
    find_st_60_mark=(items)=>{
        let val = this.state.studentsresult.find(res =>res.student == items.id); 
        return (val)? (0.6* parseFloat(val.mark)).toFixed(2):0;
    }
    find_st_cas=(items)=>{
        let val = this.state.studentsresult.find(res =>res.student == items.id); 
        return (val)? val.cas:0;
    }
    find_st_40_cas=(items)=>{
        let val = this.state.studentsresult.find(res =>res.student == items.id); 
        return (val)? (0.4* parseFloat(val.cas)).toFixed(2):0;
    }
    find_st_total=(items)=>{
        let val = this.state.studentsresult.find(res =>res.student == items.id); 
        return (val)? (0.6* parseFloat(val.mark) + 0.4* parseFloat(val.cas)).toFixed(2):0;
    }
    find_st_tec_comment=(items)=>{ 
        let val = this.state.studentsresult.find(res=> res.student == items.id); 
        return (val)?val.teachers_comment:'';
    }
    input_result_clicked = ()=>{
        this.setState({
            // grades:[],
            // students:[],
            // subjects:[],
            // exams:[],
            // results:[],
            // studentsresult:[],
            gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
            inputresultclicked:true,
            studnetresultclicked:false,
            classmarksclicked:false,
        });
        console.log(
            (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.subjectselectRef.current)?this.subjectselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    student_result_clicked=()=>{
        this.setState({
            // grades:[],
            // students:[],
            // subjects:[],
            // exams:[],
            // results:[],
            // studentsresult:[],
            gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
            inputresultclicked:false,
            studnetresultclicked:true,
            classmarksclicked:false,
        });
        console.log(
            (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.subjectselectRef.current)?this.subjectselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    class_marks_clicked=()=>{
        this.setState({
            // grades:[],
            // students:[],
            // subjects:[],
            // exams:[],
            // results:[],
            // studentsresult:[],
            gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
            inputresultclicked:false,
            studnetresultclicked:false,
            classmarksclicked:true,
        });
        console.log(
            (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
            (this.subjectselectRef.current)?this.subjectselectRef.current.selectedIndex=0:'',
            (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
            );
    }
    render(){
        let subject_select = <td className="input-group col-md-3">
                            <label className="form-control-sm">Subject</label>
                            <select onChange={(e)=>this.subject_selected(e)} ref={this.subjectselectRef}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.subjects.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </td>

        let student_select = <td className="input-group col-md-3">
                <label className="form-control-sm">Student</label>
                <select onChange={(e)=>this.student_selected(e)} ref={this.studentselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.gradestudents.map((items, key) => 
                    <option key={key} value={items.id}>{items.student_name}</option>
                    )}
                </select>
                </td>
        let result_form = <div className="row">
            <div className="container">
                <table className="table table-responsive table-striped table-hover table-sm">
                    <thead>
                        <tr><th>SN</th><th>Student</th><th>Theory</th><th>CAS</th><th>60% of Theory</th><th>40% of CAS</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((items, key)=>
                        <tr key={key}>
                            <th scope="row">{key+1}</th>
                            <td><span className="form-control-sm">{items.student_name}</span></td>
                            <td><input type="number" placeholder={this.find_st_mark(items)} id={items.id} className="form-control form-control-sm" onBlur={(e)=>this.teachers_update_marks(e)}/></td>
                            <td><input type="number" placeholder={this.find_st_cas(items)} id={items.id} className="form-control form-control-sm" onBlur={(e)=>this.teachers_update_cas(e)}/></td>
                            <td><span id={items.id} >{this.find_st_60_mark(items)}</span></td>
                            <td><span id={items.id} >{this.find_st_40_cas(items)}</span></td>
                            <td><span id={items.id} >{this.find_st_total(items)}</span></td>
                            {/* <td><input type="text" placeholder={this.find_st_tec_comment(items)} id={items.id} className="form-control form-control-sm" onBlur={(e)=>this.teachers_update_comment(e)}/></td> */}
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        
        let student_result_display = 
            <div>
                Student Result
            </div>
        
        let class_marks_diaplay = 
            <div>
                Class Marks
            </div>
        return(
            <div className="container">
                <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <table className="table table-sm">
                    <tbody>
                    <tr className="navbar-nav form-group">
                        <td className="btn-group" >
                            <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {
                                    (this.state.inputresultclicked)? 'Input Result':(this.state.studnetresultclicked)?'Student Marks':(this.state.classmarksclicked)?'Class Marks':'Menu'
                                }
                            </button>
                            <div className="dropdown-menu">
                                <button className="dropdown-item"  onClick={this.input_result_clicked}>Input result</button>
                                <button className="dropdown-item" onClick={this.student_result_clicked}>Student result</button>
                                <button className="dropdown-item" onClick={this.class_marks_clicked}>Class marks</button>
                            </div>
                        </td>
                    
                        <td className="input-group col-md-3">
                            <label className="form-control-sm">Grade</label>
                            <select onChange={(e)=>this.grade_selected(e)} ref={this.gradeselectRef} className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.grades.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </td>
                        <td className="input-group col-md-3">
                            <label className="form-control-sm">Exam</label>
                            <select onChange={(e)=>this.exam_selected(e)} ref={this.examselectRef}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.exams.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </td>
                        {(this.state.examvalue)? (this.state.inputresultclicked)?subject_select:(this.state.studnetresultclicked)?student_select:null:null}
                        
                    </tr>
                    </tbody>
                    </table>    
                </nav>
                </div>
                
                <div className="container">
                    {/* {(this.state.subjectvalue)?result_form:null} */}
                    {(this.state.inputresultclicked)? (this.state.subjectvalue)?result_form:null:(this.state.studnetresultclicked)?student_result_display:(this.state.classmarksclicked)?class_marks_diaplay:null}
                </div>
            </div>
        );
    }
}

export default Home;