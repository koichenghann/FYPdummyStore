import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { LoginComponent } from './auth/login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'navbar', component: NavBarComponent},
  {path: 'recommendations', component: RecommendationsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/product', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
