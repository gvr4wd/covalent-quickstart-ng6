import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../models';
import {CompleterItem, CompleterService, RemoteData} from 'ng2-completer';
import {Education} from '../../models/education';

@Component({
  selector: 'app-user-select-modal',
  templateUrl: './user-select-modal.component.html',
  styleUrls: ['./user-select-modal.component.scss']
})
export class UserSelectModalComponent implements OnInit {

    user: User;
    title: string;
    private dataRemote: RemoteData;

    constructor(public dialogRef: MatDialogRef<UserSelectModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                completerService: CompleterService) {

        this.dataRemote = completerService.remote(
            null,
            'firstName,lastName,email',
            'firstName,lastName');
        this.dataRemote.urlFormater(term => {
            return `/api/users/search/${term}`;
        });
    }

    ngOnInit(): void {
        console.log ('ngOnInit');
        this.title = this.data.title;
    }

    save(): void {
        console.log ('save - ', this.user);
        this.dialogRef.close(this.user);
    }

    onUserSelected(selected: CompleterItem) {
        console.log ('onUserSelected', selected);
        this.user = User.fromJson(selected.originalObject);
    }
}
