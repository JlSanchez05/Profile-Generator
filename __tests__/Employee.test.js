const Employee = require('../lib/Employee')

test('creating employee object',()=>{

const employee = new Employee('Juan',5,'juan123@gmial.com')

expect(employee.name).toEqual(expect.any(String))
expect(employee.id).toEqual(expect.any(Number))
expect(employee.email).toEqual(expect.any(String))
})

test('get employee name',()=>{
    const employee = new Employee('Juan',5,'juan123@gmial.com')
    expect(employee.getName()).toEqual(expect.any(String))
})

test('get employee id',()=>{
    const employee = new Employee('Juan',5,'juan123@gmial.com')

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()))
})

test('get employee role',()=>{
    const employee = new Employee('Juan',5,'juan123@gmial.com')
expect(employee.getRole()).toEqual('Employee')
})