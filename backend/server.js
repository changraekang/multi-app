//필요한 모듈 가져오기

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 


const port = 5000; // 로컬포트


//Express server 생성
const app = express();

// json 상태로 오는 요청을 처리
app.use(bodyParser.json());

// Table 생성하기
db.pool.query(`CREATE TABLE lists (
    id INTEGER PRIMARY KEY,
    value TEXT,
    )`, (err, results,fields) => {
        console.log('results', results);
    });


// DB lists 테이블에 있는 data 서버로 보내주기
app.get('/api/valuses', function( req,res) {
    //DB 에서 정보가져오기
    db.pool.query(`SELECT * FROM lists;`,
    (err,results,fields) =>{
        if(err)
        return res.status(500).send(err)
        else
        return res.json(results)

    })
});


// Client에서 입력한 data를 DB에 넣기
app.post('/api/value', function(req,res,next){
    //DB에 data를 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err,results,fields) =>{
        if(err)
        return res.status(500).send(err)
        else
        return res.json({ success: true, value: req.body.value})

});


app.listen(port , () => {
    console.log(`Express server listening on ${port}`);
});
