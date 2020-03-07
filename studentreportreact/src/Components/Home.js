import React, { Component } from 'react';
import { toast, Slide } from 'react-toastify';
import {HOST} from './constants';
class Home extends Component {
    constructor(props){
        super(props);
    }
    
    async get_grades(){
        const header = await this.props.auth_headers();
        console.log(header);
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
                console.log(data)
                // if(res.status == 401){
                //     toast.error("Unauthorized");  
                //     return;
                // }
                // if(res.status == 200){
                //     console.log(res.json);
                // }
             
            }).catch(function(error) {
                toast.error("Something went Wrong!");
                console.log("error:", typeof(error), error);
            });
    }
    componentDidMount(){
        this.get_grades();   
    }
    
    render(){
        return(
            <div>Home</div>
        );
    }
}

export default Home;