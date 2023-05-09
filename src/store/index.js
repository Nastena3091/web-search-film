import { createStore } from "vuex";

const store = createStore({
    state:{
        AllFilms:[],
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
        }
    },
    actions:{
        GET_FILMS_FROM_API({commit,state},obj){
            return fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?'+obj, state.options)
                    .then(response => response.json())
                    .then(response => {
                        commit('SET_FILMS_TO_STATE', response.results)
                        return response.results;
                    })
                    .catch(err => {
                        console.error(err)
                        return err
                    })
        }
    },
    getters:{
        getFilms: state => state.films
    },
})
export default store;