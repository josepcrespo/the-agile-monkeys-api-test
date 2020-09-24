let vueApp = new Vue({
  el: '#vueApp',
  created: function() {
    this.jsonWebToken = this.getLocationHashArrayItem('access_token');
    this.githubLoginError = window.decodeURIComponent(
      this.getLocationHashArrayItem('error')
    );
    this.showContent();
  },
  data: {
    jsonWebToken: '',
    githubLoginError: ''
  },
  methods: {
    getLocationHashArray: function() {
      const hashArray = window.location.hash.substr(1).split('=');

      return hashArray;
    },
    getLocationHashArrayItem: function(anchorName) {
      const hashArray = this.getLocationHashArray();
      let arrayItem = '';

      for (let index = 0; index < hashArray.length; index++) {
          if (hashArray[index] === anchorName) {
              arrayItem = hashArray[index + 1]
          }
          break;
      }

      return arrayItem;
    },
    goBack: function() {
      window.location.assign(window.location.origin);
    },
    showContent: function() {
      const contentBoxElements =
        window.document.querySelectorAll('.content-box');
      if (this.jsonWebToken || this.githubLoginError) {
        contentBoxElements.forEach(function(element) {
          element.style.display = 'none';
        });
      } else {
        contentBoxElements.forEach(function(element) {
          element.style.display = 'block';
        });
      }
    }
  }
});