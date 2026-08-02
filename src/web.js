const http = require('http')
const fs = require('fs')
const path = require('path')
const queryString = require('querystring')

http
  .createServer((req, res) => {
    const filePath = path.join(__dirname, 'html', 'web.html')
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.write('interval server error')
        return
      }
      res.writeHead(200, { 'content-type': 'text/html' })
      if (req.url == '/') {
        res.write(data)
      } else if (req.url == '/submit') {
        let dataBody = []
        req.on('data', chunk => {
          dataBody.push(chunk)
        })
        req.on('end', () => {
          let rawData = Buffer.concat(dataBody).toString()
          let readableRawdata = queryString.parse(rawData)
          let dataSrting = `My name is ${readableRawdata.fname}, ${readableRawdata.lname}`;
          let fileName = path.join(__dirname, "html", readableRawdata.fname.concat(readableRawdata.lname)+ ".txt");
          fs.writeFile(fileName, dataSrting, 'utf-8', (err)=>{
            if(err){
              res.end('internal server error')
              return false;
            }else{
              console.log('file created');
               res.end('<h3>file created.</h3>')
            }
          })
       })
      }
     
    })
  })
  .listen(6200)
