<template>
  <div class="person_information">
      <div class="skill_part">
        <div class="skill_title">技能标签</div>
        <div class="skill_tags">
          <div v-for="tag in tags" class="color_text color_text">
            <span>{{tag}}</span>
          </div>
        </div>
      </div>
      <div class="personal_detail">
        <div class="introduce_title">
          <span>工作经历</span>
        </div>
        <div class="introduce_list" v-if="!!personInformation.workExperienceList">
          <div class="list" v-for="(workExperience, index) in personInformation.workExperienceList">
            <div class="time">{{workExperience.startDate | dateChange}}-{{workExperience.endDate | dateChange}} | {{workExperience.positionName}}</div>
            <div class="company"><span>公司名称：</span>{{workExperience.companyName}}</div>
            <div class="introduce_detail">
              <div class="introduce_detail_title">工作描述：</div>
              <div class="detail">{{workExperience.workIntroduce}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="personal_detail">
        <div class="introduce_title">
          <span>教育经历</span>
        </div>
        <div class="introduce_list" v-if="!!personInformation.eductionExperienceList">
          <div class="list" v-for="(workExperience, index) in personInformation.eductionExperienceList">
            <div class="time">{{workExperience.startDate | dateChange}}-{{workExperience.endDate | dateChange}}</div>
            <div class="company">{{workExperience.schoolName}}</div>
            <div class="position">{{workExperience.degree}} &nbsp;&nbsp;|&nbsp;&nbsp; {{workExperience.subjectName}}</div>
          </div>
        </div>
      </div>
      <div class="personal_detail">
        <div class="introduce_title">
          <span>项目经验</span>
        </div>
        <div class="introduce_list" v-if="!!personInformation.projectExperienceList">
          <div class="list" v-for="(workExperience, index) in personInformation.projectExperienceList">
            <div class="time">{{workExperience.startDate | dateChange}}-{{workExperience.endDate | dateChange}}</div>
            <div class="company"><span>项目名称：</span>{{workExperience.projectName}}</div>
            <div class="introduce_detail">
              <div class="introduce_detail_title">项目经历：</div>
              <div class="detail">{{workExperience.projectIntroduce}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="personal_detail">
        <div class="introduce_title">
          <span>自我介绍</span>
        </div>
        <div class="introduce" v-if="!!personInformation.introduce">{{personInformation.introduce}}</div>
      </div>

  </div>
</template>

<script>
  export default {
    name: "person_information.vue",

    data () {

      return {

        tags: [],

        personInformation: {}

      }

    },


    mounted () {

      this.getData();

    },


    methods: {

      getData: function () {

        var userId = this.$route.query.userId;
        /*
        * 接口： 获取个人履历详情
        * 请求方式： POST
        * 接口： task/get/userresume
        * 入参： userId
        * */
        this.$http({

          url: process.env.API_ROOT + 'task/get/userresume',
          method: 'post',
          params: {
            userId: userId
          }

        }).then(res=>{

          if(res.data.code === '0000'){

            this.tags = res.data.data.label.split(',');

            this.personInformation = res.data.data;

          }

        })

      }

    }
  }
</script>

<style scoped lang="less">
  @import "person_information.less";
</style>
