import { createStore } from "vuex";

const store = createStore({
    state:{
        films:[],
        info: {
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
              like:'/src/assets/like.png', 
              eye:'/src/assets/eye.png'
            }
          },
        options:{
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c50076e3c3msh3189de4fc39be4fp121294jsn9bcaafdc0139',
              'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
            }
          }
    },
    mutations:{
        SET_FILMS_TO_STATE:(state, films)=>{
            state.films=films
        },
        SET_DETAILS_TO_STATE:(state,info)=>{
            state.info=info
        }
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
        GET_DETAILS_FROM_API({commit,state},id){
            console.log(id);
            let fetchDetails = fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/details?netflix_id=${id}`, state.options);
            let fetchGenres = fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=${id}`, state.options);
            let fetchPeople = fetch(`https://unogs-unogs-v1.p.rapidapi.com/search/people?netflix_id=${id}`, state.options);

            Promise.all([fetchDetails, fetchGenres, fetchPeople])
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then(data => {
                const [details, genres, people] = data;
                const infoBase= {like:'/src/assets/like.png', eye:'/src/assets/eye.png'}
                const info={'detail':details,'genreList':genres.results,'people':people.results, 'infoBase': infoBase}
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
        getInfo:state => state.info
    },
})
export default store;