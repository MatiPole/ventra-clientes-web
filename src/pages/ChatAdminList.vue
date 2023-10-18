<script>
import ChatList from "../components/ChatList.vue";
import BaseHeader from "../components/BaseHeader.vue";

export default {
  name: "ChatAdminList",
  components: { ChatList, BaseHeader },
};
</script>

<template>
  <section>
    <BaseHeader>Chat con usuarios</BaseHeader>
    <div class="flex gap-4 justify-center">
      <ChatList />
    </div>
  </section>
</template>
