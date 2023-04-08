const option = {
  openapi: "3.0.3"
}
// const swaggerAutogen = require('swagger-autogen')()
const swaggerAutogen = require('swagger-autogen')(option)

const doc = {
  info: {
    "version": "1.0.0",
    "title": "Subject System REST API",
    "description": ""
  },
  externalDocs: {
    description: "Find out more about Subjectsystem",
    url: "https://subjectsystem.first-aws-project.com/api-doc"
  },
  host: "http://subjectsystem.first-aws-project.com",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: [],
  produces: [],
  tags: [
    {
      name: "Teacher",
      description: "everything about teachers",
      externalDocs: {
        description: "Find out more",
        url: "https://subjectsystem.first-aws-project.com"
      }
    },
    {
      name: "Student",
      description: "everything about students",
      externalDocs: {
        description: "Find out more",
        url: "https://subjectsystem.first-aws-project.com"
      }
    },
    {
      name: "Department",
      description: "everything about departments",
      externalDocs: {
        description: "Find out more",
        url: "https://subjectsystem.first-aws-project.com"
      }
    },
    {
      name: "Course",
      description: "everything about courses",
      externalDocs: {
        description: "Find out more",
        url: "https://subjectsystem.first-aws-project.com"
      }
    },
    {
      name: "StudentCourse",
      description: "everything about studentcourses"
    },
    {
      name: "Home",
      description: "Hello World"
    }
  ],
  securityDefinitions: {},
  definitions: {},
  components: {
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

const outFile = './swagger_output.json'
const endpointFiles = ['./app.js']

swaggerAutogen(outFile, endpointFiles, doc)