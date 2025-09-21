import { Routes } from '@angular/router';
import { Layout } from '../components/common/layout/layout';
import { CompanyList } from '../pages/company-list/company-list';
import { CompanyDetail } from '../pages/company-detail/company-detail';
import { CompanyMap } from '../pages/company-map/company-map';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CompanyList },
      { path: 'detail/:id', component: CompanyDetail },
      { path: 'map', component: CompanyMap },
    ],
  },
];
