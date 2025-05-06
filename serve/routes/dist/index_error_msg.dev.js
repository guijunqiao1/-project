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

var Router3 = (0, _express["default"])();

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
          console.log("数据库3连接成功");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("数据库3连接失败");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})(); // 需要分页的路由


Router3.get("/t_error_msg/first", function _callee2(req, res) {
  var _req$query, currentPage, pageSize, _req$query2, start, end, query, _ref, _ref2, results, formattedResults, formatTime, formattedEnd, _query, _ref3, _ref4, _results, _formattedResults, _formatTime, formattedStart, _formattedEnd, _query2, _ref5, _ref6, _results2, _formattedResults2, page, size, offset, _ref7, _ref8, rows, formattedRows, _formatTime2, _formattedEnd2, _ref9, _ref10, _rows, _formattedRows, _formatTime3, _formattedStart, _formattedEnd3, _ref11, _ref12, _rows2, _formattedRows2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, currentPage = _req$query.currentPage, pageSize = _req$query.pageSize;
          _req$query2 = req.query, start = _req$query2.start, end = _req$query2.end; // 处理 undefined 情况

          if (!(currentPage === "undefined")) {
            _context2.next = 46;
            break;
          }

          if (!(start === "1" && end === "1")) {
            _context2.next = 16;
            break;
          }

          //全局查询
          query = "SELECT e_msg, d_no, c_time, type FROM t_error_msg"; // ✅ 使用 `await` 进行查询

          _context2.next = 8;
          return regeneratorRuntime.awrap(connection1.execute(query));

        case 8:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          results = _ref2[0];
          // 格式化数据
          formattedResults = results.map(function (row) {
            return [row.d_no, row.type, row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(formattedResults));
          _context2.next = 44;
          break;

        case 16:
          if (!(start === "end" && end !== "1")) {
            _context2.next = 30;
            break;
          }

          //单向查询
          formatTime = function formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedEnd = formatTime(end);
          _query = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE c_time < '".concat(formattedEnd, "'"); // ✅ 使用 `await` 进行查询

          _context2.next = 22;
          return regeneratorRuntime.awrap(connection1.execute(_query));

        case 22:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          _results = _ref4[0];
          // 格式化数据
          _formattedResults = _results.map(function (row) {
            return [row.d_no, row.type, row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(_formattedResults));
          _context2.next = 44;
          break;

        case 30:
          //区间查询
          // 将时间值进行转化
          _formatTime = function _formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedStart = _formatTime(start);
          _formattedEnd = _formatTime(end);
          console.log("桂start:" + start);
          console.log("桂end:" + end);
          _query2 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE c_time BETWEEN '".concat(formattedStart, "' AND '").concat(_formattedEnd, "'"); // ✅ 使用 `await` 进行查询

          _context2.next = 38;
          return regeneratorRuntime.awrap(connection1.execute(_query2));

        case 38:
          _ref5 = _context2.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          _results2 = _ref6[0];
          // 格式化数据
          _formattedResults2 = _results2.map(function (row) {
            return [row.d_no, row.type, row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(_formattedResults2));

        case 44:
          _context2.next = 85;
          break;

        case 46:
          // ✅ 解析分页参数（确保转换为整数）
          page = parseInt(currentPage, 10) || 1;
          size = parseInt(pageSize, 10) || 12;
          offset = (page - 1) * size;
          console.log("page：" + page);
          console.log("page：" + size);
          console.log("page：" + offset);

          if (!(start === "1" && end === "1")) {
            _context2.next = 62;
            break;
          }

          _context2.next = 55;
          return regeneratorRuntime.awrap(connection1.execute("\n            SELECT e_msg, type, c_time, d_no\n            FROM t_error_msg \n            LIMIT ".concat(size, " OFFSET ").concat(offset, "\n          ")));

        case 55:
          _ref7 = _context2.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          rows = _ref8[0];
          //大多数时候请使用字符串拼接的方式书写分页代码以及其他相关的代码
          // 将数据转换为二维数组格式
          formattedRows = rows.map(function (row) {
            return [row.d_no, row.type, // 确保所有字段为字符串类型
            row.e_msg, row.c_time];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(formattedRows));
          _context2.next = 85;
          break;

        case 62:
          if (!(start === "end" && end !== "1")) {
            _context2.next = 74;
            break;
          }

          //单向查询
          _formatTime2 = function _formatTime2(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedEnd2 = _formatTime2(end);
          _context2.next = 67;
          return regeneratorRuntime.awrap(connection1.execute("\n            SELECT e_msg, type, c_time, d_no\n            FROM t_error_msg \n            WHERE c_time < '".concat(_formattedEnd2, "'\n            LIMIT ").concat(size, " OFFSET ").concat(offset, "\n          ")));

        case 67:
          _ref9 = _context2.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          _rows = _ref10[0];
          //大多数时候请使用字符串拼接的方式书写分页代码以及其他相关的代码
          // 将数据转换为二维数组格式
          _formattedRows = _rows.map(function (row) {
            return [row.d_no, row.type, // 确保所有字段为字符串类型
            row.e_msg, row.c_time];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows));
          _context2.next = 85;
          break;

        case 74:
          _formatTime3 = function _formatTime3(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedStart = _formatTime3(start);
          _formattedEnd3 = _formatTime3(end);
          _context2.next = 79;
          return regeneratorRuntime.awrap(connection1.execute("\n            SELECT e_msg, type, c_time, d_no\n            FROM t_error_msg \n            WHERE c_time BETWEEN '".concat(_formattedStart, "' AND '").concat(_formattedEnd3, "'\n            LIMIT ").concat(size, " OFFSET ").concat(offset, "\n          ")));

        case 79:
          _ref11 = _context2.sent;
          _ref12 = _slicedToArray(_ref11, 1);
          _rows2 = _ref12[0];
          //大多数时候请使用字符串拼接的方式书写分页代码以及其他相关的代码
          // 将数据转换为二维数组格式
          _formattedRows2 = _rows2.map(function (row) {
            return [row.d_no, row.type, // 确保所有字段为字符串类型
            row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json"); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows2));

        case 85:
          _context2.next = 91;
          break;

        case 87:
          _context2.prev = 87;
          _context2.t0 = _context2["catch"](0);
          console.error("查询失败:", _context2.t0);
          res.status(500).json({
            error: "数据库查询失败"
          });

        case 91:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 87]]);
}); //根据对应的信息进行查询的路由

Router3.get("/t_error_msg/search", function _callee3(req, res) {
  var _req$query3, d_no, e_msg, type, currentPage, pageSize, _req$query4, start, end, page, size, offset, query, formatTime, formattedEnd, _formatTime4, formattedStart, _formattedEnd4, _ref13, _ref14, results, formattedResults, _query3, _formatTime5, _formattedEnd5, _formatTime6, _formattedStart2, _formattedEnd6, _ref15, _ref16, _results3, _formattedResults3, _query4, _formatTime7, _formattedEnd7, _formatTime8, _formattedStart3, _formattedEnd8, _ref17, _ref18, _results4, _formattedResults4;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$query3 = req.query, d_no = _req$query3.d_no, e_msg = _req$query3.e_msg, type = _req$query3.type, currentPage = _req$query3.currentPage, pageSize = _req$query3.pageSize;
          _req$query4 = req.query, start = _req$query4.start, end = _req$query4.end; // ✅ 解析分页参数（确保转换为整数）

          page = parseInt(currentPage, 10) || 1;
          size = parseInt(pageSize, 10) || 12;
          offset = (page - 1) * size;

          if (!(d_no !== "1" && e_msg === "1")) {
            _context3.next = 23;
            break;
          }

          //当d_no存在而e_msg不存在的时候
          if (start === "1" && end === "1") {
            query = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE d_no='".concat(d_no, "' AND type='").concat(type, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } else if (start === "end" && end !== "1") {
            formatTime = function formatTime(timeStr) {
              return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
            };

            formattedEnd = formatTime(end);
            query = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE d_no='".concat(d_no, "' AND type='").concat(type, "' AND c_time<'").concat(formattedEnd, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } else {
            _formatTime4 = function _formatTime4(timeStr) {
              return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
            };

            formattedStart = _formatTime4(start);
            _formattedEnd4 = _formatTime4(end);
            query = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE d_no='".concat(d_no, "' AND type='").concat(type, "' AND c_time BETWEEN '").concat(formattedStart, "' AND '").concat(_formattedEnd4, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } // ✅ 使用 `await` 进行查询


          _context3.next = 9;
          return regeneratorRuntime.awrap(connection1.execute(query));

        case 9:
          _ref13 = _context3.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          results = _ref14[0];

          if (!(results.length < 1)) {
            _context3.next = 17;
            break;
          }

          //当查询为空
          res.send([]);
          return _context3.abrupt("return");

        case 17:
          // 格式化数据
          formattedResults = results.map(function (row) {
            return [row.d_no, row.type, row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(formattedResults));
          return _context3.abrupt("return");

        case 21:
          _context3.next = 57;
          break;

        case 23:
          if (!(d_no === "1" && e_msg !== "1")) {
            _context3.next = 41;
            break;
          }

          //当d_no不存在而e_msg存在的时候
          if (start === "1" && end === "1") {
            _query3 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE e_msg='".concat(e_msg, "' AND type='").concat(type, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } else if (start === "end" && end !== "1") {
            _formatTime5 = function _formatTime5(timeStr) {
              return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
            };

            _formattedEnd5 = _formatTime5(end);
            _query3 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE e_msg='".concat(e_msg, "' AND type='").concat(type, "' AND c_time<'").concat(_formattedEnd5, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } else {
            _formatTime6 = function _formatTime6(timeStr) {
              return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
            };

            _formattedStart2 = _formatTime6(start);
            _formattedEnd6 = _formatTime6(end);
            _query3 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE e_msg='".concat(e_msg, "' AND type='").concat(type, "' AND c_time BETWEEN '").concat(_formattedStart2, "' AND '").concat(_formattedEnd6, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } // ✅ 使用 `await` 进行查询


          _context3.next = 27;
          return regeneratorRuntime.awrap(connection1.execute(_query3));

        case 27:
          _ref15 = _context3.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          _results3 = _ref16[0];

          if (!(_results3.length < 1)) {
            _context3.next = 35;
            break;
          }

          //当查询为空
          res.send([]);
          return _context3.abrupt("return");

        case 35:
          // 格式化数据
          _formattedResults3 = _results3.map(function (row) {
            return [row.d_no, row.type, row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(_formattedResults3));
          return _context3.abrupt("return");

        case 39:
          _context3.next = 57;
          break;

        case 41:
          if (!(d_no !== "1" && e_msg !== "1")) {
            _context3.next = 57;
            break;
          }

          //当d_no和e_msg都存在的时候
          if (start === "1" && end === "1") {
            _query4 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE d_no='".concat(d_no, "' AND e_msg='").concat(e_msg, "' AND type='").concat(type, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } else if (start === "end" && end === "1") {
            _formatTime7 = function _formatTime7(timeStr) {
              return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
            };

            _formattedEnd7 = _formatTime7(end);
            _query4 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE d_no='".concat(d_no, "' AND e_msg='").concat(e_msg, "' AND type='").concat(type, "' AND c_time<'").concat(_formattedEnd7, "' LIMIT ").concat(size, " OFFSET ").concat(offset);
          } else {
            _formatTime8 = function _formatTime8(timeStr) {
              return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
            };

            _formattedStart3 = _formatTime8(start);
            _formattedEnd8 = _formatTime8(end);
            _query4 = "SELECT e_msg, d_no, c_time, type FROM t_error_msg WHERE d_no='".concat(d_no, "' AND e_msg='").concat(e_msg, "' AND type='").concat(type, "' AND c_time BETWEEN '").concat(_formattedStart3, "' AND '").concat(_formattedEnd8, "'  LIMIT ").concat(size, " OFFSET ").concat(offset);
          } // ✅ 使用 `await` 进行查询


          _context3.next = 45;
          return regeneratorRuntime.awrap(connection1.execute(_query4));

        case 45:
          _ref17 = _context3.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          _results4 = _ref18[0];

          if (!(_results4.length < 1)) {
            _context3.next = 53;
            break;
          }

          res.send([]);
          return _context3.abrupt("return");

        case 53:
          // 格式化数据
          _formattedResults4 = _results4.map(function (row) {
            return [row.d_no, row.type, row.e_msg, row.c_time];
          });
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify(_formattedResults4));
          return _context3.abrupt("return");

        case 57:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //获取数据库信息总数的路由--未激活查询框的状态

Router3.get("/t_error_msg/count", function _callee4(req, res) {
  var _req$query5, start, end, _ref19, _ref20, rows, formatTime, formattedEnd, _ref21, _ref22, _rows3, _formatTime9, formattedStart, _formattedEnd9, _ref23, _ref24, _rows4;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$query5 = req.query, start = _req$query5.start, end = _req$query5.end;

          if (!(start === "1" && end === "1")) {
            _context4.next = 10;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg"));

        case 4:
          _ref19 = _context4.sent;
          _ref20 = _slicedToArray(_ref19, 1);
          rows = _ref20[0];
          //将指定的d_no对应的内容总数进行获取
          res.send("" + rows.length);
          _context4.next = 30;
          break;

        case 10:
          if (!(start === "end" && end !== "1")) {
            _context4.next = 21;
            break;
          }

          formatTime = function formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedEnd = formatTime(end);
          _context4.next = 15;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE c_time<'".concat(formattedEnd, "'")));

        case 15:
          _ref21 = _context4.sent;
          _ref22 = _slicedToArray(_ref21, 1);
          _rows3 = _ref22[0];
          //将指定的d_no对应的内容总数进行获取
          res.send("" + _rows3.length);
          _context4.next = 30;
          break;

        case 21:
          _formatTime9 = function _formatTime9(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedStart = _formatTime9(start);
          _formattedEnd9 = _formatTime9(end);
          _context4.next = 26;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE c_time BETWEEN '".concat(formattedStart, "' AND '").concat(_formattedEnd9, "'")));

        case 26:
          _ref23 = _context4.sent;
          _ref24 = _slicedToArray(_ref23, 1);
          _rows4 = _ref24[0];
          //将指定的d_no对应的内容总数进行获取
          res.send("" + _rows4.length);

        case 30:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //获取数据库信息总数的路由--激活查询框的状态

Router3.get("/t_error_msg/count/search", function _callee5(req, res) {
  var _req$query6, d_no, type, e_msg, _req$query7, start, end, _ref25, _ref26, rows, formatTime, formattedEnd, _ref27, _ref28, _rows5, _formatTime10, formattedStart, _formattedEnd10, _ref29, _ref30, _rows6, _ref31, _ref32, _rows7, _formatTime11, _formattedEnd11, _ref33, _ref34, _rows8, _formatTime12, _formattedStart4, _formattedEnd12, _ref35, _ref36, _rows9, _ref37, _ref38, _rows10, _formatTime13, _formattedEnd13, _ref39, _ref40, _rows11, _formatTime14, _formattedStart5, _formattedEnd14, _ref41, _ref42, _rows12;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query6 = req.query, d_no = _req$query6.d_no, type = _req$query6.type, e_msg = _req$query6.e_msg;
          _req$query7 = req.query, start = _req$query7.start, end = _req$query7.end; //首先判断是否激活了ok按钮

          if (!(d_no !== "1" && e_msg === "1")) {
            _context5.next = 35;
            break;
          }

          //当传入的仅d_no不为空
          console.log("gui1");

          if (!(start === "1" && end === "1")) {
            _context5.next = 13;
            break;
          }

          _context5.next = 7;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE d_no = '".concat(d_no, "' AND type='").concat(type, "'")));

        case 7:
          _ref25 = _context5.sent;
          _ref26 = _slicedToArray(_ref25, 1);
          rows = _ref26[0];
          res.send("" + rows.length); //返回长度

          _context5.next = 33;
          break;

        case 13:
          if (!(start === "end" && end !== "1")) {
            _context5.next = 24;
            break;
          }

          formatTime = function formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedEnd = formatTime(end);
          _context5.next = 18;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE d_no = '".concat(d_no, "' AND type='").concat(type, "' AND c_time < '").concat(formattedEnd, "'")));

        case 18:
          _ref27 = _context5.sent;
          _ref28 = _slicedToArray(_ref27, 1);
          _rows5 = _ref28[0];
          res.send("" + _rows5.length); //返回长度

          _context5.next = 33;
          break;

        case 24:
          _formatTime10 = function _formatTime10(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedStart = _formatTime10(start);
          _formattedEnd10 = _formatTime10(end);
          _context5.next = 29;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE d_no = '".concat(d_no, "' AND type='").concat(type, "' AND c_time BETWEEN '").concat(formattedStart, "' AND '").concat(_formattedEnd10, "'")));

        case 29:
          _ref29 = _context5.sent;
          _ref30 = _slicedToArray(_ref29, 1);
          _rows6 = _ref30[0];
          res.send("" + _rows6.length); //返回长度

        case 33:
          _context5.next = 101;
          break;

        case 35:
          if (!(d_no === "1" && e_msg !== "1")) {
            _context5.next = 68;
            break;
          }

          //当传入的仅e_msg不为空
          console.log("gui");

          if (!(start === "1" && end === "1")) {
            _context5.next = 46;
            break;
          }

          _context5.next = 40;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE e_msg = '".concat(e_msg, "' AND type='").concat(type, "'")));

        case 40:
          _ref31 = _context5.sent;
          _ref32 = _slicedToArray(_ref31, 1);
          _rows7 = _ref32[0];
          res.send("" + _rows7.length); //返回长度

          _context5.next = 66;
          break;

        case 46:
          if (!(start === "end" && end !== "1")) {
            _context5.next = 57;
            break;
          }

          _formatTime11 = function _formatTime11(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedEnd11 = _formatTime11(end);
          _context5.next = 51;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE e_msg = '".concat(e_msg, "' AND type='").concat(type, "' AND c_time<'").concat(_formattedEnd11, "'")));

        case 51:
          _ref33 = _context5.sent;
          _ref34 = _slicedToArray(_ref33, 1);
          _rows8 = _ref34[0];
          res.send("" + _rows8.length); //返回长度

          _context5.next = 66;
          break;

        case 57:
          _formatTime12 = function _formatTime12(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedStart4 = _formatTime12(start);
          _formattedEnd12 = _formatTime12(end);
          _context5.next = 62;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE e_msg = '".concat(e_msg, "' AND type='").concat(type, "' AND c_time BETWEEN '").concat(_formattedStart4, "' AND '").concat(_formattedEnd12, "'")));

        case 62:
          _ref35 = _context5.sent;
          _ref36 = _slicedToArray(_ref35, 1);
          _rows9 = _ref36[0];
          res.send("" + _rows9.length); //返回长度

        case 66:
          _context5.next = 101;
          break;

        case 68:
          if (!(d_no !== "1" && e_msg !== "1")) {
            _context5.next = 101;
            break;
          }

          if (!(start === "1" && end === "1")) {
            _context5.next = 79;
            break;
          }

          console.log("gui2");
          _context5.next = 73;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE d_no = '".concat(d_no, "' AND e_msg='").concat(e_msg, "' AND type='").concat(type, "'")));

        case 73:
          _ref37 = _context5.sent;
          _ref38 = _slicedToArray(_ref37, 1);
          _rows10 = _ref38[0];
          res.send("" + _rows10.length); //返回长度

          _context5.next = 101;
          break;

        case 79:
          if (!(start === "end" && end !== "1")) {
            _context5.next = 91;
            break;
          }

          _formatTime13 = function _formatTime13(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedEnd13 = _formatTime13(end);
          console.log("gui2");
          _context5.next = 85;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE d_no = '".concat(d_no, "' AND e_msg='").concat(e_msg, "' AND type='").concat(type, "' AND c_time < '").concat(_formattedEnd13, "'")));

        case 85:
          _ref39 = _context5.sent;
          _ref40 = _slicedToArray(_ref39, 1);
          _rows11 = _ref40[0];
          res.send("" + _rows11.length); //返回长度

          _context5.next = 101;
          break;

        case 91:
          _formatTime14 = function _formatTime14(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedStart5 = _formatTime14(start);
          _formattedEnd14 = _formatTime14(end);
          console.log("gui2");
          _context5.next = 97;
          return regeneratorRuntime.awrap(connection1.execute("SELECT * FROM t_error_msg WHERE d_no = '".concat(d_no, "' AND e_msg='").concat(e_msg, "' AND type='").concat(type, "' AND c_time BETWEEN '").concat(_formattedStart5, "' AND '").concat(_formattedEnd14, "'")));

        case 97:
          _ref41 = _context5.sent;
          _ref42 = _slicedToArray(_ref41, 1);
          _rows12 = _ref42[0];
          res.send("" + _rows12.length); //返回长度

        case 101:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var _default = Router3; //记得将查询条件中的一定为实时数据进行修改了,所有的数据都可以

exports["default"] = _default;