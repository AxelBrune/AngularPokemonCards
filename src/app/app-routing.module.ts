import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { DeckComponent } from '../app/components/deck/deck.component';
import { HomeComponent } from '../app/components/home/home.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { StoreComponent } from '../app/components/store/store.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'deck', component: DeckComponent},
  {path: 'store', component: StoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
