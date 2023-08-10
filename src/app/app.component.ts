import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
data: any = null;
rateContextList: any[] = [];
lineItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((response: any) => {
      this.rateContextList = response.RateContextList;
    });
  }

  addLineItem() {
    this.lineItems.push({
      quantity: 0,
      amount: 0, // This will be updated based on the selected RateType
      chargeType: '',
      item: '',
      option: '',
      description: ''
    });
  }

  getItemsForChargeType(chargeType: string): string[] {
    return [...new Set(this.rateContextList.filter(rate => rate.RateTypeName === chargeType).map(rate => rate.RateKindName))];
  }

  getOptionsForItem(chargeType: string, item: string): string[] {
    return [...new Set(this.rateContextList.filter(rate => rate.RateTypeName === chargeType && rate.RateKindName === item).map(rate => rate.RateOptionName))];
  }

  getUniqueChargeTypes(): string[] {
    return [...new Set(this.rateContextList.map(rate => rate.RateTypeName))];
}

  

}
