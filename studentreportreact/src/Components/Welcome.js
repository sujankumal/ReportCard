import React, { Component } from 'react';

function Welcome(){
    return( <div className="container mt-1">
                <div className="d-flex justify-content-center h-100">
                    <div className="welcome">
                        <div className="card-header">
                       <h3> Guidelines</h3>
                        </div>
                        <div className="card-body text-left">
                            <div className="row">
                                <div className="col-md-6">
                                    Admin should:
                                    <ol>
                                        <li>maintain teacher's login details.</li>
                                        <li>add class' details.</li>
                                        <li>add student's details.</li>
                                        <li>add subjects (subject's code needs to be unique)</li>
                                        <li>map student and subject</li>
                                        <li>add exams</li>
                                    </ol>
                                </div>
                                <div className="col-md-6">
                                    Teacher:
                                    <ol>
                                        <li>should add marks of each student.(subject teacher should add his/her subject's  marks.)</li>
                                        <li>can see marks of all subjects</li>
                                        <li>can see student's report card</li>
                                        <li>cannot add comments (should be class teacher)</li>

                                    </ol>
                                </div>
                            </div>
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