//导入mqtt模块
import mqtt from "mqtt";

//在当前需要对Mysql数据库进行操作的文件中提前引入Mysql数据库的配置文件--需要注意的是indexNode文件中的其他引入的组件文件只是对indexNode本身编写的时候进行约束的文件
import Config1 from "../indexNode2.js";//此处获取到数据库链接配置对象
let connection1;//定义数据库连接对象
(async ()=>{
  try{
    //异步执行Config，用于连接数据库,后续可对connection数据库链接对象进行数据库语法操作用于对数据库本身进行操作
    connection1 = await Config1();
    console.log("数据库2连接成功");
  }
  catch(error){
    console.log("数据库2连接失败");
  }
})();
//定义当前心跳是否正常的标志变量
// export let active_array = [[2021,false]];
export let active = false;

//定义指令备份数组
// let zhiling_beifen_array = [[2021,[]]];
let zhiling_beifen_array = [];


//定义备份标记变量，用于标记备份数组什么时候开始进行存储--即将初始化发送的指令进行忽略
let all_sign = 0;

//设备存储
//指令备份数组的元素格式为：
// 设备编号,【主题，数据({payload,qos})，该设备所属的指令的类别】


// 方式：传感器直接支持MQTT
// 控制台客户端对象         192.168.218.141'

export const client = mqtt.connect('mqtt://127.0.0.1',{
  clientId:"client_control",//唯一标识符
});

//定义延时函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//定义获取当前时间并且为特定格式的方法
function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

// 心跳检测器
// 制作一个定时器用于定期向设备层订阅的主题中发送消息，并且设备层在接受到消息之后则响应相同的消息到应用层，用于检测设备层和应用层是不是直接的连接
setInterval(()=>{
  console.log("心跳正常发送");
  //首先对整个beifen数组进行缓存，并且根据其中的首元素的个数进行对应的主题的发送
  zhiling_beifen_array.forEach((item,index)=>{
    //在当前的item(某个不同的设备)中完成心跳的发送的操作并且将此时对应上的active标记
    client.publish(`direct`,JSON.stringify({heartTest_client:"start"}),{qos:1});//多设备情况下考虑的文本内容得添加上设备的具体编号
    //将当前心跳设备置为false
    // 多设备情况
    // active_array[index][1] = false;
    // 单设备
    active = false;
  })
},5000);//每5s进行一次心跳的检测



//定义重发函数--针对重连的重发函数，封装
function reconnect_republish(){
  // 多设备
  // console.log(`client成功接收设备${value}到数据`);
  // 多设备
  // active_array.forEach((item,index)=>{
  //   if(item[0]===value){
  //     active_array[index][1] = true;//当接收到心跳重连的信息的时候进行备份数组的内容的重发布，并且后续在主动进行指令的配置的时候进行active的直接判断并且执行一次是否为active为false的情况并且将对应的指令的信息存入到beifen_array中
  //   }
  // });
  // 单设备
  active = true;
  //主动调用一次重发
  republish();
};


//定义重发函数--广义
async function republish(){
  // 多设备
  // console.log("当前执行了一次重发内容");
  // console.log("zhiling:"+zhiling_beifen_array[0][1]);
  // 单设备
  // console.log("zhiling:"+zhiling_beifen_array);
  // 检查当前的备份数组是否为空，若不为空则将每条数据发送两次，每次间隔为100ms
  // 多设备
  // for(let i=0;i<zhiling_beifen_array.length;i++){
  //   for(let j=0;j<zhiling_beifen_array[i][1].length;j++){
  //     console.log("桂军桥本人人人人人人人人人人人人:"+zhiling_beifen_array[i][1][j]);
  //     client.publish(...zhiling_beifen_array[i][1][j]);//需要观察原先存入到zhiling_beifen_array中的元素的结构:[topic,{origin:"bujindianji",content},{qos:1}]
  //     console.log("第一次发送成功");
  //     await delay(100);//单位为ms
  //     client.publish(...zhiling_beifen_array[i][1][j]);
  //     console.log("第二次发送成功");
  //     //执行完成一次第一个元素的完全发送之后将第一个元素进行剔除
  //     zhiling_beifen_array[i][1].shift();
  //   }
  // }
  // 单设备
  for(let i=0;i<zhiling_beifen_array.length;i++){
    client.publish(...zhiling_beifen_array[i]);
    await delay(100);//单位为ms
    client.publish(...zhiling_beifen_array[i]);
    zhiling_beifen_array.shift();
  }
}


//定义备份函数 
export function beifen(value1,value2){//一号位参数用于确定发送的指令类对应的编号、二号位参数用于传递给具体的报文信息
  all_sign++;
  //首先进行指令发送
  client.publish(...value2);
  client.publish(...value2);

  // 多设备
  // if(active_array[value1][1]===false){
  //   // 备份数组的内容填充
  //   zhiling_beifen_array[value1][1].push(value2);//其中value2的格式为：[topic,JSON.stringify({origin:"bujindianji",content}),{qos:1}]
  //   console.log("当前为离线状态");
  // }
  // 单设备
  if(active===false&&all_sign>6){
    zhiling_beifen_array.push(value2);
    console.log("zhiling_beifen_array.length:"+zhiling_beifen_array.length);
  }
} 

//控制台客户端对象连接设置
client.on('connect', () => {
  console.log("接收方连接成功");
  //当客户端连接成功之后订阅对应的主题
  //用于检测传感器数据的主题
  client.subscribe('sensor/data',{qos:1},(err)=>{
    if(err){
      console.log("sensor/data主题订阅失败");
    }
    else{
      console.log("sensor/data主题订阅成功")
    }
  });
  //用于检测告警信息发送过来的主题
  // client.subscribe('sensor/alarm',{qos:1}, (err) => {
  //   if (!err) {
  //     console.log('成功订阅 sensor/alarm');
  //   } else {
  //     console.log('失败订阅 sensor/alarm');
  //   }
  // });
  //主动订阅保存状态下的传感器数据主题
  client.subscribe('miss_data',{qos:1},(err)=>{
    if(err){
      console.log("miss_data主题订阅失败");
    }
    else{
      console.log("miss_data主题订阅成功")
    }
  });
  //主动订阅心跳主题 
  client.subscribe('heartbeat',{qos:1},(err)=>{
    if(err){
      console.log("订阅sensor/heartTest_device主题失败");
    }
    else{
      console.log("订阅sensor/heartTest_device主题成功");
    }
  });
  //主动订阅自动模式下修改控件的监听主题
  client.subscribe('veiw',{qos:1},(err)=>{
    if(err){
      console.log("订阅view主题失败");
    }
    else{
      console.log("订阅view主题成功");
    }
  });
});
//监听控制台客户端对象收到的消息--接收方完成即可
client.on('message', async (topic, message) => {
  if(topic === "sensor/data"){
    //需要注意使用await使得promise对象的值被解析进而允许使用[x]= 的方式完成数组顺序赋值
    const [rows1] = await connection1.execute(`
      SELECT p_name 
      FROM t_field_mapper
      `);//为{ p_name:W,p_name:S,p_name:G}的结构

    // 首先获取到指标变量的内容
    console.log("接收到传感器数据");
    console.log(JSON.parse(message));
    let { d_no,wendu,shidu,guangzhao,type,year,month,day,hour,minute,second} = JSON.parse(message);
    //数据库中映射字段的使用
    const obj = {};
    rows1.forEach((item,index)=>{
      if(index===0){
        obj[item.p_name] = wendu ;//由于为对象的最新属性进行初始化故无法直接使用.运算符进行属性的索引赋值而应该使用的是[]进行属性名的直接获取
      }
      else if(index===1){
        obj[item.p_name] = shidu;
      }
      else if(index===2){
        obj[item.p_name] = guangzhao;
      }
    })
    // 将传感器数据存入到t_data中
    if(!type){
      type="实时数据";
    }
    // 当d_no不存在时：
    if(!d_no){
      d_no = null;
    }
    const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    const [rows] = await connection1.execute(`
    INSERT INTO t_data(d_no,field1,field2,field3,field4,c_time,type)
    VALUES ("${d_no}","${obj.T}","${obj.S}","${obj.G}","1","${time}","${type}")
    `);
  }
  else if(topic === "miss_data"){
    const [rows1] = await connection1.execute(`
      SELECT p_name 
      FROM t_field_mapper
      `);//为{ p_name:W,p_name:S,p_name:G}的结构

    // 首先获取到指标变量的内容
    console.log("接收到传感器数据");
    console.log(JSON.parse(message));
    let { d_no,wendu1,shidu1,guangzhao1,type,year,month,day,hour,minute,second} = JSON.parse(message);
    //数据库中映射字段的使用
    const obj = {};
    rows1.forEach((item,index)=>{
      if(index===0){
        obj[item.p_name] = wendu1 ;//由于为对象的最新属性进行初始化故无法直接使用.运算符进行属性的索引赋值而应该使用的是[]进行属性名的直接获取
      }
      else if(index===1){
        obj[item.p_name] = shidu1;
      }
      else if(index===2){
        obj[item.p_name] = guangzhao1;
      }
    })
    // //将传感器数据存入到t_data中
    if(!type){
      type="保存数据";
    }
    if(!d_no){
      d_no = null;
    }
    const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    const [rows] = await connection1.execute(`
    INSERT INTO t_data(d_no,field1,field2,field3,field4,c_time,type)
    VALUES ("${d_no}","${obj.T}","${obj.S}","${obj.G}","1","${time}","${type}")
    `);
  }
  // else if(topic==="sensor/alarm"){//当该指令得到的响应是告警情况下的主题的时候
  //   //将告警信息相应传递给应用层--需要注意的是告警信息中提供type对应的数据类型
  //   //首先获取到当前的时间
  //   const now_time = getFormattedDate();
  //   //获取到错误信息中的指标内容
  //   const { e_msg,e_no,type } = JSON.parse(message);

  //   //将传感器数据存入到t_error_msg中
  //   const [rows] = await connection1.execute(`
  //   INSERT INTO t_error_msg(e_msg,e_no,c_time,type)
  //   VALUES ("${e_msg}","${e_no}","${now_time}","${type}")
  //   `);
  // }
  else if(topic==="heartbeat"){//当发送的心跳消息得到响应的时候的主题消息的内容的执行 --心跳信息中应当存在设备编号的信息
    console.log("收到底层心跳");
    // 单设备
    reconnect_republish();//完成对应设备的心跳置true
    // 多设备
    // if(!JSON.parse(message).d_no){
    //   reconnect_republish(2021);//完成对应设备的心跳置true
    // }
    // else{
    //   reconnect_republish(JSON.parse(message).d_no);//完成对应设备的心跳置true
    // }
    // 同步系统时间到设备层 now_time NowTime:...
    const time = getFormattedDate();
    client.publish("now_time",JSON.stringify({time:`${time.split("-")[0]}:${time.split("-")[1]}:${time.split("-")[2]}:${time.split("-")[3]}:${time.split("-")[4]}:${time.split("-")[5]}`}),{qos:1});//发布当前时间信息到同步时间相关的主题中
    console.log('收到心跳响应');
  }
  //接收到底层的自动模式下的修改控件状态的指令的情况
  else if(topic==="veiw"){
    //解构赋值获取参数
    let { fengshan1,fengshan2,ketiaodeng,bujindianji } = JSON.parse(message);
    console.log("fengshan11111111111111:"+fengshan1);
    console.log("fengshan22222222222222:"+fengshan2);
    console.log("ketiaodenggggggggggggg:"+ketiaodeng);
    console.log("bujindianjiiiiiiiiiiii:"+bujindianji);
    //首先判断是哪个分支
    if(fengshan1){
      if(fengshan1==="start"){
        fengshan1='开';
      }
      else if(fengshan1==="stop"){ 
        fengshan1='关';
      }
      //首先判断是否存在编号对应的内容
      const [row] = await connection1.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 4
        `);
      if(!row){
        const [rows] = await connection1.execute(`
        INSERT INTO t_direct(config_id,value)
        VALUE(4,"${fengshan1}")
        `);
      }
      else {
        const [rows] = await connection1.execute(`
        UPDATE t_direct
        SET value = "${fengshan1}"
        WHERE config_id = 4
        `);
      }
    }
    else if(fengshan2){
      if(fengshan2==="start"){
        fengshan2='开';
      }
      else if(fengshan2==="stop"){
        fengshan2='关';
      }
      //首先判断是否存在编号对应的内容
      const [row] = await connection1.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 5
        `);
      if(!row){
        const [rows] = await connection1.execute(`
        INSERT INTO t_direct(config_id,value)
        VALUE(5,"${fengshan2}")
        `);
      }
      else {
        const [rows] = await connection1.execute(`
        UPDATE t_direct
        SET value = "${fengshan2}"
        WHERE config_id = 5
        `);
      }
    }
    else if(ketiaodeng){
      if(ketiaodeng==="start"){
        ketiaodeng='开';
      }
      else if(ketiaodeng==="stop"){
        ketiaodeng='关';
      }
      const [row] = await connection1.execute(`
        SELECT config_id 
        FROM t_direct
        WHERE config_id = 1
        `);
      if(!row){
        const [rows] = await connection1.execute(`
        INSERT INTO t_direct(config_id,value)
        VALUE(1,"${ketiaodeng}")
        `);
      }
      else {
        const [rows] = await connection1.execute(`
        UPDATE t_direct
        SET value = "${ketiaodeng}"
        WHERE config_id = 1
        `);
      }
    }
    else if(bujindianji){
      if(bujindianji==="start"){
        bujindianji='开';
        const [row] = await connection1.execute(`
          SELECT config_id 
          FROM t_direct
          WHERE config_id = 2
        `);
        if (!row) {
          const [rows] = await connection1.execute(`
          INSERT INTO t_direct(config_id, value)
          VALUE(2,"${bujindianji}")
          `);
        }
        else {
          const [rows] = await connection1.execute(`
          UPDATE t_direct
          SET value = "${bujindianji}"
          WHERE config_id = 2
          `);
        }
      }
      else if(bujindianji==="stop"){
        bujindianji='关';
        const [row] = await connection1.execute(`
          SELECT config_id 
          FROM t_direct
          WHERE config_id = 2
        `);
        if (!row) {
          const [rows] = await connection1.execute(`
          INSERT INTO t_direct(config_id, value)
          VALUE(2,"${bujindianji}")
          `);
        }
        else {
          const [rows] = await connection1.execute(`
          UPDATE t_direct
          SET value = "${bujindianji}"
          WHERE config_id = 2
          `);
        }
      }
      else if(bujindianji==="zhengzhuan"){
        bujindianji='正转';
        const [row] = await connection1.execute(`
          SELECT config_id 
          FROM t_direct
          WHERE config_id = 3
        `);
        if (!row) {
          const [rows] = await connection1.execute(`
          INSERT INTO t_direct(config_id, value)
          VALUE(3,"${bujindianji}")
          `);
        }
        else {
          const [rows] = await connection1.execute(`
          UPDATE t_direct
          SET value = "${bujindianji}"
          WHERE config_id = 3
          `);
       }
      }
      else if(bujindianji==="fanzhuan"){
        bujindianji='反转';
        const [row] = await connection1.execute(`
          SELECT config_id 
          FROM t_direct
          WHERE config_id = 3
        `);
        if (!row) {
          const [rows] = await connection1.execute(`
          INSERT INTO t_direct(config_id, value)
          VALUE(3,"${bujindianji}")
          `);
        }
        else {
          const [rows] = await connection1.execute(`
          UPDATE t_direct
          SET value = "${bujindianji}"
          WHERE config_id = 3
          `);
       }
      }
    }
  }
});



// //模拟发送传感器数据的客户端
// setInterval(async()=>{
//   let time = getFormattedDate().split("-");
//   client.publish("sensor/data",JSON.stringify({wendu:11.11,shidu:22.11,guangzhao:11.32,year:time[0],month:time[1],day:time[2],hour:time[3],minute:time[4],second:time[5]}),{qos:1});
//   await delay(1000);
//   time = getFormattedDate().split("-");
//   client.publish("miss_data",JSON.stringify({wendu1:21.11,shidu1:12.11,guangzhao1:31.32,year:time[0],month:time[1],day:time[2],hour:time[3],minute:time[4],second:time[5]}),{qos:1})
// },2000);
