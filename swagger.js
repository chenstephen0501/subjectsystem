// const swaggerAutogen = require('swagger-autogen')()       //  若沒放入參數會使用預設 openapi 的版本
const option = {
  openapi: "3.0.3"
}                                                           // 這裡我設為3.0.3的版本                                         
const swaggerAutogen = require('swagger-autogen')(option)   // 然後把 option 這個參數放入 swagger-autogen 來使用。 

const doc = {
  info: {                                                           // 有關 API 的信息
    "version": "1.0.0",
    "title": "Subject System REST API",
    "description": ""
  },
  externalDocs: {                                                  //  定義外部文件的說明
    description: "Find out more about Subjectsystem",
    url: "http://localhost:3000/api-doc"
  },
  servers: [                                                      //  定義數組 API 所指定的 URL
    {
      url: "http://localhost:3000"
    }
  ],
  tags: [                                                         //  為每個 API 操作分配一個列表
    {
      name: "Teacher",
      description: "everything about teachers",
      externalDocs: {
        description: "Find out more",
        url: "http://localhost:3000"
      }
    },
    {
      name: "Student",
      description: "everything about students",
      externalDocs: {
        description: "Find out more",
        url: "http://localhost:3000"
      }
    },
    {
      name: "Department",
      description: "everything about departments",
      externalDocs: {
        description: "Find out more",
        url: "http://localhost:3000"
      }
    },
    {
      name: "Course",
      description: "everything about courses",
      externalDocs: {
        description: "Find out more",
        url: "http://localhost:3000"
      }
    },
    {
      name: "StudentCourse",
      description: "everything about studentcourses",
      externalDocs: {
        description: "Find out more",
        url: "http://localhost:3000"
      }
    },
    {
      name: "Home",
      description: "Hello World"
    }
  ],
  components: {  // 多個 API 的操作會有一些共同的參數或返回相同的回應結構為了避免程式碼重複，我們將通用定義放在全局的 components。
    schemas: {
      Teacher: {
        "id": 1,
        "name": "mary",
        "phone": "0988255888",
        "account": "mary",
        "password": "mary1",
        "email": "mary@com.com",
        "address": "新竹市東區西門街50號",
        "avatar_image": "https://i.imgur.com/JL93zDj.jpeg",
        "working": true,
        "created_at": "2021-08-08 08:08:08",
        "updated_at": "2021-08-08 08:08:08"
      },
      Student: {
        "id": 1,
        "name": "mike",
        "phone": "0977888999",
        "account": "mike",
        "password": "mike1",
        "email": "mike@com.com",
        "address": "新竹市西區南大路50號",
        "avatar_image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/783.jpgg",
        "learning": true,
        "created_at": "2023-09-03 08:08:08",
        "updated_at": "2023-09-03 08:08:08"
      },
      Department: {
        "id": 1,
        "name": "中國文學系",
        "created_at": "2021-08-08 08:08:08",
        "updated_at": "2021-08-08 08:08:08"
      },
      Course: {
        "id": 1,
        "class_name": "現代文學",
        "class_time": "2023-09-10 08:00:00",
        "introduction": "報導文學與新聞寫作、近現代翻譯文學、馬華文學、金庸武俠小說、近現代報刊與文化",
        "department_id": 1,
        "teacher_id": 1,
        "created_at": "2021-08-08 08:08:08",
        "updated_at": "2021-08-08 08:08:08"
      },
      StudentCourse: {
        "id": 1,
        "course_id": 1,
        "student_id": 1
      }
    }
  }
}

const outFile = './swagger_output.json'                        // 輸出的文件名稱
const endpointFiles = ['./app.js']                             //  這裡指要指向的 API ，在這裡我指向到 app.js

swaggerAutogen(outFile, endpointFiles, doc)                    // swaggerAutogen 的方法