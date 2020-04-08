<template>
    <div class="app-container">
        <!-- user info -->
        <!-- message box -->
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        @click="handleSearchList()"
                        type="primary"
                        size="small">
                    查询结果
                </el-button>
                <el-button
                        style="float: right;margin-right: 15px"
                        @click="handleResetSearch()"
                        size="small">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="searchQuery" size="small" label-width="140px">
                    <el-form-item label="航班号：">
                        <el-input style="width: 203px" v-model="searchQuery.flight_number" placeholder="航班号"></el-input>
                    </el-form-item>
                    <el-form-item label="起飞时间：">
                        <el-date-picker
                                v-model="searchQuery.begin_time"
                                type="datetime"
                                align="right"
                                placeholder="选择起飞时间"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="降落时间：">
                        <el-date-picker
                                v-model="searchQuery.end_time"
                                type="datetime"
                                align="right"
                                placeholder="选择降落时间"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="起飞地点：">
                        <el-input style="width: 203px" v-model="searchQuery.begin_place" placeholder="起飞地点"></el-input>
                    </el-form-item>
                    <el-form-item label="降落地点：">
                        <el-input style="width: 203px" v-model="searchQuery.end_place" placeholder="降落地点"></el-input>
                    </el-form-item>
                    <el-form-item label="最高票价：">
                        <el-input style="width: 203px" v-model="searchQuery.under_price" placeholder="最高票价"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有余票：">
                        <template>
                            <el-radio v-model="searchQuery.has_remain" label=true>有余票</el-radio>
                            <el-radio v-model="searchQuery.has_remain" label=false>无余票</el-radio>
                        </template>
                        <el-input style="width: 203px" v-model="searchQuery.has_remain" placeholder="航班号"></el-input>
                    </el-form-item>
                    <el-form-item label="排序方式：">
                        <template>
                            <el-select v-model="searchQuery.key" clearable placeholder="请选择排序方式">
                                <el-option
                                        v-for="item in keyOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <el-input style="width: 203px" v-model="searchQuery.key" placeholder="航班号"></el-input>
                    </el-form-item>
                    <el-form-item label="是否升序：">
                        <template>
                            <el-radio v-model="searchQuery.is_asc" label=true>升序</el-radio>
                            <el-radio v-model="searchQuery.is_asc" label=false>降序</el-radio>
                        </template>
                        <el-input style="width: 203px" v-model="searchQuery.is_asc" placeholder="航班号"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>航班列表</span>
            <el-button
                    class="btn-add"
                    @click="handleMessageBox()"
                    size="mini">
                消息
            </el-button>
            <el-button
                    class="btn-add"
                    @click="handleRecommend()"
                    size="mini">
                航班推荐
            </el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="ticketTable"
                      :data="list"
                      stripe
                      style="width: 100%"
                      v-loading="listLoading"
                      border>
                <el-table-column label="航班号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.flight_number}}</template>
                </el-table-column>
                <el-table-column label="起飞地点" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.begin_place}}</template>
                </el-table-column>
                <el-table-column label="起飞时间" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.begin_time}}</template>
                </el-table-column>
                <el-table-column label="降落地点" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.end_place}}</template>
                </el-table-column>
                <el-table-column label="降落时间" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.end_time}}</template>
                </el-table-column>
                <el-table-column label="余票" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.remain}}</template>
                </el-table-column>
                <el-table-column label="票价" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button
                                    size="mini"
                                    @click="handleFlyBy(scope.$index, scope.row)">经停
                            </el-button>
                            <el-button
                                    size="mini"
                                    @click="handlePurchase(scope.$index, scope.row)">购票
                            </el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog
            title="经停"
            :visible.sync="flyByInfo.dialogVisible"
            width="40%">
        <span>航班号：</span>
        <span>{{flyByInfo.flight_number}}</span>
        <el-table stripe :data="flyByInfo.list" border>
            <el-table-column label="经停地点">
                <template slot-scope="scope">{{scope.row.fly_by_place}}</template>
            </el-table-column>
            <el-table-column label="经停时间">
                <template slot-scope="scope">{{scope.row.fly_by_time}}</template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="flyByInfo.dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
            title="消息"
            :visible.sync="message_box.dialogVisible"
            width="40%">
        <el-table
                :data="message_box.list"
                stripe
                style="width: 100%">
            <el-table-column
                    label="消息"
                    width="180"
                    prop="message">
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="message_box.dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {userAppointment, userPurchase, userMessageBox} from "@/api/user";
    import {ticketRecommend, ticketSearch, ticketList} from "@/api/ticket";

    export default {
        name: "userView",
        data() {
            return {
                message_box: {
                    dialogVisible:false,
                    list: []
                },
                keyOptions: [{
                    value: 'price',
                    label: '票价'
                }, {
                    value: 'remain',
                    label: '余票数量'
                }, {
                    value: 'time',
                    label: '飞行时间'
                }],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                defaultSearchQuery: {
                    flight_number: null,
                    airline: null,
                    begin_place: null,
                    begin_time: null,
                    end_place: null,
                    end_time: null,
                    under_price: null,
                    has_remain: null,
                    key: null,
                    is_asc: null
                },
                searchQuery: {
                    flight_number: null,
                    airline: null,
                    begin_place: null,
                    begin_time: null,
                    end_place: null,
                    end_time: null,
                    under_price: null,
                    has_remain: true,
                    key: null,
                    is_asc: true
                },
                list: [],
                listLoading: true,
                flyByInfo: {
                    dialogVisible: false,
                    flight_number: null,
                    list: [],
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
            handleMessageBox() {
                userMessageBox().then(response => {
                    const message_list = JSON.parse(response.message);
                    const len = message_list.length;
                    for (let i = 0; i < len; i++) {
                        this.message_box.list.push({message: message_list[i]});
                    }
                    this.message_box.dialogVisible = true;
                })
            },
            handleSearchList() {
                this.$confirm('是否要进行查询', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    for (let key in this.searchQuery) {
                        if (this.searchQuery[key] != null && this.searchQuery.hasOwnProperty(key)) {
                            if (key === 'begin_time' || key === 'end_time') {
                                params.append(key, `${this.searchQuery[key].getTime() / 1000}`);
                            } else {
                                params.append(key, this.searchQuery[key]);
                            }
                        }
                    }
                    ticketSearch(params).then(response => {
                        this.list = JSON.parse(response.message);
                    });
                    this.searchQuery = this.defaultSearchQuery;
                })
            },
            handleResetSearch() {
                this.searchQuery = this.defaultSearchQuery;
                this.getList();
            },
            getList() {
                this.listLoading = true;
                ticketList.then(response => {
                    this.listLoading = false;
                    this.list = JSON.parse(response.message);
                    if (Array.isArray(this.list)) {
                        let len = this.list.length;
                        for (let i = 0; i < len; i++) {
                            this.list[i].begin_time = new Date(this.list[i].begin_time * 1000);
                            this.list[i].end_time = new Date(this.list[i].end_time * 1000);
                        }
                    } else {
                        console.log('getList res is not array');
                    }
                });
            },
            handleFlyBy(index, row) {
                this.flyByInfo.list = JSON.parse(row.fly_by);
                let len = this.flyByInfo.list;
                for (let i = 0; i < len; i++) {
                    this.flyByInfo.list[i].fly_by_time = new Date(this.flyByInfo.list[i].fly_by_time * 1000);
                }
                this.flyByInfo.flight_number = row.flight_number;
                this.flyByInfo.dialogVisible = true;
            },
            handlePurchase(index, row) {
                if (row.remain > 0) {
                    this.$confirm('是否确定购买?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        userPurchase(row.id).then(response => {
                            this.$message({
                                message: response.message,
                                type: 'success'
                            });
                        });
                    });
                } else {
                    this.$confirm('该一票已售空，是否预约？', '提示', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        let params = new URLSearchParams();
                        params.append('ticket_id', row.id);
                        userAppointment(params).then(response => {
                            this.$message({
                                message: response.message,
                                type: 'success'
                            })
                        })
                    })
                }
            },
            handleRecommend() {
                this.$prompt('请输入起点', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({begin_place}) => {
                    this.$prompt('请输入终点', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({end_place}) => {
                        let params = new URLSearchParams();
                        params.append('begin_place', begin_place);
                        params.append('end_place', end_place);
                        ticketRecommend(params).then(response => {
                            const recommend_list = JSON.parse(response.message);
                            if (recommend_list.length === 0) {
                                this.$alert('无推荐航班', '推荐航班', {
                                    confirmButtonText: '确定',
                                });
                            } else {
                                let msg = '';
                                let len = recommend_list.length;
                                for (let i = 0; i < len; i++) {
                                    msg += recommend_list[i] + '\n'
                                }
                                this.$alert('推荐航班为：\n' + msg, '推荐航班', {
                                    confirmButtonText: '确定',
                                })
                            }
                        })
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .app-container {
        margin-top: 40px;
        margin-left: 120px;
        margin-right: 120px;
    }
</style>
