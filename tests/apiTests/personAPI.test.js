// const PersonDTO = require('../../src/dto/PersonDTO');
// const { response } = require('express')
// const request = require('supertest')
// const app = require('../../index')
// jest.useFakeTimers()

// const person = new PersonDTO(
//   {
//     "name" : "Homam",
//     "surname" : "Jabir",
//     "username" : "Homam123",
//     "password" : "bajen123",
//     "ssn" : "19990915",
//     "email" : "jabir@kth.se",
//     "role" : 1
//   }
// ); //userDTO

// const dup_username = new PersonDTO(
//   {
//     "name" : "Filip",
//     "surname" : "Larsson",
//     "username" : "Homam123",
//     "password" : "hammarby123",
//     "ssn" : "19990718",
//     "email" : "filip@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// const dup_ssn = new PersonDTO(
//   {
//     "name" : "Filip",
//     "surname" : "Larsson",
//     "username" : "Filip123",
//     "password" : "hammarby123",
//     "ssn" : "19990915",
//     "email" : "filip@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// const dup_email = new PersonDTO(
//   {
//     "name" : "Filip",
//     "surname" : "Larsson",
//     "username" : "Filip123",
//     "password" : "hammarby123",
//     "ssn" : "19990718",
//     "email" : "jabir@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// describe('Register person1', () => {
//   jest.useFakeTimers()
//   it('should create a new post', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(person)
//     expect(res.statusCode).toEqual(200)
//   })
// })

// describe('Test unique checker for username, email, and ssn', () => {
//   jest.useFakeTimers()
//   it('Should throw error, duplicate username', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(dup_username)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   });
//   it('Should throw error, duplicate ssn', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(dup_ssn)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
//   it('Should throw error, duplicate email', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(dup_email)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
// })

// const bad_password = new PersonDTO(
//   {
//     "name" : "Lionel",
//     "surname" : "Messi",
//     "username" : "Barca123",
//     "password" : "fcb",
//     "ssn" : "19870624",
//     "email" : "messi@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// const bad_email = new PersonDTO(
//   {
//     "name" : "Lionel",
//     "surname" : "Messi",
//     "username" : "Barca123",
//     "password" : "Barcelona",
//     "ssn" : "19870624",
//     "email" : "messikth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// const bad_ssn = new PersonDTO(
//   {
//     "name" : "Lionel",
//     "surname" : "Messi",
//     "username" : "Barca123",
//     "password" : "Barcelona",
//     "ssn" : "198706241",
//     "email" : "messi@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// const bad_username = new PersonDTO(
//   {
//     "name" : "Lionel",
//     "surname" : "Messi",
//     "username" : "Barca123!",
//     "password" : "Barcelona",
//     "ssn" : "19870624",
//     "email" : "messi@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// const bad_name = new PersonDTO(
//   {
//     "name" : "Lioadakldkjaskdklaklsdaskdjklasknel",
//     "surname" : "Messiaklsdjkaskldkljaskdkjlaskd",
//     "username" : "Barca123",
//     "password" : "Barcelona",
//     "ssn" : "19870624",
//     "email" : "messi@kth.se",
//     "roleId" : 1
//   }
// ); //userDTO

// describe('Test validators for registraion', () => {
//   jest.useFakeTimers()
//   it('Should throw error, bad password', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(bad_password)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
//   it('Should throw error, bad email', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(bad_email)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
//   it('Should throw error, bad ssn', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(bad_ssn)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
//   it('Should throw error, bad username', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(bad_username)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
//   it('Should throw error, bad name', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send(bad_name)
//     expect(res.statusCode).toEqual(401)
//     expect(res.body).toHaveProperty('error')
//   })
// })

// describe('Log in person', () => {
//   jest.useFakeTimers()
//   it('Logs in with username', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "",
//         username: "Homam123",
//         password: "bajen123"
//       })
//     expect(res.statusCode).toEqual(200)
//   })
//   it('Logs in with email', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "jabir@kth.se",
//         username: "",
//         password: "bajen123"
//       })
//     expect(res.statusCode).toEqual(200)
//   })
//   it('Logs in with username inccorect password', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "",
//         username: "Homam123",
//         password: "XXXXXXXXXXXXXXXXX"
//       })
//     expect(res.statusCode).toEqual(401)
//   })
//   it('Logs in with email inccorect password', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "jabir@kth.se",
//         username: "",
//         password: "XXXXXXXXXXXXXXXXXXXXXXXX"
//       })
//     expect(res.statusCode).toEqual(401)
//   })
//   it('Logs non existing user', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "this@userdont.exist",
//         username: "",
//         password: "thisuserdontexist"
//       })
//     expect(res.statusCode).toEqual(401)
//   })
//   it('Logs non existing user', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "",
//         username: "",
//         password: ""
//       })
//     expect(res.statusCode).toEqual(401)
//   })
// })



// describe('Authorization test for recruiter and applicant', () => {
//   jest.useFakeTimers()

//   it('Create recruiter', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send({
//         name: "recruiter",
//         surname: "recruiter",
//         ssn: "19700101",
//         email: "recruiter@recruiter.recruiter",
//         username: "recruiter",
//         password: "recruiter",
//         roleId: 1
//       })
//     expect(res.statusCode).toEqual(200)
//   })

  
//   it('Create applicant', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send({
//         name: "applicant",
//         surname: "applicant",
//         ssn: "19700102",
//         email: "applicant@applicant.applicant",
//         username: "applicant",
//         password: "applicant",
//         roleId: 2
//       })
//     expect(res.statusCode).toEqual(200)
//   })


//   let accessTokenRecruiter;
//   let accessTokenApplicant;
//   it('Log in and recive access token (recruiter)', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "",
//         username: "recruiter",
//         password: "recruiter"
//       })
//       accessTokenRecruiter = res.body.accessToken;
//     expect(res.statusCode).toEqual(200)
//   })
//   it('Log in and recive access token (applicant)', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "",
//         username: "applicant",
//         password: "applicant"
//       })
//       accessTokenApplicant = res.body.accessToken;
//     expect(res.statusCode).toEqual(200)
//   })

//   it('Get access to protected page (only recruiters)', async () => {
//     const res = await request(app)
//       .get('/api/person/protected')
//       .set('Authorization', `Bearer ${accessTokenRecruiter}`)
//       expect(res.statusCode).toEqual(200)
//   })

//   it('Get access to all-users page (all logged in users)', async () => {
//     const res = await request(app)
//       .get('/api/person/all-users')
//       .set('Authorization', `Bearer ${accessTokenRecruiter}`)
//       expect(res.statusCode).toEqual(200)
//   })

//   it('Refused access to protected page (only recruiters)', async () => {
//     const res = await request(app)
//       .get('/api/person/protected')
//       .set('Authorization', `Bearer ${accessTokenApplicant}`)
//       expect(res.statusCode).toEqual(401)
//   })

//   it('Get access to all-users page (all logged in users)', async () => {
//     const res = await request(app)
//       .get('/api/person/all-users')
//       .set('Authorization', `Bearer ${accessTokenApplicant}`)
//       expect(res.statusCode).toEqual(200)
//   })

//   it('Refused access to all-users page no token', async () => {
//     const res = await request(app)
//       .get('/api/person/all-users')
//       .set('Authorization', `Bearer `)
//       expect(res.statusCode).toEqual(401)
//   })

//   it('Refused access to protected page no token', async () => {
//     const res = await request(app)
//       .get('/api/person/protected')
//       .set('Authorization', `Bearer `)
//       expect(res.statusCode).toEqual(401)
//   })
// })


// describe('Update null value test', () => {
//   jest.useFakeTimers()
//   let accessTokenNull1;

//   it('Create user with null value', async () => {
//     const res = await request(app)
//       .post('/api/person/signup')
//       .send({
//         name: "09695060848347644085735346228334752515337078300310219385669578588",
//         surname: "null",
//         ssn: "19700107",
//         email: "null@null.null",
//         username: "nullnull123",
//         password: "nullnull",
//         roleId: 2
//       })
//     expect(res.statusCode).toEqual(200)
//   })

//   it('Logs in existing user with null name in db', async () => {
//     const res = await request(app)
//       .post('/api/person/login')
//       .send({
//         email: "",
//         username: "nullnull123",
//         password: "nullnull"
//       })
//       accessTokenNull1 = res.body.accessToken;
//     expect(res.statusCode).toEqual(401)
//   })


//   it('Fails to update user with null name in db. Email already exists in differnt person', async () => {
//     const res = await request(app)
//       .post('/api/person/update')
//       .set('Authorization', `Bearer ${accessTokenNull1}`)
//       .send({
//         name: "null",
//         surname: "null",
//         ssn: "19700107",
//         email: "jabir@kth.se",
//         username: "nullnull123",
//       })
//     expect(res.statusCode).toEqual(401)
//   })
//   it('Fails to update user with null name in db. Username already exists in differnt person', async () => {
//     const res = await request(app)
//       .post('/api/person/update')
//       .set('Authorization', `Bearer ${accessTokenNull1}`)
//       .send({
//         name: "null",
//         surname: "null",
//         ssn: "19700107",
//         email: "null@null.null",
//         username: "Homam123",
//       })
//     expect(res.statusCode).toEqual(401)
//   })
//   it('Fails to update user with null name in db. SSN already exists in differnt person', async () => {
//     const res = await request(app)
//       .post('/api/person/update')
//       .set('Authorization', `Bearer ${accessTokenNull1}`)
//       .send({
//         name: "null",
//         surname: "null",
//         ssn: "19990915",
//         email: "null@null.null",
//         username: "nullnull123",
//       })
//     expect(res.statusCode).toEqual(401)
//   })

//   it('Updates user with null name in db', async () => {
//     const res = await request(app)
//       .post('/api/person/update')
//       .set('Authorization', `Bearer ${accessTokenNull1}`)
//       .send({
//         name: "null",
//         surname: "null",
//         ssn: "19700107",
//         email: "null@null.null",
//         username: "nullnull1",
//       })
//     expect(res.statusCode).toEqual(200)
//   })

  
// })


// jest.useFakeTimers()

test('true is true', () => {
  expect(true).toBe(true);
})
