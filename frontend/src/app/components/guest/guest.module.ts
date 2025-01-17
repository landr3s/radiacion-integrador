import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';

const routes: Routes = [{ path: '', component: InfoComponent }];

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GuestModule {}
