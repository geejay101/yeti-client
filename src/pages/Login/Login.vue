<template>
  <div id="auth">
    <div class="background" />
    <a-form
      id="components-form-demo-normal-login"
      ref="form"
      name="normal_login"
      :rules="rules"
      :model="credentials"
      class="login-form"
      @finish="login"
    >
      <login-outlined
        height="30"
      />
      <a-row>
        <h1 class="login-title">
          {{ $t('message.loginTitle') }}
        </h1>
      </a-row>
      <a-form-item name="login">
        <a-input
          v-model:value="credentials.login"
          :placeholder="$t('message.userName')"
        >
          <template #prefix>
            <user-outlined
              style="color: rgba(0,0,0,.25)"
            />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input
          v-model:value="credentials.password"
          type="password"
          :placeholder="$t('message.password')"
        >
          <template #prefix>
            <lock-outlined
              style="color: rgba(0,0,0,.25)"
            />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          {{ $t('message.loginAction') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { LoginOutlined, UserOutlined, LockOutlined } from '@ant-design/icons-vue';

import { mapActions } from 'vuex';
import { AUTH } from '@/constants';

import locale from './locale';

export default {
  name: 'LoginPage',
  i18n: locale,
  components: {
    LoginOutlined,
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      credentials: {
        login: '',
        password: '',
      },
      rules: {
        login: [
          {
            required: true,
            message: this.$t('message.userNameError'),
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: this.$t('message.passwordError'),
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions([AUTH.ACTIONS.AUTH_REQUEST]),
    login() {
      const { login, password } = this.credentials;
      this[AUTH.ACTIONS.AUTH_REQUEST]({ login, password });
      this.$router.push(this.$route.query.redirect || '/');
    },
  },
};
</script>

<style lang="scss">
img {
  margin-bottom: 50px;
}

#auth {
  display: flex;
  height: calc(100% + 10px);
  margin: -10px -10px 0 -10px;
  display: flex;
  justify-content: flex-end;
  position: relative;

  .login-title {
    margin: auto;
    margin-bottom: 1rem;
  }

  .background {
    background: url('https://picsum.photos/1800/900') left top/cover no-repeat;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  #components-form-demo-normal-login {
    padding: 20px 10px 0;
    max-width: 30%;
    height: 100%;
    background-color: #fff;
    flex: 1 1 30%;
    position: relative;

    .anticon-login svg {
      height: 30px;
      width: 30px;
    }
  }

  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
}

</style>
