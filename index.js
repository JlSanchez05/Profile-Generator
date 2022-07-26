
// file paths of the team memebers to get access to theyre objects
const Intern = require('./lib/Intern')
const Manger = require('./lib/Manager')
const Engineer = require('./lib/Engineer')

const fs = require('fs')
const inquirer = require('inquirer')

// team array so that i can put all the values of the team being created later
const team = []

const managerQuestions = ()=>{
    return inquirer.prompt([
        //start of manager promt questions
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
        //creating object of the manager input using the values to display them in console.
    ]).then(managerInput =>{
        const {name,id,email,officeNumber} = managerInput
        const manager = new Manger(name,id,email,officeNumber)
        team.push(manager)
        console.log(manager)
    })
}

//start of employee promt questions
const addEmployee = ()=>{
    console.log(`
    *****************************************
    ADDING EMPLOYEES TO THE TEAM
    *****************************************
    
    `)

    return inquirer.prompt([
        {
          type:'list',
          name:'role',
          message:'Please Choose Employees Role',
          choices:['Enginner','Intern']
        },{
            type:'input',
            name:'name',
            message:'What Is The Emplopyees Name ?',
            validate:nameInput=>{
                if(nameInput){
                    return true
                }else{
                    console.log('Please Enter A Name For The Employee')
                    return false
                }
            }
        },{
            type:'input',
            name:'id',
            message:'Enter Employee ID',
            validate:nameInput =>{
                if(isNaN(nameInput)){
                    console.log('Please Enter Employee ID')
                    return false
                }else{
                    return true
                }
            }
        },{
           type:'input',
           name:'email',
           message:'Enter Employee Email',
           validate:email=>{
               valid =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.
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
        name:'github',
        message:'Enter Employees GitHub UserName',
        when:(input)=>input.role ==='Engineer',
        validate: nameInput =>{
            if(nameInput){
                return true
            }else {
                console.log('Please Enter Employees GitHub UserName!')
            }
        }
    },{
        type:'input',
        name:'school',
        message:'Enter Inters School',
        when:(input) => input.role ==="Intern",
        valid:nameInput =>{
            if(nameInput){
                return true
            }else{
                console.log('Please Enter Inters School!')
            }
        }
    },{
        type:'confirm',
        name:'confirmAddEmployee',
        message:'Do You Want To Add More Memebers',
        default:false
    }
    
    //employee Data types intern or enginner
    ]).then(employeeData => {
        //using let becasue this data is always being ment to change

        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        team.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(team); 
        } else {
            return team;
        }
    })
}

managerQuestions().then(addEmployee)
