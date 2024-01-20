var express = require('express');
var router = express.Router();
// 1 tạo csdl mongodb
// mở kết nối , truy vấn vào bảng trên csdl
// trả về dữ liệu dạng JSON
// tập viết API cho ứng dụng mobile
/* GET home page. */

const urlDB = "mongodb+srv://admin:r2xfY0vvdlFeolYr@cluster0.jkglkic.mongodb.net/?retryWrites=true&w=majority"

// mở kết nối bằng thư viện mongosse
var mongoose = require('mongoose') // click chữ mongoosee , bấm Alt + Enter để cài thư viện vào project

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect(urlDB, {});
// Lấy kết nối
const db = mongoose.connection;

// Xử lý lỗi kết nối
db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB'));

// Xác nhận kết nối thành công
db.once('open', function () {
    console.log('Kết nối thành công');
});

// định nghĩa đối tượng - collection - document
// định nghĩa cấu trúc của document
// Schema !!! định nghĩa các cặp giá trị thể thiện thông tin
// key : value
// tạo 1 Schema Student :
var student
    = new mongoose.Schema({
    name: String,
    hoTen: String,
    number: String,
    address: String,
    birthday: Date
});
// Liên kết Schema với DB
const Student = mongoose.model('student', student);

router.get('/showInsertStudentForm',
    function (req, res) {
        res.render('insert')
})

router.post('/insertStudent',function (req,res) {
  // lay du lieu tu form
  // // ket noi vao database , tao Sinh vien
  //   <input name="name" placeholder="Nhập tên sinh viên ..."/>
  //   <input name="hoten" placeholder="Nhâp họ sinh viên...">
  //       <input name="number" placeholder="Nhâp sdt sinh viên...">
  //           <input name="address" placeholder="Nhâp địa chỉ sinh viên...">
    var name = req.body.name
    var hoten = req.body.hoten
    var number = req.body.number
    var address = req.body.address

    var stun = new Student({
        name : name,
        hoten : hoten,
        number : number,
        address : address
    })

    stun.save().then(()=>{
        res.send('Them thanh cong!!!')
    }).catch(error =>{
        res.send('Them that bai ' + error.message)
    })

})


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getListStudentAPI',function (req,res) {
    var students = Student.find({}).then((data)=>{
        res.send(data);
    }).catch(error => {
        res.send('Co loi xay ra')
    })
})

module.exports = router;
