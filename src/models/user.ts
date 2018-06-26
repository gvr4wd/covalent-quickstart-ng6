/**
 * Created by dshin on 10/1/16.
 */
import {SearchableModel} from "./searchable-model";
import {Resume} from "./resume";
import {Education} from "./education";
import {Certification} from "./certification";
import {Award} from "./award";
import {Publication} from "./publication";
import {Presentation} from "./presentation";
import {ProfessionalAssociation} from "./professional-association";
import {Experience} from "./experience";
import {Skill} from "./skill";
import {Group} from './group';
import {Role} from './role';

export class User extends SearchableModel {
  public age: number = 0; // calculated

  static fromJson(json: any) {
    if (!json) {
      return;
    }
    const resumes: Resume[] = [];
    const educations: Education[] = [];
    const certifications: Certification[] = [];
    const awards: Award[] = [];
    const publications: Publication[] = [];
    const presentations: Presentation[] = [];
    const professionalAssociations: ProfessionalAssociation[] = [];
    const experiences: Experience[] = [];
    const skills: Skill[] = [];
    const ownedGroups: Group[] = [];
    const groups: Group[] = [];
    const roles: Role[] = [];

    if (json.resumes) {
      for (let i = 0; i < json.resumes.length; i++) {
        resumes.push(Resume.fromJson(json.resumes[i]));
      }
    }

    if (json.educations) {
      for (let i = 0; i < json.educations.length; i++) {
        educations.push(Education.fromJson(json.educations[i]));
      }
    }

    if (json.certifications) {
      for (let i = 0; i < json.certifications.length; i++) {
        certifications.push(Certification.fromJson(json.certifications[i]));
      }
    }

    if (json.awards) {
      for (let i = 0; i < json.awards.length; i++) {
        awards.push(Award.fromJson(json.awards[i]));
      }
    }

    if (json.publications) {
      for (let i = 0; i < json.publications.length; i++) {
        publications.push(Publication.fromJson(json.publications[i]));
      }
    }

    if (json.presentations) {
      for (let i = 0; i < json.presentations.length; i++) {
        presentations.push(Presentation.fromJson(json.presentations[i]));
      }
    }

    if (json.professionalAssociations) {
      for (let i = 0; i < json.professionalAssociations.length; i++) {
        professionalAssociations.push(ProfessionalAssociation.fromJson(json.professionalAssociations[i]));
      }
    }

    if (json.skills) {
      for (let i = 0; i < json.skills.length; i++) {
        skills.push(Skill.fromJson(json.skills[i]));
      }
    }

    if (json.experiences) {
      for (let i = 0; i < json.experiences.length; i++) {
        experiences.push(Experience.fromJson(json.experiences[i]));
      }
    }

    if (json.resumes) {
      for (let i = 0; i < json.resumes.length; i++) {
        resumes.push(Resume.fromJson(json.resumes[i]));
      }
    }

    if (json.ownedGroups) {
      for (let i = 0; i < json.ownedGroups.length; i++) {
        ownedGroups.push(Group.fromJson(json.ownedGroups[i]));
      }
    }

    if (json.groups) {
      for (let i = 0; i < json.groups.length; i++) {
        groups.push(Group.fromJson(json.groups[i]));
      }
    }

    if (json.roles) {
      for (let i = 0; i < json.roles.length; i++) {
        roles.push(Role.fromJson(json.roles[i]));
      }
    }

    return new User(json.id, json.firstName, json.lastName, json.email, json.profilePictureUrl, json.gender,
      json.address, json.city, json.state, json.zip, json.login, new Date(json.dateOfBirth),
      json.ssn, json.password, json.hourlyRate, json.lastLogin, json.createdAt, json.jwtToken,
      resumes, educations, certifications, awards, publications, presentations,
      professionalAssociations, skills, experiences, ownedGroups, groups, roles);
  }

  constructor(public id: number = null,
              public firstName: string = null,
              public lastName: string = null,
              public email: string = null,
              public profilePictureUrl: string = null,
              public gender: string = null,
              public address: string = null,
              public city: string = null,
              public state: string = null,
              public zip: string = null,
              public login: string = null,
              public dateOfBirth: Date = null,
              public ssn: string = null,
              public password: string = null,
              public hourlyRate: number = null,
              public lastLogin: Date = null,
              public createdAt: Date = null,
              public jwtToken: String = null,
              public resumes: Resume[] = [],
              public educations: Education[] = [],
              public certifications: Certification[] = [],
              public awards: Award[] = [],
              public publications: Publication[] = [],
              public presentations: Presentation[] = [],
              public professionalAssociations: ProfessionalAssociation[] = [],
              public skills: Skill[] = [],
              public experiences: Experience[] = [],
              public ownedGroups: Group[] = [],
              public groups: Group[] = [],
              public roles: Role[] = []) {

    super();

    if (this.dateOfBirth) {
      let today = new Date();
      let birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;
    }
  }

  getName(): string {
    return this.lastName + ', ' + this.firstName;
  }

  getSearchTitle(): string {
    return this.getName();
  }

  getSearchText(searchStr): string {
    return this.buildSearchText(this, ['email', 'gender', 'address', 'city', 'state', 'zip', 'login', 'dateOfBirth'], searchStr);
  }

  getLink(): string {
    return '/users/' + this.id;
  }

  hasRole(roleName: string): boolean {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName === roleName) {
        return true;
      }
    }
    return false;
  }


  toJson(stringify?: boolean): any {
    const doc = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      profilePictureUrl: this.profilePictureUrl,
      gender: this.gender,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      login: this.login,
      dateOfBirth: this.dateOfBirth,
      ssn: this.ssn,
      password: this.password,
      hourlyRate: this.hourlyRate,
      lastLogin: this.lastLogin,
      createdAt: this.createdAt
    };

    return stringify ? JSON.stringify({resource: [doc]}) : doc;
  }
}
