<template>
  <a-spin
      tip='Loading User'
      v-if='user === null'
  >
  </a-spin>
  <a-card
      hoverable
      style='width: 60%'
      v-else
  >
    <template
        class='ant-card-actions'
        #actions
    >
      <a-button
          @click='showAllUsers'
          type='primary'
          style='margin-right: 5px'
          ghost
      >
        Home
      </a-button>
      <a-button
          @click='showEditUserForm'
          style='margin-right: 5px'
      >
        Edit
      </a-button>
      <a-popconfirm
          title='Delete user? This action cannot be undone'
          @confirm='deleteUser'
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
    </template>
    <a-card-meta
        :title='`${user.first_name} ${user.last_name}`'
        :description='user.email'
    >
    </a-card-meta>
  </a-card>
</template>
<script>
import api from '../api';
import {
  EditOutlined,
  ArrowLeftOutlined,
  WarningOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';

export default {
  props: ['userId'],
  data() {
    return {
      user: null
    }
  },
  components: {
    EditOutlined,
    ArrowLeftOutlined,
    WarningOutlined,
    DeleteOutlined
  },
  methods: {
    async loadUser() {
      this.user = await api.helpGet(`users/${this.userId}`);
      console.log(this.user);
    },
    showAllUsers() {
      this.$router.push({name: 'users'});
    },
    showEditUserForm() {
      this.$router.push({name: 'user-form', params: {userId: this.userId}});
    },
    async deleteUser() {
      await api.helpDelete(`users/${this.userId}`);
      this.showAllUsers();
    }
  },
  async mounted() {
    console.log(11);
    await this.loadUser();
  }
};
</script>

