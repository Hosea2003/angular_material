import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import ProductData from './Models/product.data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'angular-material';

  displayedColumns:string[]=["name", "category", "freshness", "price"]
  dataSource=new MatTableDataSource<ProductData>()

  products:ProductData[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog:MatDialog, private api:ApiService){
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.api.getProduct().subscribe(products=>{
      this.products=products;
      this.dataSource=new MatTableDataSource<ProductData>(this.products);
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data:{name:"Iphone"},
      minWidth:"350px",
      width:"30%"
    })

    dialogRef.afterClosed().subscribe(result=>{
      this.load();
    })
  }

  filterProduct(event:Event){
    const filterValue =(event.target as HTMLInputElement).value;
    const filtered=this.products.filter(product=>{
      return product.productName.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
    })
    this.dataSource.data=filtered;
  }
}
