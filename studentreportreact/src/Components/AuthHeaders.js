import React, {useState} from 'react';
import {HOST} from './constants';
import { toast } from 'react-toastify';

export const  auth_headers = async () => {
    // return authorization header with basic auth credentials
    const access_token = await refresh_token();
    if (access_token) {
      return { Authorization: `Bearer ${access_token}` };
    } else {
        return {};
    }
}


export const refresh_token = async() => {
    return await fetch(HOST+'/api/token/refresh/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: `{
          "refresh":"${localStorage.getItem('refresh')}"}`    
      })
      .then(res => res.json())
      .then(json => {
          if(json.non_field_errors){
              toast.error("Couldn't Refresh. Something Went Wrong.");  
              return;
          }
        //   this.setState({
        //       access_token: json.access,
        //   });
          return json.access;
        }).catch(function(error) {
          toast.error("Sorry. Something went wrong while refreshing.");
    });
  }
