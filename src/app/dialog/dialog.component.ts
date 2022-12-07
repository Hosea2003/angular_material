import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import ProductData from '../Models/product.data';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  productForm!:FormGroup;

  constructor(
    public dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductData,
    private formBuilder:FormBuilder,
    private api:ApiService
  ) { }

    ngOnInit(): void {
      this.productForm=this.formBuilder.group({
        productName:['', Validators.required],
        category:['', Validators.required],
        freshness:['', Validators.required],
        price:['', Validators.required],
        comment:[''],
        date:['', Validators.required]
      })
    }

    addProduct(){
      if(this.productForm.valid){
        this.api.saveProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close()
          },
          error:err=>console.log(err)
        })
      }
    }


}
