const Manager = require('../lib/Manager')

test('creating Manger object',()=>{
const manager = new Manager('Juan',5,'jja@gmail.com',4)
  
   expect(manager.officeNumber).toEqual(expect.any(Number))
})

test('getting Manger role',()=>{
    const manager = new Manager('Juan',5,'juan123@gmial.com','jja@gmail.com')
    expect(manager.getRole()).toEqual('Manger')
})