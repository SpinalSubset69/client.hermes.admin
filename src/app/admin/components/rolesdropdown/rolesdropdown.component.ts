import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { IRole } from 'src/app/interfaces/Role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-rolesdropdown',
  templateUrl: './rolesdropdown.component.html',
  styleUrls: ['./rolesdropdown.component.css']
})
export class RolesdropdownComponent implements OnInit {
  roles!:IRole[];
  selectedRole:string = "Rol Del Reportero..."
  @Output() roleSelected = new EventEmitter<IRole>();
  constructor(private roleService:RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(response => {
      this.roles = response;
    })
  }

  selectRole(role:IRole){
    this.roleSelected.emit(role);
    this.selectedRole = role.name;
  }

}
