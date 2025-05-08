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

var Router_direct_response = (0, _express["default"])(); //导入mqtt模块--用于指令的正确发送响应 

(function _callee2() {
  var result, rowx;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _indexNode["default"])());

        case 3:
          connection = _context2.sent;
          console.log("数据库连接成功");
          _context2.next = 7;
          return regeneratorRuntime.awrap(connection.execute("\n      SELECT c.id,c.f_type,c.mode,c.f_value,c.t_name,c.max,c.min,c.topic,c.header,c.luyou,t.value\n      FROM t_direct t,t_direct_config c\n      WHERE c.id = t.config_id\n    "));

        case 7:
          result = _context2.sent;
          rowx = result[0]; //遍历完成全局路由绑定 

          rowx.forEach(function (item, index) {
            Router_direct_response.get("/zhiling/" + item.luyou, function _callee(req, res) {
              var _req$query, content, d_no, obj1, tem1, tem11, topic, _ref, _ref2, rowsx, template, _ref3, _ref4, row, _ref5, _ref6, rows, x;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _req$query = req.query, content = _req$query.content, d_no = _req$query.d_no; //备份内容的封装

                      obj1 = {};

                      if (!(item.f_type !== '2')) {
                        _context.next = 8;
                        break;
                      }

                      tem1 = content === item.f_value.split("|")[0].split(":")[0] ? item.f_value.split("|")[0].split(":")[1] : item.f_value.split("|")[1].split(":")[1];
                      tem11 = content === item.f_value.split("|")[0].split(":")[0] ? item.header.split("|")[0] : item.header.split("|")[1];

                      if (item.id === "0" || item.id === 0) {
                        topic = content === item.f_value.split("|")[0].split(":")[0] ? item.topic.split("|")[0] : item.topic.split("|")[1];
                      } else {
                        topic = item.topic;
                      }

                      _context.next = 20;
                      break;

                    case 8:
                      //输入框情况
                      tem1 = item.f_value.split("|")[0];

                      if (!content) {
                        _context.next = 13;
                        break;
                      }

                      //当不为单独值查询路由的情况
                      tem11 = content;
                      _context.next = 19;
                      break;

                    case 13:
                      _context.next = 15;
                      return regeneratorRuntime.awrap(connection.execute("\n              SELECT t_direct.value\n              FROM t_direct,t_direct_config \n              WHERE t_direct_config.id = t_direct.config_id\n              AND t_direct_config.id = ".concat(item.id, "\n              AND d_no = \"").concat(d_no === "null" || !d_no ? "null" : "".concat(d_no), "\"\n              ")));

                    case 15:
                      _ref = _context.sent;
                      _ref2 = _slicedToArray(_ref, 1);
                      rowsx = _ref2[0];
                      tem11 = rowsx[0].value;

                    case 19:
                      topic = item.topic;

                    case 20:
                      obj1[tem1] = tem11;

                      if (item.f_type !== "2") {
                        //中文更新
                        content = content === item.f_value.split("|")[0].split(":")[0] ? item.f_value.split("|")[0].split(":")[0] : item.f_value.split("|")[1].split(":")[0];
                      } else {
                        content = tem11;
                      } //指令发送以及是否备份的判断


                      if (!d_no) {
                        _context.next = 44;
                        break;
                      }

                      console.log("即将更新");
                      template = d_no === "null" ? topic : "".concat(topic, ":").concat(d_no);
                      console.log("tem:" + template);
                      (0, _mqtt_server_get.beifen)(0, [template, JSON.stringify(obj1), {
                        qos: 1
                      }]); //在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
                      //首先判断是否存在编号对应的内容

                      _context.next = 29;
                      return regeneratorRuntime.awrap(connection.execute("\n          SELECT config_id\n          FROM t_direct,t_direct_config\n          WHERE t_direct_config.id = t_direct.config_id\n          AND t_direct_config.id = ".concat(item.id, "\n          AND d_no = \"").concat(d_no, "\"\n          ")));

                    case 29:
                      _ref3 = _context.sent;
                      _ref4 = _slicedToArray(_ref3, 1);
                      row = _ref4[0];

                      if (row) {
                        _context.next = 38;
                        break;
                      }

                      _context.next = 35;
                      return regeneratorRuntime.awrap(connection.execute("\n          INSERT INTO t_direct(config_id,value,d_no)\n          VALUE(".concat(item.id, ",\"").concat(content, "\",\"").concat(d_no, "\")\n          ")));

                    case 35:
                      _context.t0 = _context.sent;
                      _context.next = 41;
                      break;

                    case 38:
                      _context.next = 40;
                      return regeneratorRuntime.awrap(connection.execute("\n          UPDATE t_direct\n          SET value = \"".concat(content, "\"\n          WHERE config_id = ").concat(item.id, "\n          ")));

                    case 40:
                      _context.t0 = _context.sent;

                    case 41:
                      _ref5 = _context.t0;
                      _ref6 = _slicedToArray(_ref5, 1);
                      rows = _ref6[0];

                    case 44:
                      x = !d_no ? item : "ok";
                      res.send(x);
                      return _context.abrupt("return");

                    case 47:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          });
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log("数据库连接失败");

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
})(); //添加和对应的数据库操作的修改以及指令发送过程中为d_no不为null的情况的topic的修改,考虑为输入框进行提交而不是单纯的sign值的修改导致当前的请求的发送


var _default = Router_direct_response;
exports["default"] = _default;