const app = Vue.createApp({
  //   template: "<h1>{{firstName}}</h1>",
  data() {
    return {
      movies: [],
      pageSize: 10,
      currentPage: 1,
      search: "",
      selectedDirector: "all",
    };
  },
  //created hook can be used to run code after an instance is created:
  created: async function () {
    try {
      const res = await fetch("https://ghibliapi.dev/films");
      const data = await res.json();
      this.movies = data;
      console.log(this.movies[0].image);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    filterByDirector(evt) {
      this.movies.map((movie) => {
        if (evt.target.value === movie.director) {
          this.selectedDirector = evt.target.value;
          // console.log("selected here--->", this.selectedDirector);
          return this.selectedDirector;
        }
        if (evt.target.value === "all") {
          this.selectedDirector = "all";
          return this.selectedDirector;
        }
      });
    },
    nextPage: function () {
      if (this.currentPage * this.pageSize < this.filterByTitle.length)
        this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  watch: {
    search() {
      console.log("reset to p1 due to search");
      this.currentPage = 1;
    },
    selectedDirector() {
      this.currentPage = 1;
    },
  },
  //computed properties know if the values used in the function changed so they don't need to run everytime to check, only once!
  computed: {
    filterByTitle() {
      return this.movies.filter((movie) => {
        if (this.search == "") {
          if (
            this.selectedDirector &&
            movie.director === this.selectedDirector
          ) {
            return movie;
          }
          if (this.selectedDirector === "all") {
            return movie;
          }
        } else {
          if (
            this.selectedDirector &&
            movie.director === this.selectedDirector
          ) {
            return (
              movie.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            );
          }
          if (this.selectedDirector === "all") {
            return (
              movie.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            );
          }
        }
      });
    },

    paginatedData() {
      return this.filterByTitle.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },
  },
});

app.mount("#app");
