<template>
  <ul class="todo-list" v-if="tasks.length > 0">
    <li class="todo-list__item" v-for="task in tasks" :key="task.id">
      <div class="todo-list__block">
        <div class="todo-list__wrapper">
          <div
            class="todo-list__status"
            :class="`todo-list__status--${task.status}`"
          ></div>
        </div>
        <div class="todo-list__wrapper">
          <h2 class="todo-list__title">{{ task.title }}</h2>
          <p class="todo-list__text">{{ task.description }}</p>
        </div>
      </div>
      <div class="todo-list__block">
        <p class="todo-list__date">{{ convertTime(task.created) }}</p>
        <button class="todo-list__button" @click="onRemoveTask(task.id)">
          <svg viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#757f9a"
              d="m118.832 467.243c1.193 24.006 20.863 42.757 44.944 42.757h182.447c24.081 0 43.753-18.75 44.944-42.757l26.28-302.243h-324.895zm181.168-227.243h30v165h-30zm-60 0h30v165h-30zm-60 0h30v165h-30z"
            />
            <path
              fill="#757f9a"
              d="m330 75v-30c0-24.812-20.186-45-45-45h-60c-24.812 0-45 20.188-45 45v30h-120v60h390v-60zm-120 0v-30c0-8.271 6.73-15 15-15h60c8.272 0 15 6.729 15 15v30z"
            />
          </svg>
        </button>
      </div>
    </li>
  </ul>
  <p class="todo__error" v-else>No active tasks.</p>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    tasks: {
      type: Array,
      required: true,
      default: [],
    },
  },
  methods: {
    onRemoveTask(id) {
      this.$emit("onRemoveTask", id);
    },
    convertTime(time) {
      const currentTime = Date.now();
      const diff = Math.floor(currentTime - time);

      switch (true) {
        case diff < 60000:
          return `${Math.floor(diff / 1000)} second (-s) ago`;
        case diff >= 60000 && diff < 3600000:
          return `${Math.floor(diff / (1000 * 60))} minute (-s) ago`;
        case diff >= 3600000 && diff < 86400000:
          return `${Math.floor(diff / (1000 * 60 * 60))} hour (-s) ago`;
        case diff >= 86400000 && diff < 31556952000:
          return `${Math.floor(diff / (1000 * 60 * 60 * 24))} day (-s) ago`;
        default:
          return `${Math.floor(
            diff / (1000 * 60 * 60 * 24 * 365)
          )} year (-s) ago`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  &__item {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ededed;
  }

  &__block {
    &:first-child {
      display: flex;
      align-items: center;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }

    &:last-child {
      width: 33.33%;
      margin-left: auto;
    }
  }

  &__wrapper {
    &:first-child {
      margin-right: 10px;
    }
  }

  &__status {
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;

    &--regular:before {
      background-color: #757f9a;
    }

    &--medium:before {
      background-color: #fadb56;
    }

    &--important:before {
      background-color: #e14c38;
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      border-radius: 50%;
    }
  }

  &__title {
    font-size: 16px;
  }

  &__text {
    font-size: 12px;
    color: #808080;
  }

  &__date {
    font-size: 12px;
    text-align: right;
    margin-bottom: 10px;
    color: #757f9a;
  }

  &__button {
    display: block;
    margin-left: auto;

    svg {
      display: block;
      width: 20px;
      height: 20px;
    }
  }
}

.todo__error {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}
</style>
