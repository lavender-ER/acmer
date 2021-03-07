<template>
  <div class="manage">
    <div class="leftM">
      <siderBar></siderBar>

    </div>

    <div class="rightM">
      <ManageContent></ManageContent>
    </div>
  </div>
</template>

<script>
import SiderBar from "@/components/manage/sideBar";
import ManageContent from "@/components/manage/Managecontent";

export default {
  name: "manage",
  components: {ManageContent, SiderBar}
}
</script>

<style scoped>
.manage {
  background-color: rgba(0, 0, 0, 0.03);
  height: auto;
  min-height: 520px;
}

.leftM {
  float: left;
  width: 20%;
  height: auto;
  min-height: 550px;
  border-radius: 5px;
  margin-left: 30px;
  margin-bottom: 20px;
}

.rightM {
  float: left;
  width: 75%;
  height: auto;
  min-height: 550px;
  border-radius: 5px;
  /*margin-left: 1%;*/
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: white;
}
</style>
