import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            grades:[],
            student:{},
            subjects:[],
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
    async teacher_get_subjects(){
        const header = await this.props.auth_headers();
        console.log(header);
        await fetch(HOST+'/teachers-view-subjects/', {
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
                this.setState({subjects:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:"+ error);
            });
    }
    componentDidMount(){
        this.get_grades();   
        this.teacher_get_subjects();
    }
    grade_selected(event){
        console.log(event.target.value);
    }
    subject_selected(event){
        console.log(event.target.value);
        this.setState({
            subjects:[]
        });
        this.teacher_get_subjects();
    }
    render(){
        return(
            <div className="container row home">
                <div className="col-md-2">
                    <nav className="nav">
                    <select onChange={(e)=>this.grade_selected(e)}>
                    {
                    this.state.grades.map((items, key) => 
                    <option key={key} value={key}>{items.name}</option>
                    )}
                    </select>
                    <select onChange={(e)=>this.subject_selected(e)}>
                    {
                    this.state.subjects.map((items, key) => 
                    <option key={key} value={key}>{items.name}</option>
                    )}
                    </select>
                    
                    </nav>
                    
                </div>
            </div>
        );
    }
}

export default Home;