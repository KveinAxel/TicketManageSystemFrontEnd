<template>
    <div>
        <el-card class="login-form-layout">
            <el-form autoComplete="on"
                     :model="loginForm"
                     :rules="loginRules"
                     ref="loginForm"
                     style="margin: auto 20px"
                     label-position="left">
                <div style="text-align: center">
                    <svg-icon icon-class="login" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
                </div>
                <h2 class="login-title color-main">TicketManageSystem</h2>
                <el-form-item prop="username" required>
                    <el-input name="username"
                              type="text"
                              v-model="loginForm.username"
                              autoComplete="on"
                              placeholder="请输入用户名">
                        <span slot="prefix">
                            <svg-icon icon-class="user" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" required>
                    <el-input name="password"
                              :type="pwdType"
                              @keyup.enter.native="handleLogin"
                              v-model="loginForm.password"
                              autoComplete="on"
                              placeholder="请输入密码">
                        <span slot="prefix">
                            <svg-icon icon-class="password" class="color-main"></svg-icon>
                        </span>
                        <span slot="suffix" @click="showPwd">
                            <svg-icon icon-class="eye" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item label="登录方式" required>
                    <el-radio-group v-model="loginForm.admin">
                        <el-radio label="admin"></el-radio>
                        <el-radio label="user"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;text-align: center">
                    <el-button style="width: 45%" type="primary" :loading="loading" @click="handleLogin">
                        登录
                    </el-button>
                    <el-button style="width: 45%" :loading="loading" @click="handleRegister">
                        注册
                    </el-button>

                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {isvalidUsername} from '@/utils/validate';
    import login_center_bg from '@/assets/images/login_center_bg.png'
    import {login} from '@/api/user'

    export default {
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 3) {
                    callback(new Error('密码不能小于3位'))
                } else {
                    callback()
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: '',
                    admin: '',
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}]
                },
                loading: false,
                pwdType: 'password',
                login_center_bg,
                dialogVisible: false,
                supportDialogVisible: false
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        let params = new URLSearchParams();
                        params.append('username', this.loginForm.username);
                        params.append('password', this.loginForm.password);
                        params.append('admin', this.loginForm.admin);
                        login(params).then(response => {
                            this.$message(response.message);
                        });
                        this.loading = false;
                        if(this.loginForm.admin === 'admin') {
                            this.$router.push({path: '/admin'})
                        } else {
                            this.$router.push({path: '/user'})
                        }
                    } else {
                        console.log('参数验证不合法！');
                        return false
                    }
                })
            },
            handleRegister() {
                this.$router.push({path: '/register'})
            }
        }
    }
</script>

<style scoped>
    .login-form-layout {
        position: absolute;
        left: 0;
        right: 0;
        width: 360px;
        margin: 100px auto;
        border-top: 10px solid #409EFF;
    }

    .login-title {
        text-align: center;
    }
</style>
