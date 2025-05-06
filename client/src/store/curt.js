// src/stores/useUserStore.js
import { defineStore } from 'pinia';
 
// 全局屏蔽器控制台

export const useUserStore = defineStore('user', {
  state: () => ({
    device_sign:false,
    action_sign:false
  })
});