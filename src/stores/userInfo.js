import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfoStore = defineStore('userInfo',()=>{
    //定义状态相关内容

    const info = ref({});

    const setInfo = (newInfo)=>{
        info.value = newInfo;
    }

    const removeInfo = ()=>{
        info.value = {}
    }

    return {info,setInfo,removeInfo}
},{persist:true})

// export default useUserInfoStore;