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
            gradevalue:'',
            studentvalue:'',
            subjectvalue:'',
            examvalue:'',
        }
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
        });
        this.teacher_get_subjects(event.target.value);
    }
    subject_selected(event){
        console.log(event.target.value);
        this.setState({
            subjectvalue:event.target.value,
        });
        this.teacher_get_students(event.target.value);
    }
    student_selected(event){
        console.log(event.target.value);
        this.setState({studentvalue:event.target.value});
        // this.teacher_get_exams(event.target.value);
    }
    exam_selected(event){
        console.log(event.target.value);
        this.setState({examvalue:event.target.value});
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
    render(){
        let exam_select = <li className="input-group">
                            <label className="form-control-sm">Subject</label>
                            <select onChange={(e)=>this.subject_selected(e)}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.subjects.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </li>
        let result_form = <div className="row">
            <div className="col-md-4">
                <table className="table">
                    <th><tr><td>Student</td><td>Marks</td></tr></th>
                </table>
            </div>
            <div className="col-md-8">
                    Hello world
            </div>
            </div>
        return(
            <div className="container">
                <div className="fixed-bottom"><button onClick={()=>this.refresh()}>Click to refresh</button></div>
                <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <span className="navbar-brand" >Menu</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav form-group">
                        <li className="input-group ">
                            <label className="form-control-sm">Grade</label>
                            <select onChange={(e)=>this.grade_selected(e)} className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.grades.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </li>
                        <li className="input-group ">
                            <label className="form-control-sm">Exam</label>
                            <select onChange={(e)=>this.exam_selected(e)}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.exams.map((items, key) => 
                                <option key={key} value={items.id}>{items.name}</option>
                                )}
                            </select>
                        </li>
                        {(this.state.examvalue)? exam_select:null}
                        {/* <li className="input-group ">
                            <label className="form-control-sm">Students</label>
                            <select onChange={(e)=>this.student_selected(e)}  className="form-control form-control-sm" defaultValue="none">
                                <option value="none" disabled hidden>Select an Option </option> 
                                {
                                this.state.students.map((items, key) => 
                                <option key={key} value={items.id}>{items.student_name}</option>
                                )}
                            </select>
                        </li> */}
                        
                    </ul>
                    </div>     
                </nav>
                <div>
                    {(this.state.subjectvalue)?result_form:null}
                </div>
                </div>
            </div>
        );
    }
}

export default Home;