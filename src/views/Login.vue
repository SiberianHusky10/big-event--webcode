<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'

//导入控制消息提示的组件
import { ElMessage } from 'element-plus'

//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

const registerData = ref({
    username:'',
    password:'',
    rePassword:''
})

//定义校验密码的函数
const checkrePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('再次输入密码不能为空'))
    } else if (value !== registerData.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}
//定义表单校验规则
const rules = {
    username:[
        {required: true, message: '用户名不能为空', trugger: 'blur'},
        {min: 5, max: 16, message: '用户名必须是5~16位非空字符', trugger: 'blur'}
    ],
    password:[
    {required: true, message: '密码不能为空', trugger: 'blur'},
        {min: 5, max: 16, message: '密码必须是5~16位非空字符', trugger: 'blur'}
    ],
    rePassword:[
        {validator: checkrePassword, trigger: 'blur'}
    ]
}

//调用后台接口， 完成注册
import {userRegisterService, userLoginService} from '@/api/user.js'
const register = async()=>{
    let result = await userRegisterService(registerData.value);
    // if (result.code == 0) {
    //     alert(result.msg ? result.msy : '注册成功');
    // } else {
    //     alert('注册失败');
    // }
    //alert(result.message ? result.message : "注册成功");
    ElMessage.success(result.message ? result.message : "注册成功");
}

//绑定登录数据，复用注册表单的数据,复用表单数据校验
//表单数据校验
//登录函数
//导入路由
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'
const router = useRouter();
const tokenStore = useTokenStore();
const login = async()=>{
    //调用接口，完成登录
    let result = await userLoginService(registerData.value);
    // if(result.code == 0) {
    //     alert(result.msg ? result.msg : "登录成功");
    // } else {
    //     alert("登录失败");
    // }
    //alert(result.message ? result.message : "登录成功");
    ElMessage.success(result.message ? result.message : "登录成功");
    //把登陆成功的token存入到pinia中
    tokenStore.setToken(result.data);
    router.push('/');
}

//定义函数，清空数据模型的模型
const clearRegisData = ()=>{
    registerData.value={
        username: '',
        password: '',
        rePassword: ''
    }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item  prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>