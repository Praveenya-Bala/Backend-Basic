//creating a server
// const http = require('http')
// const fs = require('fs')
// const server = http.createServer((req,res)=>{
//     fs.readFile('index.html',(err,data)=>{
//         if(err){
//             res.write('Error in loading')
//         }else{
//             res.writeHead(200,{'content-type':'text/html'})
//             res.write(data);
//         }
//         res.end();
//     })
// res.write('<h1>Node</h1>');
//path routing
// if(req.url=='/'){
//     res.write('Home Page');
// }
// else if(req.url=='/about'){
//     res.write('About page')
// }
// else{
//     res.write('404 not found')
// }
// })
// server.listen(3000,()=>{
//     console.log("Server is running at http://localhost:3000");
// })

// const fs = require('fs')
// fs.writeFile('output.txt', 'hello', (err) => {
//     if (err) throw err;
//     console.log('File has been created')
// })

const http = require('http')

let data = [];
http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = ""
        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', () => {
            let finaldata = JSON.parse(body)
            data.push(finaldata)
            console.log(data)
            res.statusCode = 200
            res.end("Data Inserted")
        })
    }
    if (req.method == 'GET') {
        if (req.url === '/getstudentbyrollno') {
            let body = ""
            req.on('data', chunk => {
                body += chunk;
            })
            req.on('end', () => {
                if (body) {
                    let finaldata = JSON.parse(body)
                    if (finaldata.rollno) {
                        let result = data.find(s => s.rollno == finaldata.rollno)
                        res.end(JSON.stringify(result || {}))
                        return
                    }
                }
            })
        } else {
            res.end(JSON.stringify(data))
        }
    }
    if (req.method == 'DELETE') {
        let body = ""
        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', () => {
            if (body) {
                let finaldata = JSON.parse(body)
                if (finaldata.rollno) {
                    data = data.filter(s => s.rollno != finaldata.rollno)
                    res.end(JSON.stringify(data))
                    return
                }
            } else {
                res.end("No body")
            }
        })
    }
    if (req.method == 'PUT') {
        let body = ""
        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', () => {
            if (body) {
                let finaldata = JSON.parse(body)
                let index = data.findIndex(s => s.rollno === finaldata.rollno)
                data[index] = finaldata
                console.log(data)
                res.end('Data Updated')
            } else {
                res.end("No body")
            }
        })
    }
}).listen(3000);















