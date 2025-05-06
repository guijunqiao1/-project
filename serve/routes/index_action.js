//用于接受映射数组获取请求的路由文件
import express from "express";
//在当前需要对Mysql数据库进行操作的文件中提前引入Mysql数据库的配置文件--需要注意的是indexNode文件中的其他引入的组件文件只是对indexNode本身编写的时候进行约束的文件
import Config from "../indexNode2.js";//此处获取到数据库链接配置对象
import dayjs from "dayjs";//引入提供format使用环境的组件
let connection2;//定义数据库连接对象
const Router5 = express();
(async ()=>{
  try{
    //异步执行Config，用于连接数据库,后续可对connection数据库链接对象进行数据库语法操作用于对数据库本身进行操作
    connection2 = await Config();
    console.log("数据库5连接成功");
  }
  catch(error){
    console.log("数据库5连接失败");
  }
})();

//表格的呈现-图像的呈现路由
Router5.get("/action",async(req,res)=>{
  const { start,end,currentPage,pageSize,d_no } = req.query;
  try{
    //直接将总的历史记录进行获取--类似data路由内容，但是返回的数组的格式不同
    if(start==="1"||end==="1"||start===1||end===1){//首先判断ok按钮是否已经被激活了
      if(currentPage==="undefined" || pageSize==="undefined" ||currentPage===undefined||pageSize===undefined){//当需要获取全部内容的时候
        //直接查询--依据d_no
        const [rows] = await connection2.execute(`
          SELECT d_no,field1,field2,field3,field4,c_time,is_saved
          FROM t_behavior_data 
          WHERE d_no="${d_no}"
          ORDER BY c_time
        `);
        // 将数据转换为二维数组格式
        const formattedRows = rows.map(row => [ 
          row.d_no,
          row.field1.toString(),  // 确保所有字段为字符串类型
          row.field2.toString(),
          row.field3.toString(),
          row.field4.toString(),
          dayjs(row.c_time).format('YYYY-MM-DD HH:mm:ss'),  // 已经格式化为ISO 8601标准时间字符串
          row.is_saved
        ]);

        // 直接使用 res.send() 返回数据
        res.send(JSON.stringify(formattedRows));
      }
      else{
        console.log("currentPage:"+currentPage);
        console.log("pageSize:"+pageSize);
        //首先将页数整数化
        const offset = (parseInt(currentPage) - 1) * parseInt(pageSize);
        //直接查询--依据d_no
        const [rows] = await connection2.execute(`
          SELECT d_no,field1,field2,field3,field4,c_time,is_saved
          FROM t_behavior_data 
          WHERE d_no="${d_no}"
          ORDER BY c_time
          LIMIT ${parseInt(pageSize)} OFFSET ${offset}
        `);
        // 将数据转换为二维数组格式
        const formattedRows = rows.map(row => [
          row.d_no,
          row.field1.toString(),  // 确保所有字段为字符串类型
          row.field2.toString(),
          row.field3.toString(),
          row.field4.toString(),
          dayjs(row.c_time).format('YYYY-MM-DD HH:mm:ss'),  // 已经格式化为ISO 8601标准时间字符串
          row.is_saved
        ]);

        // 直接使用 res.send() 返回数据
        res.send(JSON.stringify(formattedRows));
      }
    }
    else if(start === "end" && end !=="1"){
      console.log("start:"+start);
      console.log("end:"+end);
      console.log("d_no"+d_no);
      if(currentPage==="undefined" || pageSize==="undefined"||currentPage===undefined||pageSize===undefined){
        //获取的是图像化数据的action表的内容
        //首先将时间格式化页数整数化
        const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
        const formattedEnd = formatTime(end);
        //直接查询--同样依据d_no
        const [rows] = await connection2.execute(`
          SELECT d_no,field1,field2,field3,field4,c_time,is_saved
          FROM t_behavior_data 
          WHERE d_no="${d_no}" 
          AND c_time < "${formattedEnd}"
          ORDER BY c_time
        `);
        res.json(rows.map(row => [row.d_no, row.field1, row.field2, row.field3, row.field4, dayjs(row.c_time).format('YYYY-MM-DD HH:mm:ss'), row.is_saved]));
      }
      else{
        console.log("currentPage:"+currentPage);
        console.log("pageSize:"+pageSize);
        //首先将时间格式化页数整数化
        const offset = (parseInt(currentPage) - 1) * parseInt(pageSize);
        const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
        const formattedEnd = formatTime(end);
        //直接查询--同样依据d_no
        const [rows] = await connection2.execute(`
          SELECT d_no,field1,field2,field3,field4,c_time,is_saved
          FROM t_behavior_data 
          WHERE d_no="${d_no}" 
          AND c_time < "${formattedEnd}"
          ORDER BY c_time
          LIMIT ${parseInt(pageSize)} OFFSET ${offset}
        `);
        res.json(rows.map(row => [row.d_no, row.field1, row.field2, row.field3, row.field4, dayjs(row.c_time).format('YYYY-MM-DD HH:mm:ss'), row.is_saved]));
      }
    }
    else{
      console.log("start:"+start);
      console.log("end:"+end);
      console.log("d_no"+d_no);
      if(currentPage==="undefined" || pageSize==="undefined"||currentPage===undefined||pageSize===undefined){
        //获取的是图像化数据的action表的内容
        //首先将时间格式化页数整数化
        const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
        const formattedStart = formatTime(start);
        const formattedEnd = formatTime(end);
        //直接查询--同样依据d_no
        const [rows] = await connection2.execute(`
          SELECT d_no,field1,field2,field3,field4,c_time,is_saved
          FROM t_behavior_data 
          WHERE d_no="${d_no}" 
          AND c_time BETWEEN "${formattedStart}" AND "${formattedEnd}"
          ORDER BY c_time
        `);
        res.json(rows.map(row => [row.d_no, row.field1, row.field2, row.field3, row.field4, dayjs(row.c_time).format('YYYY-MM-DD HH:mm:ss'), row.is_saved]));
      }
      else{
        console.log("currentPage:"+currentPage);
        console.log("pageSize:"+pageSize);
        //首先将时间格式化页数整数化
        const offset = (parseInt(currentPage) - 1) * parseInt(pageSize);
        const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
        const formattedStart = formatTime(start);
        const formattedEnd = formatTime(end);
        //直接查询--同样依据d_no
        const [rows] = await connection2.execute(`
          SELECT d_no,field1,field2,field3,field4,c_time,is_saved
          FROM t_behavior_data 
          WHERE d_no="${d_no}" 
          AND c_time BETWEEN "${formattedStart}" AND "${formattedEnd}"
          ORDER BY c_time
          LIMIT ${parseInt(pageSize)} OFFSET ${offset}
        `);
        res.json(rows.map(row => [row.d_no, row.field1, row.field2, row.field3, row.field4, dayjs(row.c_time).format('YYYY-MM-DD HH:mm:ss'), row.is_saved]));
      }
    }
  }
  catch(error){
    console.log("action路由中："+start);
    console.log("action路由中："+end);
    console.log("action路由中："+currentPage);
    console.log("action路由中："+pageSize);
    console.log("action路由中："+d_no);
    console.log(error);
  }


  //模拟只有一组数据的情况
  // res.send([["2021","11","22","23","61","2019-01-01 15:40","实时数据"]]);

  //模拟有0组数据返回的情况
  // res.send([]);
})  
//表格的呈现路由
Router5.get("/action_count",async(req,res)=>{
  const { start,end,d_no } = req.query;
  try{
    if(start==="1" || end==="1"||start===1||end===1){//首先判断是否激活ok
      //直接查询--需要依据d_no
      const [rows] = await connection2.execute(`
        SELECT COUNT(*) as total 
        FROM t_behavior_data 
        WHERE d_no="${d_no}"
      `);
      // 直接返回数组长度
      res.send(rows[0].total.toString())
    }
    else if(start === "end" && end !=="1"){
      console.log("end:"+end);
      console.log("d_no"+d_no);
      //格式化时间
      const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
      const formattedEnd = formatTime(end);
      //直接查询
      const [rows] = await connection2.execute(`
      SELECT COUNT(*) as total 
      FROM t_behavior_data 
      WHERE d_no="${d_no}" 
      AND c_time < "${formattedEnd}"
      `);
      // 直接返回数组长度
      res.send(rows[0].total.toString())
    }
    else{
      console.log("start:"+start);
      console.log("end:"+end);
      console.log("d_no"+d_no);
      //格式化时间
      const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
      const formattedStart = formatTime(start);
      const formattedEnd = formatTime(end);
      //直接查询
      const [rows] = await connection2.execute(`
      SELECT COUNT(*) as total 
      FROM t_behavior_data 
      WHERE d_no="${d_no}" 
      AND c_time BETWEEN "${formattedStart}" AND "${formattedEnd}"
      `);
      // 直接返回数组长度
      res.send(rows[0].total.toString())
    }
  }
  catch{
    console.log("action_count路由中："+start);
    console.log("action_count路由中："+end);
    console.log("action_count路由中："+d_no);
  }

  // 模拟只有一组数据的情况
  // res.send("1");

  //模拟有0组数据返回的情况
  // res.send("0");
})
//设备选项列表相关路由
//获取t_behacior_action库中的总数据等效于data路由
Router5.get("/action_data",async(req,res)=>{//对action_data路由进行修改并且接纳上start1和end1，若接受失败则进行总的数据的返回
  const { start,end } = req.query;
  if(start==="1"||end==="1"){//当不限制时
    await connection2.query("SET SESSION group_concat_max_len = 1000000");

    const [results] = await connection2.query(`
      SELECT d_no, 
        GROUP_CONCAT(
          CONCAT('[', 
            '"', field1, '"', ',', 
            '"', field2, '"', ',', 
            '"', field3, '"', ',', 
            '"', field4, '"', ',', 
            '"', c_time, '"', 
          ']') ORDER BY c_time
        ) AS data
      FROM t_behavior_data
      GROUP BY d_no;
    `);
  
    // 处理查询结果
    const formattedResult = [];
    results.forEach(row => {
      if (!row.data) return;
      const fixedData = `[${row.data}]`;
      const data = JSON.parse(fixedData); // 解析 JSON 数据
      data.forEach(entry => {
        formattedResult.push([row.d_no, entry[0], entry[1], entry[2], entry[3], entry[4]]);
      });
    });
  
    // 最终返回的格式为 [[设备名, 数据1...], [设备名, 数据2...], ...]
    res.send(formattedResult);
  }
  else if(start === "end" && end !=="1"){
    await connection2.query("SET SESSION group_concat_max_len = 1000000");

    //格式化时间
    const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
    const formattedEnd = formatTime(end);
    const [results] = await connection2.query(`
      SELECT d_no, 
        GROUP_CONCAT(
          CONCAT('[', 
            '"', field1, '"', ',', 
            '"', field2, '"', ',', 
            '"', field3, '"', ',', 
            '"', field4, '"', ',', 
            '"', c_time, '"', 
          ']') ORDER BY c_time
        ) AS data
      FROM t_behavior_data
      WHERE c_time < "${formattedEnd}"
      GROUP BY d_no;
    `);
  
    // 处理查询结果
    const formattedResult = [];
    results.forEach(row => {
      if (!row.data) return;
      const fixedData = `[${row.data}]`;
      const data = JSON.parse(fixedData); // 解析 JSON 数据
      data.forEach(entry => {
        formattedResult.push([row.d_no, entry[0], entry[1], entry[2], entry[3], entry[4]]);
      });
    });
  
    // 最终返回的格式为 [[设备名, 数据1...], [设备名, 数据2...], ...]
    res.send(formattedResult);
  }
  else{//当限制时
    await connection2.query("SET SESSION group_concat_max_len = 1000000");

    //格式化时间
    const formatTime = (timeStr) => new Date(timeStr).toISOString().slice(0, 19).replace('T', ' ');
    const formattedStart = formatTime(start);
    const formattedEnd = formatTime(end);
    const [results] = await connection2.query(`
      SELECT d_no, 
        GROUP_CONCAT(
          CONCAT('[', 
            '"', field1, '"', ',', 
            '"', field2, '"', ',', 
            '"', field3, '"', ',', 
            '"', field4, '"', ',', 
            '"', c_time, '"', 
          ']') ORDER BY c_time
        ) AS data
      FROM t_behavior_data
      WHERE c_time BETWEEN "${formattedStart}" AND "${formattedEnd}"
      GROUP BY d_no;
    `);
  
    // 处理查询结果
    const formattedResult = [];
    results.forEach(row => {
      if (!row.data) return;
      const fixedData = `[${row.data}]`;
      const data = JSON.parse(fixedData); // 解析 JSON 数据
      data.forEach(entry => {
        formattedResult.push([row.d_no, entry[0], entry[1], entry[2], entry[3], entry[4]]);
      });
    });
  
    // 最终返回的格式为 [[设备名, 数据1...], [设备名, 数据2...], ...]
    res.send(formattedResult);
  }


  //模拟只返回一组数据的情况
  // res.send([["2021","11","22","23","61","2019-01-01 15:40","实时数据"]]);

  //模拟有0组数据返回的情况
  // res.send([]);
})


export default Router5;
