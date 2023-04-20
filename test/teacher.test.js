const { expect } = require('chai')    // 引入斷言庫
const supertest = require('supertest')         

const app = require('../app')
const api = supertest(app)  //  定義 API 的路徑

let t_id                  // 全域變數，等待 POST 一筆 teacher 資料後取得當筆資料的 id 

// 描述 teachers 相關路由測試
describe('Teachers 路由測試', () => {

  context('# GET ', () => {
    // 描述這測試案例的內容
    it('獲取所有教師資料 GET /teachers', (done) => {
      api.get('/api/teachers')  // 取得所有教師資料
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body[0]).to.not.be.empty                // 判斷回傳的資料不是空值             
          expect(res.body[0]).to.have.property('id')        // 判斷回傳第一筆資料有沒有 id 這個屬性
          expect(res.body[0].id).to.be.a('number')          // 判斷回傳第一筆資料 id 的值是不是數字類型別
          expect(res.body[0]).to.have.property('name')      // 判斷回傳第一筆資料有沒有 name 這個屬性
          expect(res.body[0].name).to.be.a('string')        // 判斷回傳第一筆資料 name 的值是不是字串型別
          expect(res.body[0]).to.have.property('phone')     // 判斷回傳第一筆資料有沒有 phone 這個屬性
          expect(res.body[0].phone).to.be.a('string')       // 判斷回傳第一筆資料 phone 是不是字串型別
          expect(res.body[0]).to.have.property('email')     // 判斷回傳第一筆資料有沒有 email 這個屬性
          expect(res.body[0].email).to.be.a('string')       // 判斷回傳第一筆資料 email 的值是不是字串型別
          expect(res.body[0]).to.have.property('address')   // 判斷回傳第一筆資料有沒有 address 這個屬性
          expect(res.body[0].address).to.be.a('string')     // 判斷回傳第一筆資料 address 是不是字串型別
          expect(res.body[0]).to.have.property('account')   // 判斷回傳第一筆資料有沒有 account 這個屬性
          expect(res.body[0].account).to.be.a('string')     // 判斷回傳第一筆資料 account 是不是字串型別
          expect(res.body[0]).to.have.property('avatarImage')  // 判斷回傳第一筆資料有沒有 avatarImage 這個屬性
          expect(res.body[0].avatarImage).to.be.a('string')  // 判斷回傳第一筆資料 avatarImage 是不是字串型別
          expect(res.body[0]).to.have.property('working')    // 判斷回傳第一筆資料有沒有 working 這個屬性
          expect(res.body[0].working).to.be.a('boolean')     // 判斷回傳第一筆資料 working 是不是布林值
          expect(res.body[0]).to.have.property('createdAt')  // 判斷回傳第一筆資料有沒有 createdAt 這個屬性
          expect(res.body[0].createdAt).to.be.a('string')    // 判斷回傳第一筆資料 createdAt 是不是字串型別
          expect(res.body[0]).to.have.property('updatedAt')  // 判斷回傳第一筆資料有沒有 updatedAt 這個屬性
          expect(res.body[0].updatedAt).to.be.a('string')    // 判斷回傳第一筆資料 updatedAt 是不是字串型別
          done()
        })
    })
  })

  context('# POST ', () => {
    it('新增一位教師資料 POST /teachers', (done) => {
      api.post('/api/teachers')
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
    after((done) => {
      api.delete(`/api/teachers/${t_id}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log('delete Teacher success.')
        done()
      })
    })
  })

  context('# GET ', () => {
    before((done) => {
      api.post('/api/teachers')
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
          console.log('create Teacher success.')
          done()
        })
    })
    
    it('獲取一位教師資料 GET /teachers/:t_id', (done) => {
      api.get(`/api/teachers/${t_id}`)
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
    
    after((done) => {
      api.delete(`/api/teachers/${t_id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          console.log('delete Teacher success.')
          done()
        })
    })
  })

  context('# DELETE ', () => {
    before((done) => {
      api.post('/api/teachers')
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
          console.log('create Teacher success.')
          done()
        })
    })
    it('刪除一位教師資料 DELETE /teachers/:t_id', (done) => {
      api.delete(`/api/teachers/${t_id}`)
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