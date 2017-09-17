import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComicServiceProvider } from '../../providers/comic-service/comic-service';
import { ComicPage } from '../comic/comic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ComicServiceProvider ]
})
export class HomePage {

  private _dbComic: ComicServiceProvider;
  private _pageNumber: number = 2;

    constructor(public navCtrl: NavController,
                public dbComic: ComicServiceProvider) {
                  dbComic.load(1);
                  this._dbComic = dbComic;
    }
    public buttonClicked: boolean = false;
  
    public onButtonClick(){
      this.buttonClicked = !this.buttonClicked;
    }
  
    pushPage(_dbComic){
      this.navCtrl.push(ComicPage,{
        dbComic: _dbComic
      });
    }

    doInfinite(infiniteScroll) {
      console.log('Begin async operation');
  
      setTimeout(() => {
        
        this._dbComic.load(this._pageNumber);
        this._pageNumber++;

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 200);
    }

}
