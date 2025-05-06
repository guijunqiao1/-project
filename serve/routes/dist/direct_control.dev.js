"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _indexNode = _interopRequireDefault(require("../indexNode2.js"));

var _mqtt_server_get = require("./mqtt_server_get.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//此处获取到数据库链接配置对象
var connection; //定义数据库连接对象

var Router_direct_response = (0, _express["default"])(); //导入mqtt模块--用于指令的正确发送响应 2

//定义全局指令字段映射变量
var control_array = [];

(function _callee() {
  var result, rowx;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _indexNode["default"])());

        case 3:
          connection = _context.sent;
          console.log("数据库连接成功");
          _context.next = 7;
          return regeneratorRuntime.awrap(connection.execute("\n      SELECT f_value,header\n      FROM t_direct_config\n    "));

        case 7:
          result = _context.sent;
          rowx = result[0];
          control_array.push("".concat(rowx[0].f_value.split("|")[0].split(":")[1], ":").concat(rowx[0].header)); //zidong:start

          control_array.push("".concat(rowx[0].f_value.split("|")[1].split(":")[1], ":").concat(rowx[0].header)); //shodong:start

          control_array.push("".concat(rowx[1].f_value.split(":")[1], ":").concat(rowx[1].header.split("|")[0])); //deng:start

          control_array.push("".concat(rowx[1].f_value.split(":")[1], ":").concat(rowx[1].header.split("|")[1])); //deng:stop

          control_array.push("".concat(rowx[2].f_value.split("|")[0].split(":")[1], ":").concat(rowx[2].header.split("|")[1])); //guanbi:stop

          control_array.push("".concat(rowx[2].f_value.split("|")[1].split(":")[1], ":").concat(rowx[2].header.split("|")[0])); //kaiqi:start

          control_array.push("".concat(rowx[3].f_value.split("|")[0].split(":")[1], ":").concat(rowx[3].header)); //zhengzhuan:start

          control_array.push("".concat(rowx[3].f_value.split("|")[1].split(":")[1], ":").concat(rowx[3].header)); //fanzhuan:start

          control_array.push("".concat(rowx[4].f_value.split(":")[1], ":").concat(rowx[4].header.split("|")[0])); //fengshan1:start

          control_array.push("".concat(rowx[4].f_value.split(":")[1], ":").concat(rowx[4].header.split("|")[1])); //fengshan1:stop

          control_array.push("".concat(rowx[5].f_value.split(":")[1], ":").concat(rowx[5].header.split("|")[0])); //fengshan2:start

          control_array.push("".concat(rowx[5].f_value.split(":")[1], ":").concat(rowx[5].header.split("|")[1])); //fengshan2:end

          control_array.push("".concat(rowx[6].f_value)); //temperature2

          control_array.push("".concat(rowx[7].f_value)); //temperature1

          control_array.push("".concat(rowx[8].f_value)); //light_warning

          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.log("数据库连接失败");

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
})(); //搭建监听指令的路由


Router_direct_response.get("/zhiling/control", function _callee2(req, res) {
  var _req$query, content, topic, d_no, obj1, tem1, tem11, _ref, _ref2, row, _ref3, _ref4, rows, _obj, _tem, _tem2, _ref5, _ref6, _row, _ref7, _ref8, _rows;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, content = _req$query.content, topic = _req$query.topic, d_no = _req$query.d_no;
          _context2.prev = 1;

          if (!(d_no === "null")) {
            _context2.next = 31;
            break;
          }

          //备份内容的封装
          obj1 = {};
          tem1 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[0] : control_array[0].split(":")[0];
          tem11 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[1] : control_array[0].split(":")[1];
          obj1[tem1] = tem11; //指令发送以及是否备份的判断

          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //响应成功则进行数据库的动态数据更新--后续可能不需要这步操作

          content = content === control_array[1].split(":")[0] ? "手动" : "自动";
          console.log("桂军桥的控制模式：" + content); //首先判断是否存在编号对应的内容

          _context2.next = 12;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id\n        FROM t_direct\n        WHERE config_id = 0\n        "));

        case 12:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          row = _ref2[0];

          if (row) {
            _context2.next = 21;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap(connection.execute("\n      INSERT INTO t_direct(config_id,value,d_no)\n      VALUE(0,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 18:
          _context2.t0 = _context2.sent;
          _context2.next = 24;
          break;

        case 21:
          _context2.next = 23;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 0\n      ")));

        case 23:
          _context2.t0 = _context2.sent;

        case 24:
          _ref3 = _context2.t0;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];
          res.send("ok");
          return _context2.abrupt("return");

        case 31:
          //备份内容的封装
          _obj = {};
          _tem = content === control_array[1].split(":")[0] ? control_array[1].split(":")[0] : control_array[0].split(":")[0];
          _tem2 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[1] : control_array[0].split(":")[1];
          _obj[_tem] = _tem2; //指令发送以及是否备份的判断

          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //响应成功则进行数据库的动态数据更新--后续可能不需要这步操作

          content = content === control_array[1].split(":")[0] ? "手动" : "自动";
          _context2.next = 39;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 9\n        AND d_no = \"".concat(d_no, "\"\n      ")));

        case 39:
          _ref5 = _context2.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          _row = _ref6[0];

          if (_row) {
            _context2.next = 48;
            break;
          }

          _context2.next = 45;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(9,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 45:
          _context2.t1 = _context2.sent;
          _context2.next = 51;
          break;

        case 48:
          _context2.next = 50;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 9\n        AND d_no = \"").concat(d_no, "\"\n        ")));

        case 50:
          _context2.t1 = _context2.sent;

        case 51:
          _ref7 = _context2.t1;
          _ref8 = _slicedToArray(_ref7, 1);
          _rows = _ref8[0];
          res.send("ok");
          return _context2.abrupt("return");

        case 56:
          _context2.next = 62;
          break;

        case 58:
          _context2.prev = 58;
          _context2.t2 = _context2["catch"](1);
          console.log(_context2.t2); //将错误打印到终端

          res.send("发生错误");

        case 62:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 58]]);
});
Router_direct_response.get("/zhiling/fengshan1", function _callee3(req, res) {
  var _req$query2, content, topic, d_no, obj1, _ref9, _ref10, row, _ref11, _ref12, rows, _obj2, _ref13, _ref14, _row2, _ref15, _ref16, _rows2;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$query2 = req.query, content = _req$query2.content, topic = _req$query2.topic, d_no = _req$query2.d_no;
          _context3.prev = 1;

          if (!(d_no === "null")) {
            _context3.next = 28;
            break;
          }

          obj1 = {};
          obj1[control_array[8].split(":")[0]] = content === control_array[8].split(":")[1] ? control_array[8].split(":")[1] : control_array[9].split(":")[1];
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //响应成功则进行数据库的动态数据更新--后续可能不需要这步操作

          content = content === control_array[8].split(":")[1] ? "开" : "关"; //首先判断是否存在编号对应的内容

          _context3.next = 9;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 4\n        "));

        case 9:
          _ref9 = _context3.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          row = _ref10[0];

          if (row) {
            _context3.next = 18;
            break;
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(4,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 15:
          _context3.t0 = _context3.sent;
          _context3.next = 21;
          break;

        case 18:
          _context3.next = 20;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 4\n        ")));

        case 20:
          _context3.t0 = _context3.sent;

        case 21:
          _ref11 = _context3.t0;
          _ref12 = _slicedToArray(_ref11, 1);
          rows = _ref12[0];
          res.send("ok");
          return _context3.abrupt("return");

        case 28:
          //为订阅了topic:d_no主题的单独的设备进行对应消息发送
          _obj2 = {};
          _obj2[control_array[8].split(":")[0]] = content === control_array[8].split(":")[1] ? control_array[8].split(":")[1] : control_array[9].split(":")[1];
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj2), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //首先判断是否存在编号对应的内容

          content = content === control_array[8].split(":")[1] ? "开" : "关";
          _context3.next = 34;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 13\n        AND d_no = \"".concat(d_no, "\"\n      ")));

        case 34:
          _ref13 = _context3.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          _row2 = _ref14[0];

          if (_row2) {
            _context3.next = 43;
            break;
          }

          _context3.next = 40;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(13,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 40:
          _context3.t1 = _context3.sent;
          _context3.next = 46;
          break;

        case 43:
          _context3.next = 45;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 13\n        AND d_no = \"").concat(d_no, "\"\n        ")));

        case 45:
          _context3.t1 = _context3.sent;

        case 46:
          _ref15 = _context3.t1;
          _ref16 = _slicedToArray(_ref15, 1);
          _rows2 = _ref16[0];
          res.send("ok");
          return _context3.abrupt("return");

        case 51:
          _context3.next = 57;
          break;

        case 53:
          _context3.prev = 53;
          _context3.t2 = _context3["catch"](1);
          console.log(_context3.t2); //打印错误到终端

          res.send("发生错误");

        case 57:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 53]]);
});
Router_direct_response.get("/zhiling/fengshan2", function _callee4(req, res) {
  var _req$query3, content, d_no, topic, obj1, _ref17, _ref18, row, _ref19, _ref20, rows, _obj3, _ref21, _ref22, _row3, _ref23, _ref24, _rows3;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$query3 = req.query, content = _req$query3.content, d_no = _req$query3.d_no, topic = _req$query3.topic;
          _context4.prev = 1;

          if (!(d_no === "null")) {
            _context4.next = 28;
            break;
          }

          obj1 = {};
          obj1[control_array[10].split(":")[0]] = content === control_array[10].split(":")[1] ? control_array[10].split(":")[1] : control_array[11].split(":")[1];
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可

          content = content === control_array[10].split(":")[1] ? "开" : "关"; //首先判断是否存在编号对应的内容

          _context4.next = 9;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 5\n        "));

        case 9:
          _ref17 = _context4.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          row = _ref18[0];

          if (row) {
            _context4.next = 18;
            break;
          }

          _context4.next = 15;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(5,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 15:
          _context4.t0 = _context4.sent;
          _context4.next = 21;
          break;

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 5\n        ")));

        case 20:
          _context4.t0 = _context4.sent;

        case 21:
          _ref19 = _context4.t0;
          _ref20 = _slicedToArray(_ref19, 1);
          rows = _ref20[0];
          res.send("ok");
          return _context4.abrupt("return");

        case 28:
          _obj3 = {};
          _obj3[control_array[10].split(":")[0]] = content === control_array[10].split(":")[1] ? control_array[10].split(":")[1] : control_array[11].split(":")[1];
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj3), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //首先判断是否存在编号对应的内容

          content = content === control_array[10].split(":")[1] ? "开" : "关";
          _context4.next = 34;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 14\n        AND d_no = \"".concat(d_no, "\"\n        ")));

        case 34:
          _ref21 = _context4.sent;
          _ref22 = _slicedToArray(_ref21, 1);
          _row3 = _ref22[0];

          if (_row3) {
            _context4.next = 43;
            break;
          }

          _context4.next = 40;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(14,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 40:
          _context4.t1 = _context4.sent;
          _context4.next = 46;
          break;

        case 43:
          _context4.next = 45;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 14\n        AND d_no = \"").concat(d_no, "\"\n        ")));

        case 45:
          _context4.t1 = _context4.sent;

        case 46:
          _ref23 = _context4.t1;
          _ref24 = _slicedToArray(_ref23, 1);
          _rows3 = _ref24[0];
          res.send("ok");
          return _context4.abrupt("return");

        case 51:
          _context4.next = 57;
          break;

        case 53:
          _context4.prev = 53;
          _context4.t2 = _context4["catch"](1);
          console.log(_context4.t2);
          res.send("发生错误");

        case 57:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 53]]);
});
Router_direct_response.get("/zhiling/ketiaodeng", function _callee5(req, res) {
  var _req$query4, content, topic, d_no, obj1, _ref25, _ref26, row, _ref27, _ref28, rows, _obj4, _ref29, _ref30, _row4, _ref31, _ref32, _rows4;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query4 = req.query, content = _req$query4.content, topic = _req$query4.topic, d_no = _req$query4.d_no;
          _context5.prev = 1;

          if (!(d_no === "null")) {
            _context5.next = 28;
            break;
          }

          obj1 = {};
          obj1[control_array[2].split(":")[0]] = content === control_array[2].split(":")[1] ? control_array[2].split(":")[1] : control_array[3].split(":")[1];
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //传递payload的格式：来源(即指令对象)、内容
          //首先判断是否存在编号对应的内容

          content = content === control_array[2].split(":")[1] ? "开" : "关";
          _context5.next = 9;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 1\n        "));

        case 9:
          _ref25 = _context5.sent;
          _ref26 = _slicedToArray(_ref25, 1);
          row = _ref26[0];

          if (row) {
            _context5.next = 18;
            break;
          }

          _context5.next = 15;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(1,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 15:
          _context5.t0 = _context5.sent;
          _context5.next = 21;
          break;

        case 18:
          _context5.next = 20;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 1\n        ")));

        case 20:
          _context5.t0 = _context5.sent;

        case 21:
          _ref27 = _context5.t0;
          _ref28 = _slicedToArray(_ref27, 1);
          rows = _ref28[0];
          res.send("ok");
          return _context5.abrupt("return");

        case 28:
          _obj4 = {};
          _obj4[control_array[2].split(":")[0]] = content === control_array[2].split(":")[1] ? control_array[2].split(":")[1] : control_array[3].split(":")[1];
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj4), {
            qos: 1
          }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
          //传递payload的格式：来源(即指令对象)、内容
          //首先判断是否存在编号对应的内容

          content = content === control_array[2].split(":")[1] ? "开" : "关";
          _context5.next = 34;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 10\n        AND d_no = \"".concat(d_no, "\"\n        ")));

        case 34:
          _ref29 = _context5.sent;
          _ref30 = _slicedToArray(_ref29, 1);
          _row4 = _ref30[0];

          if (_row4) {
            _context5.next = 43;
            break;
          }

          _context5.next = 40;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id,value,d_no)\n        VALUE(10,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 40:
          _context5.t1 = _context5.sent;
          _context5.next = 46;
          break;

        case 43:
          _context5.next = 45;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 10\n        AND d_no = \"").concat(d_no, "\"\n        ")));

        case 45:
          _context5.t1 = _context5.sent;

        case 46:
          _ref31 = _context5.t1;
          _ref32 = _slicedToArray(_ref31, 1);
          _rows4 = _ref32[0];
          res.send("ok");
          return _context5.abrupt("return");

        case 51:
          _context5.next = 57;
          break;

        case 53:
          _context5.prev = 53;
          _context5.t2 = _context5["catch"](1);
          console.log(_context5.t2);
          res.send("发生错误");

        case 57:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 53]]);
});
Router_direct_response.get("/zhiling/bujindianji", function _callee6(req, res) {
  var _req$query5, content, topic, d_no, dianji_model, obj1, tem1, tem11, obj2, tem2, tem22, _ref33, _ref34, row, _ref35, _ref36, rows, _obj5, _tem3, _tem4, _obj6, _tem5, _tem6, _ref37, _ref38, _row5, _ref39, _ref40, _rows5;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$query5 = req.query, content = _req$query5.content, topic = _req$query5.topic, d_no = _req$query5.d_no, dianji_model = _req$query5.dianji_model;
          _context6.prev = 1;

          if (!(d_no === "null")) {
            _context6.next = 31;
            break;
          }

          //传递payload的格式：来源(即指令对象)、内容
          //开启和关闭的统一操作
          obj1 = {};
          tem1 = content === control_array[5].split(":")[1] ? control_array[5].split(":")[0] : control_array[4].split(":")[0];
          tem11 = content === control_array[5].split(":")[1] ? control_array[5].split(":")[1] : control_array[4].split(":")[1];
          obj1[tem1] = tem11;
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]);

          if (content === control_array[5].split(":")[1]) {
            //kaiqi
            //正转反转的判断赋值操作
            obj2 = {};
            tem2 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[0] : control_array[7].split(":")[0];
            tem22 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[1] : control_array[7].split(":")[1];
            obj2[tem2] = tem22;
            (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj2), {
              qos: 1
            }]);
          } //首先判断是否存在编号对应的内容


          content = content === control_array[5].split(":")[1] ? "开" : "关";
          _context6.next = 12;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 2\n      "));

        case 12:
          _ref33 = _context6.sent;
          _ref34 = _slicedToArray(_ref33, 1);
          row = _ref34[0];

          if (row) {
            _context6.next = 21;
            break;
          }

          _context6.next = 18;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id, value, d_no)\n        VALUE(2,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 18:
          _context6.t0 = _context6.sent;
          _context6.next = 24;
          break;

        case 21:
          _context6.next = 23;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 2\n        ")));

        case 23:
          _context6.t0 = _context6.sent;

        case 24:
          _ref35 = _context6.t0;
          _ref36 = _slicedToArray(_ref35, 1);
          rows = _ref36[0];
          res.send("ok");
          return _context6.abrupt("return");

        case 31:
          //传递payload的格式：来源(即指令对象)、内容
          //开启和关闭的统一操作
          _obj5 = {};
          _tem3 = content === control_array[5].split(":")[1] ? control_array[5].split(":")[0] : control_array[4].split(":")[0];
          _tem4 = content === control_array[5].split(":")[1] ? control_array[5].split(":")[1] : control_array[4].split(":")[1];
          _obj5[_tem3] = _tem4;
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj5), {
            qos: 1
          }]);

          if (content === control_array[5].split(":")[1]) {
            //kaiqi
            //正转反转的判断赋值操作
            _obj6 = {};
            _tem5 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[0] : control_array[7].split(":")[0];
            _tem6 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[1] : control_array[7].split(":")[1];
            _obj6[_tem5] = _tem6;
            (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj6), {
              qos: 1
            }]);
          } //首先判断是否存在编号对应的内容


          content = content === control_array[5].split(":")[1] ? "开" : "关";
          _context6.next = 40;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 11\n      "));

        case 40:
          _ref37 = _context6.sent;
          _ref38 = _slicedToArray(_ref37, 1);
          _row5 = _ref38[0];

          if (_row5) {
            _context6.next = 49;
            break;
          }

          _context6.next = 46;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id, value, d_no)\n        VALUE(11,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 46:
          _context6.t1 = _context6.sent;
          _context6.next = 52;
          break;

        case 49:
          _context6.next = 51;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 11\n        ")));

        case 51:
          _context6.t1 = _context6.sent;

        case 52:
          _ref39 = _context6.t1;
          _ref40 = _slicedToArray(_ref39, 1);
          _rows5 = _ref40[0];
          res.send("ok");
          return _context6.abrupt("return");

        case 57:
          _context6.next = 63;
          break;

        case 59:
          _context6.prev = 59;
          _context6.t2 = _context6["catch"](1);
          console.log(_context6.t2);
          res.send("发生错误");

        case 63:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 59]]);
});
Router_direct_response.get("/zhiling/dianji_model", function _callee7(req, res) {
  var _req$query6, content, topic, d_no, obj1, tem1, tem11, _ref41, _ref42, row, _ref43, _ref44, rows, _obj7, _tem7, _tem8, _ref45, _ref46, _row6, _ref47, _ref48, _rows6;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$query6 = req.query, content = _req$query6.content, topic = _req$query6.topic, d_no = _req$query6.d_no;
          _context7.prev = 1;

          if (!(d_no === "null")) {
            _context7.next = 30;
            break;
          }

          obj1 = {};
          tem1 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[0] : control_array[7].split(":")[0];
          tem11 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[1] : control_array[7].split(":")[1];
          obj1[tem1] = tem11;
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]); //首先判断是否存在编号对应的内容

          content = content === control_array[6].split(":")[0] ? "正转" : "反转";
          _context7.next = 11;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 3\n      "));

        case 11:
          _ref41 = _context7.sent;
          _ref42 = _slicedToArray(_ref41, 1);
          row = _ref42[0];

          if (row) {
            _context7.next = 20;
            break;
          }

          _context7.next = 17;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id, value, d_no)\n        VALUE(3,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 17:
          _context7.t0 = _context7.sent;
          _context7.next = 23;
          break;

        case 20:
          _context7.next = 22;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 3\n        ")));

        case 22:
          _context7.t0 = _context7.sent;

        case 23:
          _ref43 = _context7.t0;
          _ref44 = _slicedToArray(_ref43, 1);
          rows = _ref44[0];
          res.send("ok");
          return _context7.abrupt("return");

        case 30:
          _obj7 = {};
          _tem7 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[0] : control_array[7].split(":")[0];
          _tem8 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[1] : control_array[7].split(":")[1];
          _obj7[_tem7] = _tem8;
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(_obj7), {
            qos: 1
          }]); //首先判断是否存在编号对应的内容

          content = content === control_array[6].split(":")[0] ? "正转" : "反转"; //首先判断是否存在编号对应的内容

          _context7.next = 38;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 12\n        AND d_no = \"".concat(d_no, "\"\n      ")));

        case 38:
          _ref45 = _context7.sent;
          _ref46 = _slicedToArray(_ref45, 1);
          _row6 = _ref46[0];

          if (_row6) {
            _context7.next = 47;
            break;
          }

          _context7.next = 44;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id, value, d_no)\n        VALUE(12,\"".concat(content, "\",\"").concat(d_no, "\")\n        ")));

        case 44:
          _context7.t1 = _context7.sent;
          _context7.next = 50;
          break;

        case 47:
          _context7.next = 49;
          return regeneratorRuntime.awrap(connection.execute("\n        UPDATE t_direct\n        SET value = \"".concat(content, "\"\n        WHERE config_id = 12\n        AND d_no = \"").concat(d_no, "\"\n        ")));

        case 49:
          _context7.t1 = _context7.sent;

        case 50:
          _ref47 = _context7.t1;
          _ref48 = _slicedToArray(_ref47, 1);
          _rows6 = _ref48[0];
          res.send("ok");
          return _context7.abrupt("return");

        case 55:
          _context7.next = 61;
          break;

        case 57:
          _context7.prev = 57;
          _context7.t2 = _context7["catch"](1);
          console.log(_context7.t2);
          res.send("发生错误");

        case 61:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 57]]);
}); // temperature1

Router_direct_response.get("/zhiling/temperature1", function _callee8(req, res) {
  var _req$query7, content, topic, d_no, obj1, _ref49, _ref50, row, _ref51, _ref52, rows, _ref53, _ref54, _row7, _ref55, _ref56, _rows7;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$query7 = req.query, content = _req$query7.content, topic = _req$query7.topic, d_no = _req$query7.d_no;
          _context8.prev = 1;
          obj1 = {};
          obj1[control_array[13].split(":")[0]] = content;

          if (!(d_no === "null")) {
            _context8.next = 27;
            break;
          }

          //传递payload的格式：来源(即指令对象)、内容
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]);
          _context8.next = 8;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id\n        FROM t_direct\n        WHERE config_id = 7\n      "));

        case 8:
          _ref49 = _context8.sent;
          _ref50 = _slicedToArray(_ref49, 1);
          row = _ref50[0];

          if (row) {
            _context8.next = 17;
            break;
          }

          _context8.next = 14;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct(config_id, value, d_no)\n        VALUE(7,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 14:
          _context8.t0 = _context8.sent;
          _context8.next = 20;
          break;

        case 17:
          _context8.next = 19;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 7\n      ")));

        case 19:
          _context8.t0 = _context8.sent;

        case 20:
          _ref51 = _context8.t0;
          _ref52 = _slicedToArray(_ref51, 1);
          rows = _ref52[0];
          res.send("ok");
          return _context8.abrupt("return");

        case 27:
          //传递payload的格式：来源(即指令对象)、内容
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(obj1), {
            qos: 1
          }]);
          _context8.next = 30;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 16\n      "));

        case 30:
          _ref53 = _context8.sent;
          _ref54 = _slicedToArray(_ref53, 1);
          _row7 = _ref54[0];

          if (_row7) {
            _context8.next = 39;
            break;
          }

          _context8.next = 36;
          return regeneratorRuntime.awrap(connection.execute("\n      INSERT INTO t_direct(config_id, value, d_no)\n      VALUE(16,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 36:
          _context8.t1 = _context8.sent;
          _context8.next = 42;
          break;

        case 39:
          _context8.next = 41;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 16\n      ")));

        case 41:
          _context8.t1 = _context8.sent;

        case 42:
          _ref55 = _context8.t1;
          _ref56 = _slicedToArray(_ref55, 1);
          _rows7 = _ref56[0];
          res.send("ok");
          return _context8.abrupt("return");

        case 47:
          _context8.next = 53;
          break;

        case 49:
          _context8.prev = 49;
          _context8.t2 = _context8["catch"](1);
          console.log(_context8.t2);
          res.send("发生错误");

        case 53:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 49]]);
}); // temperature2

Router_direct_response.get("/zhiling/temperature2", function _callee9(req, res) {
  var _req$query8, content, topic, d_no, obj1, _ref57, _ref58, row, _ref59, _ref60, rows, _ref61, _ref62, _row8, _ref63, _ref64, _rows8;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _req$query8 = req.query, content = _req$query8.content, topic = _req$query8.topic, d_no = _req$query8.d_no;
          _context9.prev = 1;
          obj1 = {};
          obj1[control_array[12].split(":")[0]] = content;

          if (!(d_no === "null")) {
            _context9.next = 27;
            break;
          }

          //传递payload的格式：来源(即指令对象)、内容
          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]);
          _context9.next = 8;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id\n        FROM t_direct\n        WHERE config_id = 6\n      "));

        case 8:
          _ref57 = _context9.sent;
          _ref58 = _slicedToArray(_ref57, 1);
          row = _ref58[0];

          if (row) {
            _context9.next = 17;
            break;
          }

          _context9.next = 14;
          return regeneratorRuntime.awrap(connection.execute("\n      INSERT INTO t_direct(config_id, value, d_no)\n      VALUE(6,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 14:
          _context9.t0 = _context9.sent;
          _context9.next = 20;
          break;

        case 17:
          _context9.next = 19;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 6\n      ")));

        case 19:
          _context9.t0 = _context9.sent;

        case 20:
          _ref59 = _context9.t0;
          _ref60 = _slicedToArray(_ref59, 1);
          rows = _ref60[0];
          res.send("ok");
          return _context9.abrupt("return");

        case 27:
          //传递payload的格式：来源(即指令对象)、内容
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(obj1), {
            qos: 1
          }]);
          _context9.next = 30;
          return regeneratorRuntime.awrap(connection.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 15\n        AND d_no = \"".concat(d_no, "\"\n      ")));

        case 30:
          _ref61 = _context9.sent;
          _ref62 = _slicedToArray(_ref61, 1);
          _row8 = _ref62[0];

          if (_row8) {
            _context9.next = 39;
            break;
          }

          _context9.next = 36;
          return regeneratorRuntime.awrap(connection.execute("\n      INSERT INTO t_direct(config_id, value, d_no)\n      VALUE(15,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 36:
          _context9.t1 = _context9.sent;
          _context9.next = 42;
          break;

        case 39:
          _context9.next = 41;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 15\n      AND d_no = \"").concat(d_no, "\"\n      ")));

        case 41:
          _context9.t1 = _context9.sent;

        case 42:
          _ref63 = _context9.t1;
          _ref64 = _slicedToArray(_ref63, 1);
          _rows8 = _ref64[0];
          res.send("ok");
          return _context9.abrupt("return");

        case 47:
          _context9.next = 53;
          break;

        case 49:
          _context9.prev = 49;
          _context9.t2 = _context9["catch"](1);
          console.log(_context9.t2);
          res.send("发生错误");

        case 53:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 49]]);
}); // light_warning

Router_direct_response.get("/zhiling/light_min", function _callee10(req, res) {
  var _req$query9, content, topic, d_no, obj1, _ref65, _ref66, row, _ref67, _ref68, rows, _ref69, _ref70, _row9, _ref71, _ref72, _rows9;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$query9 = req.query, content = _req$query9.content, topic = _req$query9.topic, d_no = _req$query9.d_no;
          _context10.prev = 1;
          obj1 = {};
          obj1[control_array[14].split(":")[0]] = content;

          if (!(d_no === "null")) {
            _context10.next = 27;
            break;
          }

          (0, _mqtt_server_get.beifen)(0, [topic, JSON.stringify(obj1), {
            qos: 1
          }]);
          _context10.next = 8;
          return regeneratorRuntime.awrap(connection.execute("\n      SELECT config_id\n      FROM t_direct\n      WHERE config_id = 8\n      "));

        case 8:
          _ref65 = _context10.sent;
          _ref66 = _slicedToArray(_ref65, 1);
          row = _ref66[0];

          if (row) {
            _context10.next = 17;
            break;
          }

          _context10.next = 14;
          return regeneratorRuntime.awrap(connection.execute("\n      INSERT INTO t_direct(config_id, value, d_no)\n      VALUE(8,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 14:
          _context10.t0 = _context10.sent;
          _context10.next = 20;
          break;

        case 17:
          _context10.next = 19;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 8\n      ")));

        case 19:
          _context10.t0 = _context10.sent;

        case 20:
          _ref67 = _context10.t0;
          _ref68 = _slicedToArray(_ref67, 1);
          rows = _ref68[0];
          res.send("ok");
          return _context10.abrupt("return");

        case 27:
          //传递payload的格式：来源(即指令对象)、内容
          (0, _mqtt_server_get.beifen)(0, ["".concat(topic, ":").concat(d_no), JSON.stringify(obj1), {
            qos: 1
          }]);
          _context10.next = 30;
          return regeneratorRuntime.awrap(connection.execute("\n      SELECT config_id \n      FROM t_direct\n      WHERE config_id = 17\n      AND d_no = \"".concat(d_no, "\"\n      ")));

        case 30:
          _ref69 = _context10.sent;
          _ref70 = _slicedToArray(_ref69, 1);
          _row9 = _ref70[0];

          if (_row9) {
            _context10.next = 39;
            break;
          }

          _context10.next = 36;
          return regeneratorRuntime.awrap(connection.execute("\n      INSERT INTO t_direct(config_id, value, d_no)\n      VALUE(17,\"".concat(content, "\",\"").concat(d_no, "\")\n      ")));

        case 36:
          _context10.t1 = _context10.sent;
          _context10.next = 42;
          break;

        case 39:
          _context10.next = 41;
          return regeneratorRuntime.awrap(connection.execute("\n      UPDATE t_direct\n      SET value = \"".concat(content, "\"\n      WHERE config_id = 17\n      AND d_no = \"").concat(d_no, "\"\n      ")));

        case 41:
          _context10.t1 = _context10.sent;

        case 42:
          _ref71 = _context10.t1;
          _ref72 = _slicedToArray(_ref71, 1);
          _rows9 = _ref72[0];
          res.send("ok");
          return _context10.abrupt("return");

        case 47:
          _context10.next = 53;
          break;

        case 49:
          _context10.prev = 49;
          _context10.t2 = _context10["catch"](1);
          console.log(_context10.t2);
          res.send("发生错误");

        case 53:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 49]]);
}); //添加和对应的数据库操作的修改以及指令发送过程中为d_no不为null的情况的topic的修改,考虑为输入框进行提交而不是单纯的sign值的修改导致当前的请求的发送

var _default = Router_direct_response;
exports["default"] = _default;