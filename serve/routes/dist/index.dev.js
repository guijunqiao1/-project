"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _indexNode = _interopRequireDefault(require("../indexNode2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//此处获取到数据库链接配置对象
// import Config2 from "../indexNode2.js";
var connection2; //首先定义一个用于存储连接数据库的实例对象,在下方首次进行数据库的实例赋值之后则可完成值的保存，后续在路由中进行
//数据库操作的时候直接执行connection.execute()方法即可--因为connection指向保持不变
// 同时需要注意的是connection就算初始化未被赋值的情况下如果使用的是const关键字进行定义的话则在后续赋值则会被视作为错误，则提前进行全局变量的定义不能使用const关键字
// let connection2;

var Router = (0, _express["default"])(); //引入数据库链接函数
//下方语句用于实现数据库1的连接

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _indexNode["default"])());

        case 3:
          connection2 = _context.sent;
          console.log("数据库连接成功");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("数据库连接失败");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})(); //注意此为立即执行函数的写法，并且通过使用匿名函数的方式，则需要立即执行函数本身自带的第一个()进行包裹，并且在前者中的同时因为需要使用异步对Config方法进行处理
//故需要进行async的同理包裹
//设备最新数据


Router.get("/recent", function _callee2(req, res) {
  var _ref, _ref2, results, formattedResult;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(connection2.query("SET SESSION group_concat_max_len = 1000000"));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(connection2.query("\n      WITH latest_time_per_dno AS (\n          SELECT d_no, MAX(c_time) AS max_time \n          FROM t_data \n          GROUP BY d_no\n      )\n      SELECT \n          t.d_no, \n          GROUP_CONCAT(\n              CONCAT('[', \n                     '\"', t.field1, '\"', ',', \n                     '\"', t.field2, '\"', ',', \n                     '\"', t.field3, '\"', ',', \n                     '\"', t.field4, '\"', ',', \n                     '\"', t.c_time, '\"', \n              ']') ORDER BY t.c_time\n          ) AS data\n      FROM t_data t\n      JOIN latest_time_per_dno l \n        ON t.d_no = l.d_no\n        WHERE t.c_time BETWEEN (l.max_time - INTERVAL 5 MINUTE) AND l.max_time\n      GROUP BY t.d_no;\n    "));

        case 5:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          results = _ref2[0];
          formattedResult = results.map(function (row) {
            try {
              if (!row.data) return [row.d_no, []];
              var fixedData = "[".concat(row.data, "]");
              var data = JSON.parse(fixedData); // 遍历 data 数组，修改 c_time 格式（去掉秒数）

              data = data.map(function (entry) {
                return entry;
              });
              return [row.d_no, data];
            } catch (error) {
              console.error("JSON \u89E3\u6790\u5931\u8D25: ".concat(row.data), error);
              return [row.d_no, []];
            }
          }); //允许所有的来源

          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(formattedResult);
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error("数据库查询失败", _context2.t0);
          res.status(500).send("数据库查询失败");

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //行为最新数据

Router.get("/recent/action", function _callee3(req, res) {
  var _ref3, _ref4, results, formattedResult;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(connection2.query("SET SESSION group_concat_max_len = 1000000"));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(connection2.query("\n      WITH latest_time_per_dno AS (\n          SELECT d_no, MAX(c_time) AS max_time \n          FROM t_behavior_data \n          GROUP BY d_no\n      )\n      SELECT \n          t.d_no, \n          GROUP_CONCAT(\n              CONCAT('[', \n                     '\"', t.field1, '\"', ',', \n                     '\"', t.field2, '\"', ',', \n                     '\"', t.field3, '\"', ',', \n                     '\"', t.field4, '\"', ',', \n                     '\"', t.c_time, '\"', \n              ']') ORDER BY t.c_time\n          ) AS data\n      FROM t_behavior_data t\n      JOIN latest_time_per_dno l \n        ON t.d_no = l.d_no\n        WHERE t.c_time BETWEEN (l.max_time - INTERVAL 5 MINUTE) AND l.max_time\n      GROUP BY t.d_no;\n    "));

        case 5:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          results = _ref4[0];
          formattedResult = results.map(function (row) {
            try {
              if (!row.data) return [row.d_no, []];
              var fixedData = "[".concat(row.data, "]");
              var data = JSON.parse(fixedData); // 遍历 data 数组，修改 c_time 格式（去掉秒数）

              data = data.map(function (entry) {
                return entry;
              });
              return [row.d_no, data];
            } catch (error) {
              console.error("JSON \u89E3\u6790\u5931\u8D25: ".concat(row.data), error);
              return [row.d_no, []];
            }
          });
          res.send(formattedResult);
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error("数据库查询失败", _context3.t0);
          res.status(500).send("数据库查询失败");

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
var _default = Router; // 实例mysql语句代码：
// async function executeSQL() {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'your_password',
//     database: 'your_database',
//   });
//   // 直接运行 SQL
//   const [result] = await connection.execute(`
//     INSERT INTO users (name, email, age)
//     VALUES ('Alice', 'alice@example.com', 25)
//   `);
//   console.log('插入结果:', result);
//   await connection.end();//关闭当前数据库--此处需要注意的是由于数据库的连接实例变量是在当前路由下进行获取的，所以进行关闭的时候也需要再当前路由中执行
//，这样会导致所有的路由都需要执行一次关闭数据库的操作，而对于上述的实际代码中利用connection的提前赋值的形式进行连接的实例对象的获取，这样就可以在module_exports赋值之前
//执行一次数据库关闭的操作就能将所有的路由中的请求对应的数据库关闭操作都包含了(异步的原理--也就是在执行路由并且返回响应体内容的时候同时也会执行当前程序中的后续的内容);
//一般最好不要主动添加上connection.end()方法的执行，一般都是在程序被关闭的时候才断开连接，因为在多次访问路由文件的时候路由前置代码只会执行一次(也就是只会进行一次数据库的连接),并且后续直接访问到路由内容
//若断开太早则会导致路由中的数据库操作无法被识别操作的数据库对象--除非是在每一个路由中进行一次数据库的连接操作
// }
// executeSQL();
//补充：
//[]为数组解构的赋值方式、而{}为对象解构的赋值方式:
//作为数组也能进行解构赋值的原因在于本质上是遵循着顺序进行赋值的arr=[1,2,3],[a,b,c]=arr,同时可以进行[,,a,b,c]=[1,2,3,4,5]的赋值方式进行灵活的间隔赋值
//则上述的[result]的数组解构的赋值方式则是仅将返回值数组中的第一个元素进行获取了
//接下来的任务：
//在了解了mysql数据库的基本语法之后进行对应的内容的操作，同时对分页进行深刻的理解(包括前端的表格的分页实现、后端的数据库的分页的实现)，同时需要在所有后端设计完毕之后进行前端的表格实际渲染的添加，
//并且后续对服务的具体端口以及另一个页面(数据库的利用)的制作进行完善
// 检查是否已存在相同的 `id`（防止重复）
// const [rows] = await connection.execute('SELECT * FROM t_device_msg WHERE id = ?', [id]);
// if (rows.length > 0) {
//   return res.status(400).send('数据已存在');
// }
// // 插入新数据
// const sql = `
//   INSERT INTO t_device_msg (id, device_name, c_time, remark, number)
//   VALUES (?, ?, ?, ?, ?)
// `;
// await connection.execute(sql, [id, device_name, c_time, remark, number]);
// // 响应成功
// res.send('ADD_OK');
//使用require()进行引入的内容使用module.exports进行暴露，
//而使用Import进行引入的内容本身需要使用export default 进行暴露
//需要注意的是进行axios响应结果接收的情况下不可设置响应状态码

exports["default"] = _default;