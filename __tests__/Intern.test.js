const Intern = require('../lib/Intern')

test('creating Intern object',()=>{
    const intern = new Intern('Juan',5,'juan123@gmial.com','LSU')
    expect(intern.school)
})

test('get school from Intern',()=>{
    const intern = new Intern('Juan',5,'juan123@gmial.com','LSU')

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()))

})

test('get role of Intern',()=>{
    const intern = new Intern('Juan',5,'juan123@gmial.com','LSU')
expect(intern.getRole()).toEqual('Intern')
})