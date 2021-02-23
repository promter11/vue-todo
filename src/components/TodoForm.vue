<template>
  <div class="todo-form">
    <div class="todo-form__wrapper">
      <button class="todo-form__close" @click="onToggleForm">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z"
          />
        </svg>
      </button>
      <h4 class="todo-form__title">Add task</h4>
    </div>
    <form class="todo__form" @submit.prevent="submitForm">
      <div
        class="todo__form-group"
        :class="{ 'todo__form-group--error': $v.form.title.$error }"
      >
        <label class="todo__form-label">
          <input
            class="todo__form-input"
            type="text"
            placeholder="Title"
            v-model.trim="form.title"
          />
        </label>
        <div class="todo__form-error" v-if="!$v.form.title.required">
          Field is required
        </div>
        <div
          class="todo__form-error"
          v-if="!$v.form.title.minLength || !$v.form.title.maxLength"
        >
          Must be between {{ $v.form.title.$params.minLength.min }} and
          {{ $v.form.title.$params.maxLength.max }}
        </div>
      </div>
      <div
        class="todo__form-group"
        :class="{ 'todo__form-group--error': $v.form.description.$error }"
      >
        <label class="todo__form-label">
          <input
            class="todo__form-input"
            type="text"
            placeholder="Description"
            v-model.trim="form.description"
          />
        </label>
        <div class="todo__form-error" v-if="!$v.form.description.required">
          Field is required
        </div>
        <div
          class="todo__form-error"
          v-if="
            !$v.form.description.minLength || !$v.form.description.maxLength
          "
        >
          Must be between {{ $v.form.description.$params.minLength.min }} and
          {{ $v.form.description.$params.maxLength.max }}
        </div>
      </div>
      <div class="todo__form-group">
        <select class="todo__form-select" v-model="form.status">
          <option class="todo__form-option" value="regular" selected>
            Regular
          </option>
          <option class="todo__form-option" value="medium">Medium</option>
          <option class="todo__form-option" value="important">Important</option>
        </select>
      </div>
      <button class="todo__form-submit">Add new task</button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "TodoForm",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        title: "",
        description: "",
        status: "regular",
      },
    };
  },
  methods: {
    onToggleForm() {
      this.$emit("onToggleForm");
    },
    onAddTask(object) {
      this.$emit("onAddTask", object);
    },
    submitForm() {
      this.$v.form.$touch();

      if (!this.$v.form.$error) {
        this.$v.form.$reset();

        this.onToggleForm();
        this.onAddTask({
          id: Date.now(),
          title: this.form.title,
          description: this.form.description,
          created: Date.now(),
          status: this.form.status,
          done: false,
        });
      }
    },
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(12),
      },
      description: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(48),
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #757f9a;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  &__close {
    border: 0;
    cursor: pointer;
    background-color: transparent;

    svg {
      display: block;
      width: 30px;
      height: auto;
    }
  }

  &__title {
    font-weight: 300;
    color: #ffffff;
  }
}

.todo__form {
  &-group {
    margin-bottom: 20px;

    &--error {
      .todo__form-error {
        display: block;
      }
    }
  }

  &-error {
    display: none;
    font-size: 12px;
    line-height: 1;
    margin-top: 5px;
    color: #ac2f1e;
  }

  &-input,
  &-select {
    width: 100%;
    padding: 5px 0;
    outline: none;
  }

  &-input {
    border: 0;
    border-bottom: 1px solid #cccccc;
    background-color: transparent;
    color: #ffffff;

    &::placeholder {
      color: #ffffff;
    }
  }

  &-select {
    padding: 10px 15px;
    border: 1px solid #ffffff;
    outline: none;
    appearance: none;
    background: none;
    color: #ffffff;
  }

  &-option {
    color: #333333;
  }

  &-submit {
    width: 100%;
    padding: 10px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
    background-color: #fadb56;
    color: #333333;
  }
}
</style>
