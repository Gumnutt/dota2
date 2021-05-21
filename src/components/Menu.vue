<template>
  <div>
    <div class="overlay" :class="{ 'active' : isBurgerActive }"></div>
    <div id="burger" :class="{ 'active' : isBurgerActive }" @click.prevent="toggle">
      <button type="button" class="burger-button" title="Menu">
        <span class="hidden">Toggle menu</span>
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </div>
    <nav :class="{ 'menu-open' : isBurgerActive }">
      <router-link to="/">Home</router-link>
      <router-link to="/teams">Teams</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    isBurgerActive: false
  }),
  methods: {
    toggle() {
      this.isBurgerActive = !this.isBurgerActive
    }
  }
}
</script>

<style lang="scss">
.overlay{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.8);
  display: none;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  &.active{
    display: block;
    opacity: 1;
  }
}
.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;

  &:focus {
    outline: 0;
  }
}
#burger{
  transition: transform 300ms ease-in;
  @media(min-width: 720px){
    display: none;
  }
}

.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar {
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(0.8);
}

.burger-button:hover .burger-bar--2, .no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active {
  transform: translateX(-83vw);
  .burger-button {
    transform: rotate(-180deg);
  }

  .burger-bar {
    background-color: #fff;
  }

  .burger-bar--1 {
    transform: rotate(45deg);
  }

  .burger-bar--2 {
    opacity: 0;
  }

  .burger-bar--3 {
    transform: rotate(-45deg);
  }
}
nav{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 85vw;
  height: 100vh;
  padding: 2rem;
  background: #191e24;
  transform: translateX(100%);
  transition: transform 300ms ease-in;
  @media(min-width: 720px){
    width: auto;
    display: block;
    position: relative;
    top: unset;
    bottom: unset;
    right: unset;
    height: 100%;
    transform: translateX(0);
  }
  &.menu-open{
    transform: translateX(0);
  }
  a{
    color: currentColor;
    text-decoration: none;
    text-transform: uppercase;
    position: relative;
    font-size: 2rem;
    margin-bottom: 3rem;
    @media(min-width: 720px){
      font-size: 1rem;
      padding: 0 0.5rem;
      margin: 0 0.5rem;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.1em;
        background-color: currentColor;
        opacity: 0;
        transition: opacity 300ms, transform 500ms;
      }
      &:hover, &:focus{
        &:after {
          opacity: 1;
          transform: translate3d(0, 0.5em, 0);
        }
      }
    }
    &:first-of-type{
      @media(min-width: 720px){
        margin-left:-0.5rem;
      }
    }
    &:last-of-type{
      @media(min-width: 720px){
        margin-right: -0.5rem
      }
    }
    
  }
}
</style>