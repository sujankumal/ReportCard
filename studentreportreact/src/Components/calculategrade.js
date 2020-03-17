export const calculategrade = (marks) =>{
    if(marks>=90 && marks<=100 ){
        return {'grade':'A+','gpa': '4.0'}
    }else if(marks>=80 && marks<=89 ){
        return {'grade':'A','gpa': '3.6'}
    }else if(marks>=70 && marks<=79 ){
        return {'grade':'B+','gpa': '3.2'}
    }else if(marks>=60 && marks<=69 ){
        return {'grade':'B','gpa': '2.8'}
    }else if(marks>=50 && marks<=59 ){
        return {'grade':'C+','gpa': '2.4'}
    }else if(marks>=40 && marks<=49 ){
        return {'grade':'C','gpa': '2.0'}
    }else if(marks>=30 && marks<=39 ){
        return {'grade':'D+','gpa': '1.6'}
    }else if(marks>=20 && marks<=29 ){
        return {'grade':'D','gpa': '1.2'}
    }else{
        return {'grade':'E','gpa': "FAIL"}
    }   
}