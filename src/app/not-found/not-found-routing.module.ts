import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';

const routes: Routes = [
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class NotFoundRoutingModule { }