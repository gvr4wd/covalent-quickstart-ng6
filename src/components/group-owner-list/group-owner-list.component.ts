import {Component, Input, OnInit} from '@angular/core';
import {Logger} from '../../shared/logger';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {TdDialogService, TdLoadingService} from '@covalent/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {Group} from '../../models';
import {UserSelectModalComponent} from '../index';

@Component({
  selector: 'app-group-owner-list',
  templateUrl: './group-owner-list.component.html',
  styleUrls: ['./group-owner-list.component.scss']
})
export class GroupOwnerListComponent implements OnInit {

  @Input()
  group: Group;

  dialogRef: MatDialogRef<any>;
  config: MatDialogConfig = {
    disableClose: false,
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      message: 'Jazzy jazz jazz',
      title: 'N/A'
    }
  };

  constructor(private groupService: GroupsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private dialogService: TdDialogService,
              private route: ActivatedRoute,
              private location: Location,
              private snackBarService: MatSnackBar,
              private loadingService: TdLoadingService,
              private logger: Logger) {
  }

  ngOnInit() {
  }

  /**
   * add owner to group
   * @param {string} title
   */
  addOwner(title: string) {
    this.logger.debug('addOwner');
    this.config.data.title = title;
    this.dialogRef = this.dialog.open(UserSelectModalComponent, this.config);
    this.dialogRef.afterClosed().subscribe(owner => {
      if (owner) {
        this.groupService.setOwner(this.group, owner).then(group => {
          this.logger.debug('set owner');
          this.group.owner = owner;
          this.snackBar.open('Set owner for the group', 'Success');
        }, (error: Error) => {
          this.logger.debug('error getting group ' + error);
          this.snackBar.open('Error setting owner for the group', 'Error');
        });
      }
      this.logger.debug('addOwner dialog clcosed - ', owner);
      this.dialogRef = null;
    });
  }
}
