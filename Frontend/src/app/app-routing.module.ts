import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUiComponent } from './components/main-ui/main-ui.component';

const routes: Routes = [
  { path: 'main-ui', component: MainUiComponent },
  { path: '', redirectTo: '/main-ui', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
