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
})(); // 控件固定内容控制路由


Router_direct.get("/direct/control", function _callee2(req, res) {
  var mode, _ref, _ref2, rows;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mode = req.query.mode;
          _context2.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u63A7\u5236\u6A21\u5F0F\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
Router_direct.get("/direct/dianji_model", function _callee3(req, res) {
  var mode, _ref3, _ref4, rows;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mode = req.query.mode;
          _context3.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u7535\u673A\u6A21\u5F0F\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
Router_direct.get("/direct/bujindianji", function _callee4(req, res) {
  var mode, _ref5, _ref6, rows;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          mode = req.query.mode;
          _context4.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u6B65\u8FDB\u7535\u673A\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref5 = _context4.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          rows = _ref6[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
Router_direct.get("/direct/dianji_model", function _callee5(req, res) {
  var mode, _ref7, _ref8, rows;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          mode = req.query.mode;
          _context5.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u7535\u673A\u6A21\u5F0F\"\n  AND mode = ".concat(mode, "\n    ")));

        case 3:
          _ref7 = _context5.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          rows = _ref8[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
Router_direct.get("/direct/ketiaodeng", function _callee6(req, res) {
  var mode, _ref9, _ref10, rows;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          mode = req.query.mode;
          _context6.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u53EF\u8C03\u706F\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref9 = _context6.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          rows = _ref10[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
});
Router_direct.get("/direct/fengshan1", function _callee7(req, res) {
  var mode, _ref11, _ref12, rows;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          mode = req.query.mode;
          _context7.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u98CE\u62471\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref11 = _context7.sent;
          _ref12 = _slicedToArray(_ref11, 1);
          rows = _ref12[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  });
});
Router_direct.get("/direct/fengshan2", function _callee8(req, res) {
  var mode, _ref13, _ref14, rows;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          mode = req.query.mode;
          _context8.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,f_value,topic,header\n  FROM t_direct_config\n  WHERE t_name = \"\u98CE\u62472\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref13 = _context8.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          rows = _ref14[0];
          //格式化数据
          console.log("rows:" + rows);
          rows[0].f_value = rows[0].f_value.split("|");
          res.send(rows[0]);

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  });
});
Router_direct.get("/direct/temperature1", function _callee9(req, res) {
  var mode, _ref15, _ref16, rows;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          mode = req.query.mode;
          _context9.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,min,max,topic\n  FROM t_direct_config\n  WHERE t_name = \"\u6E29\u5EA6\u9608\u503C1\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref15 = _context9.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          rows = _ref16[0];
          //格式化数据
          console.log("rows:" + rows);
          res.send(rows[0]);

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
});
Router_direct.get("/direct/temperature2", function _callee10(req, res) {
  var mode, _ref17, _ref18, rows;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          mode = req.query.mode;
          _context10.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n    SELECT ref_id,ref_value,t_name,f_type,min,max,topic\n    FROM t_direct_config\n    WHERE t_name = \"\u6E29\u5EA6\u9608\u503C2\" \n    AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref17 = _context10.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          rows = _ref18[0];
          //格式化数据
          console.log("rows:" + rows);
          res.send(rows[0]);

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
});
Router_direct.get("/direct/light_min", function _callee11(req, res) {
  var mode, _ref19, _ref20, rows;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          mode = req.query.mode;
          _context11.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT ref_id,ref_value,t_name,f_type,min,max,topic\n  FROM t_direct_config\n  WHERE t_name = \"\u5149\u7167\u9608\u503C\"\n  AND mode = ".concat(mode, "\n  ")));

        case 3:
          _ref19 = _context11.sent;
          _ref20 = _slicedToArray(_ref19, 1);
          rows = _ref20[0];
          //格式化数据
          console.log("rows:" + rows);
          res.send(rows[0]);

        case 8:
        case "end":
          return _context11.stop();
      }
    }
  });
}); // 控件实际值的控制路由

Router_direct.get("/direct", function _callee12(req, res) {
  var d_no, _ref21, _ref22, rows, resultObject;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          d_no = req.query.d_no;
          _context12.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n  SELECT config_id,value\n  FROM t_direct\n  WHERE d_no = \"".concat(d_no, "\"\n  ")));

        case 3:
          _ref21 = _context12.sent;
          _ref22 = _slicedToArray(_ref21, 1);
          rows = _ref22[0];
          resultObject = rows.reduce(function (acc, curr) {
            acc[curr.config_id] = curr.value;
            return acc;
          }, {}); //格式化数据

          res.send(resultObject);

        case 8:
        case "end":
          return _context12.stop();
      }
    }
  });
}); // 设备控件初始化赋值控制路由(针对是否存在signzhi进行数据库的填充和对应的默认数据的返回)

Router_direct.get("/handshake", function _callee13(req, res) {
  var d_no, _ref23, _ref24, rows, _ref25, _ref26, rows1, _ref27, _ref28, rows2, result, _result;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          d_no = req.query.d_no;
          _context13.next = 3;
          return regeneratorRuntime.awrap(connection.execute("\n    SELECT config_id,value,d_no\n    FROM t_direct\n    WHERE d_no = \"".concat(d_no, "\"\n    ")));

        case 3:
          _ref23 = _context13.sent;
          _ref24 = _slicedToArray(_ref23, 1);
          rows = _ref24[0];

          if (!(rows.length < 1)) {
            _context13.next = 23;
            break;
          }

          _context13.next = 9;
          return regeneratorRuntime.awrap(connection.execute("\n        INSERT INTO t_direct (config_id,value,d_no)\n        VALUES (19,\"\u624B\u52A8\",\"".concat(d_no, "\"),\n               (10,\"\u5173\",\"").concat(d_no, "\"),\n               (11,\"\u5173\",\"").concat(d_no, "\"),\n               (12,\"\u53CD\u8F6C\",\"").concat(d_no, "\"),\n               (13,\"\u5173\",\"").concat(d_no, "\"),\n               (14,\"\u5173\",\"").concat(d_no, "\"),\n               (15,\"20\",\"").concat(d_no, "\"),\n               (16,\"10\",\"").concat(d_no, "\"),\n               (17,\"18\",\"").concat(d_no, "\"),\n               (18,\"7\",\"").concat(d_no, "\");\n      ")));

        case 9:
          _ref25 = _context13.sent;
          _ref26 = _slicedToArray(_ref25, 1);
          rows1 = _ref26[0];
          //上述控件对应顺序为:设备的：控制模式、可调灯、步进电机、电机模式、风扇1、风扇2、温度阈值2、温度阈值1、光照阈值
          console.log("rows1：" + rows1);
          _context13.next = 15;
          return regeneratorRuntime.awrap(connection.execute("\n      SELECT config_id,value,d_no\n      FROM t_direct\n      WHERE d_no = \"".concat(d_no, "\"\n      ")));

        case 15:
          _ref27 = _context13.sent;
          _ref28 = _slicedToArray(_ref27, 1);
          rows2 = _ref28[0];
          console.log("rows2：" + rows2); // 将结果进行重组为实际的really对应的格式：

          result = rows2.reduce(function (acc, item) {
            acc[item.config_id] = item.value;
            return acc;
          }, {});
          res.send(result);
          _context13.next = 26;
          break;

        case 23:
          console.log("rows：" + rows); // 将结果进行重组为实际的really对应的格式：

          _result = rows.reduce(function (acc, item) {
            acc[item.config_id] = item.value;
            return acc;
          }, {});
          res.send(_result);

        case 26:
        case "end":
          return _context13.stop();
      }
    }
  });
});
var _default = Router_direct;
exports["default"] = _default;