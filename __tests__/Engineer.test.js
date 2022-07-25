const Engineer = require('../lib/Engineer')


test('creating engineer object',()=>{
    const engineer = new Engineer('Juan',5,'juan123@gmial.com','jldDevops123')
    expect(engineer.github).toEqual(expect.any(String))
})

test('creating engineer github',()=>{
    const engineer = new Engineer('Juan',5,'juan123@gmial.com','jldDevops123')
    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()))
})

test('get role of employee',()=>{
    const engineer = new Engineer('Juan',5,'juan123@gmial.com','jldDevops123')
expect(engineer.getRole()).toEqual('Engineer')
})