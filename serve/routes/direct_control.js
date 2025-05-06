//用于接受映射数组获取请求的路由文件
import express from "express";
//在当前需要对Mysql数据库进行操作的文件中提前引入Mysql数据库的配置文件--需要注意的是indexNode文件中的其他引入的组件文件只是对indexNode本身编写的时候进行约束的文件
import Config from "../indexNode2.js";//此处获取到数据库链接配置对象
let connection;//定义数据库连接对象
const Router_direct_response = express();
//导入mqtt模块--用于指令的正确发送响应 2
import { beifen } from "./mqtt_server_get.js";

//定义全局指令字段映射变量
const control_array =[];

(async ()=>{
  try{
    //异步执行Config，用于连接数据库,后续可对connection数据库链接对象进行数据库语法操作用于对数据库本身进行操作
    connection = await Config();
    console.log("数据库连接成功");
    const result = await connection.execute(`
      SELECT f_value,header
      FROM t_direct_config
    `);
    const rowx = result[0];
    control_array.push(`${rowx[0].f_value.split("|")[0].split(":")[1]}:${rowx[0].header}`);//zidong:start
    control_array.push(`${rowx[0].f_value.split("|")[1].split(":")[1]}:${rowx[0].header}`);//shodong:start
    control_array.push(`${rowx[1].f_value.split(":")[1]}:${rowx[1].header.split("|")[0]}`);//deng:start
    control_array.push(`${rowx[1].f_value.split(":")[1]}:${rowx[1].header.split("|")[1]}`);//deng:stop
    control_array.push(`${rowx[2].f_value.split("|")[0].split(":")[1]}:${rowx[2].header.split("|")[1]}`);//guanbi:stop
    control_array.push(`${rowx[2].f_value.split("|")[1].split(":")[1]}:${rowx[2].header.split("|")[0]}`);//kaiqi:start
    control_array.push(`${rowx[3].f_value.split("|")[0].split(":")[1]}:${rowx[3].header}`);//zhengzhuan:start
    control_array.push(`${rowx[3].f_value.split("|")[1].split(":")[1]}:${rowx[3].header}`);//fanzhuan:start
    control_array.push(`${rowx[4].f_value.split(":")[1]}:${rowx[4].header.split("|")[0]}`);//fengshan1:start
    control_array.push(`${rowx[4].f_value.split(":")[1]}:${rowx[4].header.split("|")[1]}`);//fengshan1:stop
    control_array.push(`${rowx[5].f_value.split(":")[1]}:${rowx[5].header.split("|")[0]}`);//fengshan2:start
    control_array.push(`${rowx[5].f_value.split(":")[1]}:${rowx[5].header.split("|")[1]}`);//fengshan2:end
    control_array.push(`${rowx[6].f_value}`);//temperature2
    control_array.push(`${rowx[7].f_value}`);//temperature1
    control_array.push(`${rowx[8].f_value}`);//light_warning
  }
  catch(error){
    console.log("数据库连接失败");
  }
})();

//搭建监听指令的路由
Router_direct_response.get("/zhiling/control",async(req,res)=>{
  let { content,topic,d_no } = req.query;
  try{
    if(d_no==="null"){
      //备份内容的封装
      const obj1 = {};
      const tem1 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[0]:control_array[0].split(":")[0];
      const tem11 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[1]:control_array[0].split(":")[1];
      obj1[tem1] = tem11;
      //指令发送以及是否备份的判断
      beifen(0,[topic,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //响应成功则进行数据库的动态数据更新--后续可能不需要这步操作
      content = content === control_array[1].split(":")[0] ? "手动" : "自动";
      console.log("桂军桥的控制模式："+content);
      //首先判断是否存在编号对应的内容
      const [row] = await connection.execute(`
        SELECT config_id
        FROM t_direct
        WHERE config_id = 0
        `);
      const [rows] = !row ? await connection.execute(`
      INSERT INTO t_direct(config_id,value,d_no)
      VALUE(0,"${content}","${d_no}")
      `) : await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 0
      `);
      res.send("ok");
      return;
    }
    else {
      //备份内容的封装
      const obj1 = {};
      const tem1 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[0]:control_array[0].split(":")[0];
      const tem11 = content === control_array[1].split(":")[0] ? control_array[1].split(":")[1]:control_array[0].split(":")[1];
      obj1[tem1] = tem11;
      //指令发送以及是否备份的判断
      beifen(0,[`${topic}:${d_no}`,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //响应成功则进行数据库的动态数据更新--后续可能不需要这步操作
      content = content === control_array[1].split(":")[0] ? "手动" : "自动";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 9
        AND d_no = "${d_no}"
      `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(9,"${content}","${d_no}")
        `) :  await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 9
        AND d_no = "${d_no}"
        `);
      res.send("ok");
      return;
    }
  }catch(err){
    console.log(err);//将错误打印到终端
    res.send("发生错误");
  }
});
Router_direct_response.get("/zhiling/fengshan1",async(req,res)=>{
  let { content,topic,d_no } = req.query;
  try{
    if(d_no==="null"){
      const obj1 = {}; 
      obj1[control_array[8].split(":")[0]] = content === control_array[8].split(":")[1] ? control_array[8].split(":")[1] : control_array[9].split(":")[1];
      beifen(0,[topic,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //响应成功则进行数据库的动态数据更新--后续可能不需要这步操作
      content = content === control_array[8].split(":")[1] ? "开" : "关";
      //首先判断是否存在编号对应的内容
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 4
        `);
      const [rows] = !row ?  await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(4,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 4
        `);
      res.send("ok");
      return;
    }
    else{//为订阅了topic:d_no主题的单独的设备进行对应消息发送
      const obj1 = {}; 
      obj1[control_array[8].split(":")[0]] = content === control_array[8].split(":")[1] ? control_array[8].split(":")[1] : control_array[9].split(":")[1];
      beifen(0,[`${topic}:${d_no}`,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //首先判断是否存在编号对应的内容
      content = content === control_array[8].split(":")[1] ? "开" : "关";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 13
        AND d_no = "${d_no}"
      `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(13,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 13
        AND d_no = "${d_no}"
        `);
      res.send("ok");
      return;
    }   
  }catch(err){
    console.log(err);//打印错误到终端
    res.send("发生错误");
  }
});
Router_direct_response.get("/zhiling/fengshan2",async(req,res)=>{
  let { content,d_no,topic } = req.query;
  try{
    if(d_no==="null"){
      const obj1 = {};
      obj1[control_array[10].split(":")[0]] = content === control_array[10].split(":")[1] ? control_array[10].split(":")[1] : control_array[11].split(":")[1];
      beifen(0,[topic,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      content = content===control_array[10].split(":")[1] ? "开" : "关";
      //首先判断是否存在编号对应的内容
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 5
        `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(5,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 5
        `);
      res.send("ok");
      return;
    }
    else {
      const obj1 = {}; 
      obj1[control_array[10].split(":")[0]] = content === control_array[10].split(":")[1] ? control_array[10].split(":")[1] : control_array[11].split(":")[1];
      beifen(0,[`${topic}:${d_no}`,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //首先判断是否存在编号对应的内容
      content = content===control_array[10].split(":")[1] ? "开" : "关";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 14
        AND d_no = "${d_no}"
        `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(14,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 14
        AND d_no = "${d_no}"
        `);
      res.send("ok");
      return;
    }
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
Router_direct_response.get("/zhiling/ketiaodeng",async(req,res)=>{
  let { content,topic,d_no } = req.query;
  try{
    if(d_no==="null"){
      const obj1 = {};
      obj1[control_array[2].split(":")[0]] = content === control_array[2].split(":")[1] ? control_array[2].split(":")[1] : control_array[3].split(":")[1];
      beifen(0,[topic,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //传递payload的格式：来源(即指令对象)、内容
      //首先判断是否存在编号对应的内容
      content = content===control_array[2].split(":")[1] ? "开" : "关";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 1
        `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(1,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 1
        `);
      res.send("ok");
      return;
    }
    else {
      const obj1 = {};
      obj1[control_array[2].split(":")[0]] = content === control_array[2].split(":")[1] ? control_array[2].split(":")[1] : control_array[3].split(":")[1];
      beifen(0,[`${topic}:${d_no}`,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
      //传递payload的格式：来源(即指令对象)、内容
      //首先判断是否存在编号对应的内容
      content = content===control_array[2].split(":")[1] ? "开" : "关";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 10
        AND d_no = "${d_no}"
        `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(10,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 10
        AND d_no = "${d_no}"
        `);
      res.send("ok");
      return;
    }
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
Router_direct_response.get("/zhiling/bujindianji", async (req, res) => {
  let { content, topic, d_no ,dianji_model } = req.query;
  try{
    if (d_no === "null") {
      //传递payload的格式：来源(即指令对象)、内容
      //开启和关闭的统一操作
      const obj1 = {};
      const tem1 = content===control_array[5].split(":")[1] ? control_array[5].split(":")[0] :control_array[4].split(":")[0];
      const tem11 = content===control_array[5].split(":")[1] ? control_array[5].split(":")[1] :control_array[4].split(":")[1];
      obj1[tem1] = tem11;
      beifen(0, [topic, JSON.stringify(obj1), { qos: 1 }]);
      if(content===control_array[5].split(":")[1]){//kaiqi
        //正转反转的判断赋值操作
        const obj2 = {};
        let tem2 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[0] : control_array[7].split(":")[0];
        let tem22 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[1] : control_array[7].split(":")[1];
        obj2[tem2] = tem22;
        beifen(0, [topic, JSON.stringify(obj2), { qos: 1 }]);
      }
      //首先判断是否存在编号对应的内容
      content = content===control_array[5].split(":")[1] ? "开" : "关";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 2
      `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id, value, d_no)
        VALUE(2,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 2
        `);
      res.send("ok");
      return;
    }
    else{
      //传递payload的格式：来源(即指令对象)、内容
      //开启和关闭的统一操作
      const obj1 = {};
      const tem1 = content===control_array[5].split(":")[1] ? control_array[5].split(":")[0] :control_array[4].split(":")[0];
      const tem11 = content===control_array[5].split(":")[1] ? control_array[5].split(":")[1] :control_array[4].split(":")[1];
      obj1[tem1] = tem11;
      beifen(0, [`${topic}:${d_no}`, JSON.stringify(obj1), { qos: 1 }]);
      if(content===control_array[5].split(":")[1]){//kaiqi
        //正转反转的判断赋值操作
        const obj2 = {};
        let tem2 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[0] : control_array[7].split(":")[0];
        let tem22 = dianji_model === control_array[6].split(":")[0] ? control_array[6].split(":")[1] : control_array[7].split(":")[1];
        obj2[tem2] = tem22;
        beifen(0, [`${topic}:${d_no}`, JSON.stringify(obj2), { qos: 1 }]);
      }
      //首先判断是否存在编号对应的内容
      content = content===control_array[5].split(":")[1] ? "开" : "关";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 11
      `);
      const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id, value, d_no)
        VALUE(11,"${content}","${d_no}")
        `) :  await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 11
        `);
      res.send("ok");
      return;
    }
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
Router_direct_response.get("/zhiling/dianji_model", async (req, res) => {
  let { content, topic, d_no } = req.query;
  try{
    if (d_no === "null") {
      const obj1 = {};
      const tem1 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[0] :control_array[7].split(":")[0];
      const tem11 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[1]:control_array[7].split(":")[1];
      obj1[tem1] = tem11;
      beifen(0, [topic, JSON.stringify(obj1), { qos: 1 }]);
      //首先判断是否存在编号对应的内容
      content=content===control_array[6].split(":")[0] ? "正转" : "反转";
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 3
      `);
      const [rows] = !row ?  await connection.execute(`
        INSERT INTO t_direct(config_id, value, d_no)
        VALUE(3,"${content}","${d_no}")
        `):  await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 3
        `);
      res.send("ok");
      return;
    }
    else {
      const obj1 = {};
      const tem1 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[0] :control_array[7].split(":")[0];
      const tem11 = content === control_array[6].split(":")[0] ? control_array[6].split(":")[1]:control_array[7].split(":")[1];
      obj1[tem1] = tem11;
      beifen(0, [`${topic}:${d_no}`, JSON.stringify(obj1), { qos: 1 }]);
      //首先判断是否存在编号对应的内容
      content=content===control_array[6].split(":")[0] ? "正转" : "反转";
      //首先判断是否存在编号对应的内容
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 12
        AND d_no = "${d_no}"
      `);
      const [rows] = !row ?  await connection.execute(`
        INSERT INTO t_direct(config_id, value, d_no)
        VALUE(12,"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = 12
        AND d_no = "${d_no}"
        `);
      res.send("ok");
      return;
    }
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
// temperature1
Router_direct_response.get("/zhiling/temperature1", async (req, res) => {
  let { content, topic, d_no } = req.query;
  try{
    const obj1= {};
    obj1[control_array[13].split(":")[0]] = content;
    if (d_no === "null") {
      //传递payload的格式：来源(即指令对象)、内容
      beifen(0, [topic, JSON.stringify(obj1), { qos: 1 }]);
      const [row] = await connection.execute(`
        SELECT config_id
        FROM t_direct
        WHERE config_id = 7
      `);
      const [rows] =  !row ? await connection.execute(`
        INSERT INTO t_direct(config_id, value, d_no)
        VALUE(7,"${content}","${d_no}")
      `) : await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 7
      `);
      res.send("ok");
      return;
    } 
    else {
      //传递payload的格式：来源(即指令对象)、内容
      beifen(0, [`${topic}:${d_no}`, JSON.stringify(obj1), { qos: 1 }]);
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 16
      `);
      const [rows] = !row ?  await connection.execute(`
      INSERT INTO t_direct(config_id, value, d_no)
      VALUE(16,"${content}","${d_no}")
      `):await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 16
      `);
      res.send("ok");
      return;
    } 
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
// temperature2
Router_direct_response.get("/zhiling/temperature2", async (req, res) => {
  let { content, topic, d_no } = req.query;
  try{
    const obj1= {};
    obj1[control_array[12].split(":")[0]] = content;
    if (d_no === "null") {
      //传递payload的格式：来源(即指令对象)、内容
      beifen(0, [topic, JSON.stringify(obj1), { qos: 1 }]);
      const [row] = await connection.execute(`
        SELECT config_id
        FROM t_direct
        WHERE config_id = 6
      `);
      const [rows] = !row ? await connection.execute(`
      INSERT INTO t_direct(config_id, value, d_no)
      VALUE(6,"${content}","${d_no}")
      `): await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 6
      `);
      res.send("ok");
      return;
    } 
    else {
      //传递payload的格式：来源(即指令对象)、内容
      beifen(0, [`${topic}:${d_no}`, JSON.stringify(obj1), { qos: 1 }]);
      const [row] = await connection.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 15
        AND d_no = "${d_no}"
      `);
      const [rows] = !row ?  await connection.execute(`
      INSERT INTO t_direct(config_id, value, d_no)
      VALUE(15,"${content}","${d_no}")
      `):await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 15
      AND d_no = "${d_no}"
      `);
      res.send("ok");
      return;
    } 
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
// light_warning
Router_direct_response.get("/zhiling/light_min", async (req, res) => {
  let { content, topic, d_no } = req.query;
  try{
    const obj1= {};
    obj1[control_array[14].split(":")[0]] = content;
    if (d_no === "null") {
      beifen(0, [topic, JSON.stringify(obj1), { qos: 1 }]);
      const [row] = await connection.execute(`
      SELECT config_id
      FROM t_direct
      WHERE config_id = 8
      `);
      const [rows] = !row ? await connection.execute(`
      INSERT INTO t_direct(config_id, value, d_no)
      VALUE(8,"${content}","${d_no}")
      `):await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 8
      `);
      res.send("ok");
      return;
    } 
    else {
      //传递payload的格式：来源(即指令对象)、内容
      beifen(0, [`${topic}:${d_no}`, JSON.stringify(obj1), { qos: 1 }]);
      const [row] = await connection.execute(`
      SELECT config_id 
      FROM t_direct
      WHERE config_id = 17
      AND d_no = "${d_no}"
      `);
      const [rows] = !row ? await connection.execute(`
      INSERT INTO t_direct(config_id, value, d_no)
      VALUE(17,"${content}","${d_no}")
      `):await connection.execute(`
      UPDATE t_direct
      SET value = "${content}"
      WHERE config_id = 17
      AND d_no = "${d_no}"
      `);
      res.send("ok");
      return;
    } 
  }catch(err){
    console.log(err);
    res.send("发生错误");
  }
});
//添加和对应的数据库操作的修改以及指令发送过程中为d_no不为null的情况的topic的修改,考虑为输入框进行提交而不是单纯的sign值的修改导致当前的请求的发送

export default Router_direct_response;