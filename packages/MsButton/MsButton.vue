
<template>
  <el-button class="ms-bpmn-test-button" :type="type" :size="size" :disabled="disabled" :loading="loading" @click="onClick">
    <slot>{{ name }}</slot>
  </el-button>
</template>
<script setup lang="ts">

interface Props {
  name?: string // 按钮文本 string | slot
  type?: 'primary'| 'success'| 'warning'| 'danger'| 'info'| 'text' // 按钮类型
  size?: 'large'| 'default'| 'small' // 按钮尺寸
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
}
const props = withDefaults(defineProps<Props>(), {
  name: '按钮',
  type: 'primary',
  size: 'default',
  disabled: false,
  loading: false
})
const emit = defineEmits(['click'])

console.log('props', props)

function onClick (e: Event) {
  emit('click', e)
}
</script>
<style lang="scss" scoped>
</style>
