"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _promise = _interopRequireDefault(require("mysql2/promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Node.js入口文件
//针对当前后端的文件的功能进行解释:
// 主要作用是完成路由针对不同的板块进行直接的跳转;同时完成mysql数据库的连接的操作
//引入mysql数据库中的表格的内容设计的模版检查文件,并且直接获取到模版对象，便于直接对该模版对象使用create方法进行直接的表格的内容的
//创建但是由于此处是根据用户进行动态的数据库内容的修改则不需要在连接上数据的时候立即添加内容,只是做个示例
//创建mysql构造函数并且获取
function Config1() {
  var connection;
  return regeneratorRuntime.async(function Config1$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_promise["default"].createConnection({
            host: "127.0.0.1",
            password: "123456",
            database: "project01",
            new_port: 3306,
            user: "root"
          }));

        case 3:
          connection = _context.sent;
          //进行数据连接事件的绑定
          console.log("连接成功"); //返回连接实例

          return _context.abrupt("return", connection);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log("数据库1连接失败", _context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
} //需要注意的是此处是通过转化为数据库实例对象的创建进而完成了数据库的连接--所谓转化为实例对象也就是此时的mysql变量中的内容为project01数据库对象了
//暴露数据库连接模版函数提供给其他数据库操作的文件中进行函数调用


var _default = Config1; // //设置一段时间后自动关闭mysql服务的定时器函数
// setTimeout(()=>{
//   mysql.disconnect();
// },3000);
// --下面完成路由服务的开启的Nodejs的代码设置：

exports["default"] = _default;