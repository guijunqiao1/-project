"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beifen = beifen;
exports.client = exports.active = void 0;

var _mqtt = _interopRequireDefault(require("mqtt"));

var _indexNode = _interopRequireDefault(require("../indexNode2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//此处获取到数据库链接配置对象
var connection1; //定义数据库连接对象

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
})(); //定义当前心跳是否正常的标志变量
// export let active_array = [[2021,false]];


var active = false; //定义指令备份数组
// let zhiling_beifen_array = [[2021,[]]];

exports.active = active;
var zhiling_beifen_array = []; //设备存储
//指令备份数组的元素格式为：
// 设备编号,【主题，数据({payload,qos})，该设备所属的指令的类别】
// 方式：传感器直接支持MQTT
// 控制台客户端对象         192.168.218.141'

var client = _mqtt["default"].connect('mqtt://127.0.0.1', {
  clientId: "client_control" //唯一标识符

}); //定义延时函数


exports.client = client;

function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
} //定义获取当前时间并且为特定格式的方法


function getFormattedDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1

  var day = String(now.getDate()).padStart(2, '0');
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');
  return "".concat(year, "-").concat(month, "-").concat(day, "-").concat(hours, "-").concat(minutes, "-").concat(seconds);
} // 心跳检测器
// 制作一个定时器用于定期向设备层订阅的主题中发送消息，并且设备层在接受到消息之后则响应相同的消息到应用层，用于检测设备层和应用层是不是直接的连接
// setInterval(()=>{
//   console.log("心跳正常发送");
//   //首先对整个beifen数组进行缓存，并且根据其中的首元素的个数进行对应的主题的发送
//   zhiling_beifen_array.forEach((item,index)=>{
//     //在当前的item(某个不同的设备)中完成心跳的发送的操作并且将此时对应上的active标记
//     client.publish(`direct`,JSON.stringify({heartTest_client:"start"}),{qos:1});//多设备情况下考虑的文本内容得添加上设备的具体编号
//     //将当前心跳设备置为false
//     // 多设备情况
//     // active_array[index][1] = false;
//     // 单设备
//     active = false;
//   })
// },5000);//每5s进行一次心跳的检测
//定义重发函数--针对重连的重发函数，封装


function reconnect_republish() {
  // 多设备
  // console.log(`client成功接收设备${value}到数据`);
  // 多设备
  // active_array.forEach((item,index)=>{
  //   if(item[0]===value){
  //     active_array[index][1] = true;//当接收到心跳重连的信息的时候进行备份数组的内容的重发布，并且后续在主动进行指令的配置的时候进行active的直接判断并且执行一次是否为active为false的情况并且将对应的指令的信息存入到beifen_array中
  //   }
  // });
  // 单设备
  exports.active = active = true; //主动调用一次重发

  republish();
}

; //定义重发函数--广义

function republish() {
  var i;
  return regeneratorRuntime.async(function republish$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < zhiling_beifen_array.length)) {
            _context2.next = 10;
            break;
          }

          client.publish.apply(client, _toConsumableArray(zhiling_beifen_array[i]));
          _context2.next = 5;
          return regeneratorRuntime.awrap(delay(100));

        case 5:
          //单位为ms
          client.publish.apply(client, _toConsumableArray(zhiling_beifen_array[i]));
          zhiling_beifen_array.shift();

        case 7:
          i++;
          _context2.next = 1;
          break;

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
} //定义备份函数 


function beifen(value1, value2) {
  //一号位参数用于确定发送的指令类对应的编号、二号位参数用于传递给具体的报文信息
  //首先进行指令发送
  client.publish.apply(client, _toConsumableArray(value2));
  client.publish.apply(client, _toConsumableArray(value2)); // 多设备
  // if(active_array[value1][1]===false){
  //   // 备份数组的内容填充
  //   zhiling_beifen_array[value1][1].push(value2);//其中value2的格式为：[topic,JSON.stringify({origin:"bujindianji",content}),{qos:1}]
  //   console.log("当前为离线状态");
  // }
  // 单设备

  if (active === false) {
    zhiling_beifen_array.push(value2);
    console.log("zhiling_beifen_array.length:" + zhiling_beifen_array.length);
  }
} //控制台客户端对象连接设置


client.on('connect', function () {
  console.log("接收方连接成功"); //当客户端连接成功之后订阅对应的主题
  //用于检测传感器数据的主题

  client.subscribe('sensor/data', {
    qos: 1
  }, function (err) {
    if (err) {
      console.log("sensor/data主题订阅失败");
    } else {
      console.log("sensor/data主题订阅成功");
    }
  }); //用于检测告警信息发送过来的主题
  // client.subscribe('sensor/alarm',{qos:1}, (err) => {
  //   if (!err) {
  //     console.log('成功订阅 sensor/alarm');
  //   } else {
  //     console.log('失败订阅 sensor/alarm');
  //   }
  // });
  //主动订阅保存状态下的传感器数据主题

  client.subscribe('miss_data', {
    qos: 1
  }, function (err) {
    if (err) {
      console.log("miss_data主题订阅失败");
    } else {
      console.log("miss_data主题订阅成功");
    }
  }); //主动订阅心跳主题 

  client.subscribe('heartbeat', {
    qos: 1
  }, function (err) {
    if (err) {
      console.log("订阅sensor/heartTest_device主题失败");
    } else {
      console.log("订阅sensor/heartTest_device主题成功");
    }
  }); //主动订阅自动模式下修改控件的监听主题

  client.subscribe('veiw', {
    qos: 1
  }, function (err) {
    if (err) {
      console.log("订阅view主题失败");
    } else {
      console.log("订阅view主题成功");
    }
  });
}); //监听控制台客户端对象收到的消息--接收方完成即可

client.on('message', function _callee2(topic, message) {
  var _ref, _ref2, rows1, _JSON$parse, d_no, wendu, shidu, guangzhao, type, year, month, day, hour, minute, second, obj, time, _ref3, _ref4, rows, _ref5, _ref6, _rows, _JSON$parse2, _d_no, wendu1, shidu1, guangzhao1, _type, _year, _month, _day, _hour, _minute, _second, _obj, _time, _ref7, _ref8, _rows2, _time2, _JSON$parse3, fengshan1, fengshan2, ketiaodeng, bujindianji, _ref9, _ref10, row, _ref11, _ref12, _rows3, _ref13, _ref14, _rows4, _ref15, _ref16, _row, _ref17, _ref18, _rows5, _ref19, _ref20, _rows6, _ref21, _ref22, _row2, _ref23, _ref24, _rows7, _ref25, _ref26, _rows8, _ref27, _ref28, _row3, _ref29, _ref30, _rows9, _ref31, _ref32, _rows10, _ref33, _ref34, _row4, _ref35, _ref36, _rows11, _ref37, _ref38, _rows12, _ref39, _ref40, _row5, _ref41, _ref42, _rows13, _ref43, _ref44, _rows14, _ref45, _ref46, _row6, _ref47, _ref48, _rows15, _ref49, _ref50, _rows16;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(topic === "sensor/data")) {
            _context3.next = 21;
            break;
          }

          _context3.next = 3;
          return regeneratorRuntime.awrap(connection1.execute("\n      SELECT p_name \n      FROM t_field_mapper\n      "));

        case 3:
          _ref = _context3.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows1 = _ref2[0];
          //为{ p_name:W,p_name:S,p_name:G}的结构
          // 首先获取到指标变量的内容
          console.log("接收到传感器数据");
          console.log(JSON.parse(message));
          _JSON$parse = JSON.parse(message), d_no = _JSON$parse.d_no, wendu = _JSON$parse.wendu, shidu = _JSON$parse.shidu, guangzhao = _JSON$parse.guangzhao, type = _JSON$parse.type, year = _JSON$parse.year, month = _JSON$parse.month, day = _JSON$parse.day, hour = _JSON$parse.hour, minute = _JSON$parse.minute, second = _JSON$parse.second; //数据库中映射字段的使用

          obj = {};
          rows1.forEach(function (item, index) {
            if (index === 0) {
              obj[item.p_name] = wendu; //由于为对象的最新属性进行初始化故无法直接使用.运算符进行属性的索引赋值而应该使用的是[]进行属性名的直接获取
            } else if (index === 1) {
              obj[item.p_name] = shidu;
            } else if (index === 2) {
              obj[item.p_name] = guangzhao;
            }
          }); // 将传感器数据存入到t_data中

          if (!type) {
            type = "实时数据";
          } // 当d_no不存在时：


          if (!d_no) {
            d_no = null;
          }

          time = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(minute, ":").concat(second);
          _context3.next = 16;
          return regeneratorRuntime.awrap(connection1.execute("\n    INSERT INTO t_data(d_no,field1,field2,field3,field4,c_time,type)\n    VALUES (\"".concat(d_no, "\",\"").concat(obj.T, "\",\"").concat(obj.S, "\",\"").concat(obj.G, "\",\"1\",\"").concat(time, "\",\"").concat(type, "\")\n    ")));

        case 16:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];
          _context3.next = 209;
          break;

        case 21:
          if (!(topic === "miss_data")) {
            _context3.next = 42;
            break;
          }

          _context3.next = 24;
          return regeneratorRuntime.awrap(connection1.execute("\n      SELECT p_name \n      FROM t_field_mapper\n      "));

        case 24:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          _rows = _ref6[0];
          //为{ p_name:W,p_name:S,p_name:G}的结构
          // 首先获取到指标变量的内容
          console.log("接收到传感器数据");
          console.log(JSON.parse(message));
          _JSON$parse2 = JSON.parse(message), _d_no = _JSON$parse2.d_no, wendu1 = _JSON$parse2.wendu1, shidu1 = _JSON$parse2.shidu1, guangzhao1 = _JSON$parse2.guangzhao1, _type = _JSON$parse2.type, _year = _JSON$parse2.year, _month = _JSON$parse2.month, _day = _JSON$parse2.day, _hour = _JSON$parse2.hour, _minute = _JSON$parse2.minute, _second = _JSON$parse2.second; //数据库中映射字段的使用

          _obj = {};

          _rows.forEach(function (item, index) {
            if (index === 0) {
              _obj[item.p_name] = wendu1; //由于为对象的最新属性进行初始化故无法直接使用.运算符进行属性的索引赋值而应该使用的是[]进行属性名的直接获取
            } else if (index === 1) {
              _obj[item.p_name] = shidu1;
            } else if (index === 2) {
              _obj[item.p_name] = guangzhao1;
            }
          }); // //将传感器数据存入到t_data中


          if (!_type) {
            _type = "保存数据";
          }

          if (!_d_no) {
            _d_no = null;
          }

          _time = "".concat(_year, "-").concat(_month, "-").concat(_day, " ").concat(_hour, ":").concat(_minute, ":").concat(_second);
          _context3.next = 37;
          return regeneratorRuntime.awrap(connection1.execute("\n    INSERT INTO t_data(d_no,field1,field2,field3,field4,c_time,type)\n    VALUES (\"".concat(_d_no, "\",\"").concat(_obj.T, "\",\"").concat(_obj.S, "\",\"").concat(_obj.G, "\",\"1\",\"").concat(_time, "\",\"").concat(_type, "\")\n    ")));

        case 37:
          _ref7 = _context3.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          _rows2 = _ref8[0];
          _context3.next = 209;
          break;

        case 42:
          if (!(topic === "heartbeat")) {
            _context3.next = 50;
            break;
          }

          //当发送的心跳消息得到响应的时候的主题消息的内容的执行 --心跳信息中应当存在设备编号的信息
          console.log("收到底层心跳"); // 单设备

          reconnect_republish(); //完成对应设备的心跳置true
          // 多设备
          // if(!JSON.parse(message).d_no){
          //   reconnect_republish(2021);//完成对应设备的心跳置true
          // }
          // else{
          //   reconnect_republish(JSON.parse(message).d_no);//完成对应设备的心跳置true
          // }
          // 同步系统时间到设备层 now_time NowTime:...

          _time2 = getFormattedDate();
          client.publish("now_time", JSON.stringify({
            time: "".concat(_time2.split("-")[0], ":").concat(_time2.split("-")[1], ":").concat(_time2.split("-")[2], ":").concat(_time2.split("-")[3], ":").concat(_time2.split("-")[4], ":").concat(_time2.split("-")[5])
          }), {
            qos: 1
          }); //发布当前时间信息到同步时间相关的主题中

          console.log('收到心跳响应');
          _context3.next = 209;
          break;

        case 50:
          if (!(topic === "veiw")) {
            _context3.next = 209;
            break;
          }

          //解构赋值获取参数
          _JSON$parse3 = JSON.parse(message), fengshan1 = _JSON$parse3.fengshan1, fengshan2 = _JSON$parse3.fengshan2, ketiaodeng = _JSON$parse3.ketiaodeng, bujindianji = _JSON$parse3.bujindianji;
          console.log("fengshan11111111111111:" + fengshan1);
          console.log("fengshan22222222222222:" + fengshan2);
          console.log("ketiaodenggggggggggggg:" + ketiaodeng);
          console.log("bujindianjiiiiiiiiiiii:" + bujindianji); //首先判断是哪个分支

          if (!fengshan1) {
            _context3.next = 78;
            break;
          }

          if (fengshan1 === "start") {
            fengshan1 = '开';
          } else if (fengshan1 === "stop") {
            fengshan1 = '关';
          } //首先判断是否存在编号对应的内容


          _context3.next = 60;
          return regeneratorRuntime.awrap(connection1.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 4\n        "));

        case 60:
          _ref9 = _context3.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          row = _ref10[0];

          if (row) {
            _context3.next = 71;
            break;
          }

          _context3.next = 66;
          return regeneratorRuntime.awrap(connection1.execute("\n        INSERT INTO t_direct(config_id,value)\n        VALUE(4,\"".concat(fengshan1, "\")\n        ")));

        case 66:
          _ref11 = _context3.sent;
          _ref12 = _slicedToArray(_ref11, 1);
          _rows3 = _ref12[0];
          _context3.next = 76;
          break;

        case 71:
          _context3.next = 73;
          return regeneratorRuntime.awrap(connection1.execute("\n        UPDATE t_direct\n        SET value = \"".concat(fengshan1, "\"\n        WHERE config_id = 4\n        ")));

        case 73:
          _ref13 = _context3.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          _rows4 = _ref14[0];

        case 76:
          _context3.next = 209;
          break;

        case 78:
          if (!fengshan2) {
            _context3.next = 100;
            break;
          }

          if (fengshan2 === "start") {
            fengshan2 = '开';
          } else if (fengshan2 === "stop") {
            fengshan2 = '关';
          } //首先判断是否存在编号对应的内容


          _context3.next = 82;
          return regeneratorRuntime.awrap(connection1.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 5\n        "));

        case 82:
          _ref15 = _context3.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          _row = _ref16[0];

          if (_row) {
            _context3.next = 93;
            break;
          }

          _context3.next = 88;
          return regeneratorRuntime.awrap(connection1.execute("\n        INSERT INTO t_direct(config_id,value)\n        VALUE(5,\"".concat(fengshan2, "\")\n        ")));

        case 88:
          _ref17 = _context3.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          _rows5 = _ref18[0];
          _context3.next = 98;
          break;

        case 93:
          _context3.next = 95;
          return regeneratorRuntime.awrap(connection1.execute("\n        UPDATE t_direct\n        SET value = \"".concat(fengshan2, "\"\n        WHERE config_id = 5\n        ")));

        case 95:
          _ref19 = _context3.sent;
          _ref20 = _slicedToArray(_ref19, 1);
          _rows6 = _ref20[0];

        case 98:
          _context3.next = 209;
          break;

        case 100:
          if (!ketiaodeng) {
            _context3.next = 122;
            break;
          }

          if (ketiaodeng === "start") {
            ketiaodeng = '开';
          } else if (ketiaodeng === "stop") {
            ketiaodeng = '关';
          }

          _context3.next = 104;
          return regeneratorRuntime.awrap(connection1.execute("\n        SELECT config_id \n        FROM t_direct\n        WHERE config_id = 1\n        "));

        case 104:
          _ref21 = _context3.sent;
          _ref22 = _slicedToArray(_ref21, 1);
          _row2 = _ref22[0];

          if (_row2) {
            _context3.next = 115;
            break;
          }

          _context3.next = 110;
          return regeneratorRuntime.awrap(connection1.execute("\n        INSERT INTO t_direct(config_id,value)\n        VALUE(1,\"".concat(ketiaodeng, "\")\n        ")));

        case 110:
          _ref23 = _context3.sent;
          _ref24 = _slicedToArray(_ref23, 1);
          _rows7 = _ref24[0];
          _context3.next = 120;
          break;

        case 115:
          _context3.next = 117;
          return regeneratorRuntime.awrap(connection1.execute("\n        UPDATE t_direct\n        SET value = \"".concat(ketiaodeng, "\"\n        WHERE config_id = 1\n        ")));

        case 117:
          _ref25 = _context3.sent;
          _ref26 = _slicedToArray(_ref25, 1);
          _rows8 = _ref26[0];

        case 120:
          _context3.next = 209;
          break;

        case 122:
          if (!bujindianji) {
            _context3.next = 209;
            break;
          }

          if (!(bujindianji === "start")) {
            _context3.next = 145;
            break;
          }

          bujindianji = '开';
          _context3.next = 127;
          return regeneratorRuntime.awrap(connection1.execute("\n          SELECT config_id \n          FROM t_direct\n          WHERE config_id = 2\n        "));

        case 127:
          _ref27 = _context3.sent;
          _ref28 = _slicedToArray(_ref27, 1);
          _row3 = _ref28[0];

          if (_row3) {
            _context3.next = 138;
            break;
          }

          _context3.next = 133;
          return regeneratorRuntime.awrap(connection1.execute("\n          INSERT INTO t_direct(config_id, value)\n          VALUE(2,\"".concat(bujindianji, "\")\n          ")));

        case 133:
          _ref29 = _context3.sent;
          _ref30 = _slicedToArray(_ref29, 1);
          _rows9 = _ref30[0];
          _context3.next = 143;
          break;

        case 138:
          _context3.next = 140;
          return regeneratorRuntime.awrap(connection1.execute("\n          UPDATE t_direct\n          SET value = \"".concat(bujindianji, "\"\n          WHERE config_id = 2\n          ")));

        case 140:
          _ref31 = _context3.sent;
          _ref32 = _slicedToArray(_ref31, 1);
          _rows10 = _ref32[0];

        case 143:
          _context3.next = 209;
          break;

        case 145:
          if (!(bujindianji === "stop")) {
            _context3.next = 167;
            break;
          }

          bujindianji = '关';
          _context3.next = 149;
          return regeneratorRuntime.awrap(connection1.execute("\n          SELECT config_id \n          FROM t_direct\n          WHERE config_id = 2\n        "));

        case 149:
          _ref33 = _context3.sent;
          _ref34 = _slicedToArray(_ref33, 1);
          _row4 = _ref34[0];

          if (_row4) {
            _context3.next = 160;
            break;
          }

          _context3.next = 155;
          return regeneratorRuntime.awrap(connection1.execute("\n          INSERT INTO t_direct(config_id, value)\n          VALUE(2,\"".concat(bujindianji, "\")\n          ")));

        case 155:
          _ref35 = _context3.sent;
          _ref36 = _slicedToArray(_ref35, 1);
          _rows11 = _ref36[0];
          _context3.next = 165;
          break;

        case 160:
          _context3.next = 162;
          return regeneratorRuntime.awrap(connection1.execute("\n          UPDATE t_direct\n          SET value = \"".concat(bujindianji, "\"\n          WHERE config_id = 2\n          ")));

        case 162:
          _ref37 = _context3.sent;
          _ref38 = _slicedToArray(_ref37, 1);
          _rows12 = _ref38[0];

        case 165:
          _context3.next = 209;
          break;

        case 167:
          if (!(bujindianji === "zhengzhuan")) {
            _context3.next = 189;
            break;
          }

          bujindianji = '正转';
          _context3.next = 171;
          return regeneratorRuntime.awrap(connection1.execute("\n          SELECT config_id \n          FROM t_direct\n          WHERE config_id = 3\n        "));

        case 171:
          _ref39 = _context3.sent;
          _ref40 = _slicedToArray(_ref39, 1);
          _row5 = _ref40[0];

          if (_row5) {
            _context3.next = 182;
            break;
          }

          _context3.next = 177;
          return regeneratorRuntime.awrap(connection1.execute("\n          INSERT INTO t_direct(config_id, value)\n          VALUE(3,\"".concat(bujindianji, "\")\n          ")));

        case 177:
          _ref41 = _context3.sent;
          _ref42 = _slicedToArray(_ref41, 1);
          _rows13 = _ref42[0];
          _context3.next = 187;
          break;

        case 182:
          _context3.next = 184;
          return regeneratorRuntime.awrap(connection1.execute("\n          UPDATE t_direct\n          SET value = \"".concat(bujindianji, "\"\n          WHERE config_id = 3\n          ")));

        case 184:
          _ref43 = _context3.sent;
          _ref44 = _slicedToArray(_ref43, 1);
          _rows14 = _ref44[0];

        case 187:
          _context3.next = 209;
          break;

        case 189:
          if (!(bujindianji === "fanzhuan")) {
            _context3.next = 209;
            break;
          }

          bujindianji = '反转';
          _context3.next = 193;
          return regeneratorRuntime.awrap(connection1.execute("\n          SELECT config_id \n          FROM t_direct\n          WHERE config_id = 3\n        "));

        case 193:
          _ref45 = _context3.sent;
          _ref46 = _slicedToArray(_ref45, 1);
          _row6 = _ref46[0];

          if (_row6) {
            _context3.next = 204;
            break;
          }

          _context3.next = 199;
          return regeneratorRuntime.awrap(connection1.execute("\n          INSERT INTO t_direct(config_id, value)\n          VALUE(3,\"".concat(bujindianji, "\")\n          ")));

        case 199:
          _ref47 = _context3.sent;
          _ref48 = _slicedToArray(_ref47, 1);
          _rows15 = _ref48[0];
          _context3.next = 209;
          break;

        case 204:
          _context3.next = 206;
          return regeneratorRuntime.awrap(connection1.execute("\n          UPDATE t_direct\n          SET value = \"".concat(bujindianji, "\"\n          WHERE config_id = 3\n          ")));

        case 206:
          _ref49 = _context3.sent;
          _ref50 = _slicedToArray(_ref49, 1);
          _rows16 = _ref50[0];

        case 209:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // //模拟发送传感器数据的客户端
// setInterval(async()=>{
//   let time = getFormattedDate().split("-");
//   client.publish("sensor/data",JSON.stringify({wendu:11.11,shidu:22.11,guangzhao:11.32,year:time[0],month:time[1],day:time[2],hour:time[3],minute:time[4],second:time[5]}),{qos:1});
//   await delay(1000);
//   time = getFormattedDate().split("-");
//   client.publish("miss_data",JSON.stringify({wendu1:21.11,shidu1:12.11,guangzhao1:31.32,year:time[0],month:time[1],day:time[2],hour:time[3],minute:time[4],second:time[5]}),{qos:1})
// },2000);