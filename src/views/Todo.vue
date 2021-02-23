<template>
  <div class="todo">
    <TodoWidget :done="doneTasks" :total="totalTasks" />
    <div class="todo__wrapper">
      <h3 class="todo__title">Inbox</h3>
      <TodoList :tasks="activeTasks" @onRemoveTask="removeTask" />
      <div class="todo-info">
        <div class="todo-info__wrapper">
          <h3 class="todo-info__title">Completed</h3>
          <span class="todo-info__count">{{ doneTasks }}</span>
        </div>
        <div class="todo-info__wrapper">
          <button class="todo-info__button" type="button" @click="toggleForm">
            <img class="todo-info__icon" src="../assets/plus.svg" alt="Plus" />
          </button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <TodoForm v-if="active" @onToggleForm="toggleForm" @onAddTask="addTask" />
    </transition>
  </div>
</template>

<script>
import TodoWidget from "../components/TodoWidget";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

export default {
  name: "Todo",
  components: {
    TodoWidget,
    TodoList,
    TodoForm,
  },
  data() {
    return {
      tasks: [
        {
          id: 0,
          title: "Learn Vue",
          description: "Need to repeat the basics",
          created: 1613911245336,
          status: "regular",
          done: false,
        },
        {
          id: 1,
          title: "Create todo app",
          description: "Practice Vue for create todo application",
          created: 1614011031985,
          status: "medium",
          done: false,
        },
        {
          id: 2,
          title: "Have a lunch",
          description: "Burger or pizza?",
          created: 1614011241336,
          status: "important",
          done: true,
        },
      ],
      active: false,
    };
  },
  methods: {
    addTask(object) {
      this.tasks.push(object);
    },
    removeTask(id) {
      const task = this.tasks.find((task, _) => task.id === id);

      task.done = !task.done;
    },
    toggleForm() {
      this.active = !this.active;
    },
  },
  computed: {
    activeTasks() {
      return this.tasks.filter((task, _) => !task.done);
    },
    doneTasks() {
      return this.tasks.reduce((acc, { done }) => (done ? acc + 1 : acc), 0);
    },
    totalTasks() {
      return this.tasks.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.todo {
  position: relative;
  max-width: 370px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  &__wrapper {
    padding: 20px;
  }

  &__title {
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 20px;
    color: #dbdbdb;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__wrapper {
      display: flex;
      align-items: center;
    }

    &__title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      line-height: 1;
      margin-right: 10px;
      color: #dbdbdb;
    }

    &__count {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: 800;
      line-height: 1;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #757f9a;
      color: #ffffff;
    }

    &__button {
      padding: 10px;
      border-radius: 50%;
      box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
      background-color: #757f9a;
    }

    &__icon {
      display: block;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
