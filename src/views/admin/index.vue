<template>
    <div class="app-container">
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
                    @click="handleAddTicket()"
                    size="mini">
                添加航班
            </el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="ticketTable"
                      stripe
                      :data="list"
                      style="width: 100%"
                      v-loading="listLoading"
                      border>
                <el-table-column label="id" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="航班号" width="100" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.flight_number"></el-input>
                        <span v-show="scope.row.show">{{scope.row.flight_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="起飞地点" width="120" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.begin_place"></el-input>
                        <span v-show="scope.row.show">{{scope.row.begin_place}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="起飞时间" width="120" align="center">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-show="!scope.row.show"
                                v-model="editTicketInfo.begin_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <span v-show="scope.row.show">{{scope.row.begin_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="降落地点" width="120" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.end_place"></el-input>
                        <span v-show="scope.row.show">{{scope.row.end_place}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="降落时间" width="120" align="center">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-show="!scope.row.show"
                                v-model="editTicketInfo.end_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <span v-show="scope.row.show">{{scope.row.end_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="总票数" width="120" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.tickets"></el-input>
                        <span v-show="scope.row.show">{{scope.row.tickets}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="余票" width="120" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.remain"></el-input>
                        <span v-show="scope.row.show">{{scope.row.remain}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否有效" width="120" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.valid"></el-input>
                        <span v-show="scope.row.show">{{scope.row.valid}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="票价" width="120" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-show="!scope.row.show"
                                  v-model="editTicketInfo.price"></el-input>
                        <span v-show="scope.row.show">{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button
                                    v-show="scope.row.show"
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    v-show="scope.row.show"
                                    size="mini"
                                    type="danger"
                                    @click="handleCancel(scope.$index, scope.row)">取消
                            </el-button>
                            <el-button
                                    v-show="scope.row.show"
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                            <el-button
                                    v-show="scope.row.show"
                                    size="mini"
                                    @click="handleEditFlyBy(scope.$index, scope.row)">经停
                            </el-button>
                            <el-button
                                    v-show="scope.row.show"
                                    size="mini"
                                    @click="handleSendMessage(scope.row.id, '')">广播
                            </el-button>
                            <el-button
                                    v-show="!scope.row.show"
                                    size="mini"
                                    @click="handleCancelEdit(scope.$index, scope.row)">取消
                            </el-button>
                            <el-button
                                    v-show="!scope.row.show"
                                    size="mini"
                                    @click="handleEditConfirm(scope.$index, scope.row)">完成
                            </el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog
            title="添加航班"
            :visible.sync="addTicketInfo.dialogVisible"
            width="40%">
        <el-form :inline="true" rules="rules" style="width: 100%;margin-top: 20px" :model="addTicketInfo" size="small"
                 label-width="140px">
            <el-form-item label="航班号：" prop="flight_number">
                <el-input v-model="addTicketInfo.flight_number" placeholder="航班号"></el-input>
            </el-form-item>
            <el-form-item label="航空公司：" prop="airline">
                <el-input v-model="addTicketInfo.airline" placeholder="航空公司"></el-input>
            </el-form-item>
            <el-form-item label="起飞地点：" prop="begin_place">
                <el-input v-model="addTicketInfo.begin_place" placeholder="起飞地点"></el-input>
            </el-form-item>
            <el-form-item label="起飞时间：" required>
                <el-date-picker
                        type="datetime"
                        placeholder="选择日期时间"
                        v-model="addTicketInfo.begin_time"
                        align="right"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="降落地点：" prop="end_place">
                <el-input v-model="addTicketInfo.end_place" placeholder="降落地点"></el-input>
            </el-form-item>
            <el-form-item label="降落时间：" required>
                <el-date-picker
                        type="datetime"
                        placeholder="选择日期时间"
                        v-model="addTicketInfo.end_time"
                        align="right"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="总票量：" prop="tickets">
                <el-input v-model="addTicketInfo.tickets" placeholder="总票量"></el-input>
            </el-form-item>
            <el-form-item label="票价：" prop="price">
                <el-input v-model="addTicketInfo.price" placeholder="票价"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleAddFlyBy()">添加经停</el-button>
            <el-button @click="addTicketInfo.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddTicketConfirm()">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
            title="经停"
            :visible.sync="flyByInfo.dialogVisible"
            width="40%">
        <span>航班号：</span>
        <span>{{flyByInfo.flight_number}}</span>
        <el-table stripe :data="flyByInfo.list" border>
            <el-table-column label="经停地点">
                <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="!scope.row.show" v-model="scope.row.fly_by_place"></el-input>
                    <span v-show="scope.row.show">{{scope.row.fly_by_place}}</span>
                </template>
            </el-table-column>
            <el-table-column label="经停时间">
                <template slot-scope="scope">
                    <el-date-picker
                            v-show="!scope.row.show"
                            type="datetime"
                            placeholder="选择日期时间"
                            v-model="scope.row.fly_by_time"
                            align="right"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <span v-show="scope.row.show">{{scope.row.fly_by_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.show" @click="scope.row.show = false">编辑</el-button>
                    <el-button v-show="!scope.row.show" @click="scope.row.show = true">保存</el-button>
                    <el-button @click="handleDeleteFlyByItem(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleAddFlyByItem()">添加行</el-button>
            <el-button @click="handleCancelEditFlyBy()">取 消</el-button>
            <el-button type="primary" @click="handleEditFlyByConfirm()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {ticketCancel, ticketCreate, ticketDelete, ticketList, ticketSendMessage, ticketUpdate, ticketSameRecommend, ticketSearch} from "@/api/ticket";

    export default {
        name: "adminView",
        data() {
            return {
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
                edit: false,
                list: [],
                defaultFlyByInfo: {
                    dialogVisible: false,
                    flight_number: null,
                    type: '',
                    list: [],
                },
                flyByInfo: {
                    dialogVisible: false,
                    flight_number: null,
                    type: '',
                    list: [],
                },
                defaultEditTicketInfo: {
                    flight_number: '',
                    airline: '',
                    begin_place: '',
                    begin_time: 0,
                    end_place: '',
                    end_time: 0,
                    fly_by: '',
                    tickets: 0,
                    price: 0,
                    remain: 0,
                    created_time: 0,
                    user_list: '',
                    valid: '',
                    appointment: '',
                },
                editTicketInfo: {
                    flight_number: '',
                    airline: '',
                    begin_place: '',
                    begin_time: 0,
                    end_place: '',
                    end_time: 0,
                    fly_by: '',
                    tickets: 0,
                    price: 0,
                    remain: 0,
                    created_time: 0,
                    user_list: '',
                    valid: '',
                    appointment: '',
                },
                defaultAddTicketInfo: {
                    dialogVisible: false,
                    flight_number: '',
                    airline: '',
                    begin_place: '',
                    begin_time: 0,
                    end_place: '',
                    end_time: 0,
                    fly_by: '',
                    tickets: 0,
                    price: 0,
                },
                addTicketInfo: {
                    dialogVisible: false,
                    flight_number: '',
                    airline: '',
                    begin_place: '',
                    begin_time: 0,
                    end_place: '',
                    end_time: 0,
                    fly_by: '',
                    tickets: 0,
                    price: 0,
                },
                rules: {
                    flight_number: [
                        {required: true, message: '请输入航班号', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在2到20之间', trigger: 'blur'}
                    ],
                    airline: [{required: true, message: '请输入航空公司', trigger: 'blur'}],
                    begin_place: [{required: true, message: '请输入起飞地点', trigger: 'blur'}],
                    end_place: [{required: true, message: '请输入降落地点', trigger: 'blur'}],
                    tickets: [{required: true, message: '请输入总票量', trigger: 'blur'}],
                    price: [{required: true, message: '请输入票价', trigger: 'blur'}],
                },
                listLoading: true,
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                ticketList.then(response => {
                    this.listLoading = false;
                    this.list = JSON.parse(response.message);
                    if (Array.isArray(this.list)) {
                        let len = this.list.length;
                        for (let i = 0; i < len; i++) {
                            this.list[i].show = true;
                            this.list[i].begin_time = new Date(this.begin_time * 1000);
                            this.list[i].end_time = new Date(this.end_time * 1000);
                        }
                    } else {
                        console.log('getList res is not array');
                    }
                });
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
            handleAddTicket() {
                this.addTicketInfo = Object.assign({}, this.defaultAddTicketInfo);
                this.addTicketInfo.dialogVisible = true;
            },
            handleEdit(index, row) {
                if (this.edit) {
                    this.$message({
                        message: '一次只能编辑一条航班！',
                        type: 'warning',
                    })
                } else {
                    this.edit = true;
                    row.show = false;
                    this.editTicketInfo = Object.assign({}, row);
                }
            },
            handleCancelEdit(index, row) {
                this.edit = false;
                row.show = true;
                this.editTicketInfo = Object.assign({}, this.defaultEditTicketInfo);
            },
            handleEditConfirm(index, row) {
                this.$confirm('是否确定操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append('id', this.editTicketInfo.id);
                    params.append('flight_number', this.editTicketInfo.flight_number);
                    params.append('airline', this.editTicketInfo.airline);
                    params.append('begin_place', this.editTicketInfo.begin_place);
                    params.append('begin_time', this.editTicketInfo.begin_time.getTime());
                    params.append('end_place', this.editTicketInfo.end_place);
                    params.append('end_time', this.editTicketInfo.end_time.getTime());
                    params.append('fly_by', this.editTicketInfo.fly_by);
                    params.append('tickets', this.editTicketInfo.tickets);
                    params.append('price', this.editTicketInfo.price);
                    params.append('remain', this.editTicketInfo.remain);
                    params.append('created_time', this.editTicketInfo.created_time);
                    params.append('user_list', this.editTicketInfo.user_list);
                    params.append('valid', this.editTicketInfo.valid);
                    params.append('appointment', this.editTicketInfo.appointment);
                    ticketUpdate(params).then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 1000,
                        });
                        this.edit = false;
                        row.show = true;
                        this.editTicketInfo = Object.assign({}, this.defaultEditTicketInfo);
                        this.$confirm('是否需要向该航班客户广播延误通知？', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning'
                        }).then(() => {
                            this.handleSendMessage(row.id, '亲爱的乘客您好，不幸地告诉您，您的航班号为' + row.flight_number + '的航班发生延误，请及时查询航班信息变动，避免不必要的损失')
                        });
                        this.$router.push({path: '/admin'});
                    });
                })
            },
            handleCancel(index, row) {
                this.$confirm('是否要进行取消操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$confirm('是否对该机票客户进行相似航班推荐？', '提示', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        let params = new URLSearchParams();
                        params.append('id', row.id);
                        ticketCancel(params).then(response => {
                            this.$message({
                                message: response.message,
                                type: 'success',
                                duration: 1000
                            });
                            this.$confirm('是否需要向该航班客户广播取消通知？', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'warning'
                            }).then(() => {
                                ticketSameRecommend(row.id).then(response => {
                                    let msg = '亲爱的乘客您好，不幸地告诉您，您的航班号为' + row.flight_number + '的航班已被取消，请及时查询航班信息变动，避免不必要的损失';
                                    if (response.message !== '') {
                                        msg += '\n我们推荐您改乘航班：' + response.message;
                                    }
                                    this.handleSendMessage(row.id, msg)
                                });
                            });
                            this.$router.push({path: '/admin'});
                        });
                    });
                })
            },
            handleDelete(index, row) {
                this.$confirm('是否要进行删除操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append('id', row.id);
                    ticketDelete(params).then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 1000
                        });
                        this.$router.push({path: '/admin'});
                    });
                });
            },
            handleAddTicketConfirm() {
                this.$confirm('是否确定添加？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append('flight_number', this.addTicketInfo.flight_number);
                    params.append('airline', this.addTicketInfo.airline);
                    params.append('begin_place', this.addTicketInfo.begin_place);
                    params.append('begin_time', this.addTicketInfo.begin_time.getTime());
                    params.append('end_place', this.addTicketInfo.end_place);
                    params.append('end_time', this.addTicketInfo.end_time.getTime());
                    params.append('fly_by', this.addTicketInfo.fly_by);
                    params.append('tickets', this.addTicketInfo.tickets);
                    params.append('price', this.addTicketInfo.price);
                    ticketCreate(params).then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 1000,
                        });
                        this.addTicketInfo = Object.assign({}, this.defaultAddTicketInfo);
                        this.$router.push({path: '/admin'})
                    });
                });
            },
            handleAddFlyBy() {
                this.flyByInfo.dialogVisible = true;
                this.flyByInfo.type = 'add';
            },
            handleEditFlyBy(index, row) {
                this.flyByInfo.list = JSON.parse(row.fly_by);
                this.flyByInfo.flight_number = row.flight_number;
                let len = this.flyByInfo.list.length;
                for (let i = 0; i < len; i++) {
                    this.flyByInfo.list[i].show = true;
                    this.flyByInfo.list[i].fly_by_time = new Date(this.flyByInfo.list[i].fly_by_time * 1000);
                }
                this.flyByInfo.type = 'edit';
                this.editTicketInfo = Object.assign({}, row);
                this.flyByInfo.dialogVisible = true;
            },
            handleEditFlyByConfirm() {
                this.$confirm('是否确认操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let len = this.flyByInfo.list.length;
                    let timestamp_list = [];
                    for (let i = 0; i < len; i++) {
                        timestamp_list.push({
                            fly_by_place: this.flyByInfo.list[i].fly_by_place,
                            fly_by_time: this.flyByInfo.list[i].fly_by_time.getTime() / 1000,
                        });
                    }
                    if (this.flyByInfo.type === 'add') {
                        this.addTicketInfo.fly_by = JSON.stringify(timestamp_list);
                        this.flyByInfo = Object.assign({}, this.defaultFlyByInfo);
                    } else {
                        this.editTicketInfo.fly_by = JSON.stringify(timestamp_list);
                        let params = new URLSearchParams();
                        params.append('id', this.editTicketInfo.id);
                        params.append('flight_number', this.editTicketInfo.flight_number);
                        params.append('airline', this.editTicketInfo.airline);
                        params.append('begin_place', this.editTicketInfo.begin_place);
                        params.append('begin_time', this.editTicketInfo.begin_time.getTime());
                        params.append('end_place', this.editTicketInfo.end_place);
                        params.append('end_time', this.editTicketInfo.end_time.getTime());
                        params.append('fly_by', this.editTicketInfo.fly_by);
                        params.append('tickets', this.editTicketInfo.tickets);
                        params.append('price', this.editTicketInfo.price);
                        params.append('remain', this.editTicketInfo.remain);
                        params.append('created_time', this.editTicketInfo.created_time);
                        params.append('user_list', this.editTicketInfo.user_list);
                        params.append('valid', this.editTicketInfo.valid);
                        params.append('appointment', this.editTicketInfo.appointment);
                        ticketUpdate(params).then(response => {
                            this.$message({
                                message: response.message,
                                type: 'success',
                                duration: 1000,
                            });
                            this.edit = false;
                            this.editTicketInfo = Object.assign({}, this.defaultEditTicketInfo);
                            this.$confirm('是否需要向该航班客户广播延误通知？', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'warning'
                            }).then(() => {
                                this.handleSendMessage(this.editTicketInfo.id, '亲爱的乘客您好，不幸地告诉您，您的航班号为' + this.editTicketInfo.flight_number + '的航班发生延误，请及时查询航班信息变动，避免不必要的损失')
                            });
                            this.editTicketInfo = Object.assign({}, this.defaultEditTicketInfo);
                            this.flyByInfo = Object.assign({}, this.defaultFlyByInfo);
                            this.$router.push({path: '/admin'});
                        });
                    }
                });
            },
            handleDeleteFlyByItem(index) {
                this.flyByInfo.list.splice(index, 1);
            },
            handleAddFlyByItem() {
                this.flyByInfo.list.push({fly_by_place: '', fly_by_time: 0});
            },
            handleCancelEditFlyBy() {
                if (this.flyByInfo.type === 'edit') {
                    this.editTicketInfo = Object.assign({}, this.defaultAddTicketInfo);
                }
                this.flyByInfo = Object.assign({}, this.defaultFlyByInfo);
            },
            handleSendMessage(ticket_id, msg) {
                let sendingMsg = '请输入要发送的信息:';
                if (msg !== '') {
                    sendingMsg += '\n默认消息为：\n' + msg;
                }
                this.$prompt(sendingMsg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    let params = new URLSearchParams();
                    params.append('ticket_id', ticket_id);
                    if (value !== '') {
                        params.append('msg', value);
                        ticketSendMessage(params);
                    } else if (msg !== '') {
                        params.append('msg', msg);
                        ticketSendMessage(params);
                    } else {
                        this.$message({
                            message: '输入的消息为空',
                            type: 'warning',
                        })
                    }
                });
            },
        }
    }
</script>
<style></style>
