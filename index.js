const Intern = require('./lib/Intern')
const Manger = require('./lib/Manager')
const Engineer = require('./lib/Engineer')

const fs = require('fs')
const inquirer = require('inquirer')

const managerQuestions = ()=>{
    return inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'Enter Managers Name',
            validate:nameInput =>{
                if(nameInput){
                    return true
                }else{
                    console.log('Please Enter The Managers Name!')
                }
            }
            
        },{
            type:'input',
            name:'id',
            message:'Enter Managers Id',
            validate: nameInput =>{
                if(isNaN(nameInput)){
                    console.log('Please Enter Managers Id!')
                    return false
                }else{
                    return true
                }
            }
        },{
            type:'input',
            name:'email',
            message:'Enter Managers Email',
            validate: email =>{
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.
                test(email)
                if(valid){
                    return true
                }else{
                    console.log('Please Enter An Email')
                    return false
                }
            }
        },{
            type:'input',
            name:'officeNumber',
            message:'Please Enter Managers Office Number',
            validate: nameInput =>{
                if(isNaN(nameInput)){
                    console.log('Please Enter An Office Number')
                    return false
                }else{
                    return true
                }
            }
        }
    ])
}

managerQuestions()