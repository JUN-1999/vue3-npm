<!--  -->
<template>
  <div class="form-grid">
    <el-form
      @submit.native.prevent
      :style="{
        gap: '18px 30px',
        display: 'grid',
        gridTemplateColumns: `repeat(${
          props.repeat != 0 ? props.repeat : 'auto-fit'
        },${props.valuewidth == 'auto' ? '1fr' : template_columns_width})`,
      }"
      inline
      v-bind="attributes"
      ref="formRef"
      :model="modelValue"
    >
      <el-form-item
        :label-width="field.labelwidth || props.labelwidth"
        v-for="field in formfield"
        :key="field.key"
        :label="field.label"
        :required="field.required"
        :prop="field.key"
        :rules="field.rules"
        :class="{
          'el-form-item-hover': field.key.includes('custom_key'),
        }"
      >
        <template v-if="field.key.includes('custom_key')">
          <div class="delete-icon" @click="deleteCustomKey(field)">
            <el-icon color="#F56C6C">
              <CircleClose />
            </el-icon>
          </div>
        </template>

        <template v-if="field.type == 'input'">
          <el-input
            @submit.native.prevent
            @change="(e) => updateValue(e, field.key)"
            @keyup.enter.native="updateValue"
            clearable
            :disabled="field.disabled"
            style="width: 100%"
            v-model.trim="modelValue[field.key]"
            :placeholder="field.placeholder"
            :type="field.input_type || 'text'"
            :rows="field.rows || 1"
          ></el-input>
        </template>
        <template v-if="field.type == 'select'">
          <template v-if="field.remote_method">
            <!-- 远程搜索 -->
            <el-select
              v-model="modelValue[field.key]"
              :clearable="!field.clearable"
              :placeholder="field.placeholder"
              style="width: 100%"
              @change="(e) => updateValue(e, field.key)"
              :disabled="field.disabled"
              :multiple="field.multiple"
              :filterable="true"
              :remote="true"
              :remote-method="
                (query) => {
                  remoteMethod(field, query);
                }
              "
              :allow-create="true"
              :default-first-option="true"
            >
              <el-option
                v-for="item in field.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template v-else>
            <el-select
              collapse-tags
              collapse-tags-tooltip
              :clearable="!field.clearable"
              :placeholder="field.placeholder"
              v-model="modelValue[field.key]"
              style="width: 100%"
              @change="(e) => updateValue(e, field.key)"
              :disabled="field.disabled"
              :multiple="field.multiple"
              :filterable="
                field.filterable || field.allow_create ? true : false
              "
              :allow-create="field.allow_create ? true : false"
              :default-first-option="field.allow_create ? true : false"
            >
              <el-option
                v-for="item in field.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </template>

        <template v-if="field.type == 'radio'">
          <el-radio-group
            @change="(e) => updateValue(e, field.key)"
            v-model="modelValue[field.key]"
            style="width: 100%"
            :disabled="field.disabled"
          >
            <el-radio v-for="item in field.options" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </template>
        <template v-if="field.type == 'check'">
          <el-checkbox-group
            @change="(e) => updateValue(e, field.key)"
            v-model="modelValue[field.key]"
            style="width: 100%"
            :disabled="field.disabled"
          >
            <el-checkbox
              v-for="item in field.options"
              :value="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </template>

        <template v-if="field.type == 'date'">
          <el-date-picker
            @change="(e) => updateValue(e, field.key)"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            style="width: 100%"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :type="field.date_type || 'date'"
            clearable
            v-model="modelValue[field.key]"
            :format="field.format || 'YYYY/MM/DD'"
            :value-format="field.value_format || 'x'"
          ></el-date-picker>
        </template>

        <template v-if="field.type == 'tree-select'">
          <el-tree-select
            @change="(e) => updateValue(e, field.key)"
            v-model="modelValue[field.key]"
            :data="field.options"
            check-strictly
            :render-after-expand="false"
            style="width: 100%"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            clearable
          />
        </template>

        <!-- <template v-if="field.type == 'avatar'">
          <el-upload :action="uploadFileUrl" :headers="headers" class="avatar-uploader" :show-file-list="false"
            accept="image/*" :on-success="(response) => handleAvatarSuccess(response, field.key)"
            :before-upload="beforeAvatarUpload">
            <el-image v-if="modelValue[field.key]" :src="modelValue[field.key]" class="avatar"
              style="width: 100%; height: 100%" fit="fill" />

            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </template> -->

        <template v-if="field.type == 'rich-text'">
          <Editor
            v-model="modelValue[field.key]"
            :minHeight="100"
            :showToolbar="!field.disabled"
            :readOnly="field.disabled"
            :uploadUrl="field.uploadUrl || ''"
            :token="field.token || ''"
          ></Editor>
        </template>
      </el-form-item>
      <slot name="btns"></slot>
    </el-form>
  </div>
</template>
<script setup>
import { computed, watch, ref } from "vue";
import ElementPlus from "element-plus";
import {
  ElMessage,
  ElMessageBox,
  ElInput,
  ElForm,
  ElFormItem,
  ElIcon,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElTreeSelect,
} from "element-plus";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import Editor from "../../Editor";
// import { getToken } from "@/utils/auth";

const emits = defineEmits(["update:modelValue", "change", "deletekey"]);

// 使用方法远程搜索，设置options
const remoteMethod = (field, query) => {
  console.log("使用方法远程搜索，设置options", field, query);

  if (field.remote_method) {
    field.remote_method
      .method({
        [field.remote_method.params.key]: query,
      })
      .then((res) => {
        field.options = res.result.map((item) => ({
          ...item,
          value: item[field.remote_method.return_key.label],
          label: item[field.remote_method.return_key.label],
          isMethod: true,
        }));
      });
  }
};

//  == 用户头像上传 ==
const uploadFileMax = 5; // 上传文件的最大内存
const uploadFileUrl = ref(
  import.meta.env.VITE_APP_BASE_API + "/api/v1/qk/upload/upload"
); // 上传文件服务器地址
// const headers = ref({ Authorization: "Bearer " + getToken() });

const handleAvatarSuccess = (response, key) => {
  props.modelValue[key] = response.data.abUrl;
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > uploadFileMax) {
    ElMessage.error(`文件最大 ${uploadFileMax}MB!`);
    return false;
  }
  return true;
};

//
const updateValue = (event, key) => {
  emits("change", key);
  //  emits("update:modelValue", event.target.value);
};
const props = defineProps({
  //  v-model 绑定的值
  modelValue: {
    type: Object,
    required: true,
  },
  // 表单字段
  formfield: {
    type: Array,
    required: true,
  },
  formrules: {},
  // 标题宽度
  labelwidth: {
    type: String,
    default: "100px",
  },
  // 值宽度
  valuewidth: {
    trpe: String,
    default: "220px",
  },
  // 原生属性字段
  attributes: {
    trpe: Object,
    default: {},
  },
  // 网格列数
  repeat: {
    type: Number,
    default: 0,
  },
});
watch(
  () => props.modelValue,
  (value) => {
    emits("update:modelValue", value);
  },
  {
    deep: true,
  }
);

// 网格的宽度
const template_columns_width = computed(() => {
  const valuewidth = props.valuewidth == "auto" ? "80px" : props.valuewidth;
  return (
    Number(props.labelwidth.split("px")[0]) +
    Number(valuewidth.split("px")[0]) +
    "px"
  );
});

const formRef = ref(null);

// 表单验证
const validate = (callback) => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      callback(true);
    } else {
      console.warn("error submit!" + fields);
      callback(false);
    }
  });
};
// 清空表单验证
const resetFields = () => {
  formRef.value.clearValidate();
};

// 删除自定义键
const deleteCustomKey = (row) => {
  ElMessageBox.confirm(`确认删除自定义属性【${row.label}】？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      emits("deletekey", row.key);
    })
    .catch(() => {});
};

defineExpose({
  validate,
  resetFields,
});
</script>
<style lang="scss" scoped>
.form-grid {
  :deep(.el-form) {
    display: grid;
    // justify-content: space-between;
    gap: 18px 30px;

    .el-form-item__label {
      font-size: 15.66px;
      font-weight: 350;
      color: #000000;
      // height: 100%;
      // display: inline-flex;
      // align-items: center;
    }

    .el-form-item {
      margin: 0 !important;
      position: relative;
    }
  }
}

// 用户头像
:deep(.avatar-uploader) {
  width: 120px;
  height: 120px;
  border: 1px dashed #8c939d;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-upload {
    width: 100% !important;
    height: 100% !important;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }
}

.el-form-item-hover {
  position: relative;
}

.delete-icon {
  display: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -80%);
  z-index: 99;
}

.el-form-item-hover:hover {
  .delete-icon {
    display: block;
  }
}
</style>
