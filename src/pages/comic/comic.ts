import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComicServiceProvider } from '../../providers/comic-service/comic-service';

@IonicPage()
@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html',
  providers: [ ComicServiceProvider ]
})
export class ComicPage {

  private _dbComic: ComicServiceProvider;
  
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public dbComic: ComicServiceProvider) {
                  this._dbComic = navParams.get("dbComic");
                  dbComic.loadComic(this._dbComic["id"]);
                  // dbComic.loadRecommendation(this._dbComic["id"]);
    }
  
    pushPage(_dbComic){
      this.navCtrl.push(ComicPage,{
        dbComic: _dbComic
      });
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ComicPage');
    }

}
