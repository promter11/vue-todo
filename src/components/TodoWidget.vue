<template>
  <div class="todo-widget">
    <div class="todo-widget__block">
      <h2 class="todo-widget__title">Your<br />tasks</h2>
      <p class="todo-widget__date">{{ currentDate }}</p>
    </div>
    <div class="todo-widget__block">
      <div class="todo-widget__total">
        <h4 class="todo-widget__count">{{ total }}</h4>
        <span class="todo-widget__text">Total tasks</span>
      </div>
      <div class="todo-widget__stats">
        <div class="todo-widget__circle">
          <svg class="todo-widget__circle-svg" width="30" height="30">
            <circle
              class="todo-widget__circle-item"
              cx="15"
              cy="15"
              r="13"
              ref="circle"
              :style="circle.styles"
            ></circle>
          </svg>
        </div>
        <p class="todo-widget__done">{{ completedPercent }}% done</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoWidget",
  props: {
    done: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      date: new Date(),
      circle: {
        radius: 0,
        circumference: 0,
        offset: 0,
        styles: {
          strokeDasharray: "0",
          strokeDashoffset: "0",
        },
      },
    };
  },
  mounted() {
    const circle = this.$refs.circle;

    this.$watch(
      (props) => [props.done, props.total],
      () => {
        this.circle.radius = circle.r.baseVal.value;
        this.circle.circumference = 2 * Math.PI * this.circle.radius;
        this.circle.offset =
          this.circle.circumference -
          (this.completedPercent / 100) * this.circle.circumference;
        this.circle.styles.strokeDasharray = `${this.circle.circumference} ${this.circle.circumference}`;
        this.circle.styles.strokeDashoffset = `${this.circle.offset}`;
      },
      {
        immediate: true,
        deep: true,
      }
    );
  },
  computed: {
    currentDate() {
      const options = { year: "numeric", month: "short", day: "numeric" };

      return `${this.date.toLocaleDateString("en-US", options)}`;
    },
    completedPercent() {
      return Math.floor((this.done / this.total) * 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-widget {
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.25) url("../assets/illustration.svg") no-repeat
    center center / cover;
  background-blend-mode: darken;

  &__block {
    padding: 20px;

    &:last-child {
      display: flex;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &__title {
    font-size: 32px;
    font-weight: 300;
    text-transform: capitalize;
    margin-bottom: 40px;
    color: #ffffff;
  }

  &__date {
    font-size: 12px;
    color: #757f9a;
  }

  &__stats {
    display: flex;
    align-items: center;
    margin-top: auto;
  }

  &__circle {
    position: relative;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    border: 4px solid rgba(117, 127, 154, 0.25);

    &-svg {
      position: absolute;
      top: -4px;
      left: -4px;
    }

    &-item {
      fill: none;
      stroke-width: 4px;
      stroke: #757f9a;
      transform: rotate(-90deg);
      transform-origin: center;
      transition: stroke-dashoffset 0.5s ease;
    }
  }

  &__done {
    font-size: 12px;
    color: #757f9a;
  }

  &__count {
    font-size: 16px;
    font-weight: 300;
    line-height: 1;
    color: #ffffff;
  }

  &__text {
    font-size: 12px;
    text-transform: capitalize;
    color: #808080;
  }
}
</style>
