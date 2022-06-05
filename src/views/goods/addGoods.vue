<template>
  <div class="mg15">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>添加新的商品</span>
        </div>
      </template>
      <el-form
        :model="form"
        :inline="true"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input class="input-witdh" v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品分类">
              <el-select v-model="form.categories" placeholder="选择商品分类">
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label"
                  class="input-witdh"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="商品价格" prop="price">
              <el-input class="input-witdh" v-model="form.price" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品库存" prop="stock">
              <el-input
                class="input-witdh"
                v-model="form.stock"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="书籍作者">
              <el-input class="input-witdh" v-model="form.author" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否推荐" required>
              <el-select class="input-witdh" v-model="form.is_recommend">
                <el-option label="推荐" value="1"></el-option>
                <el-option label="不推荐" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="textarea">
          <el-form-item label="作者简介">
            <el-input v-model="form.Introduction" type="textarea" />
          </el-form-item>
          <el-form-item label="书籍简介">
            <el-input v-model="form.book_introduction" type="textarea" />
          </el-form-item>
        </div>
        <el-form-item label="商品图片">
          <el-upload
            action="http://127.0.0.1:3002/api/file/uploadfile"
            :on-success="handleAvatarSuccess"
            :limit="1"
            ref="uploadRef"
            list-type="picture-card"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <template #file="{ file }">
              <img
                class="el-upload-list__item-thumbnail mm"
                :src="file.url"
                alt=""
              />
            </template>
            <template #trigger>
              <el-icon><plus /></el-icon>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" size="large" @click="submitUpload">
          提交表单
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElMessage, genFileId } from "element-plus";
import { addGoods } from "../../api/index";
import { bookIntroducrtion } from "../../utils/bookIntroduction";
import type { UploadProps, UploadRawFile, UploadInstance } from "element-plus";
import { useRouter } from "vue-router";

export default {
  setup() {
    const form = reactive({
      name: "",
      categories: "",
      price: "",
      stock: "",
      is_recommend: "",
      author: "",
      Introduction: "",
      book_introduction: "",
      imageUrl: "",
      information: "",
    });

    const uploadRef = ref<UploadInstance>();
    const router = useRouter();

    onMounted(() => {});

    //上传图片成功后回调函数
    const handleAvatarSuccess: UploadProps["onSuccess"] = async (
      response,
      uploadFile
    ) => {
      // console.log(uploadFile.raw);
      form.imageUrl = `http://127.0.0.1:3002/public/goods/${uploadFile.raw.name}`;
      form.information = await bookIntroducrtion(form);

      addGoods(form).then((res) => {
        console.log(res);
      });
      // imageUrl.value = URL.createObjectURL(uploadFile.raw!);

      ElMessage({
        message: "添加商品成功！",
        type: "success",
      });
      setInterval(() => {
        router.go(0);
      },2000);
    };

    //提交上传文件
    const submitUpload = async () => {
      uploadRef.value!.submit();
    };

    //上传图片覆盖的回调
    const handleExceed: UploadProps["onExceed"] = (files) => {
      uploadRef.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadRef.value!.handleStart(file);
    };

    //检测输入数字
    const checknum = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error("Please input the price"));
      }
      setTimeout(() => {
        if (!parseInt(value)) {
          callback(new Error("Please input number"));
        } else {
          callback();
        }
      }, 1000);
    };

    //表达验证贵重
    const rules = reactive({
      price: [{ validator: checknum, trigger: "blur" }],
      stock: [{ validator: checknum, trigger: "blur" }],
    });

    //商品类型
    const options = [
      {
        label: "文学",
        options: [
          {
            value: "2",
            label: "小说",
          },
          {
            value: "3",
            label: "诗歌",
          },
          {
            value: "4",
            label: "随笔",
          },
        ],
      },
      {
        label: "文化",
        options: [
          {
            value: "6",
            label: "哲学",
          },
          {
            value: "7",
            label: "电影",
          },
          {
            value: "9",
            label: "历史",
          },
        ],
      },
      {
        label: "流行",
        options: [
          {
            value: "11",
            label: "推理",
          },
          {
            value: "12",
            label: "科幻",
          },
          {
            value: "13",
            label: "言情",
          },
        ],
      },
    ];

    return {
      form,
      options,
      rules,
      uploadRef,
      handleAvatarSuccess,
      submitUpload,
      handleExceed,
    };
  },
};
</script>

<style>
.input-witdh {
  width: 216px;
}
.textarea {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.button {
  padding-top: 35px;
  display: flex;
  justify-content: center;
}
</style>