<template>
  <div class="chat-container">
    <!-- 聊天头部 -->
    <div class="chat-header">
      <div class="header-left">
        <h2>AI 智能助手</h2>
        <div class="status" :class="{ active: isConnected }">
          {{ isConnected ? "在线" : "连接中..." }}
        </div>
      </div>
      <!-- 模式切换开关 -->
      <div class="mode-switch">
        <label class="switch">
          <input type="checkbox" v-model="isDeepThinkingMode" />
          <span class="slider"></span>
        </label>
        <span class="mode-label">
          {{isDeepThinkingMode ? "深度思考模式" : "快速回答模式"}}
        </span>
      </div>
    </div>
    
    <!-- 消息列表区域 -->
    <div class="messages" ref="messagesRef">
      <!-- 消息内容 -->
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <textarea
        v-model="userInput"
        @keydown.enter.prevent="sendMessage"
        placeholder="输入您的问题..."
        :disabled="isTyping"
      ></textarea>
      <button @click="sendMessage" :disabled="!userInput.trim() || isTyping">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script setup>

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return;

  // 添加用户消息
  const userMessage = {
    role: "user",
    content: userInput.value,
    timestamp: new Date(),
  };
  messages.value.push(userMessage);
  
  // 准备 AI 响应消息
  const assistantMessage = {
    role: "assistant",
    content: "",
    reasoning_content: "",
    timestamp: new Date(),
  };
  messages.value.push(assistantMessage);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: userMessage.content,
        }],
        model: "deepseek-reasoner",
        stream: true,
        max_tokens: isDeepThinkingMode.value ? 2000 : 1000,
      }),
    });

    // 处理流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      const text = decoder.decode(value);
      // 处理响应数据...
    }
  } catch (error) {
    console.error("Error:", error);
    assistantMessage.content = "抱歉，我遇到了一些问题。请稍后再试。";
  }
};
</script>


<style lang="scss" scoped>
.chat-container {
  max-width: 1000px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 70%;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>