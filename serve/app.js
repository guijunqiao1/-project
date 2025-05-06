import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import Router from "./routes/index.js";
import Router1 from "./routes/index_yingshe.js";
import Router2 from "./routes/index_device.js";
import Router3 from "./routes/index_error_msg.js";
import Router4 from "./routes/index_history.js";
import Router5 from "./routes/index_action.js";
import Router_direct from "./routes/direct.js";
//引入Router_direct_response对象替代下方mqtt的引入，本质下方mqtt的文件为指令配置文件，而真正的指令发送发生在当前对象的文件中
import Router_direct_control from "./routes/direct_control.js";


//引入mqtt_server在本身的app.js启动的时候其中的mqtt服务的内容同样会执行起来
// import client from "./routes/mqtt_server_get.js";//需要该语句本身的含义即为首先是将指定文件引入同时获取到对应的配置好了的对象

const app = express();


//在当前import的基础上进行和require()方法引入的path模块的区别的缝合，后者可以直接对__dirname属性进行使用，而前者不然，则需要使用源程序定义的方式进行__dirname的赋值
import {
  fileURLToPath
} from 'url';
//进行__dirname的获取:
// 获取当前模块的路径
const __filename = fileURLToPath(
  import.meta.url);
// 获取当前模块的目录
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//调用跨域共享许可组件
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 需要注意的是下方的路由对象是需要被app.use的而mqtt_server则引入即可,也就是本身只需要被执行即可,被引入的本质即为被引入且执行--即使本身并没有对这个引入的对象进行利用
app.use('/', Router); //需要注意的是此处是从'/'作为目录名开始进行查询的--也就是第一个形参为之后Router对应文件中的路由的起始路径
app.use('/', Router1);
app.use('/', Router2);
app.use('/', Router3);
app.use('/', Router4);
app.use('/', Router5);
app.use('/', Router_direct);
app.use('/',Router_direct_control);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;