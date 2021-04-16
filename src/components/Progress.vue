<template>
  <div class="progress--container">
    <label :for="label">{{ label }}</label>
    <progress :id="label" max="3" :value="value"></progress>
  </div>
</template>
<script>

export default {
  props:{
    value: Number,
    label: String,
  },
}
</script>

<style lang="scss">
  .progress--container{
    display: flex;
    flex-direction: column;
    width: 120px;
    label{
      text-transform: uppercase;
      text-align: center;
      font-weight: 700;
      color: white;
    }
    progress {
      border-radius: 0px; 
      width: 100%;
      height: 8px;
    }
    progress::-webkit-progress-bar {
      background-color: #4C4C4C;;
      border-radius: 0px;
    }
    progress::-webkit-progress-value {
      background-color: white;
      box-shadow: 0px 0px 10px #427ed1, 0px 0px 10px #427ed1;
      border-radius: 0px;
    }
    progress::-moz-progress-bar {
      /* style rules */
    }
  }
</style>