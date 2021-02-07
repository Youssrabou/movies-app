import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  movies : MovieModel[];
  page:number;
  isLoading:boolean;
  results:MovieModel[];

  constructor(private movieService:MovieService, private router:Router) { }

  ngOnInit(): void {
    this.isLoading =true;
    this.movieService.getMoviesFromApi();
    this.movieService.movies$.subscribe(
      (data : MovieModel[]) => {
        this.movies= data;
        this.isLoading=false;
      }
    );
       
    /*On s'abonne à la source de donnée search */

    this.movieService.search$.subscribe (data => this.results =data)

  }

  printImageSrc(movie:MovieModel) : string{
    return 'https://image.tmdb.org/t/p/w500'+movie.image;
   }

   loadNextMovies(){
    this.isLoading =true;
    this.movieService.getNextMoviesFromApi()
    

   }
   getListOpacty(){
     return this.isLoading? 0.1 : 1;
   }

   serchMovies (searchText : string)
   
   {
      console.log(searchText);
      if (searchText.trim().length==0){
        this.movieService.search$.next([]);
      }
      else {
      this.movieService.searshMoviesFromApi(searchText);
 
      }
   }
   goto(movieId){
   
    this.router.navigate(['detail', movieId ,'results']);
   }

}
