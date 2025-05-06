<template>
  <div class="control">
    <div class="all">
      <h1>全局指令</h1>
      <div class="control_model" v-if="control_sign">
        控制模式：
        <el-switch @change="control_click" v-model="control_sign" :active-text="control_model_active_show"
          :inactive-text="control_model_inactive_show" :active-value="control_model_active_show"
          :inactive-value="control_model_inactive_show" />
      </div>

      <div class="dianji_model" v-if="dianjimodel_sign">
        电机模式：
        <el-radio-group v-model="dianjimodel_sign" @change="dianji_model_click">
          <el-radio :value="dianji_model_inactive_show" size="large" :disabled="!dianjimodel_bool">{{
            dianji_model_inactive_show
          }}</el-radio>
          <el-radio :value="dianji_model_active_show" size="large" :disabled="!dianjimodel_bool">{{
            dianji_model_active_show
          }}</el-radio>
        </el-radio-group>
      </div>

      <div class="bujindianji" v-if="bujindianji_sign">
        步进电机：
        <el-switch @change="bujindianji_click" v-model="bujindianji_sign" :active-text="bujindianji_active_show"
          :inactive-text="bujindianji_inactive_show" :disabled="!bujindianji_bool"
          :active-value="bujindianji_active_show" :inactive-value="bujindianji_inactive_show" />
      </div>

      <div class="ketiaodeng" v-if="ketiaodeng_sign">
        可调灯：
        <el-switch @change="ketiaodeng_click" v-model="ketiaodeng_sign" :active-text="ketiaodeng_active_show"
          :inactive-text="ketiaodeng_inactive_show" :disabled="!ketiaodeng_bool" :active-value="ketiaodeng_active_show"
          :inactive-value="ketiaodeng_inactive_show" />
      </div>

      <div class="fengshan1" v-if="fengshan1_sign">
        风扇1：
        <el-switch @change="fengshan1_click" v-model="fengshan1_sign" :active-text="fengshan1_active_show"
          :inactive-text="fengshan1_inactive_show" :disabled="!fengshan1_bool" :active-value="fengshan1_active_show"
          :inactive-value="fengshan1_inactive_show" />
      </div>

      <div class="fengshan2" v-if="fengshan2_sign">
        风扇2：
        <el-switch @change="fengshan2_click" v-model="fengshan2_sign" :active-text="fengshan2_active_show"
          :inactive-text="fengshan2_inactive_show" :disabled="!fengshan2_bool" :active-value="fengshan2_active_show"
          :inactive-value="fengshan2_inactive_show" />
      </div>

      <div class="temperature1">
        温度阈值1：
        <input type="text" v-model="temperature_threshold1_sign">
        <button class="input_submit" @click="submit(1)">提交</button>
      </div>

      <div class="temperature2">
        温度阈值2：
        <input type="text" v-model="temperature_threshold2_sign">
        <button class="input_submit" @click="submit(2)">提交</button>
      </div>

      <div class="light_min">
        最低光照：
        <input type="text" v-model="light_min_sign">
        <button class="input_submit" @click="submit(3)">提交</button>
      </div>

    </div>

    <!-- <div class='local'> -->
    <!-- 只在手动模式开启的时候启动 -->
    <!-- <h1>设备指令</h1> -->

    <!-- <div class="device_list control_list">
      <el-dropdown v-if="device_array_length > 1"> -->
    <!-- 当前框只在保底一个的情况下才出现 -->
    <!-- <el-button type="primary">
          设备控件控制<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <div class="device_list" v-for="item in device_array" :key="item[0]">
              <el-dropdown-item>
                <div style="border-radius: 5px;" @click="change(item[0])">设备{{ item[0] }}的控件控制</div>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </template>
</el-dropdown>
<div class="only" style="border-radius: 5px;background-color: #409eff;" v-if="device_array_length === 1">
  设备{{ signzhi }}的控件控制
</div>
</div> -->

    <!-- <div class="now_device">
      当前选中设备为：{{ signzhi }}
    </div> -->

    <!-- 设备控制台视图 -->
    <!-- <div class="device_control_View">

      <div class="control_model" v-if="control_device_sign">
        控制模式：
        <el-switch v-model="control_device_sign" :active-text="control_model1.f_value[1]"
          :inactive-text="control_model1.f_value[0]" :active-value="control_model1.f_value[1]"
          :inactive-value="control_model1.f_value[0]" />
      </div>

      <div class="dianji_model" v-if="dianjimodel_device_sign">
        电机模式：
        <el-radio-group v-model="dianjimodel_device_sign">
          <el-radio :disabled="!dianjimodel_bool1" :value="dianji_model1.f_value[0]" size="large">{{
            dianji_model1.f_value[0]
          }}</el-radio>
          <el-radio :disabled="!dianjimodel_bool1" :value="dianji_model1.f_value[1]" size="large">{{
            dianji_model1.f_value[1]
          }}</el-radio>
        </el-radio-group>
      </div>

      <div class="bujindianji" v-if="bujindianji_device_sign">
        步进电机：
        <el-switch :disabled="!bujindianji_bool1" v-model="bujindianji_device_sign"
          :active-text="bujindianji1.f_value[1]" :inactive-text="bujindianji1.f_value[0]"
          :active-value="bujindianji1.f_value[1]" :inactive-value="bujindianji1.f_value[0]" />
      </div>

      <div class="ketiaodeng" v-if="ketiaodeng_device_sign">
        可调灯：
        <el-switch :disabled="!ketiaodeng_bool1" v-model="ketiaodeng_device_sign" :active-text="ketiaodeng1.f_value[1]"
          :inactive-text="ketiaodeng1.f_value[0]" :active-value="ketiaodeng1.f_value[1]"
          :inactive-value="ketiaodeng1.f_value[0]" />
      </div>

      <div class="fengshan1" v-if="fengshan1_device_sign">
        风扇1：
        <el-switch :disabled="!fengshan1_bool1" v-model="fengshan1_device_sign" :active-text="fengshan11.f_value[1]"
          :inactive-text="fengshan11.f_value[0]" :active-value="fengshan11.f_value[1]"
          :inactive-value="fengshan11.f_value[0]" />
      </div>

      <div class="fengshan2" v-if="fengshan2_device_sign">
        风扇2：
        <el-switch :disabled="!fengshan2_bool1" v-model="fengshan2_device_sign" :active-text="fengshan21.f_value[1]"
          :inactive-text="fengshan21.f_value[0]" :active-value="fengshan21.f_value[1]"
          :inactive-value="fengshan21.f_value[0]" />
      </div>

      <div class="temperature1">
        温度阈值1：
        <input type="text" v-model="temperature_threshold1_device_sign" :disabled="!temperature_threshold1_bool1">
        <button class="input_submit" @click="submit(11)">提交</button>
      </div>

      <div class="temperature2">
        温度阈值2：
        <input type="text" v-model="temperature_threshold2_device_sign" :disabled="!temperature_threshold2_bool1">
        <button class="input_submit" @click="submit(22)">提交</button>
      </div>

      <div class="light_min">
        最低光照：
        <input type="text" v-model="light_min_device_sign" :disabled="!light_min_bool1">
        <button class="input_submit" @click="submit(33)">提交</button>
      </div>
    </div>
  </div> -->
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import axios from "axios";
// import { ArrowDown } from '@element-plus/icons-vue'

// 数据
const control_model = ref();
const dianji_model = ref();
const bujindianji = ref();
const ketiaodeng = ref();
const fengshan1 = ref();
const fengshan2 = ref();
const t1 = ref();
const t2 = ref();
const l = ref();


// 前端显示的字段变量
// 全局字段变量:
const control_model_inactive_show = ref();
const control_model_active_show = ref();
const dianji_model_inactive_show = ref();
const dianji_model_active_show = ref();
const bujindianji_inactive_show = ref();
const bujindianji_active_show = ref();
const ketiaodeng_inactive_show = ref();
const ketiaodeng_active_show = ref();
const fengshan1_inactive_show = ref();
const fengshan1_active_show = ref();
const fengshan2_inactive_show = ref();
const fengshan2_active_show = ref();

//设备字段变量
// const control_model_inactive_device_show = ref();
// const control_model_active_device_show = ref();
// const dianji_model_inactive_device_show = ref();
// const dianji_model_active_device_show = ref();
// const bujindianji_inactive_device_show = ref();
// const bujindianji_active_device_show = ref();
// const ketiaodeng_inactive_device_show = ref();
// const ketiaodeng_active_device_show = ref();
// const fengshan1_inactive_device_show = ref();
// const fengshan1_active_device_show = ref();
// const fengshan2_inactive_device_show = ref();
// const fengshan2_active_device_show = ref();


// const control_model1 = ref();
// const dianji_model1 = ref();
// const bujindianji1 = ref();
// const ketiaodeng1 = ref();
// const fengshan11 = ref();
// const fengshan21 = ref();
//定义用于标记当前下拉框选中的设备数据的变量
// let signzhi: any = ref();
//定义存放实际内容的对象变量--响应式
const really_all = ref();//全局实时变量
//用于存放阈值范围的变量
//全局
// 范围
let l_min_min;
let l_min_max;
let t1_min;
let t1_max;
let t2_min;
let t2_max;
//局部
// 范围
// let l_min_device_min;
// let l_min_device_max;
// let t1_device_min;
// let t1_device_max;
// let t2_device_min;
// let t2_device_max;

// 定义空间选中映射变量--用于替代状态值进行布尔值的映射进而进行组件选中的效果的实现 
//全局变量
const control_sign = ref();
const dianjimodel_sign = ref();
const bujindianji_sign = ref();
const ketiaodeng_sign = ref();
const fengshan1_sign = ref();
const fengshan2_sign = ref();
const temperature_threshold1_sign: any = ref();
const temperature_threshold2_sign: any = ref();
const light_min_sign: any = ref();
//指定设备变量
// const control_device_sign = ref();
// const dianjimodel_device_sign = ref();
// const bujindianji_device_sign = ref();
// const ketiaodeng_device_sign = ref();
// const fengshan1_device_sign = ref();
// const fengshan2_device_sign = ref();
// const temperature_threshold1_device_sign: any = ref();
// const temperature_threshold2_device_sign: any = ref();
// const light_min_device_sign: any = ref();

//定义某个控件具体所在的设备数组以及对应的长度记录变量
// let device_array: any = ref([]);
// let device_array_length = ref();

//定义自动手动切换屏蔽相关的变量
//全局布尔变量
const dianjimodel_bool = ref(false);
const bujindianji_bool = ref(false);
const ketiaodeng_bool = ref(false);
const fengshan1_bool = ref(false);
const fengshan2_bool = ref(false);

//设备布尔变量
// const dianjimodel_bool1 = ref(false);
// const bujindianji_bool1 = ref(false);
// const ketiaodeng_bool1 = ref(false);
// const fengshan1_bool1 = ref(false);
// const fengshan2_bool1 = ref(false);

//定义输入框控件提交按钮的事件函数存储变量
let submit = (value) => { };
//定义控件被点击的事件存储变量--全局控件需要
let control_click: any = (value) => { };
let dianji_model_click: any = (value) => { };
let bujindianji_click: any = (value) => { };
let ketiaodeng_click: any = (value) => { };
let fengshan1_click: any = (value) => { };
let fengshan2_click: any = (value) => { };



submit = async (value) => {
  // 将输入框内容进行请求提交
  if (value === 1) {
    console.log("t1_min:" + typeof t1_min);
    console.log("t1_max:" + typeof t1_max);
    console.log("tem1:" + typeof temperature_threshold1_sign.value);
    if (Number(temperature_threshold1_sign.value) && Number(temperature_threshold1_sign.value) >= Number(t1_min) && Number(temperature_threshold1_sign.value) <= Number(t1_max)) {
      const result = await axios.get(`/api/zhiling/temperature1?content=${temperature_threshold1_sign.value}&topic=${t1.value.topic}&d_no=null`);
      // for (let i = 0; i < device_array.value.length; i++) {
      //   const result10 = await axios.get(`/api/zhiling/temperature1?content=${temperature_threshold1_sign.value}&topic=direct&d_no=${device_array.value[i][0]}`);
      // }
    }
    else {
      alert(`输入内容不满足在${t1_min}到${t1_max}取值的条件`);
    }

    alert("修改温度阈值1为" + temperature_threshold1_sign.value + "成功");
  }
  else if (value === 2) {
    if (Number(temperature_threshold2_sign.value) && Number(temperature_threshold2_sign.value) >= Number(t2_min) && Number(temperature_threshold2_sign.value) <= Number(t2_max)) {
      const result = await axios.get(`/api/zhiling/temperature2?content=${temperature_threshold2_sign.value}&topic=${t2.value.topic}&d_no=null`);
      // for (let i = 0; i < device_array.value.length; i++) {
      //   const result10 = await axios.get(`/api/zhiling/temperature2?content=${temperature_threshold2_sign.value}&topic=direct&d_no=${device_array.value[i][0]}`);
      // }
    }
    else {
      alert(`输入内容不满足在${t2_min}到${t2_max}取值的条件`);
    }
    alert("修改温度阈值2为" + temperature_threshold2_sign.value + "成功");
  }
  else if (value === 3) {
    if (Number(light_min_sign.value) && Number(light_min_sign.value) >= Number(l_min_min) && Number(light_min_sign.value) <= Number(l_min_max)) {
      const result = await axios.get(`/api/zhiling/light_min?content=${light_min_sign.value}&topic=${l.value.topic}&d_no=null`);
      // for (let i = 0; i < device_array.value.length; i++) {
      //   const result = await axios.get(`/api/zhiling/light_min?content=${light_min_sign.value}&topic=direct&d_no=${device_array.value[i][0]}`);
      // }
    }
    else {
      alert(`输入内容不满足在${l_min_min}到${l_min_max}取值的条件`);
    }
    alert("修改光照阈值为" + light_min_sign .value+ "成功");
  }
  // else if (value === 11) {
  //   if (Number(temperature_threshold1_device_sign.value) && Number(temperature_threshold1_device_sign.value) >= Number(t1_device_min) && Number(temperature_threshold1_device_sign.value) <= Number(t1_device_max)) {
  //     const result = await axios.get(`/api/zhiling/temperature1?content=${temperature_threshold1_device_sign.value}&topic=direct&d_no=${signzhi.value}`);
  //   }
  //   else {
  //     alert(`输入内容不满足在${t1_device_min}到${t1_device_max}取值的条件`);
  //   }
  // }
  // else if (value === 22) {
  //   if (Number(temperature_threshold2_device_sign.value) && Number(temperature_threshold2_device_sign.value) >= Number(t2_device_min) && Number(temperature_threshold2_device_sign.value) <= Number(t2_device_max)) {
  //     const result = await axios.get(`/api/zhiling/temperature2?content=${temperature_threshold2_device_sign.value}&topic=direct&d_no=${signzhi.value}`);
  //   }
  //   else {
  //     alert(`输入内容不满足在${t2_device_min}到${t2_device_max}取值的条件`);
  //   }
  // }
  // else if (value === 33) {
  //   if (Number(light_min_device_sign.value) && Number(light_min_device_sign.value) >= Number(l_min_device_min) && Number(light_min_device_sign.value) <= Number(l_min_device_max)) {
  //     const result = await axios.get(`/api/zhiling/light_min?content=${light_min_device_sign.value}&topic=direct&d_no=${signzhi.value}`);
  //   }
  //   else {
  //     alert(`输入内容不满足在${l_min_device_min}到${l_min_device_max}取值的条件`);
  //   }
  // }
}
//定义设备切换事件函数
// change = async (value) => {
//   signzhi.value = value;
//   //将当前的最新的内容进行获取并且赋值于relly到sign
//   const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
//   // 首先检查是否成功获取到对应格式的really
//   control_device_sign.value = tempelate.data["9"];//需要注意的是当前的control_sign被动态赋值了应当可以导致device的其它的bool被修改(检查是否成功触发了watch)
//   ketiaodeng_device_sign.value = tempelate.data["10"];
//   bujindianji_device_sign.value = tempelate.data["11"];
//   dianjimodel_device_sign.value = tempelate.data["12"];
//   fengshan1_device_sign.value = tempelate.data["13"];
//   fengshan2_device_sign.value = tempelate.data["14"];
//   temperature_threshold1_device_sign.value = Number(tempelate.data["16"]);
//   temperature_threshold2_device_sign.value = Number(tempelate.data["15"]);
//   light_min_device_sign.value = Number(tempelate.data["17"]);
// }
//专门用于将数组去重复化的函数
// function qu_repeate(databases) {
//   const result: any[] = [];
//   const seen: Set<string> = new Set(); // 用来记录已经出现过的设备编号

//   // 遍历数据库数组
//   for (let i = 0; i < databases.length; i++) {
//     const [deviceId, data] = databases[i];

//     // 如果设备编号未出现过，添加到结果数组中
//     if (!seen.has(deviceId)) {
//       result.push([deviceId, data]);
//       seen.add(deviceId); // 标记该设备编号为已出现
//     }
//   }
//   return result;
// }


// 全局控件的改变：-------------------------------------------------------------------------------------------------------------------
control_click = async (value) => {
  if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/control?content=${control_model.value.f_value[1].split(":")[1]}&topic=${control_model.value.topic.split("|")[1]}&d_no=null`);
    console.log("主动控制了自动模式下的定时器的开启");
    //将伴随着的control_sign进行修改
    // 发送请求直接修改t_direct中的内容--由于自动手动仅由服务端控制故不需要和底层设备进行握手
    //启用其他控件
    dianjimodel_bool.value = true;
    bujindianji_bool.value = true;
    ketiaodeng_bool.value = true;
    fengshan1_bool.value = true;
    fengshan2_bool.value = true;
  }

  else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/control?content=${control_model.value.f_value[0].split(":")[1]}&topic=${control_model.value.topic.split("|")[0]}&d_no=null`);
    // 发送请求直接修改t_direct中的内容--由于自动手动仅由服务端控制故不需要和底层设备进行握手
    //禁用其他控件--将空间相关的响应式变量置为空
    dianjimodel_bool.value = false;
    bujindianji_bool.value = false;
    ketiaodeng_bool.value = false;
    fengshan1_bool.value = false;
    fengshan2_bool.value = false;
  }
  // for (let i = 0; i < device_array.value.length; i++) {
  //   if (control_sign.value === "手动") {
  //     const result = await axios.get(`/api/zhiling/control?content=shodong&topic=noAuto&d_no=${device_array.value[i][0]}`);
  //   }
  //   else if (control_sign.value === "自动") {
  //     const result = await axios.get(`/api/zhiling/control?content=zidong&topic=Auto&d_no=${device_array.value[i][0]}`);
  //   }
  // }


  //当前定时器归零
  clearInterval(setInterval1);
  //重新赋值
  setInterval1 = setInterval(async () => {
    //获取到布局模板变量的值
    //全局实时变量
    const result = await axios.get("/api/direct?d_no=null");
    really_all.value = result.data;
    const result6 = await axios.get("/api/direct/temperature1?mode=1");
    t1_min = result6.data.min;
    t1_max = result6.data.max;
    const result7 = await axios.get("/api/direct/temperature2?mode=1");
    t2_min = result7.data.min;
    t2_max = result7.data.max;
    const result8 = await axios.get("/api/direct/light_min?mode=1");
    l_min_min = result8.data.min;
    l_min_max = result8.data.max;

    // 局部实时变量 
    // const result60 = await axios.get("/api/direct/temperature1?mode=0");
    // t1_device_min = result60.data.min;
    // t1_device_max = result60.data.max;
    // const result70 = await axios.get("/api/direct/temperature2?mode=0");
    // t2_device_min = result70.data.min;
    // t2_device_max = result70.data.max;
    // const result80 = await axios.get("/api/direct/light_min?mode=0");
    // l_min_device_min = result80.data.min;
    // l_min_device_max = result80.data.max;

    //挂载完毕阶段进行bool变量的初始化转化赋值
    //获取到实际状态的值
    control_sign.value = really_all.value["0"];
    if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
      dianjimodel_bool.value = true;
      bujindianji_bool.value = true;
      ketiaodeng_bool.value = true;
      fengshan1_bool.value = true;
      fengshan2_bool.value = true;
    }
    else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
      dianjimodel_bool.value = false;
      bujindianji_bool.value = false;
      ketiaodeng_bool.value = false;
      fengshan1_bool.value = false;
      fengshan2_bool.value = false;
    }
    ketiaodeng_sign.value = really_all.value["1"];
    bujindianji_sign.value = really_all.value["2"];
    dianjimodel_sign.value = really_all.value["3"];
    fengshan1_sign.value = really_all.value["4"];
    fengshan2_sign.value = really_all.value["5"];


    //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
    // console.log("signzhi:" + signzhi.value);
    // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
    // control_device_sign.value = tempelate.data["19"];
    // ketiaodeng_device_sign.value = tempelate.data["10"];
    // bujindianji_device_sign.value = tempelate.data["11"];
    // dianjimodel_device_sign.value = tempelate.data["12"];
    // fengshan1_device_sign.value = tempelate.data["13"];
    // fengshan2_device_sign.value = tempelate.data["14"];
  }, 1500)
}
dianji_model_click = async (value) => {
  if (dianji_model.value) {
    if (dianjimodel_sign.value === dianji_model.value.f_value[0].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/dianji_model?content=${dianji_model.value.f_value[0].split(":")[1]}&topic=${dianji_model.value.topic}&d_no=null`);
    }
    else if (dianjimodel_sign.value === dianji_model.value.f_value[1].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/dianji_model?content=${dianji_model.value.f_value[1].split(":")[1]}&topic=${dianji_model.value.topic}&d_no=null`);
    }
    //遍历所有设备
    // for (let i = 0; i < device_array.value.length; i++) {
    //   if (dianjimodel_sign.value === "正转") {
    //     const result = await axios.get(`/api/zhiling/dianji_model?content=zhengzhuan&topic=${dianji_model1.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    //   else if (dianjimodel_sign.value === "反转") {
    //     const result = await axios.get(`/api/zhiling/dianji_model?content=fanzhuan&topic=${dianji_model1.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    // }

    //当前定时器归零
    clearInterval(setInterval1);
    //重新赋值
    setInterval1 = setInterval(async () => {
      //获取到布局模板变量的值
      //全局实时变量
      const result = await axios.get("/api/direct?d_no=null");
      really_all.value = result.data;
      const result6 = await axios.get("/api/direct/temperature1?mode=1");
      t1_min = result6.data.min;
      t1_max = result6.data.max;
      const result7 = await axios.get("/api/direct/temperature2?mode=1");
      t2_min = result7.data.min;
      t2_max = result7.data.max;
      const result8 = await axios.get("/api/direct/light_min?mode=1");
      l_min_min = result8.data.min;
      l_min_max = result8.data.max;

      // 局部实时变量 
      // const result60 = await axios.get("/api/direct/temperature1?mode=0");
      // t1_device_min = result60.data.min;
      // t1_device_max = result60.data.max;
      // const result70 = await axios.get("/api/direct/temperature2?mode=0");
      // t2_device_min = result70.data.min;
      // t2_device_max = result70.data.max;
      // const result80 = await axios.get("/api/direct/light_min?mode=0");
      // l_min_device_min = result80.data.min;
      // l_min_device_max = result80.data.max;

      //挂载完毕阶段进行bool变量的初始化转化赋值
      //获取到实际状态的值
      control_sign.value = really_all.value["0"];
      if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
        dianjimodel_bool.value = true;
        bujindianji_bool.value = true;
        ketiaodeng_bool.value = true;
        fengshan1_bool.value = true;
        fengshan2_bool.value = true;
      }
      else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
        dianjimodel_bool.value = false;
        bujindianji_bool.value = false;
        ketiaodeng_bool.value = false;
        fengshan1_bool.value = false;
        fengshan2_bool.value = false;
      }
      ketiaodeng_sign.value = really_all.value["1"];
      bujindianji_sign.value = really_all.value["2"];
      dianjimodel_sign.value = really_all.value["3"];
      fengshan1_sign.value = really_all.value["4"];
      fengshan2_sign.value = really_all.value["5"];

      //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
      // console.log("signzhi:" + signzhi.value);
      // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
      // control_device_sign.value = tempelate.data["19"];
      // ketiaodeng_device_sign.value = tempelate.data["10"];
      // bujindianji_device_sign.value = tempelate.data["11"];
      // dianjimodel_device_sign.value = tempelate.data["12"];
      // fengshan1_device_sign.value = tempelate.data["13"];
      // fengshan2_device_sign.value = tempelate.data["14"];
    }, 1500)
  }
}
bujindianji_click = async (value) => {
  if (bujindianji.value) {
    if (bujindianji_sign.value === bujindianji.value.f_value[1].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/bujindianji?content=${bujindianji.value.header.split("|")[0]}&topic=${bujindianji.value.topic}&d_no=null&dianji_model=${dianjimodel_sign.value}`);
    }
    else if (bujindianji_sign.value === bujindianji.value.f_value[0].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/bujindianji?content=${bujindianji.value.header.split("|")[1]}&topic=${bujindianji.value.topic}&d_no=null`);
    }
    // for (let i = 0; i < device_array.value.length; i++) {
    //   if (bujindianji_sign.value === "开") {
    //     const result = await axios.get(`/api/zhiling/bujindianji?content=start&topic=${bujindianji1.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    //   else if (bujindianji_sign.value === "关") {
    //     const result = await axios.get(`/api/zhiling/bujindianji?content=stop&topic=${bujindianji1.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    // }

    //当前定时器归零
    clearInterval(setInterval1);
    //重新赋值
    setInterval1 = setInterval(async () => {
      //获取到布局模板变量的值
      //全局实时变量
      const result = await axios.get("/api/direct?d_no=null");
      really_all.value = result.data;
      const result6 = await axios.get("/api/direct/temperature1?mode=1");
      t1_min = result6.data.min;
      t1_max = result6.data.max;
      const result7 = await axios.get("/api/direct/temperature2?mode=1");
      t2_min = result7.data.min;
      t2_max = result7.data.max;
      const result8 = await axios.get("/api/direct/light_min?mode=1");
      l_min_min = result8.data.min;
      l_min_max = result8.data.max;

      // 局部实时变量 
      // const result60 = await axios.get("/api/direct/temperature1?mode=0");
      // t1_device_min = result60.data.min;
      // t1_device_max = result60.data.max;
      // const result70 = await axios.get("/api/direct/temperature2?mode=0");
      // t2_device_min = result70.data.min;
      // t2_device_max = result70.data.max;
      // const result80 = await axios.get("/api/direct/light_min?mode=0");
      // l_min_device_min = result80.data.min;
      // l_min_device_max = result80.data.max;

      //挂载完毕阶段进行bool变量的初始化转化赋值
      //获取到实际状态的值
      control_sign.value = really_all.value["0"];
      if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
        dianjimodel_bool.value = true;
        bujindianji_bool.value = true;
        ketiaodeng_bool.value = true;
        fengshan1_bool.value = true;
        fengshan2_bool.value = true;
      }
      else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
        dianjimodel_bool.value = false;
        bujindianji_bool.value = false;
        ketiaodeng_bool.value = false;
        fengshan1_bool.value = false;
        fengshan2_bool.value = false;
      }
      ketiaodeng_sign.value = really_all.value["1"];
      bujindianji_sign.value = really_all.value["2"];
      dianjimodel_sign.value = really_all.value["3"];
      fengshan1_sign.value = really_all.value["4"];
      fengshan2_sign.value = really_all.value["5"];

      //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
      // console.log("signzhi:" + signzhi.value);
      // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
      // control_device_sign.value = tempelate.data["19"];
      // ketiaodeng_device_sign.value = tempelate.data["10"];
      // bujindianji_device_sign.value = tempelate.data["11"];
      // dianjimodel_device_sign.value = tempelate.data["12"];
      // fengshan1_device_sign.value = tempelate.data["13"];
      // fengshan2_device_sign.value = tempelate.data["14"];
    }, 1500)
  }
}
ketiaodeng_click = async (value) => {
  if (ketiaodeng.value) {
    if (ketiaodeng_sign.value === ketiaodeng.value.f_value[1].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/ketiaodeng?content=${ketiaodeng.value.header.split("|")[0]}&topic=${ketiaodeng.value.topic}&d_no=null`);
    }
    else if (ketiaodeng_sign.value === ketiaodeng.value.f_value[0]) {
      const result = await axios.get(`/api/zhiling/ketiaodeng?content=${ketiaodeng.value.header.split("|")[1]}&topic=${ketiaodeng.value.topic}&d_no=null`);
    }
    // for (let i = 0; i < device_array.value.length; i++) {
    //   if (ketiaodeng_sign.value === "开") {
    //     const result = await axios.get(`/api/zhiling/ketiaodeng?content=start&topic=${ketiaodeng1.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    //   else if (ketiaodeng_sign.value === "关") {
    //     const result = await axios.get(`/api/zhiling/ketiaodeng?content=stop&topic=${ketiaodeng1.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    // }

    //当前定时器归零
    clearInterval(setInterval1);
    //重新赋值
    setInterval1 = setInterval(async () => {
      //获取到布局模板变量的值
      //全局实时变量
      const result = await axios.get("/api/direct?d_no=null");
      really_all.value = result.data;
      const result6 = await axios.get("/api/direct/temperature1?mode=1");
      t1_min = result6.data.min;
      t1_max = result6.data.max;
      const result7 = await axios.get("/api/direct/temperature2?mode=1");
      t2_min = result7.data.min;
      t2_max = result7.data.max;
      const result8 = await axios.get("/api/direct/light_min?mode=1");
      l_min_min = result8.data.min;
      l_min_max = result8.data.max;

      // 局部实时变量 
      // const result60 = await axios.get("/api/direct/temperature1?mode=0");
      // t1_device_min = result60.data.min;
      // t1_device_max = result60.data.max;
      // const result70 = await axios.get("/api/direct/temperature2?mode=0");
      // t2_device_min = result70.data.min;
      // t2_device_max = result70.data.max;
      // const result80 = await axios.get("/api/direct/light_min?mode=0");
      // l_min_device_min = result80.data.min;
      // l_min_device_max = result80.data.max;

      //挂载完毕阶段进行bool变量的初始化转化赋值
      //获取到实际状态的值
      control_sign.value = really_all.value["0"];
      if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
        dianjimodel_bool.value = true;
        bujindianji_bool.value = true;
        ketiaodeng_bool.value = true;
        fengshan1_bool.value = true;
        fengshan2_bool.value = true;
      }
      else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
        dianjimodel_bool.value = false;
        bujindianji_bool.value = false;
        ketiaodeng_bool.value = false;
        fengshan1_bool.value = false;
        fengshan2_bool.value = false;
      }
      ketiaodeng_sign.value = really_all.value["1"];
      bujindianji_sign.value = really_all.value["2"];
      dianjimodel_sign.value = really_all.value["3"];
      fengshan1_sign.value = really_all.value["4"];
      fengshan2_sign.value = really_all.value["5"];

      //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
      // console.log("signzhi:" + signzhi.value);
      // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
      // control_device_sign.value = tempelate.data["19"];
      // ketiaodeng_device_sign.value = tempelate.data["10"];
      // bujindianji_device_sign.value = tempelate.data["11"];
      // dianjimodel_device_sign.value = tempelate.data["12"];
      // fengshan1_device_sign.value = tempelate.data["13"];
      // fengshan2_device_sign.value = tempelate.data["14"];
    }, 1500)
  }
}
fengshan1_click = async (value) => {
  if (fengshan1.value) {
    if (fengshan1_sign.value === fengshan1.value.f_value[1].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/fengshan1?content=${fengshan1.value.header.split("|")[0]}&topic=${fengshan1.value.topic}&d_no=null`);
    }
    else if (fengshan1_sign.value === fengshan1.value.f_value[0]) {
      const result = await axios.get(`/api/zhiling/fengshan1?content=${fengshan1.value.header.split("|")[1]}&topic=${fengshan1.value.topic}&d_no=null`);
    }
    // for (let i = 0; i < device_array.value.length; i++) {
    //   if (fengshan1_sign.value === "开") {
    //     const result = await axios.get(`/api/zhiling/fengshan1?content=start&topic=${fengshan11.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    //   else if (fengshan1_sign.value === "关") {
    //     const result = await axios.get(`/api/zhiling/fengshan1?content=stop&topic=${fengshan11.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    // }

    //当前定时器归零
    clearInterval(setInterval1);
    //重新赋值
    setInterval1 = setInterval(async () => {
      //获取到布局模板变量的值
      //全局实时变量
      const result = await axios.get("/api/direct?d_no=null");
      really_all.value = result.data;
      const result6 = await axios.get("/api/direct/temperature1?mode=1");
      t1_min = result6.data.min;
      t1_max = result6.data.max;
      const result7 = await axios.get("/api/direct/temperature2?mode=1");
      t2_min = result7.data.min;
      t2_max = result7.data.max;
      const result8 = await axios.get("/api/direct/light_min?mode=1");
      l_min_min = result8.data.min;
      l_min_max = result8.data.max;

      // 局部实时变量 
      // const result60 = await axios.get("/api/direct/temperature1?mode=0");
      // t1_device_min = result60.data.min;
      // t1_device_max = result60.data.max;
      // const result70 = await axios.get("/api/direct/temperature2?mode=0");
      // t2_device_min = result70.data.min;
      // t2_device_max = result70.data.max;
      // const result80 = await axios.get("/api/direct/light_min?mode=0");
      // l_min_device_min = result80.data.min;
      // l_min_device_max = result80.data.max;

      //挂载完毕阶段进行bool变量的初始化转化赋值
      //获取到实际状态的值
      control_sign.value = really_all.value["0"];
      if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
        dianjimodel_bool.value = true;
        bujindianji_bool.value = true;
        ketiaodeng_bool.value = true;
        fengshan1_bool.value = true;
        fengshan2_bool.value = true;
      }
      else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
        dianjimodel_bool.value = false;
        bujindianji_bool.value = false;
        ketiaodeng_bool.value = false;
        fengshan1_bool.value = false;
        fengshan2_bool.value = false;
      }
      ketiaodeng_sign.value = really_all.value["1"];
      bujindianji_sign.value = really_all.value["2"];
      dianjimodel_sign.value = really_all.value["3"];
      fengshan1_sign.value = really_all.value["4"];
      fengshan2_sign.value = really_all.value["5"];

      //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
      // console.log("signzhi:" + signzhi.value);
      // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
      // control_device_sign.value = tempelate.data["19"];
      // ketiaodeng_device_sign.value = tempelate.data["10"];
      // bujindianji_device_sign.value = tempelate.data["11"];
      // dianjimodel_device_sign.value = tempelate.data["12"];
      // fengshan1_device_sign.value = tempelate.data["13"];
      // fengshan2_device_sign.value = tempelate.data["14"];
    }, 1500)
  }
}
fengshan2_click = async (value) => {
  if (fengshan2.value) {
    if (fengshan2_sign.value === fengshan2.value.f_value[1].split(":")[0]) {
      const result = await axios.get(`/api/zhiling/fengshan2?content=${fengshan2.value.header.split("|")[0]}&topic=${fengshan2.value.topic}&d_no=null`);
    }
    else if (fengshan2_sign.value === fengshan2.value.f_value[0]) {
      const result = await axios.get(`/api/zhiling/fengshan2?content=${fengshan1.value.header.split("|")[1]}&topic=${fengshan2.value.topic}&d_no=null`);
    }
    // for (let i = 0; i < device_array.value.length; i++) {
    //   if (fengshan2_sign.value === "开") {
    //     const result = await axios.get(`/api/zhiling/fengshan2?content=start&topic=${fengshan21.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    //   else if (fengshan2_sign.value === "关") {
    //     const result = await axios.get(`/api/zhiling/fengshan2?content=stop&topic=${fengshan21.value.topic}&d_no=${device_array.value[i][0]}`);
    //   }
    // }



    //当前定时器归零
    clearInterval(setInterval1);
    //重新赋值
    setInterval1 = setInterval(async () => {
      //获取到布局模板变量的值
      //全局实时变量
      const result = await axios.get("/api/direct?d_no=null");
      really_all.value = result.data;
      const result6 = await axios.get("/api/direct/temperature1?mode=1");
      t1_min = result6.data.min;
      t1_max = result6.data.max;
      const result7 = await axios.get("/api/direct/temperature2?mode=1");
      t2_min = result7.data.min;
      t2_max = result7.data.max;
      const result8 = await axios.get("/api/direct/light_min?mode=1");
      l_min_min = result8.data.min;
      l_min_max = result8.data.max;

      // 局部实时变量 
      // const result60 = await axios.get("/api/direct/temperature1?mode=0");
      // t1_device_min = result60.data.min;
      // t1_device_max = result60.data.max;
      // const result70 = await axios.get("/api/direct/temperature2?mode=0");
      // t2_device_min = result70.data.min;
      // t2_device_max = result70.data.max;
      // const result80 = await axios.get("/api/direct/light_min?mode=0");
      // l_min_device_min = result80.data.min;
      // l_min_device_max = result80.data.max;

      //挂载完毕阶段进行bool变量的初始化转化赋值
      //获取到实际状态的值
      control_sign.value = really_all.value["0"];
      if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
        dianjimodel_bool.value = true;
        bujindianji_bool.value = true;
        ketiaodeng_bool.value = true;
        fengshan1_bool.value = true;
        fengshan2_bool.value = true;
      }
      else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
        dianjimodel_bool.value = false;
        bujindianji_bool.value = false;
        ketiaodeng_bool.value = false;
        fengshan1_bool.value = false;
        fengshan2_bool.value = false;
      }
      ketiaodeng_sign.value = really_all.value["1"];
      bujindianji_sign.value = really_all.value["2"];
      dianjimodel_sign.value = really_all.value["3"];
      fengshan1_sign.value = really_all.value["4"];
      fengshan2_sign.value = really_all.value["5"];

      //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
      // console.log("signzhi:" + signzhi.value);
      // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
      // control_device_sign.value = tempelate.data["19"];
      // ketiaodeng_device_sign.value = tempelate.data["10"];
      // bujindianji_device_sign.value = tempelate.data["11"];
      // dianjimodel_device_sign.value = tempelate.data["12"];
      // fengshan1_device_sign.value = tempelate.data["13"];
      // fengshan2_device_sign.value = tempelate.data["14"];
    }, 1500)
  }
}


//监听
// 由于control本身的sign和其余的控件一样无法绑定在其上，故需要通过v-model绑定上的control_value进行间接的修改
// watch(() => control_device_sign.value, async () => {
//   if (control_device_sign.value === "手动") {
//     const result = await axios.get(`/api/zhiling/control?content=shodong&topic=noAuto&d_no=${signzhi.value}`);
//     //将伴随着的control_sign进行修改
//     // 发送请求直接修改t_direct中的内容--由于自动手动仅由服务端控制故不需要和底层设备进行握手
//     //启用其他控件
//     dianjimodel_bool1.value = true;
//     bujindianji_bool1.value = true;
//     ketiaodeng_bool1.value = true;
//     fengshan1_bool1.value = true;
//     fengshan2_bool1.value = true;
//     temperature_threshold1_bool1.value = true;
//     temperature_threshold2_bool1.value = true;
//     light_min_bool1.value = true;
//   }
//   else if (control_device_sign.value === "自动") {
//     const result = await axios.get(`/api/zhiling/control?content=zidong&topic=Auto&d_no=${signzhi.value}`);
//     // 发送请求直接修改t_direct中的内容--由于自动手动仅由服务端控制故不需要和底层设备进行握手
//     //禁用其他控件--将空间相关的响应式变量置为空
//     dianjimodel_bool1.value = false;
//     bujindianji_bool1.value = false;
//     ketiaodeng_bool1.value = false;
//     fengshan1_bool1.value = false;
//     fengshan2_bool1.value = false;
//     temperature_threshold1_bool1.value = false;
//     temperature_threshold2_bool1.value = false;
//     light_min_bool1.value = false;
//   }
// }, { immediate: true, deep: true });
// //设备控件的改变：
// watch(() => dianjimodel_device_sign.value, async () => {
//   if (dianji_model1.value) {
//     if (dianjimodel_device_sign.value === "正转") {
//       const result = await axios.get(`/api/zhiling/dianji_model?content=zhengzhuan&topic=${dianji_model1.value.topic}&d_no=${signzhi.value}`);
//     }
//     else if (dianjimodel_device_sign.value === "反转") {
//       const result = await axios.get(`/api/zhiling/dianji_model?content=fanzhuan&topic=${dianji_model1.value.topic}&d_no=${signzhi.value}`);
//     }
//   }
// }, { immediate: true, deep: true });

// watch(() => bujindianji_device_sign.value, async () => {
//   if (bujindianji1.value) {
//     if (bujindianji_device_sign.value === "开") {
//       const result = await axios.get(`/api/zhiling/bujindianji?content=start&topic=${bujindianji1.value.topic}&d_no=${signzhi.value}`);
//     }
//     else if (bujindianji_device_sign.value === "关") {
//       const result = await axios.get(`/api/zhiling/bujindianji?content=stop&topic=${bujindianji1.value.topic}&d_no=${signzhi.value}`);
//     }
//   }
// }, { immediate: true, deep: true });

// watch(() => ketiaodeng_device_sign.value, async () => {
//   if (ketiaodeng1.value) {
//     if (ketiaodeng_device_sign.value === "开") {
//       const result = await axios.get(`/api/zhiling/ketiaodeng?content=start&topic=${ketiaodeng1.value.topic}&d_no=${signzhi.value}`);
//     }
//     else if (ketiaodeng_device_sign.value === "关") {
//       const result = await axios.get(`/api/zhiling/ketiaodeng?content=stop&topic=${ketiaodeng1.value.topic}&d_no=${signzhi.value}`);
//     }
//   }
// }, { immediate: true, deep: true });

// watch(() => fengshan1_device_sign.value, async () => {
//   if (fengshan11.value) {
//     if (fengshan1_device_sign.value === "开") {
//       const result = await axios.get(`/api/zhiling/fengshan1?content=start&topic=${fengshan11.value.topic}&d_no=${signzhi.value}`);
//     }
//     else if (fengshan1_device_sign.value === "关") {
//       const result = await axios.get(`/api/zhiling/fengshan1?content=stop&topic=${fengshan11.value.topic}&d_no=${signzhi.value}`);
//     }
//   }
// }, { immediate: true, deep: true });

// watch(() => fengshan2_device_sign.value, async () => {
//   if (fengshan21.value) {
//     if (fengshan2_device_sign.value === "开") {
//       const result = await axios.get(`/api/zhiling/fengshan2?content=start&topic=${fengshan21.value.topic}&d_no=${signzhi.value}`);
//     }
//     else if (fengshan2_device_sign.value === "关") {
//       const result = await axios.get(`/api/zhiling/fengshan2?content=stop&topic=${fengshan21.value.topic}&d_no=${signzhi.value}`);
//     }
//   }
// }, { immediate: true, deep: true });

//统一定义定时器变量
let setInterval1;

// 发送请求获取到后端数据库指令配置相关的数据
//挂载阶段完成请求的发送赋值
onMounted(async () => {
  console.log("我其次执行");
  //定时器内容优先执行一次
  //获取到布局模板变量的值
  //全局实时变量
  // const resul = await axios.get("/api/t_device/first?d_no=undefined");
  // device_array.value = qu_repeate(resul.data);
  // console.log("device_array:" + device_array.value);
  // device_array_length.value = device_array.value.length;
  // console.log("device_array_length:" + device_array.value.length);
  // signzhi.value = device_array.value[0][0];
  const result = await axios.get("/api/direct?d_no=null");
  really_all.value = result.data;
  // 局部实时变量 
  const result0 = await axios.get("/api/direct/control?mode=1");
  control_model.value = result0.data;
  const result1 = await axios.get("/api/direct/dianji_model?mode=1");
  dianji_model.value = result1.data;
  const result2 = await axios.get("/api/direct/bujindianji?mode=1");
  bujindianji.value = result2.data;
  const result3 = await axios.get("/api/direct/ketiaodeng?mode=1");
  ketiaodeng.value = result3.data;
  const result4 = await axios.get("/api/direct/fengshan1?mode=1");
  fengshan1.value = result4.data;
  const result5 = await axios.get("/api/direct/fengshan2?mode=1");
  fengshan2.value = result5.data;
  const result6 = await axios.get("/api/direct/temperature1?mode=1");
  t1.value = result6.data;
  t1_min = result6.data.min;
  t1_max = result6.data.max;
  const result7 = await axios.get("/api/direct/temperature2?mode=1");
  t2.value = result7.data;
  t2_min = result7.data.min;
  t2_max = result7.data.max;
  const result8 = await axios.get("/api/direct/light_min?mode=1");
  l.value = result8.data;
  l_min_min = result8.data.min;
  l_min_max = result8.data.max;
  console.log("l_min_min:" + l_min_min);
  console.log("l_min_max:" + l_min_max);

  // 前端字段呈现变量的赋值--全局
  control_model_active_show.value = control_model.value.f_value[1].split(":")[0];
  control_model_inactive_show.value = control_model.value.f_value[0].split(":")[0];
  ketiaodeng_active_show.value = ketiaodeng.value.f_value[1].split(":")[0];
  ketiaodeng_inactive_show.value = ketiaodeng.value.f_value[0].split(":")[0];
  dianji_model_active_show.value = dianji_model.value.f_value[1].split(":")[0];
  dianji_model_inactive_show.value = dianji_model.value.f_value[0].split(":")[0];
  fengshan1_active_show.value = fengshan1.value.f_value[1].split(":")[0];
  fengshan1_inactive_show.value = fengshan1.value.f_value[0].split(":")[0];
  fengshan2_active_show.value = fengshan2.value.f_value[1].split(":")[0];
  fengshan2_inactive_show.value = fengshan2.value.f_value[0].split(":")[0];
  bujindianji_active_show.value = bujindianji.value.f_value[1].split(":")[0];
  bujindianji_inactive_show.value = bujindianji.value.f_value[0].split(":")[0];

  // const result00 = await axios.get("/api/direct/control?mode=0");
  // control_model1.value = result00.data;
  // const result10 = await axios.get("/api/direct/dianji_model?mode=0");
  // dianji_model1.value = result10.data;
  // const result20 = await axios.get("/api/direct/bujindianji?mode=0");
  // bujindianji1.value = result20.data;
  // const result30 = await axios.get("/api/direct/ketiaodeng?mode=0");
  // ketiaodeng1.value = result30.data;
  // const result40 = await axios.get("/api/direct/fengshan1?mode=0");
  // fengshan11.value = result40.data;
  // const result50 = await axios.get("/api/direct/fengshan2?mode=0");
  // fengshan21.value = result50.data;
  // const result60 = await axios.get("/api/direct/temperature1?mode=0");
  // t1_device_min = result60.data.min;
  // t1_device_max = result60.data.max;
  // const result70 = await axios.get("/api/direct/temperature2?mode=0");
  // t2_device_min = result70.data.min;
  // t2_device_max = result70.data.max;
  // const result80 = await axios.get("/api/direct/light_min?mode=0");
  // l_min_device_min = result80.data.min;
  // l_min_device_max = result80.data.max;

  //前端呈现字段赋值--设备
  // control_model_active_device_show.value = control_model1.value.f_value[1].split(":")[0];
  // control_model_inactive_device_show.value = control_model1.value.f_value[0].split(":")[0];
  // ketiaodeng_active_device_show.value = ketiaodeng1.value.f_value[1].split(":")[0];
  // ketiaodeng_inactive_device_show.value = ketiaodeng1.value.f_value[0].split(":")[0];
  // dianji_model_active_device_show.value = dianji_model1.value.f_value[1].split(":")[0];
  // dianji_model_inactive_device_show.value = dianji_model1.value.f_value[0].split(":")[0];
  // fengshan1_active_device_show.value = fengshan11.value.f_value[1].split(":")[0];
  // fengshan1_inactive_device_show.value = fengshan11.value.f_value[0].split(":")[0];
  // fengshan2_active_device_show.value = fengshan21.value.f_value[1].split(":")[0];
  // fengshan2_inactive_device_show.value = fengshan21.value.f_value[0].split(":")[0];
  // bujindianji_active_device_show.value = bujindianji1.value.f_value[1].split(":")[0];
  // bujindianji_inactive_device_show.value = bujindianji1.value.f_value[0].split(":")[0];

  //挂载完毕阶段进行bool变量的初始化转化赋值
  //获取到实际状态的值
  control_sign.value = really_all.value["0"];
  if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
    dianjimodel_bool.value = true;
    bujindianji_bool.value = true;
    ketiaodeng_bool.value = true;
    fengshan1_bool.value = true;
    fengshan2_bool.value = true;
  }
  else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
    dianjimodel_bool.value = false;
    bujindianji_bool.value = false;
    ketiaodeng_bool.value = false;
    fengshan1_bool.value = false;
    fengshan2_bool.value = false;
  }
  ketiaodeng_sign.value = really_all.value["1"];
  bujindianji_sign.value = really_all.value["2"];
  dianjimodel_sign.value = really_all.value["3"];
  fengshan1_sign.value = really_all.value["4"];
  fengshan2_sign.value = really_all.value["5"];
  temperature_threshold1_sign.value = Number(really_all.value["7"]);
  temperature_threshold2_sign.value = Number(really_all.value["6"]);
  light_min_sign.value = Number(really_all.value["8"]);


  //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
  // console.log("signzhi:" + signzhi.value);
  // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
  // control_device_sign.value = tempelate.data["9"];
  // ketiaodeng_device_sign.value = tempelate.data["10"];
  // bujindianji_device_sign.value = tempelate.data["11"];
  // dianjimodel_device_sign.value = tempelate.data["12"];
  // fengshan1_device_sign.value = tempelate.data["13"];
  // fengshan2_device_sign.value = tempelate.data["14"];
  // temperature_threshold1_device_sign.value = Number(tempelate.data["16"]);
  // temperature_threshold2_device_sign.value = Number(tempelate.data["15"]);
  // light_min_device_sign.value = Number(tempelate.data["17"]);

  //赋值完毕阶段完成全局指令的发送用于确保当前所有设备被正确启动 
  if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/control?content=${control_model.value.f_value[1].split(":")[1]}&topic=${control_model.value.topic.split("|")[1]}&d_no=null`);
    //将伴随着的control_sign进行修改
    // 发送请求直接修改t_direct中的内容--由于自动手动仅由服务端控制故不需要和底层设备进行握手
    //启用其他控件
    dianjimodel_bool.value = true;
    bujindianji_bool.value = true;
    ketiaodeng_bool.value = true;
    fengshan1_bool.value = true;
    fengshan2_bool.value = true;
  }
  else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/control?content=${control_model.value.f_value[0].split(":")[1]}&topic=${control_model.value.topic.split("|")[0]}&d_no=null`);
    // 发送请求直接修改t_direct中的内容--由于自动手动仅由服务端控制故不需要和底层设备进行握手
    //禁用其他控件--将空间相关的响应式变量置为空
    dianjimodel_bool.value = false;
    bujindianji_bool.value = false;
    ketiaodeng_bool.value = false;
    fengshan1_bool.value = false;
    fengshan2_bool.value = false;
  }
  if (bujindianji_sign.value === bujindianji.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/bujindianji?content=${bujindianji.value.header.split("|")[0]}&topic=${bujindianji.value.topic}&d_no=null`);
  }
  else if (bujindianji_sign.value === bujindianji.value.f_value[0].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/bujindianji?content=${bujindianji.value.header.split("|")[1]}&topic=${bujindianji.value.topic}&d_no=null`);
  }
  if (ketiaodeng_sign.value === ketiaodeng.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/ketiaodeng?content=${ketiaodeng.value.header.split("|")[0]}&topic=${ketiaodeng.value.topic}&d_no=null`);
  }
  else if (ketiaodeng_sign.value === ketiaodeng.value.f_value[0]) {
    const result = await axios.get(`/api/zhiling/ketiaodeng?content=${ketiaodeng.value.header.split("|")[1]}&topic=${ketiaodeng.value.topic}&d_no=null`);
  }
  if (fengshan1_sign.value === fengshan1.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/fengshan1?content=${fengshan1.value.header.split("|")[0]}&topic=${fengshan1.value.topic}&d_no=null`);
  }
  else if (fengshan1_sign.value === fengshan1.value.f_value[0]) {
    const result = await axios.get(`/api/zhiling/fengshan1?content=${fengshan1.value.header.split("|")[1]}&topic=${fengshan1.value.topic}&d_no=null`);
  }
  if (fengshan2_sign.value === fengshan2.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/fengshan2?content=${fengshan2.value.header.split("|")[0]}&topic=${fengshan2.value.topic}&d_no=null`);
  }
  else if (fengshan2_sign.value === fengshan2.value.f_value[0]) {
    const result = await axios.get(`/api/zhiling/fengshan2?content=${fengshan2.value.header.split("|")[1]}&topic=${fengshan2.value.topic}&d_no=null`);
  }
  if (dianjimodel_sign.value === dianji_model.value.f_value[0].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/dianji_model?content=${dianji_model.value.f_value[0].split(":")[1]}&topic=${dianji_model.value.topic}&d_no=null`);
  }
  else if (dianjimodel_sign.value === dianji_model.value.f_value[1].split(":")[0]) {
    const result = await axios.get(`/api/zhiling/dianji_model?content=${dianji_model.value.f_value[1].split(":")[1]}&topic=${dianji_model.value.topic}&d_no=null`);
  }

  setInterval1 = setInterval(async () => {
    //获取到布局模板变量的值
    //全局实时变量
    const result = await axios.get("/api/direct?d_no=null");
    really_all.value = result.data;
    const result6 = await axios.get("/api/direct/temperature1?mode=1");
    t1_min = result6.data.min;
    t1_max = result6.data.max;
    const result7 = await axios.get("/api/direct/temperature2?mode=1");
    t2_min = result7.data.min;
    t2_max = result7.data.max;
    const result8 = await axios.get("/api/direct/light_min?mode=1");
    l_min_min = result8.data.min;
    l_min_max = result8.data.max;

    // 局部实时变量 
    // const result60 = await axios.get("/api/direct/temperature1?mode=0");
    // t1_device_min = result60.data.min;
    // t1_device_max = result60.data.max;
    // const result70 = await axios.get("/api/direct/temperature2?mode=0");
    // t2_device_min = result70.data.min;
    // t2_device_max = result70.data.max;
    // const result80 = await axios.get("/api/direct/light_min?mode=0");
    // l_min_device_min = result80.data.min;
    // l_min_device_max = result80.data.max;

    //挂载完毕阶段进行bool变量的初始化转化赋值
    //获取到实际状态的值
    control_sign.value = really_all.value["0"];
    if (control_sign.value === control_model.value.f_value[1].split(":")[0]) {
      dianjimodel_bool.value = true;
      bujindianji_bool.value = true;
      ketiaodeng_bool.value = true;
      fengshan1_bool.value = true;
      fengshan2_bool.value = true;
    }
    else if (control_sign.value === control_model.value.f_value[0].split(":")[0]) {
      dianjimodel_bool.value = false;
      bujindianji_bool.value = false;
      ketiaodeng_bool.value = false;
      fengshan1_bool.value = false;
      fengshan2_bool.value = false;
    }
    ketiaodeng_sign.value = really_all.value["1"];
    bujindianji_sign.value = really_all.value["2"];
    dianjimodel_sign.value = really_all.value["3"];
    fengshan1_sign.value = really_all.value["4"];
    fengshan2_sign.value = really_all.value["5"];

    //在挂载阶段首先访问当前的device下是否存在对应的sign，若存在则进行sign的赋值操作(依据表中的d_no)；若不存在则进行默认值的插入
    // console.log("signzhi:" + signzhi.value);
    // const tempelate = await axios.get(`/api/handshake?d_no=${signzhi.value}`);
    // control_device_sign.value = tempelate.data["9"];
    // ketiaodeng_device_sign.value = tempelate.data["10"];
    // bujindianji_device_sign.value = tempelate.data["11"];
    // dianjimodel_device_sign.value = tempelate.data["12"];
    // fengshan1_device_sign.value = tempelate.data["13"];
    // fengshan2_device_sign.value = tempelate.data["14"];
  }, 1500)
})


//卸载阶段完成当前的定时器的清除
onUnmounted(() => {
  clearInterval(setInterval1);
})



</script>

<style scoped>
.control {
  border: 3px solid black;
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: skyblue;
  margin-top: 0;
  flex-direction: column;
}

.all {
  width: 100%;
  background-color: gray;
  margin-top: 0;
  margin-left: 0;
  height: 420px;
  border: 3px solid black;
}

.local {
  width: 100%;
  /* display: flex; */
  height: 500px;
}

/* 为输入框进行样式设计  */
.temperature1>input,
.temperature2>input,
.light_min>input,
.light_max>input {
  border: 1px solid black;
  height: 10px;
  /* 去除默认聚焦的效果 */
  outline: none;
}

/* 为输入框被激活的状态进行样式设计 */
.temperature1>input:focus,
.temperature2>input:focus,
.light_min>input:focus,
.light_max>input:focus {}

/* 为输入框文本进行样式设计 */
.temperature1>input::placeholder,
.temperature2>input::placeholder,
.light_min>input::placeholder,
.light_max>input::placeholder {
  /* font-size: inherit; */
  font-size: 14px;
  /* 让 placeholder 字体和输入内容保持一致 */
}



/* 输入框的提交按钮进行样式设计 */
.input_submit {
  width: 50px;
  height: 20px;
  margin-top: 5px;
  margin-left: 50px;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  background-color: antiquewhite;
  border: 1px solid black;
  border-radius: 3px;
}

.input_submit:hover {
  cursor: pointer;
}

/* 为单独的情况的盒子进行样式设计  */
.only {
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  margin-left: 5px;
}
</style>
