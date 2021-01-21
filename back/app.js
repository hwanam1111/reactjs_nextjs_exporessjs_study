const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');

const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch(console.error('DB 연결 실패'));
/*
 * app.get -> 가져오다
 * app.post -> 생성하다 (애매하면 post)
 * app.put -> 전체 수정
 * app.patch -> 부분 수정
 * app.delete -> 제거
 * app.options -> 찔러보기?
 * app.head -> 헤더만 가져오기 (header / body)
 */

app.get('/', (req, res) => {
  res.send('ROOT');
});

// app.get('/', (req, res) => {
//   res.send('API');
// });

app.use('/post', postRouter);


app.listen(3065, () => {
  console.log('서버 실행중.');
});