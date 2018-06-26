import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role, User} from '../../models';
import {CompleterData, CompleterItem, CompleterService, RemoteData} from 'ng2-completer';
import {RolesService} from '../../services/roles.service';

@Component({
  selector: 'app-role-select-modal',
  templateUrl: './role-select-modal.component.html',
  styleUrls: ['./role-select-modal.component.scss']
})
export class RoleSelectModalComponent implements OnInit {

    selectedRole: Role;
    existingRoles: Role[] = [];
    title: string;
    private dataRemote: RemoteData;

    private dataLocal: CompleterData;
    private roles: Role[] = [];

    constructor(public dialogRef: MatDialogRef<RoleSelectModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                completerService: CompleterService,
                private rolesService: RolesService) {
        this.title = this.data.title;
        this.existingRoles = this.data.existingRoles;

        this.rolesService.get(0, 100).then(resp => {
            console.debug('got roles - ', resp);
            this.roles = resp.rows;
            // filter exising roles
            for (let i = 0; i < this.existingRoles.length; i++) {
                for (let j = 0; j < this.roles.length; j++) {
                    if (this.existingRoles[i].id === this.roles[j].id) {
                        this.roles.splice(j, 1);
                        break;
                    }
                }
            }
            this.dataLocal = completerService.local(this.roles, 'roleName', 'roleName');
        }, (error: Error) => {
            console.log('error getting roles ' + error);
        });
    }

    ngOnInit(): void {
        console.log ('ngOnInit');
    }

    addRole(): void {
        console.log ('addRole - ', this.selectedRole);
        this.dialogRef.close(this.selectedRole);
    }

    onRoleSelected(selected: CompleterItem) {
        console.log ('onRoleSelected', selected);
        this.selectedRole = Role.fromJson(selected.originalObject);
    }
}
