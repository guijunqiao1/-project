"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _indexNode = _interopRequireDefault(require("../indexNode2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//用于接受映射数组获取请求的路由文件
//在当前需要对Mysql数据库进行操作的文件中提前引入Mysql数据库的配置文件--需要注意的是indexNode文件中的其他引入的组件文件只是对indexNode本身编写的时候进行约束的文件
//此处获取到数据库链接配置对象
var connection; //定义数据库连接对象

var Router_direct = (0, _express["default"])();

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _indexNode["default"])());

        case 3:
          connection = _context.sent;
          console.log("数据库2连接成功");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("数据库2连接失败");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})(); // 控件实际值的控制路由
// Router_direct.get("/direct",async(req,res)=>{
//   const {d_no} = req.query;
//   const [rows] = await connection.execute(`
//   SELECT config_id,value
//   FROM t_direct
//   WHERE d_no = "${d_no}"
//   `);
//   const resultObject = rows.reduce((acc, curr) => {
//     acc[curr.config_id] = curr.value;
//     return acc;
//   }, {});
//   //格式化数据
//   res.send(resultObject);
// })
//额外绑定获取所有数据的路由


Router_direct.get("/zhiling", function _callee2(req, res) {
  var result, rowx;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT c.id,c.f_type,c.mode,c.f_value,c.t_name,c.max,c.min,c.topic,c.header,c.luyou,t.value\n  FROM t_direct t,t_direct_config c\n  WHERE c.id = t.config_id\n  "));

        case 2:
          result = _context2.sent;
          rowx = result[0];
          res.send(rowx);
          return _context2.abrupt("return");

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 设备控件初始化赋值控制路由(针对是否存在signzhi进行数据库的填充和对应的默认数据的返回)
// Router_direct.get("/handshake",async(req,res)=>{
//   const { d_no } = req.query;
//   const [rows] = await connection.execute(`
//     SELECT config_id,value,d_no
//     FROM t_direct
//     WHERE d_no = "${d_no}"
//     `);
//   if(rows.length<1){//发现没有该设备编号对应的内容则插入默认配置后将设备的信息返回
//     const [rows1] = await connection.execute(`
//         INSERT INTO t_direct (config_id,value,d_no)
//         VALUES (19,"手动","${d_no}"),
//                (10,"关","${d_no}"),
//                (11,"关","${d_no}"),
//                (12,"反转","${d_no}"),
//                (13,"关","${d_no}"),
//                (14,"关","${d_no}"),
//                (15,"20","${d_no}"),
//                (16,"10","${d_no}"),
//                (17,"18","${d_no}"),
//                (18,"7","${d_no}");
//       `);//上述控件对应顺序为:设备的：控制模式、可调灯、步进电机、电机模式、风扇1、风扇2、温度阈值2、温度阈值1、光照阈值
//     console.log("rows1："+rows1);
//     const [rows2] = await connection.execute(`
//       SELECT config_id,value,d_no
//       FROM t_direct
//       WHERE d_no = "${d_no}"
//       `);
//     console.log("rows2："+rows2);
//     // 将结果进行重组为实际的really对应的格式：
//     const result = rows2.reduce((acc, item) => {
//       acc[item.config_id] = item.value;
//       return acc;
//     }, {});
//     res.send(result);
//   }
//   else {
//     console.log("rows："+rows);
//     // 将结果进行重组为实际的really对应的格式：
//     const result = rows.reduce((acc, item) => {
//       acc[item.config_id] = item.value;
//       return acc;
//     }, {});
//     res.send(result);
//   }
// })

var _default = Router_direct;
exports["default"] = _default;