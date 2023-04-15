<template>
  <a-card
      hoverable
      style='width: 100%'
      :loading='loading'
  >
    <a-form
        :model='user'
        :label-col='labelCol'
        :wrapper-col='wrapperCol'
        :rules='rules'
    >
      <a-form-item
          label='First Name'
          v-bind='validationErrors.first_name'
      >
        <a-input
            v-model:value='user.first_name'
        />
      </a-form-item>
      <a-form-item
          label='Last Name'
          v-bind='validationErrors.last_name'
      >
        <a-input
            v-model:value='user.last_name'
        />
      </a-form-item>
      <a-form-item
          label='Email'
          v-bind='validationErrors.email'
      >
        <a-input
            v-model:value='user.email'
        />
      </a-form-item>
      <a-form-item
          :wrapper-col='{ span: 14, offset: 4 }'
      >
        <a-button
            size='large'
            type='primary'
            @click='handleSubmit'
        >
          {{ isEdit ? 'Update' : 'Create' }}
        </a-button>
        <a-button
            size='large'
            style='margin-left: 10px'
            @click='resetFields'
            v-if='!isEdit'
        >
          Reset
        </a-button>
        <a-button
            size='large'
            style='margin-left: 10px'
            @click='showAllUsers'
            danger
        >
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import api from '../api';
import {Form} from 'ant-design-vue';
import {reactive} from 'vue';
import {useRouter} from 'vue-router'

const {useForm} = Form;

export default {

  setup(props) {
    let user = reactive({
      first_name: '',
      last_name: '',
      email: '',
    });

    const rules = reactive({
      first_name: [
        {
          required: true,
          message: 'Please provide user first name',
          trigger: 'blur'
        },
      ],
      last_name: [
        {
          required: true,
          message: 'Please provide user last name',
          trigger: 'blur'
        },
      ],
      email: [
        {
          required: true,
          message: 'Please provide user email',
          trigger: 'blur'
        },
      ],
    });

    const {
      resetFields,
      validate,
      validateInfos: validationErrors
    } = useForm(user, rules);

    const router = useRouter();

    const handleSubmit = () => {
      validate()
          .then(
              async () => {
                const {userId} = props;
                const updatedUser = !!userId ?
                    await api.helpPatch(`users/${bookId}`, user) :
                    await api.helpPost('users', user);
                Object.assign(user, updatedUser);
                router.push({name: 'user-show', params: {userId: user.id}});
              }
          )
          .catch(() => {
          });
    }

    return {
      resetFields,
      validationErrors,
      user,
      handleSubmit,
      rules
    };
  },
  props: ['userId'],
  data() {
    return {
      isEdit: !!this.userId,
      loading: !!this.userId,
      labelCol: {span: 4},
      wrapperCol: {span: 14},
    }
  },
  methods: {
    async loadUser() {
      Object.assign(this.user, await api.helpGet(`users/${this.userId}`));
      this.loading = false;
    },
    showAllUsers() {
      this.$router.push({name: 'users'});
    },
  },
  async mounted() {
    if (this.isEdit) {
      await this.loadUser();
    }
  }
};
</script>
