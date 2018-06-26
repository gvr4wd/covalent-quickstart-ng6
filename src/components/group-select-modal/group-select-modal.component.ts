import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Group, User} from '../../models';
import {CompleterData, CompleterItem, CompleterService, RemoteData} from 'ng2-completer';
import {GroupsService} from '../../services/groups.service';

@Component({
  selector: 'app-group-select-modal',
  templateUrl: './group-select-modal.component.html',
  styleUrls: ['./group-select-modal.component.scss']
})
export class GroupSelectModalComponent implements OnInit {

    selectedGroup: Group;
    existingGroups: Group[] = [];
    title: string;
    private dataRemote: RemoteData;

    private dataLocal: CompleterData;
    private groups: Group[] = [];

    constructor(public dialogRef: MatDialogRef<GroupSelectModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                completerService: CompleterService,
                private groupsService: GroupsService) {

        // this.dataRemote = completerService.remote(
        //     null,
        //     'firstName,lastName,email',
        //     'firstName,lastName');
        // this.dataRemote.urlFormater(term => {
        //     return `/api/users/search/${term}`;
        // });

        this.title = this.data.title;
        this.existingGroups = this.data.existingGroups;

        this.groupsService.get(0, 100).then(resp => {
            console.debug('got groups - ', resp);
            this.groups = resp.rows;
            // filter exising groups
            for (let i = 0; i < this.existingGroups.length; i++) {
                for (let j = 0; j < this.groups.length; j++) {
                    if (this.existingGroups[i].id === this.groups[j].id) {
                        this.groups.splice(j, 1);
                        break;
                    }
                }
            }
            this.dataLocal = completerService.local(this.groups, 'groupName', 'groupName');
        }, (error: Error) => {
            console.log('error getting groups ' + error);
        });
    }

    ngOnInit(): void {
        console.log ('ngOnInit');
    }

    addGroup(): void {
        console.log ('addGroup - ', this.selectedGroup);
        this.dialogRef.close(this.selectedGroup);
    }

    onGroupSelected(selected: CompleterItem) {
        console.log ('onGroupSelected', selected);
        this.selectedGroup = Group.fromJson(selected.originalObject);
    }
}
