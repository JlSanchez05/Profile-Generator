const Intern = require('./lib/Intern')
const Manger = require('./lib/Manager')
const Engineer = require('./lib/Engineer')

const fs = require('fs')
const inquirer = require('inquirer')

const managerQuestions = ()=>{
    return inquirer.prompt([
        {
            type:'input',
            name:'role',
            message:'Enter Managers Name',
            validate:nameInput =>{
                if(nameInput){
                    return true
                }else{
                    console.log('Please Enter The Managers Name!')
                }
            }
            
        }
    ])
}

managerQuestions()