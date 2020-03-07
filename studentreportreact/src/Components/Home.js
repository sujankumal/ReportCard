import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            grades:[],
            student:{},
        }
    }
    
    async get_grades(){
        const header = await this.props.auth_headers();
        await fetch(HOST+'/teachers-view-grade/', {
            method: 'GET',
            headers: header ,     
            })
            .then(res => {
                if(res.status == 401){
                    toast.error('Unauthorized');
                    return
                }

                return res.json();
            })
            .then((data) => {
                this.setState({grades:data});
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:", typeof(error), error);
            });
    }
    componentDidMount(){
        this.get_grades();   
    }
    grade_selected(event){
        console.log(event.target.value);
    }
    render(){
        const gradeItems =  this.state.grades.map((item)=><li>{item.id}</li>);
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
                    
                    </nav>
                    
                </div>
            </div>
        );
    }
}

export default Home;