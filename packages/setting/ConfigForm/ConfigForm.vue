<!-- 根据配置信息生成表单 -->
<template>
  <a-form-model class="config-form" layout="vertical" :model="formValue">
    <a-form-model-item
      v-for="item in formItems"
      :key="item.prop"
      :prop="item.prop"
      :rules="item.rules"
      :label="item.desc"
      :extra="item.help"
    >
      <a-radio-group
        v-if="item.type === 'radio'"
        v-model="formValue[item.prop]"
        buttonStyle="solid"
      >
        <a-radio-button
          v-for="option in item.options"
          :key="item.prop + option.value"
          :value="option.value"
        >{{ option.label }}</a-radio-button>
      </a-radio-group>
      <a-select v-else-if="item.type === 'select'" v-model="formValue[item.prop]">
        <a-select-option
          v-for="option in item.options"
          :key="item.prop + option.value"
          :value="option.value">{{ option.label }}</a-select-option>
      </a-select>
      <div v-else-if="item.type === 'checkGroup'">
        <a-checkbox
          v-for="opt in item.options"
          :key="opt.value"
          style="margin-top: 8px;"
          v-model="formValue[opt.value]"
        >{{ opt.label }}</a-checkbox>
      </div>
      <tip-icon-picker
        v-else-if="item.type === 'icon-tip'"
        v-model="formValue[item.prop]"
        :placeholder="item.placeholder"
        allowClear
      ></tip-icon-picker>
      <icon-picker
        v-else-if="item.type === 'icon'"
        v-model="formValue[item.prop]"
        :placeholder="item.placeholder"
        allowClear
      ></icon-picker>
      <form-rules-gen v-else-if="item.type === 'rule'" v-model="formValue[item.prop]"></form-rules-gen>
      <a-input-number
        v-else-if="item.type === 'number'"
        :value="formValue[item.prop]"
        :placeholder="item.placeholder"
        :min="1"
        @change="val => handleNumberChange(val, item.prop)"
        class="input-number"
      />
      <a-input v-else v-model="formValue[item.prop]" :placeholder="item.placeholder" />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import IconPicker from '~/components/IconPicker'
import TipIconPicker from './TipIconPicker'
import FormRulesGen from './FormRulesGen'
export default {
  name: 'ConfigForm',
  components: {
    IconPicker,
    TipIconPicker,
    FormRulesGen
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      formValue: {}
    }
  },
  watch: {
    value: {
      handler (val) {
        this.formValue = val
      },
      immediate: true,
      deep: true
    },
    formValue: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    handleNumberChange (val, prop) {
      if (val === '') {
        this.$set(this.formValue, prop, null)
      }
      if (/^[1-9]\d*$/.test(val)) {
        this.$set(this.formValue, prop, val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.config-form {
  padding: 16px;
  .input-number {
    width: 100%;
  }
}
</style>
