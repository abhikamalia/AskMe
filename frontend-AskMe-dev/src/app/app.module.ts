import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpCustomInterceptor } from './http-custom.interceptor';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { NewThreadComponent } from './new-thread/new-thread.component';
import { YourGroupsComponent } from './your-groups/your-groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { ShowThreadComponent } from './show-thread/show-thread.component';
import { ShowGroupComponent } from './show-group/show-group.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PostsComponent,
    NewThreadComponent,
    YourGroupsComponent,
    CreateGroupComponent,
    AllGroupsComponent,
    ShowThreadComponent,
    ShowGroupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
