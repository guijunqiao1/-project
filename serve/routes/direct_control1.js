//用于接受映射数组获取请求的路由文件
import express from "express";
//在当前需要对Mysql数据库进行操作的文件中提前引入Mysql数据库的配置文件--需要注意的是indexNode文件中的其他引入的组件文件只是对indexNode本身编写的时候进行约束的文件
import Config from "../indexNode2.js";//此处获取到数据库链接配置对象
let connection;//定义数据库连接对象
const Router_direct_response1 = express();
//导入mqtt模块--用于指令的正确发送响应 2
import { beifen } from "./mqtt_server_get.js";

(async ()=>{
  try{
    //异步执行Config，用于连接数据库,后续可对connection数据库链接对象进行数据库语法操作用于对数据库本身进行操作
    connection = await Config();
    console.log("数据库连接成功");
    const result = await connection.execute(` 
      SELECT *
      FROM t_direct_config
      WHERE mode = 1 or mode = null
    `);
    const rowx = result[0];
    //遍历完成全局路由绑定
    rowx.forEach((item,index)=>{
      Router_direct_response1.get("/zhiling/"+item.luyou,async(req,res)=>{
        const {content,d_no} = req.query;
        //备份内容的封装
        const obj1 = {};
        let tem1;
        let tem11;
        //首先判断item中的content字段是否可分
        if(item.f_type!==2){
          tem1 = content === item.f_value.split("|")[0].split(":")[0] ? item.f_value.split("|")[0].split(":")[1]:item.f_value.split("|")[1].split(":")[1];
          tem11 = content === item.f_value.split("|")[0].split(":")[0] ? item.header.split("|")[0]:item.header.split("|")[1];
        }else{//输入框情况
           tem1 = item.f_value.split("|")[0];
           tem11 = content;
        }
        obj1[tem1] = tem11;
        //指令发送以及是否备份的判断
        const template = d_no==="null"?topic:`${topic}:${d_no}`;
        beifen(0,[template,JSON.stringify(obj1),{qos:1}]);//在实际场景像需要将payload包装成value进行直接的传递--后续则直接在publish方法中使用...展开运算符传值即可
        //中文更新
        content = content === item.f_value.split("|")[0].split(":")[0] ? item.f_value.split("|")[0].split(":")[0]:item.f_value.split("|")[1].split(":")[0];
        //首先判断是否存在编号对应的内容
        const [row] = await connection.execute(`
        SELECT config_id
        FROM t_direct,t_direct_config
        WHERE t_direct_config.id = t_direct.config_id
        AND t_direct_config.id = ${item.id}
        AND d_no = "${d_no}"
        `);
        const [rows] = !row ? await connection.execute(`
        INSERT INTO t_direct(config_id,value,d_no)
        VALUE(${item.id},"${content}","${d_no}")
        `) : await connection.execute(`
        UPDATE t_direct
        SET value = "${content}"
        WHERE config_id = ${item.id}
        `);
        res.send("ok");
        return;
      });
    })
  }
  catch(error){ 
    console.log("数据库连接失败");
  }
})();

//添加和对应的数据库操作的修改以及指令发送过程中为d_no不为null的情况的topic的修改,考虑为输入框进行提交而不是单纯的sign值的修改导致当前的请求的发送

// export default Router_direct_response1;