import { createStore } from "vuex";


const store = createStore({
    state:{
        films:[],
        film: {},
        info: {
            detail: {
              title:'',
              title_type:'',
              origin_country: '',
              year:'',
              synopsis:'',
              runtime:'',
              rating:'',
              netflix_id:'',
              large_image:'',
              default_image:'',
              alt_runtime:'',
            },
            genreList: [
              {
                genre:'',
                genre_id:0
              }
            ],
            people: [
              {
                netflix_id:0,
                full_name:'',
                person_type:'',
                title:'',
              }
            ],
            infoBase: {
              like:'/assets/like.png', 
              eye:'/assets/eye.png'
            }
          },
        options:{
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c50076e3c3msh3189de4fc39be4fp121294jsn9bcaafdc0139',
              'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
            }
          },
        history:[],
        likes:[],
        eyes:[],
    },
    mutations:{
        SET_FILMS_TO_STATE:(state, films)=>{
            state.films=films
        },
        SET_FILM_TO_STATE:(state, film)=>{
          state.film=film
        },
        SET_DETAILS_TO_STATE:(state,info)=>{
          if(info){
            state.info=info
          }else{
            state.info={
              detail: {
                title:'',
                year:'',
                synopsis:'',
                runtime:'',
                rating:'',
                netflix_id:'',
                large_image:'',
                default_image:'',
                alt_runtime:'',
              },
              genreList: [
                {
                  genre:'',
                  genre_id:0
                }
              ],
              people: [
                {
                  netflix_id:0,
                  full_name:'',
                  person_type:'',
                  title:'',
                }
              ],
              infoBase: {
                like:'/assets/like.png', 
                eye:'/assets/eye.png'
              }
            }
          }
        },
        SET_INFOBASE_FOR_DETAILS_TO_STATE:(state,payload)=>{
          state.info.infoBase[payload.property]=payload.info
        },
        SET_TO_ARRAY(state, payload) {
          let { to_array, property, from_array_name, title } = payload;
          let img, from_array,way
          switch (from_array_name) {
            case 'info':
              img=state.info.detail.default_image;
              from_array=state.info.detail;
              break;
            case 'film':
              img = state.film.img;
              from_array=state.film;
              break;
          }
          if (!to_array.some((film) => film.netflix_id == from_array.netflix_id)) {
            to_array.push({
              img: img,
              title: title,
              netflix_id: from_array.netflix_id,
              type: from_array.title_type,
            });
            way="/web-search-film/assets/" + property + "-full.png";
          } else if (to_array.findIndex((film) => film.netflix_id == from_array.netflix_id) != -1) {
            to_array.splice(to_array.findIndex((film) => film.netflix_id == from_array.netflix_id), 1);
            way="/web-search-film/assets/" + property + ".png";
          }
          switch (from_array_name) {
            case 'info':
              state.info.infoBase[property]=way;
              break;
            case 'film':
              state.film.infoBase[property]=way;
              break;
          }
          console.log(to_array);
          localStorage.setItem(property + "s", JSON.stringify(to_array));
        },
        SET_FILM_TO_HISTORY(state,film){
          console.log(film);
          state.history = state.history.filter(item => {
            return (
              item.netflix_id !== film.netflix_id ||
              item.title !== film.title ||
              item.type !== film.type ||
              item.img !== film.img
            );
          });
          state.history.unshift(film)
          if(state.history.length>15) state.history.pop()
        },
        SET_FILMS_TO_HISTORY:(state,films)=>{
          state.history=films
        },
      },
    actions:{
        GET_FILMS_FROM_API({commit,state},obj){
            fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?'+obj, state.options)
            .then(response => response.json())
            .then(response => {
                commit('SET_FILMS_TO_STATE', response.results)
                return response.results;
            })
            .catch(err => {
                console.error(err)
                return err
            })
        },
        async GET_DETAILS_FROM_API({commit,state},id){
            console.log(id);
            let fetchDetails = fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/details?netflix_id=${id}`, state.options);
            let fetchGenres = fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=${id}`, state.options);
            let fetchPeople = fetch(`https://unogs-unogs-v1.p.rapidapi.com/search/people?netflix_id=${id}`, state.options);

            await Promise.all([fetchDetails, fetchGenres, fetchPeople])
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then(data => {
                const [details, genres, people] = data;
                const info={'detail':details,'genreList':genres.results,'people':people.results, 'infoBase':{ like:'/assets/like.png', eye:'/assets/eye.png'}}
                console.log(data);
                commit('SET_DETAILS_TO_STATE',info)
                console.log(state.info);
                localStorage.setItem('info', JSON.stringify(state.info));
                })
                .catch(err => console.error(err));
        },
    },
    getters:{
        getFilms: state => state.films,
        getFilm: state => state.film,
        getInfo:state => state.info,
        getHistory:state => state.history,
    },
})
export default store;