<template>
  <a-button
      type='primary'
      style='margin-bottom: 8px'
      @click='showAddUserForm'
  >
    Add User
  </a-button>
  <a-table
      :dataSource='users'
      :columns='columns'
      rowKey='id'
      bordered
  >
    <template #action='{ record }'>
      <div>
        <a-button
            type='primary'
            @click='showUser(record.id)'
            style='margin-right: 5px'
            ghost
        >
          View
        </a-button>
        <a-button
            @click='showEditUserForm(record.id)'
            style='margin-right: 5px'
        >
          Edit
        </a-button>
        <a-popconfirm
            title='Delete user? This action cannot be undone'
            @confirm='deleteUser(record.id)'
            okText='Delete'
            okType='danger'
        >
          <template #icon>
            <WarningOutlined style='color: red'/>
          </template>
          <a-button danger>
            Delete
          </a-button>
        </a-popconfirm>
      </div>
    </template>
  </a-table>
</template>
<script>
import api from '../api';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined
} from '@ant-design/icons-vue';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
    WarningOutlined
  },
  data() {
    return {
      users: [],
      columns: [
        {
          title: 'First Name',
          dataIndex: 'first_name',
          key: 'first_name',
          ellipsis: true
        },
        {
          title: 'Last Name',
          dataIndex: 'last_name',
          key: 'last_name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Action',
          key: 'action',
          slots: {customRender: 'action'},
        }
      ]
    };
  },
  methods: {
    async deleteUser(userId) {
      await api.helpDelete(`users/${userId}`);
      this.users = this.users.filter(({id}) => id !== userId);
    },
    showUser(userId) {
      this.$router.push({name: 'user-show', params: {userId}});
    },
    showAddUserForm() {
      this.$router.push('/user/add');
    },
    showEditUserForm(userId) {
      this.$router.push({name: 'user-form', params: {userId}});
    }
  },
  async mounted() {
    this.users = await api.helpGet('users');
  }
};
</script>
