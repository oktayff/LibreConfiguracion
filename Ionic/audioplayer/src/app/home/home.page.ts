import { Component, ViewChild} from '@angular/core';
import {Howl, Howler} from 'howler';
import { IonRange } from '@ionic/angular';
import { Track } from '../Track.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  playlist: Track[] = [
    {
      name: 'A new beginning',
      path: './assets/mp3/bensound-anewbeginning.mp3'
    },
    {
      name: 'Happy Rock',
      path: './assets/mp3/bensound-happyrock.mp3'
    },
    {
      name: 'Sunny',
      path: './assets/mp3/bensound-sunny.mp3'
    }
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;


  constructor() {}

  start(track: Track) {
    if(this.player){
      this.player.stop(); // Hacemos esto para que no se reproduzcan varias canciones a la vez
    }
    this.player = new Howl({
      src: [track.path],
      // Cambiamos el valor de las variables cuando una canción se está reproduciendo
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();

      },
      onend: () => {

      }
    });
    this.player.play(); // Si no se está reproduciendo ninguna canción llamamos al método play()
  }
  
  // Método que hace que aparezca el reproductor cuando hay una canción activa
  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    }else{
      this.player.play();
    }
  }
  
  // Método para poder pasar a la siguiente canción
  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1) { // Si no estamos al final reproducimos la siguiente de la que está activa en ese momento
      this.start(this.playlist[index + 1]);
    }else{
      this.start(this.playlist[0]); // Si estamos al final de la playlist reproducimos la primera canción
    }
  }
  
  // Método para volver a una canción anterior
  prev() {
    let index = this.playlist.indexOf(this.activeTrack); // Igualamos la variable a la canción que se está reproduciendo
    if(index > 0) {
      this.start(this.playlist[index - 1]); // Si index es mayor de 0 volvemos hacía atrás
    }else{
      this.start(this.playlist[this.playlist.length - 1]); // Si estamos en la posición 0 nos vamos a la última canción
    }
  }

  seek() {
    let newValue = +this.range.value; // Contiene la longitud en la que está la línea de reproducción
    let duration = this.player.duration(); // Contiene la longitud de toda la línea
    this.player.seek(duration * (newValue / 100));

  }
  
   // Método que hace que la línea de reproducción se mueva conforme la canción avanza
  updateProgress() {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000); 

  }

}
