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


    async get_exam_result_by_grade(exam, grade){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get-exam-result-by-grade/'+exam+'/'+grade+'/', {
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
        if(this.state.classmarksclicked){
            if(this.state.gradevalue){
                this.get_exam_result_by_grade(event.target.value, this.state.gradevalue);
            }else{
                toast.warn('Please Select Grade');
            }
        }
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
        // this.setState({
        //     // grades:[],
        //     // students:[],
        //     // subjects:[],
        //     // exams:[],
        //     // results:[],
        //     // studentsresult:[],
        //     gradevalue:'',
        //     studentvalue:'',
        //     subjectvalue:'',
        //     examvalue:'',
        //     inputresultclicked:false,
        //     studnetresultclicked:true,
        //     classmarksclicked:false,
        // });
        // console.log(
        //     (this.gradeselectRef.current)?this.gradeselectRef.current.selectedIndex=0:'',
        //     (this.subjectselectRef.current)?this.subjectselectRef.current.selectedIndex=0:'',
        //     (this.examselectRef.current)?this.examselectRef.current.selectedIndex=0:'',
        //     );
        this.props.show_result();
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
        let subject_select = <li className="btn-group mx-2">
<                   span className="mx-2">Subject</span>
                    <select onChange={(e)=>this.subject_selected(e)} ref={this.subjectselectRef}  className="form-control form-control-sm" defaultValue="none">
                        <option value="none" disabled hidden>Select an Option </option> 
                        {
                        this.state.subjects.map((items, key) => 
                        <option key={key} value={items.id}>{items.name}</option>
                        )}
                    </select>
                </li>

        let student_select = <li className="btn-group mx-2">
                <span className="mx-2">Student</span>
                <select onChange={(e)=>this.student_selected(e)} ref={this.studentselectRef}  className="form-control form-control-sm" defaultValue="none">
                    <option value="none" disabled hidden>Select an Option </option> 
                    {
                    this.state.gradestudents.map((items, key) => 
                    <option key={key} value={items.id}>{items.student_name}</option>
                    )}
                </select>
                </li>
        let result_form = 
            <div className="container">
                <table className="table table-bordered table-striped table-hover table-sm">
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
        
        let class_marks_diaplay = 
            <div className="container ">
                <table className="table table-bordered table-striped table-hover table-sm">
                <caption>Terminal assess</caption>
                    <thead>
                        <tr>
                            <th>SN </th><th>Student</th>{this.state.subjects.map((subject, index) => <th key={index}>{subject.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.gradestudents.map((student, key)=> 
                            <tr key = {key}>
                                <td>{key+1}</td>
                                <td>{student.student_name}</td>
                                {this.state.subjects.map(
                                    (subject, index) => 
                                    <td key={index}>
                                        {this.state.results.map(
                                            result=>(result.student == student.id && 
                                                result.subject == subject.id && 
                                                result.exam == this.state.examvalue)?
                                                parseFloat(result.mark).toFixed(2):null)
                                        }
                                        {/* {parseFloat(this.state.results.find(
                                            result=> result.student == student.id && 
                                                result.subject == subject.id && 
                                                result.exam == this.state.examvalue
                                                ).mark).toFixed(2)
                                        } */}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                <table className="table table-bordered table-striped table-hover table-sm">
                <caption>CAS assess</caption>
                    <thead>
                        <tr>
                            <th>SN </th><th>Student</th>{this.state.subjects.map((subject, index) => <th key={index}>{subject.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.gradestudents.map((student, key)=> 
                            <tr key = {key}>
                                <td>{key+1}</td>
                                <td>{student.student_name}</td>
                                {this.state.subjects.map(
                                    (subject, index) => 
                                    <td key={index}>
                                        {this.state.results.map(
                                            result=>(result.student == student.id && 
                                                result.subject == subject.id && 
                                                result.exam == this.state.examvalue)?
                                                parseFloat(result.cas).toFixed(2):null)
                                        }
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        return(
            <div className="container">
                <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light my-2">
                    <div className="navbar-brand btn-group">
                        <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {
                                    (this.state.inputresultclicked)? 'Input Result ':(this.state.studnetresultclicked)?'Student Marks ':(this.state.classmarksclicked)?'Class Marks ':'Menu '
                                }
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item"  onClick={this.input_result_clicked}>Input result</button>
                            <button className="dropdown-item" onClick={this.student_result_clicked}>Student result</button>
                            <button className="dropdown-item" onClick={this.class_marks_clicked}>Class marks</button>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText1" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText1">
                        <ul className="navbar-nav mr-auto">
                                
                        <li className="btn-group mx-2">
                            <span className="mx-2">Grade</span>
                            <select onChange={(e)=>this.grade_selected(e)} ref={this.gradeselectRef} className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.grades.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </li>
                        <li className="btn-group mx-2">
                            <span className="mx-2">Exam</span>
                            <select onChange={(e)=>this.exam_selected(e)} ref={this.examselectRef}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.exams.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </li>
                        {(this.state.examvalue)? (this.state.inputresultclicked)?subject_select:(this.state.studnetresultclicked)?student_select:null:null}
                        
                    </ul>
                    </div>    
                </nav>
                </div>
                {(this.state.inputresultclicked)? (this.state.subjectvalue)?result_form:null:(this.state.classmarksclicked && this.state.subjects.length != 0)?class_marks_diaplay:null}
                {/* {(this.state.inputresultclicked)? (this.state.subjectvalue)?result_form:null:(this.state.studnetresultclicked && this.state.studentvalue)?student_result_display:(this.state.classmarksclicked && this.state.subjects.length != 0)?class_marks_diaplay:null} */}
            </div>
        );
    }
}

export default Home;