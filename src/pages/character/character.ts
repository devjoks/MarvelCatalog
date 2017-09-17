import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ComicServiceProvider } from '../../providers/comic-service/comic-service';

@IonicPage()
@Component({
  selector: 'page-character',
  templateUrl: 'character.html',
  providers: [ ComicServiceProvider ]
})
export class CharacterPage {

  private _dbComic: ComicServiceProvider;
  
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public dbComic: ComicServiceProvider) {
                  this._dbComic = navParams.get("dbComic");
                  this._dbComic.loadChara(navParams.get("URLChara"));
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad ComicPage');
    }

}
