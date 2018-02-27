import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZetaPushModule, ZetaPushClientConfig } from 'zetapush-angular';
import { environment } from '../environments/environment';
import { WebrtcApiProvider, CallApiProvider, RoomApiProvider, UserApiProvider } from './webrtc/webrtc-api';
import {VisioApiProvider} from './visio/visio-api.service';
import { WebrtcService } from './webrtc/webrtc.service';

import { AppComponent } from './component/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ZetaPushModule,
    FormsModule
  ],
  providers: [
    { provide: ZetaPushClientConfig, useValue: environment.zetapush },
    WebrtcApiProvider,
    WebrtcService,
    CallApiProvider,
    RoomApiProvider,
    UserApiProvider,
    VisioApiProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
