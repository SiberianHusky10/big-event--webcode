<script setup>
import { ref } from 'vue'
// const userInfo = ref({
//     id: 0,
//     username: 'zhangsan',
//     nickname: 'zs',
//     email: 'zs@163.com',
// })

//用户资料的回写
import { useUserInfoStore } from '@/stores/userInfo';
const userInfoStore = useUserInfoStore();
const userInfo = ref({ ...userInfoStore.info })

//定义校验密码的函数
const checkrePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('再次输入密码不能为空'))
    } else if (value !== userInfo.value.newPassword) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}

//数据校验规则
const rules = {
    password: [
        { required: true, message: '密码不能为空', trugger: 'blur' },
        { min: 5, max: 16, message: '密码必须是5~16位非空字符', trugger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '密码不能为空', trugger: 'blur' },
        { min: 5, max: 16, message: '密码必须是5~16位非空字符', trugger: 'blur' }
    ],
    reNewPassword: [
        { validator: checkrePassword, trigger: 'blur' }
    ]
}

//定义一个密码数据模型

//更改密码函数
import { updateUserPasswordService } from '@/api/user'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const updatePwd = async () => {
    //调用接口，，实现更改密码
    const passwordData = ref({
        old_pwd: userInfo.value.password,
        new_pwd: userInfo.value.newPassword,
        re_pwd: userInfo.value.reNewPassword
    })
    let result = await updateUserPasswordService(passwordData.value);
    ElMessage.success(result.message ? result.message : '修改密码成功');
    //跳转界面
    router.push('/login');
    ElMessage.success('密码成功修改，请重新登录');
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" prop="password">
                        <el-input :prefix-icon="Lock" type="password" v-model="userInfo.password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input :prefix-icon="Lock" type="password" v-model="userInfo.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="再次确认" prop="reNewPassword">
                        <el-input :prefix-icon="Lock" type="password" v-model="userInfo.reNewPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePwd">更改密码</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>