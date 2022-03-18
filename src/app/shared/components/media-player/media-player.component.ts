import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  
  @ViewChild('progressBar') progressBar:ElementRef = new ElementRef('');
  listaObservers$:Array<Subscription> = []
  state:string = 'paused';
  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response:TrackModel) => {
        console.log('Recibiendo cancion', response);
      }
    )

    const observer2$: Subscription = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listaObservers$ = [observer2$];

    


    this.listaObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    this.listaObservers$.forEach(u => u.unsubscribe());
  }

  handlePosition(event: MouseEvent): void {
    console.log(event);
    const { clientX } = event;
    const elNative:HTMLElement = this.progressBar.nativeElement;
    const { x,width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100) / width;
    this.multimediaService.seekAudio(percentageFromX);
  }

}
