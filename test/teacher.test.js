const { expect } = require('chai')
const { application } = require('express')
const supertest = require('supertest')

// const app = require('../app')
const api = supertest('http://localhost:3000/api')
// const api = supertest(app)
let t_id

describe('Teachers 路由測試', () => {
  context('# GET ', () => {
    it('獲取所有教師資料 GET /teachers', (done) => {
      api.get('/teachers')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body[0]).to.not.be.empty
          expect(res.body[0]).to.have.property('id')
          expect(res.body[0].id).to.be.a('number')
          expect(res.body[0]).to.have.property('name')
          expect(res.body[0].name).to.be.a('string')
          expect(res.body[0]).to.have.property('phone')
          expect(res.body[0].phone).to.be.a('string')
          expect(res.body[0]).to.have.property('email')
          expect(res.body[0].email).to.be.a('string')
          expect(res.body[0]).to.have.property('address')
          expect(res.body[0].address).to.be.a('string')
          expect(res.body[0]).to.have.property('account')
          expect(res.body[0].account).to.be.a('string')
          expect(res.body[0]).to.have.property('avatarImage')
          expect(res.body[0].avatarImage).to.be.a('string')
          expect(res.body[0]).to.have.property('working')
          expect(res.body[0].working).to.be.a('boolean')
          expect(res.body[0]).to.have.property('createdAt')
          expect(res.body[0].createdAt).to.be.a('string')
          expect(res.body[0]).to.have.property('updatedAt')
          expect(res.body[0].updatedAt).to.be.a('string')
          done()
        })
    })
  })

  context('# POST ', () => {
    it('新增一位教師資料 POST /teachers', (done) => {
      api.post('/teachers')
        .set('Content-Type', 'application/json')
        .send({
          "name": "joe",
          "phone": "0989898989",
          "account": "joe",
          "password": "joe1",
          "email": "joe@com.com",
          "address": "新竹市香山區食品街50號",
          "avatarImage": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/710.jpg",
          "working": true
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          t_id = res.body.id
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name')
          expect(res.body.name).to.be.a('string')
          expect(res.body).to.have.property('phone')
          expect(res.body.phone).to.be.a('string')
          expect(res.body).to.have.property('email')
          expect(res.body.email).to.be.a('string')
          expect(res.body).to.have.property('address')
          expect(res.body.address).to.be.a('string')
          expect(res.body).to.have.property('account')
          expect(res.body.account).to.be.a('string')
          expect(res.body).to.have.property('avatarImage')
          expect(res.body.avatarImage).to.be.a('string')
          expect(res.body).to.have.property('working')
          expect(res.body.working).to.be.a('boolean')
          expect(res.body).to.have.property('createdAt')
          expect(res.body.createdAt).to.be.a('string')
          expect(res.body).to.have.property('updatedAt')
          expect(res.body.updatedAt).to.be.a('string')
          done()
        })
    })
  })

  context('# GET ', () => {
    it('獲取一位教師資料 GET /teachers/:t_id', (done) => {
      api.get(`/teachers/${t_id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('id')
          expect(res.body.id).to.be.a('number')
          expect(res.body).to.have.property('name')
          expect(res.body.name).to.be.a('string')
          expect(res.body).to.have.property('phone')
          expect(res.body.phone).to.be.a('string')
          expect(res.body).to.have.property('email')
          expect(res.body.email).to.be.a('string')
          expect(res.body).to.have.property('address')
          expect(res.body.address).to.be.a('string')
          expect(res.body).to.have.property('account')
          expect(res.body.account).to.be.a('string')
          expect(res.body).to.have.property('avatarImage')
          expect(res.body.avatarImage).to.be.a('string')
          expect(res.body).to.have.property('working')
          expect(res.body.working).to.be.a('boolean')
          expect(res.body).to.have.property('createdAt')
          expect(res.body.createdAt).to.be.a('string')
          expect(res.body).to.have.property('updatedAt')
          expect(res.body.updatedAt).to.be.a('string')
          done()
        })
    })
  })

  context('# DELETE ', () => {
    it('刪除一位教師資料 DELETE /teachers/:t_id', (done) => {
      api.delete(`/teachers/${t_id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('status')
          expect(res.body.status).equal('success')
          done()
        })
    })
  })
})