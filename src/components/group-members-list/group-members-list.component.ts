import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../models';
import {User} from '../../models/user';
import {Logger} from '../../shared/logger';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {TdDialogService, TdLoadingService} from '@covalent/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {UsersService} from '../../services';
import {Subject} from 'rxjs/Subject';
// avoid circular dependency
import {UserSelectModalComponent} from '../user-select-modal/user-select-modal.component';

@Component({
  selector: 'app-group-members-list',
  templateUrl: './group-members-list.component.html',
  styleUrls: ['./group-members-list.component.scss']
})
export class GroupMembersListComponent implements OnInit {

  @Input()
  group: Group;

  users: Observable<User[]>;
  private searchTerms = new Subject<string>();


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
    }
  };

  constructor(private groupService: GroupsService,
              private usersService: UsersService,
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
    // this.users = this.searchTerms
    //   .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    //   .distinctUntilChanged()   // ignore if next search term is same as previous
    //   .switchMap(term => term   // switch to new observable each time the term changes
    //     // return the http search observable
    //     ? this.usersService.search(term)
    //     // or the observable of empty users if there was no search term
    //     : Observable.of<User[]>([]))
    //   .catch(error => {
    //     // TODO: add real error handling
    //     console.log(error);
    //     return Observable.of<User[]>([]);
    //   });
  }


  /**
   * delete member from goroup
   * @param {User} member
   */
  deleteMember(member: User): void {
    this.dialogService
      .openConfirm(
        {
          message: 'Are you sure you want to delete this user from the group?',
          acceptButton: 'OK'
        }
      )
      // .openAlert({message: 'You don\'t have permission to delete groups.'})
      .afterClosed().subscribe((confirm: boolean) => {
      this.logger.debug(confirm);
      if (confirm) {
        // this.loadingService.register('groups.list');
        this.groupService.deleteMember(this.group, member).then(resp => {
          const index = this.group.members.indexOf(member);
          this.group.members.splice(index, 1);

          // this.loadingService.resolve('groups.list');
          this.snackBarService.open('member deleted', 'Ok');
        }, (error: Error) => {
          this.logger.error('error removing a member from the group');
          this.dialogService.openAlert({message: 'There was an error'});
          // this.loadingService.resolve('groups.list');
        });
      }
    });
  }

  /**
   * add member to group
   */
  addMember() {
    console.log('addMember');
    this.config.data.title = 'Add Member';
    this.dialogRef = this.dialog.open(UserSelectModalComponent, this.config);
    this.dialogRef.afterClosed().subscribe(member => {
      console.log('addMember dialog clcosed - ', member);
      if (member) {
        for (let i = 0; i < this.group.members.length; i++) {
          if (member.id === this.group.members[i].id) {
            this.snackBar.open('Member already exists', 'Error');
            return;
          }
        }
        console.log('adding members');
        this.groupService.addMember(this.group, member).then(group => {
          this.group.members.push(member);
          this.snackBar.open('Added a member for the group', 'Success');
        }, (error: Error) => {
          console.log('error getting group ' + error);
          this.snackBar.open('Error adding member to the group', 'Error');
        });
      }
      this.dialogRef = null;
    });
  }
}
