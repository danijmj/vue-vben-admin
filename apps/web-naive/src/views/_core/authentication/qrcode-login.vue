<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@optiml/common-ui';
import { LOGIN_PATH } from '@optiml/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
