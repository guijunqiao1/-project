"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _indexNode = _interopRequireDefault(require("../indexNode2.js"));

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//引入提供format使用环境的组件
var connection2; //定义数据库连接对象

var Router4 = (0, _express["default"])();

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
          console.log("数据库4连接成功");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("数据库4连接失败");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})(); //表格的呈现-图像的呈现路由


Router4.get("/History", function _callee2(req, res) {
  var _req$query, start, end, currentPage, pageSize, d_no, _ref, _ref2, rows, formattedRows, offset, _ref3, _ref4, _rows, _formattedRows, formatTime, formattedEnd, _ref5, _ref6, _rows2, _formattedRows2, _formatTime, _formattedEnd, _ref7, _ref8, _rows3, _formattedRows3, _offset, _formatTime2, _formattedEnd2, _ref9, _ref10, _rows4, _formatTime3, formattedStart, _formattedEnd3, _ref11, _ref12, _rows5, _formattedRows4, _formatTime4, _formattedStart, _formattedEnd4, _ref13, _ref14, _rows6, _formattedRows5, _offset2, _formatTime5, _formattedStart2, _formattedEnd5, _ref15, _ref16, _rows7;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, start = _req$query.start, end = _req$query.end, currentPage = _req$query.currentPage, pageSize = _req$query.pageSize, d_no = _req$query.d_no;
          _context2.prev = 1;

          if (!(start === "1" && end === "1")) {
            _context2.next = 25;
            break;
          }

          if (!(currentPage === "undefined" || pageSize === "undefined" || currentPage === undefined || pageSize === undefined)) {
            _context2.next = 13;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(connection2.execute("\n          SELECT d_no, field1, field2, field3, DATE_FORMAT(c_time, '%Y-%m-%dT%H:%i:%s.000Z') AS c_time,type\n          FROM t_data \n          WHERE d_no = ?\n          ORDER BY c_time\n        ", [d_no]));

        case 6:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          // 将数据转换为二维数组格式
          formattedRows = rows.map(function (row) {
            return [row.d_no, row.field1.toString(), // 确保所有字段为字符串类型
            row.field2.toString(), row.field3.toString(), (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), // 已经格式化为ISO 8601标准时间字符串
            row.type];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(formattedRows));
          _context2.next = 23;
          break;

        case 13:
          console.log("currentPage:" + currentPage);
          console.log("pageSize:" + pageSize); //首先将页数整数化

          offset = (parseInt(currentPage) - 1) * parseInt(pageSize); //直接查询

          _context2.next = 18;
          return regeneratorRuntime.awrap(connection2.execute("\n          SELECT d_no,field1,field2,field3,c_time,type\n          FROM t_data \n          WHERE d_no=\"".concat(d_no, "\"\n          ORDER BY c_time\n          LIMIT ").concat(parseInt(pageSize), " OFFSET ").concat(offset, "\n        ")));

        case 18:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          _rows = _ref4[0];
          // 将数据转换为二维数组格式
          _formattedRows = _rows.map(function (row) {
            return [row.d_no, row.field1.toString(), // 确保所有字段为字符串类型
            row.field2.toString(), row.field3.toString(), (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), // 已经格式化为ISO 8601标准时间字符串
            row.type];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows));

        case 23:
          _context2.next = 106;
          break;

        case 25:
          if (!(start === "end" && end !== "1")) {
            _context2.next = 65;
            break;
          }

          console.log("end:" + end);
          console.log("d_no" + d_no);

          if (!(currentPage === "undefined" || pageSize === "undefined" || currentPage === undefined || pageSize === undefined)) {
            _context2.next = 52;
            break;
          }

          if (!(d_no === "undefined" || d_no === undefined)) {
            _context2.next = 41;
            break;
          }

          //首先将时间格式化同时将页数整数化
          formatTime = function formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedEnd = formatTime(end); //直接查询

          _context2.next = 34;
          return regeneratorRuntime.awrap(connection2.execute("\n            SELECT d_no,field1,field2,field3,c_time,type\n            FROM t_data \n            WHERE c_time < \"".concat(formattedEnd, "\"\n            ORDER BY c_time\n          ")));

        case 34:
          _ref5 = _context2.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          _rows2 = _ref6[0];
          // 将数据转换为二维数组格式
          _formattedRows2 = _rows2.map(function (row) {
            return [row.d_no, row.field1.toString(), // 确保所有字段为字符串类型
            row.field2.toString(), row.field3.toString(), (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), // 已经格式化为ISO 8601标准时间字符串
            row.type];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows2));
          _context2.next = 50;
          break;

        case 41:
          //首先将时间格式化同时将页数整数化
          _formatTime = function _formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedEnd = _formatTime(end); //直接查询

          _context2.next = 45;
          return regeneratorRuntime.awrap(connection2.execute("\n            SELECT d_no,field1,field2,field3,c_time,type\n            FROM t_data \n            WHERE d_no=\"".concat(d_no, "\" \n            AND c_time < \"").concat(_formattedEnd, "\"\n            ORDER BY c_time\n          ")));

        case 45:
          _ref7 = _context2.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          _rows3 = _ref8[0];
          // 将数据转换为二维数组格式
          _formattedRows3 = _rows3.map(function (row) {
            return [row.d_no, row.field1.toString(), // 确保所有字段为字符串类型
            row.field2.toString(), row.field3.toString(), (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), // 已经格式化为ISO 8601标准时间字符串
            row.type];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows3));

        case 50:
          _context2.next = 63;
          break;

        case 52:
          console.log("currentPage:" + currentPage);
          console.log("pageSize:" + pageSize); //首先将时间格式化同时将页数整数化

          _offset = (parseInt(currentPage) - 1) * parseInt(pageSize);

          _formatTime2 = function _formatTime2(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedEnd2 = _formatTime2(end); //直接查询

          _context2.next = 59;
          return regeneratorRuntime.awrap(connection2.execute("\n          SELECT d_no,field1,field2,field3,c_time,type\n          FROM t_data \n          WHERE d_no=\"".concat(d_no, "\" \n          AND c_time < \"").concat(_formattedEnd2, "\"\n          ORDER BY c_time\n          LIMIT ").concat(parseInt(pageSize), " OFFSET ").concat(_offset, "\n        ")));

        case 59:
          _ref9 = _context2.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          _rows4 = _ref10[0];
          res.json(_rows4.map(function (row) {
            return [row.d_no, row.field1, row.field2, row.field3, (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), row.type];
          }));

        case 63:
          _context2.next = 106;
          break;

        case 65:
          //change1、分页后的事件的执行--内容获取--需要在start到end的基础上结合currentPage分页以及d_no的指定查询
          console.log("start:" + start);
          console.log("end:" + end);
          console.log("d_no" + d_no);

          if (!(currentPage === "undefined" || pageSize === "undefined" || currentPage === undefined || pageSize === undefined)) {
            _context2.next = 94;
            break;
          }

          if (!(d_no === "undefined" || d_no === undefined || d_no === "null" || d_no === null)) {
            _context2.next = 82;
            break;
          }

          //首先将时间格式化同时将页数整数化
          _formatTime3 = function _formatTime3(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedStart = _formatTime3(start);
          _formattedEnd3 = _formatTime3(end); //直接查询

          _context2.next = 75;
          return regeneratorRuntime.awrap(connection2.execute("\n            SELECT d_no,field1,field2,field3,c_time,type\n            FROM t_data \n            WHERE c_time BETWEEN \"".concat(formattedStart, "\" AND \"").concat(_formattedEnd3, "\"\n            ORDER BY c_time\n          ")));

        case 75:
          _ref11 = _context2.sent;
          _ref12 = _slicedToArray(_ref11, 1);
          _rows5 = _ref12[0];
          // 将数据转换为二维数组格式
          _formattedRows4 = _rows5.map(function (row) {
            return [row.d_no, row.field1.toString(), // 确保所有字段为字符串类型
            row.field2.toString(), row.field3.toString(), (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), // 已经格式化为ISO 8601标准时间字符串
            row.type];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows4));
          _context2.next = 92;
          break;

        case 82:
          //首先将时间格式化同时将页数整数化
          _formatTime4 = function _formatTime4(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedStart = _formatTime4(start);
          _formattedEnd4 = _formatTime4(end); //直接查询

          _context2.next = 87;
          return regeneratorRuntime.awrap(connection2.execute("\n            SELECT d_no,field1,field2,field3,c_time,type\n            FROM t_data \n            WHERE d_no=\"".concat(d_no, "\" \n            AND c_time BETWEEN \"").concat(_formattedStart, "\" AND \"").concat(_formattedEnd4, "\"\n            ORDER BY c_time\n          ")));

        case 87:
          _ref13 = _context2.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          _rows6 = _ref14[0];
          // 将数据转换为二维数组格式
          _formattedRows5 = _rows6.map(function (row) {
            return [row.d_no, row.field1.toString(), // 确保所有字段为字符串类型
            row.field2.toString(), row.field3.toString(), (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), // 已经格式化为ISO 8601标准时间字符串
            row.type];
          }); // 直接使用 res.send() 返回数据

          res.send(JSON.stringify(_formattedRows5));

        case 92:
          _context2.next = 106;
          break;

        case 94:
          console.log("currentPage:" + currentPage);
          console.log("pageSize:" + pageSize); //首先将时间格式化同时将页数整数化

          _offset2 = (parseInt(currentPage) - 1) * parseInt(pageSize);

          _formatTime5 = function _formatTime5(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          _formattedStart2 = _formatTime5(start);
          _formattedEnd5 = _formatTime5(end); //直接查询

          _context2.next = 102;
          return regeneratorRuntime.awrap(connection2.execute("\n          SELECT d_no,field1,field2,field3,c_time,type\n          FROM t_data \n          WHERE d_no=\"".concat(d_no, "\" \n          AND c_time BETWEEN \"").concat(_formattedStart2, "\" AND \"").concat(_formattedEnd5, "\"\n          ORDER BY c_time\n          LIMIT ").concat(parseInt(pageSize), " OFFSET ").concat(_offset2, "\n        ")));

        case 102:
          _ref15 = _context2.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          _rows7 = _ref16[0];
          res.json(_rows7.map(function (row) {
            return [row.d_no, row.field1, row.field2, row.field3, (0, _dayjs["default"])(row.c_time).format('YYYY-MM-DD HH:mm:ss'), row.type];
          }));

        case 106:
          _context2.next = 115;
          break;

        case 108:
          _context2.prev = 108;
          _context2.t0 = _context2["catch"](1);
          console.log("History路由中：" + start);
          console.log("History路由中：" + end);
          console.log("History路由中：" + currentPage);
          console.log("History路由中：" + pageSize);
          console.log("History路由中：" + d_no);

        case 115:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 108]]);
}); //表格的呈现路由

Router4.get("/History_count", function _callee3(req, res) {
  var _req$query2, start, end, d_no, _ref17, _ref18, rows, formatTime, formattedEnd, _ref19, _ref20, _rows8, _formatTime6, formattedStart, _formattedEnd6, _ref21, _ref22, _rows9;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$query2 = req.query, start = _req$query2.start, end = _req$query2.end, d_no = _req$query2.d_no;
          _context3.prev = 1;

          if (!(start === "1" && end === "1")) {
            _context3.next = 11;
            break;
          }

          _context3.next = 5;
          return regeneratorRuntime.awrap(connection2.execute("\n        SELECT COUNT(*) as total \n        FROM t_data \n        WHERE d_no=\"".concat(d_no, "\"\n      ")));

        case 5:
          _ref17 = _context3.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          rows = _ref18[0];
          // 直接返回数组长度
          res.send("" + rows[0].total.toString());
          _context3.next = 36;
          break;

        case 11:
          if (!(start === "end" && end !== "1")) {
            _context3.next = 24;
            break;
          }

          console.log("end:" + end);
          console.log("d_no" + d_no); //格式化时间值

          formatTime = function formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedEnd = formatTime(end); //直接查询

          _context3.next = 18;
          return regeneratorRuntime.awrap(connection2.execute("\n        SELECT COUNT(*) as total \n        FROM t_data \n        WHERE d_no=\"".concat(d_no, "\" \n        AND c_time < \"").concat(formattedEnd, "\"\n      ")));

        case 18:
          _ref19 = _context3.sent;
          _ref20 = _slicedToArray(_ref19, 1);
          _rows8 = _ref20[0];
          // 直接返回数组长度
          res.send("" + _rows8[0].total.toString());
          _context3.next = 36;
          break;

        case 24:
          //进行分页查询后计算大小
          console.log("start:" + start);
          console.log("end:" + end);
          console.log("d_no" + d_no); //格式化时间值

          _formatTime6 = function _formatTime6(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedStart = _formatTime6(start);
          _formattedEnd6 = _formatTime6(end); //直接查询

          _context3.next = 32;
          return regeneratorRuntime.awrap(connection2.execute("\n        SELECT COUNT(*) as total \n        FROM t_data \n        WHERE d_no=\"".concat(d_no, "\" \n        AND c_time BETWEEN \"").concat(formattedStart, "\" AND \"").concat(_formattedEnd6, "\"\n      ")));

        case 32:
          _ref21 = _context3.sent;
          _ref22 = _slicedToArray(_ref21, 1);
          _rows9 = _ref22[0];
          // 直接返回数组长度
          res.send("" + _rows9[0].total.toString());

        case 36:
          _context3.next = 43;
          break;

        case 38:
          _context3.prev = 38;
          _context3.t0 = _context3["catch"](1);
          console.log("History：" + start);
          console.log("History：" + end);
          console.log("History：" + d_no);

        case 43:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 38]]);
}); //设备选项列表相关路由

Router4.get("/data", function _callee4(req, res) {
  var _req$query3, start, end, _ref23, _ref24, results, formattedResult, formatTime, formattedEnd, _ref25, _ref26, _results, _formattedResult, _formatTime7, formattedStart, _formattedEnd7, _ref27, _ref28, _results2, _formattedResult2;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //对data路由进行修改并且接纳上start和end，若接受失败则进行总的数据的返回
          _req$query3 = req.query, start = _req$query3.start, end = _req$query3.end;

          if (!(start === "1" && end === "1")) {
            _context4.next = 14;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(connection2.query("SET SESSION group_concat_max_len = 1000000"));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(connection2.query("\n      SELECT d_no, \n        GROUP_CONCAT(\n          CONCAT('[', \n            '\"', field1, '\"', ',', \n            '\"', field2, '\"', ',', \n            '\"', field3, '\"', ',', \n            '\"', c_time, '\"', \n          ']') ORDER BY c_time\n        ) AS data\n      FROM t_data\n      WHERE type = '\u5B9E\u65F6\u6570\u636E'\n      GROUP BY d_no;\n    "));

        case 6:
          _ref23 = _context4.sent;
          _ref24 = _slicedToArray(_ref23, 1);
          results = _ref24[0];
          // 处理查询结果
          formattedResult = [];
          results.forEach(function (row) {
            if (!row.data) return;
            var fixedData = "[".concat(row.data, "]");
            var data = JSON.parse(fixedData); // 解析 JSON 数据

            data.forEach(function (entry) {
              formattedResult.push([row.d_no, entry[0], entry[1], entry[2], entry[3], entry[4]]);
            });
          }); // 最终返回的格式为 [[设备名, 数据1...], [设备名, 数据2...], ...]

          res.send(formattedResult);
          _context4.next = 42;
          break;

        case 14:
          if (!(start === "end" && end !== "1")) {
            _context4.next = 29;
            break;
          }

          _context4.next = 17;
          return regeneratorRuntime.awrap(connection2.query("SET SESSION group_concat_max_len = 1000000"));

        case 17:
          formatTime = function formatTime(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedEnd = formatTime(end);
          _context4.next = 21;
          return regeneratorRuntime.awrap(connection2.query("\n      SELECT d_no, \n        GROUP_CONCAT(\n          CONCAT('[', \n            '\"', field1, '\"', ',', \n            '\"', field2, '\"', ',', \n            '\"', field3, '\"', ',', \n            '\"', c_time, '\"', \n          ']') ORDER BY c_time\n        ) AS data\n      FROM t_data\n      WHERE type = '\u5B9E\u65F6\u6570\u636E'\n      AND c_time < \"".concat(formattedEnd, "\"\n      GROUP BY d_no;\n    ")));

        case 21:
          _ref25 = _context4.sent;
          _ref26 = _slicedToArray(_ref25, 1);
          _results = _ref26[0];
          // 处理查询结果
          _formattedResult = [];

          _results.forEach(function (row) {
            if (!row.data) return;
            var fixedData = "[".concat(row.data, "]");
            var data = JSON.parse(fixedData); // 解析 JSON 数据

            data.forEach(function (entry) {
              _formattedResult.push([row.d_no, entry[0], entry[1], entry[2], entry[3], entry[4]]);
            });
          }); // 最终返回的格式为 [[设备名, 数据1...], [设备名, 数据2...], ...]


          res.send(_formattedResult);
          _context4.next = 42;
          break;

        case 29:
          _context4.next = 31;
          return regeneratorRuntime.awrap(connection2.query("SET SESSION group_concat_max_len = 1000000"));

        case 31:
          _formatTime7 = function _formatTime7(timeStr) {
            return new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
          };

          formattedStart = _formatTime7(start);
          _formattedEnd7 = _formatTime7(end);
          _context4.next = 36;
          return regeneratorRuntime.awrap(connection2.query("\n      SELECT d_no,  \n        GROUP_CONCAT(\n          CONCAT('[', \n            '\"', field1, '\"', ',', \n            '\"', field2, '\"', ',', \n            '\"', field3, '\"', ',', \n            '\"', c_time, '\"', \n          ']') ORDER BY c_time\n        ) AS data\n      FROM t_data\n      WHERE type = '\u5B9E\u65F6\u6570\u636E'\n      AND c_time BETWEEN \"".concat(formattedStart, "\" AND \"").concat(_formattedEnd7, "\"\n      GROUP BY d_no;\n    ")));

        case 36:
          _ref27 = _context4.sent;
          _ref28 = _slicedToArray(_ref27, 1);
          _results2 = _ref28[0];
          // 处理查询结果
          _formattedResult2 = [];

          _results2.forEach(function (row) {
            if (!row.data) return;
            var fixedData = "[".concat(row.data, "]");
            var data = JSON.parse(fixedData); // 解析 JSON 数据

            data.forEach(function (entry) {
              _formattedResult2.push([row.d_no, entry[0], entry[1], entry[2], entry[3], entry[4]]);
            });
          }); // 最终返回的格式为 [[设备名, 数据1...], [设备名, 数据2...], ...]


          res.send(_formattedResult2);

        case 42:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //用于获取单位列的路由--设备数据

Router4.get("/device_unit", function _callee5(req, res) {
  var query, _ref29, _ref30, rows, unitArray;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // 查询数据库，获取 t_behavior_field_mapper 表中的 unit 列
          // 并按照 id 排序
          query = "\n    SELECT unit \n    FROM t_field_mapper \n    ORDER BY id ASC\n  "; // 执行查询

          _context5.next = 3;
          return regeneratorRuntime.awrap(connection2.query(query));

        case 3:
          _ref29 = _context5.sent;
          _ref30 = _slicedToArray(_ref29, 1);
          rows = _ref30[0];
          // 将查询结果转换为字符串数组
          // 从每一行对象中提取 unit 值
          unitArray = rows.map(function (row) {
            return row.unit;
          }); // 返回字符串数组结果

          res.send(unitArray);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //用于获取单位列的路由--行为数据

Router4.get("/action_unit", function _callee6(req, res) {
  var query, _ref31, _ref32, rows, unitArray;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // 查询数据库，获取 t_behavior_field_mapper 表中的 unit 列
          // 并按照 id 排序
          query = "\n    SELECT unit \n    FROM t_behavior_field_mapper \n    ORDER BY id ASC\n  "; // 执行查询

          _context6.next = 3;
          return regeneratorRuntime.awrap(connection2.query(query));

        case 3:
          _ref31 = _context6.sent;
          _ref32 = _slicedToArray(_ref31, 1);
          rows = _ref32[0];
          // 将查询结果转换为字符串数组
          // 从每一行对象中提取 unit 值
          unitArray = rows.map(function (row) {
            return row.unit;
          }); // 返回字符串数组结果

          res.send(unitArray);

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var _default = Router4; //记得将查询条件中的一定为实时数据进行修改了,所有的数据都可以

exports["default"] = _default;