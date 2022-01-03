import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal } from 'src/app/interfaces/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input()info!:Modal;
  @Output() selection = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  confirm(){
    this.selection.emit(true);
  }

  cancel(){
    this.selection.emit(false);
  }
}
