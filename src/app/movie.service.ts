import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel} from  './models/movie.model'
import {environment} from '../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL = environment.TMDB_API_URL;
  private API_KEY = environment.TMDB_API_KEY;
 // discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr'

  movies$ = new BehaviorSubject([]);
  search$ = new BehaviorSubject([]);
  currentPage:number = 1;
  
  
  // Faire une requete HTTP à l'api theMovieDB pour récupérer
  // une suggestion de films (un tableau d'objets movie JSON)
  /*
  ** Pour effecutuer une requête HTTP, on a besoin de l'objet de la class HttpClient
  	 	> On crée donc une instance de HttpClient
  		> on peut alors utiliser ses méthodes (.get(), .post(), .put(), .delete())
        > Pour cela on va injecter http:HttpClient dans notre component
        (https://angular.io/guide/http)
  */
  /*
    Principe de l'injection de dépendance proposée par Angular (D.I)
    permet de récupérer un membre de notre class qui est une instance d'une autre class
    (https://angular.io/guide/dependency-injection)
  */

  constructor(private http:HttpClient) { }
  
  getMoviesFromApi() {
    const params = new HttpParams({fromObject : {
    api_key : this.API_KEY, 
    language :'fr',
    page :this.currentPage.toString()
    
    }} );
   
    this.http
    .get(this.API_URL + '/discover/movie',{params})
    .pipe( map (
      (data :any) => data.results.map( movie => new MovieModel(
        movie.id,
        movie.title,
        movie.overview,
        movie.backdrop_path,
        movie.release_date,
        movie.vote_average
            )
          )
         )
      )
    .subscribe( response => {
      console.log(response);
      let movies =this.movies$.getValue();
      /* this movies$.next(response)*/
      this.movies$.next([...movies,...response]);
      
      })
  
    }
      /*
      getNextMoviesFromApi */

      getNextMoviesFromApi(){

        this.currentPage++;
        this.getMoviesFromApi();
      }

      /*searshMoviesFromApi */

      searshMoviesFromApi (searchText){
     
          const params = new HttpParams({fromObject : {
          api_key : this.API_KEY, 
          language :'fr',
          query :searchText
          
          
          }} );
         
          this.http
          .get(this.API_URL + '/search/movie',{params})
          .pipe( map (
            (data :any) => data.results.map( movie => new MovieModel(
              movie.id,
              movie.title,
              movie.overview,
              movie.backdrop_path,
              movie.release_date,
              movie.vote_average
                  )
                )
               )
            )
          .subscribe( response => {
            console.log(response);
            this.search$.next(response);
            
            })
        
          }
          
          // Ajouter les vidéos associées à chaque image de film
          getVideoFromIdMovie (movieId){
     
            const params = new HttpParams({fromObject : {
            api_key : this.API_KEY, 
            language :'fr',
                      
            
            }} );
           
            return this.http.get(this.API_URL + '/movie/' + movieId + '/videos', { params })
            .pipe(map((data: any) => data.results))
           
          
            }

      }
  