<template>
  <div class="control">
    <div class="all">
      <h1>全局指令</h1>
      <!-- 同步时间    -->
      <div v-for="item in control_array">
        <!-- 类型1： -->
        <div class="switch" v-if="item.f_type === 1 && item.mode === 1 || item.mode === 'null'">
          {{ item.t_name }}：
          <el-switch @change="submit(item)" v-model="item.value" active-text="手动" inactive-text="自动" active-value="手动"
            inactive-value="自动" />
        </div>

        <!-- 类型2： -->
        <div class="input" v-if="item.f_type === 2 && item.mode === 1 || item.mode === 'null'">
          {{ item.t_name }}：
          <input type="text" v-model="item.value" @focus="handleInputFocus(item)" @blur="handleInputBlur">
          <button class="input_submit" @click="submit(item)">提交</button>
        </div>

        <!-- 类型3： -->
        <div class="slider-demo-block" v-if="item.f_type === 3 && item.mode === 1 || item.mode === 'null'">
          {{ item.t_name }}：
          <span class="demonstration">{{ item.t_name }}</span>
          <el-slider v-model="item.value" @change="submit(item)" />
        </div>

        <!-- 类型4： -->
        <div class="timepicker" v-if="item.f_type === 4 && item.mode === 1 || item.mode === 'null'">
          {{ item.t_name }}：
          <el-date-picker v-model="item.value" type="datetimerange" start-placeholder="Start Date"
            end-placeholder="End Date" :default-time="defaultTime" @change="submit(item)" />
        </div>

        <!-- 类型5： -->
        <div class="radio" v-if="item.f_type === 5 && item.mode === 1 || item.mode === 'null'">
          {{ item.t_name }}：
          <el-radio-group v-model="item.value" @change="submit(item)">
            <el-radio value="正转" size="large">正转</el-radio>
            <el-radio value="反转" size="large">反转</el-radio>
          </el-radio-group>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import axios from "axios";
// import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from "../store/curt";
const Pinia = useUserStore();
//获取到渲染数组
//全局数组变量
const control_array: any = ref();

//定时器变量
let x;

// 跟踪当前正在编辑的输入框
const currentFocusedInput: any = ref(null);

// 监听输入框焦点状态
function handleInputFocus(item: any) {
  currentFocusedInput.value = item;
}

function handleInputBlur() {
  currentFocusedInput.value = null;
}

(async () => {
  const result = await axios.get("/api/zhiling");
  control_array.value = result.data;
  console.log("control_array:" + control_array.value);
})()
// 开关(包括时间、开关、单选、输入、滚动)方法
async function submit(value) {
  //对自动手动控件特殊处理，后续尽量不要动主题
  const result = await axios.get(`/api/zhiling/${value.luyou}?d_no=${value.mode === 1 ? "null" : value.d_no}&topic=${value.id !== 0 ? value.topic : value.value === "自动" ? value.topic.split("|")[0] : value.topic.split("|")[1]}&content=${value.value}`);
}
const defaultTime = [new Date(2000, 1, 1, 12, 0), new Date(2000, 1, 1, 12, 0, 0)]; // '12:00:00'

onMounted(() => {
  x = setInterval(async () => {
    const result = await axios.get("/api/zhiling");
    // 更新control_array时保留正在编辑的输入框的值
    if (currentFocusedInput.value) {
      const focusedInputId = currentFocusedInput.value.id;
      const currentValue = currentFocusedInput.value.value;
      control_array.value = result.data.map((item: any) => {
        if (item.id === focusedInputId && currentFocusedInput.value && currentFocusedInput.value.f_type === 2) {
          return { ...item, value: currentValue };
        }
        return item;
      });
    } else {
      control_array.value = result.data;
    }
    console.log("control_array:" + control_array.value);
  }, 5000);
})

onUnmounted(() => {
  clearInterval(x);
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
