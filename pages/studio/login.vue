<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'studio' })

const { signIn, getSession } = useStudioAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Already signed in? Skip straight to the dashboard.
onMounted(async () => {
  if (await getSession()) await navigateTo('/studio')
})

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await signIn(email.value.trim(), password.value)
    await navigateTo('/studio')
  } catch (e: unknown) {
    error.value = (e as { message?: string })?.message || 'Sign-in failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <form class="login__card" @submit.prevent="submit">
      <h1 class="login__title">Studio</h1>
      <p class="login__sub">Sign in to continue</p>

      <label class="login__field">
        <span>Email</span>
        <input v-model="email" type="email" autocomplete="username" required />
      </label>

      <label class="login__field">
        <span>Password</span>
        <input v-model="password" type="password" autocomplete="current-password" required />
      </label>

      <p v-if="error" class="login__error">{{ error }}</p>

      <button class="login__btn" type="submit" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 24px;
}
.login__card {
  width: 100%;
  max-width: 360px;
  padding: 32px 28px;
  border-radius: 18px;
  background: rgba(var(--fui-theme-surface), 0.9);
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
  box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.6);
}
.login__title {
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: -0.02em;
}
.login__sub {
  margin: 4px 0 24px;
  font-size: 0.9rem;
  color: rgba(var(--fui-theme-on-surface), 0.6);
}
.login__field {
  display: block;
  margin-bottom: 16px;
}
.login__field span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 6px;
  color: rgba(var(--fui-theme-on-surface), 0.7);
}
.login__field input {
  width: 100%;
  padding: 11px 13px;
  border-radius: 10px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.18);
  background: rgba(var(--fui-theme-on-surface), 0.04);
  color: inherit;
  font-size: 0.95rem;
}
.login__field input:focus {
  outline: none;
  border-color: rgb(var(--fui-theme-primary));
}
.login__error {
  margin: 0 0 14px;
  font-size: 0.85rem;
  color: rgb(var(--fui-theme-error, 220 60 60));
}
.login__btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: rgb(var(--fui-theme-primary));
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
}
.login__btn:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
