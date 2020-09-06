import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './global-components/header/header.component';
import { FooterComponent } from './global-components/footer/footer.component';
import { SidebarComponent } from './global-components/sidebar/sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpIntercepterService } from './services/http-intercepter.service';
import { APP_BASE_HREF, LocationStrategy } from '@angular/common';
import { BaseUrlManagerService } from './services/base-url-manager.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { NotifyConnectionComponent } from './global-components/notify-connection/notify-connection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotifyConnectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterService,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: window.location.pathname
    },
    {
      provide: LocationStrategy,
      useClass: BaseUrlManagerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
