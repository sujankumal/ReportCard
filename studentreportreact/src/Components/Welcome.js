import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Welcome(){
    return( <div className="container mt-1">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                       <h3> Welcome</h3>
                        </div>
                        <div className="card-body">

                        </div>

                        <div className="card-footer">
                            <div className="d-flex justify-content-center">
                                Please login to continue
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Welcome;