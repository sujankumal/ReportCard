import React, { Component } from "react";
import { toast} from 'react-toastify';
import {HOST} from './constants';

export default class AdminInput extends Component{

    constructor(props){
        super(props);

        this.state = {
            teachers:[],
            grades:[],
            students:[],
            subjects:[],
            display:0,
        };
        this.gradeselectRef = React.createRef();
        
    }
    componentDidMount(){
        this.get_all_teacher_grades_students_subjects();
    }
    async get_all_teacher_grades_students_subjects(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/get_all_teacher_grades_students_subjects/', {
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
                    <li> <a href={null} onClick={this.edit_student_clicked}>Edit Student Details</a></li> 
                </ul>
            </div>    
        </nav>
    </div>
    { console.log('Admin Input: ')}
    {(this.state.display == 1)?studentsedit:null}
    
</div>
    }
}