import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { DomSanitizer , SafeResourceUrl} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
/* injecter un objet de la classe ActivetedRoute
    
*/ 
  movieId:Number;
  movie;
  type;
  trailerId: string;
  isLoadingVideo: boolean;
  
  constructor(private route:ActivatedRoute, 
             private movieService: MovieService ,
             private router:Router,
             private sanitize: DomSanitizer) { }

  ngOnInit(): void {
    // 1-J'ai bien récupéré mon Id
  this.movieId = this.route.snapshot.params.id;
  this.type = this.route.snapshot.params.type;
  this.isLoadingVideo = true;
  
  if (this.type == 'movies') {
    // 2 récupérer les informations du film
    this.movie = this.movieService.movies$.getValue()
      .find(movie => movie.id == this.movieId);
     
    //this.movieService.GetVideoFromIdMovie();
  }
  else { 
    // 3 récupérer les informations du film
    this.movie = this.movieService.search$.getValue()
    .find( movie => movie.id == this.movieId);
    console.log(this.movie);

  }

  // 4 récupérer le trailer.key du film (video Youtube)
  this.movieService.getVideoFromIdMovie(this.movieId).subscribe(
    trailers => {
      console.log('trailers', trailers)
      trailers.length > 0 ? this.trailerId = trailers[0].key : this.trailerId = null;
      this.isLoadingVideo = false;


    }
  )
  }
  
   /**
   * Return url of movie on Youtube
   * 
   * on utilise une instance de DomSanitizer
   * et la méthode bypassSecurityTrustResourceUrl()
   * 
   * (https://angular.io/api/platform-browser/DomSanitizer)
   * @returns url: SafeResourceUrl
   */
  getSafeUrl(): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/' + this.trailerId
    )
  }


gotoRootPage(){
 this.movieService.search$.next([]);
 this.router.navigate(['/']);


}

}
