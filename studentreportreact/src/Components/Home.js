import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            grades:[],
            students:[],
            subjects:[],
            exams:[],
            results:[],
            studentsresult:[],
            gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
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
    async teacher_get_subjects(grade){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-subjects/'+grade+'/', {
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
    
    async teacher_get_students(subject){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-students/'+subject+'/', {
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
        console.log(event.target.value);
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
        this.examselectRef.current.selectedIndex=0;
        (this.subjectselectRef)?this.subjectselectRef.current.selectedIndex=0:'';
        this.teacher_get_subjects(event.target.value);
    }
    subject_selected(event){
        console.log(event.target.value);
        this.setState({
            subjectvalue:event.target.value,
        });
        this.teacher_get_students(event.target.value);
        this.teacher_get_students_marks();
    }
    student_selected(event){
        console.log(event.target.value);
        this.setState({studentvalue:event.target.value});
        // this.teacher_get_exams(event.target.value);
    }
    exam_selected(event){
        console.log(event.target.value);
        (this.subjectselectRef)?this.subjectselectRef.current.selectedIndex=0:'';
        this.setState({
            examvalue:event.target.value,
            // grades:[],
            students:[],
            // subjects:[],
            // exams:[],
            results:[],
            studentsresult:[],
            // gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            // examvalue:'',
        });
        // this.teacher_process_result(event.target.value, this.state.studentvalue);
    }
    refresh(){
        console.log("Home Refreshed");
        this.setState({ 
            grades:[],
            students:[],
            subjects:[],
        });
        this.get_grades();
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
            'comment':(val)?val.teachers_comment:'',
        }
        console.log(header);
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
            'comment':comment,
        }
        console.log(header);
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
        console.log((val)? val.mark:0);
        return (val)? val.mark:0;
    }
    find_st_tec_comment=(items)=>{ 
        let val = this.state.studentsresult.find(res=> res.student == items.id); 
        console.log((val)?val.teachers_comment:'');
        return (val)?val.teachers_comment:'';
    }
    render(){
        let exam_select = <td className="input-group col-md-3">
                            <label className="form-control-sm">Subject</label>
                            <select onChange={(e)=>this.subject_selected(e)} ref={this.subjectselectRef}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.subjects.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </td>
        let result_form = <div className="row">
            <div className="col-md-6">
                <table className="table table-responsive table-striped table-hover table-sm">
                    <thead>
                        <tr><th>SN</th><th>Student</th><th>Marks</th><th>Comment</th></tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((items, key)=>
                        <tr key={key}>
                            <th scope="row">{key+1}</th>
                            <td><span className="form-control-sm">{items.student_name}</span></td>
                            <td><input type="number" placeholder={this.find_st_mark(items)} id={items.id} className="form-control form-control-sm" onBlur={(e)=>this.teachers_update_marks(e)}/></td>
                            <td><input type="text" placeholder={this.find_st_tec_comment(items)} id={items.id} className="form-control form-control-sm" onBlur={(e)=>this.teachers_update_comment(e)}/></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="col-md-6">
                    Hello world
            </div>
            </div>
        return(
            <div className="container">
                <div className="fixed-bottom"><button onClick={()=>this.refresh()}>Click to refresh</button></div>
                <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <table className="table table-sm">
                    <tbody>
                    <tr className="navbar-nav form-group">
                        <td className="navbar-brand" >Menu</td>
                    
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
                        {(this.state.examvalue)? exam_select:null}
                        
                    </tr>
                    </tbody>
                    </table>    
                </nav>
                </div>
                
                <div className="container">
                    {(this.state.subjectvalue)?result_form:null}
                </div>
            </div>
        );
    }
}

export default Home;