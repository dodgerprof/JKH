<template>
  <header class="navbar">
    <div style="display: none;">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <symbol id="crane" viewBox="0 0 426.104 426.104">
          <g>
            <path d="M58.481,292.104L18.217,345.99c-6.225,8.358-9.909,18.718-9.909,29.94c0,27.71,22.463,50.173,50.173,50.173
		c27.71,0,50.173-22.463,50.173-50.173c0-11.222-3.684-21.583-9.909-29.94L58.481,292.104z" />
            <rect x="367.796" y="105" width="50" height="91.404" />
            <path d="M12.779,199.327v62.777h91.404v-62.777c0-1.612,1.311-2.923,2.923-2.923h85.049V105h-85.049
		C55.093,105,12.779,147.314,12.779,199.327z" />
            <polygon points="202.155,30 264.976,30 264.976,85 222.155,85 222.155,216.404 337.796,216.404 337.796,85 294.976,85 294.976,30 
		357.796,30 357.796,0 202.155,0 	" />
          </g>
        </symbol>
        <symbol id="search" viewBox="0 0 486.4 486.4">
          <g>
            <g id="XMLID_1769_">
              <g id="XMLID_832_">
                <path id="XMLID_834_" d="M272.9,456.6V343.1h-8v-27.8c77.2-10.6,136.7-76.8,136.7-156.9C401.6,70.9,330.7,0,243.2,0
				S84.8,70.9,84.8,158.4c0,80.1,59.5,146.3,136.7,156.9v27.8h-8v113.5c0,16.5,13.3,29.8,29.8,29.8
				C259.6,486.4,272.9,473,272.9,456.6z M243.1,273.3c-63.5,0-115.1-51.5-115.1-115.1c0-63.5,51.5-115.1,115.1-115.1
				c63.5,0,115.1,51.5,115.1,115.1S306.6,273.3,243.1,273.3z" />
              </g>
              <g id="XMLID_1103_">
                <path id="XMLID_1104_" d="M185.2,177c-10.3,0-18.7-8.4-18.7-18.7c0-42.2,34.4-76.6,76.6-76.6c10.3,0,18.7,8.4,18.7,18.7
				s-8.4,18.7-18.7,18.7c-21.6,0-39.2,17.6-39.2,39.2C203.9,168.6,195.5,177,185.2,177z" />
              </g>
            </g>
          </g>
        </symbol>
        <symbol id="logOut" viewBox="0 0 384.971 384.971">
          <g>
            <g id="Sign_Out">
              <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z" />
              <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
            </g>
          </g>
        </symbol>
      </svg>
    </div>
    <a class="logo logo--white">
      <svg class="logo__image" width="35px" heigth="auto">
        <use xlink:href="#crane"></use>
      </svg>
      <h1 class="logo__title">жкх</h1>
    </a>
    <div class="navbar-list">
      <button type="button" class="navbar-link navbar-link--search">
        <svg class="navbar-link__icon" width="22px" height="39px">
          <use xlink:href="#search"></use>
        </svg>
      </button>
      <button type="button" class="navbar-link">Уведомления
        <span class="badge badge-light">4</span>
      </button>
      <button @click="onLogout" type="button" class="navbar-link navbar-link--logOut" title="Выход">
        <svg class="navbar-link__icon" width="18px" height="24px">
          <use xlink:href="#logOut"></use>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'navbar',
    methods: {
      onLogout() {
        this.$store.dispatch('logoutUser');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #3545a6;
    padding: 0;
    padding-left: 20px;

    @media(max-width: 750px) {
      justify-content: center;
    }
  }

  .navbar-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;

    @media(max-width: 750px) {
      display: none;
    }
  }

  .navbar-link {
    display: block;
    position: relative;
    width: auto;
    height: 74px;
    padding: 5px 10px;
    border: 0;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease-out;
    outline: none;

    background: {
      position: center;
      repeat: no-repeat;
      color: #3545a6;
    }

    &--logOut,
    &--search {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
    }

    &:hover,
    &:focus {
      background-color: #1e2e83;
    }

    &:active {
      opacity: 0.3;
    }

    &__icon {
      fill: #fff;
    }
  }
</style>