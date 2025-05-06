"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _indexNode = _interopRequireDefault(require("../indexNode1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//此处获取到数据库链接配置对象
var connection1; //定义数据库连接对象

var Router2 = (0, _express["default"])();

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _indexNode["default"])());

        case 3:
          connection1 = _context.sent;
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
})(); // 不需要分页的路由


Router2.get("/t_device/first", function _callee2(req, res) {
  var d_no, query, _ref, _ref2, results, formattedResults;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          d_no = req.query.d_no;

          // 处理 undefined 情况
          if (d_no === "undefined") {
            query = "SELECT device_name, number, ctime, remarks FROM t_device";
          } else {
            query = "SELECT device_name, number, ctime, remarks FROM t_device WHERE number='".concat(d_no, "'");
          } // ✅ 使用 `await` 进行查询


          _context2.next = 5;
          return regeneratorRuntime.awrap(connection1.execute(query));

        case 5:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          results = _ref2[0];
          // 格式化数据
          formattedResults = results.map(function (row) {
            return [row.number, row.remarks, row.device_name, row.ctime];
          });
          console.log("rows:" + results);
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(formattedResults));
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error("查询失败:", _context2.t0);
          res.status(500).json({
            error: "数据库查询失败"
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
var _default = Router2; //记得将查询条件中的一定为实时数据进行修改了,所有的数据都可以
//记得在所有的没有使用try包裹的语句添加上try\catch语句用于对start为undefined的情况进行捕获

exports["default"] = _default;