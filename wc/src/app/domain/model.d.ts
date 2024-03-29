/**
 * @fileOverview Generated by @croc/generator-webclient:client-classes Yeoman-generator, v1.34.6.
 */
import lang = require("lib/core.lang");
import domain = require("lib/domain/.domain");
import support = require("lib/domain/support");
import _DomainObject = require("lib/domain/DomainObject");
import _UnitOfWork = require("lib/domain/UnitOfWork");
import ComplexValue = require("lib/domain/ComplexValue");
import Big = require("big");
import LobPropValue = support.LobPropValue;

import { metadata, IDomainCollection, INavigationPropSet } from "lib/domain/.domain";
import { IDataFacade } from "lib/interop/.interop";

export const factory: any;

export class UnitOfWork extends _UnitOfWork {
	constructor(dataFacade: IDataFacade, options: _UnitOfWork.Options);
	createProjectRole(props?: lang.Map<any>): ProjectRole;
	createTask(props?: lang.Map<any>): Task;
	createUser(props?: lang.Map<any>): User;
	createProject(props?: lang.Map<any>): Project;
	createChangeLog(props?: lang.Map<any>): ChangeLog;
	createEditeTask(props?: lang.Map<any>): EditeTask;

}

export class DomainObject extends _DomainObject {
	uow: UnitOfWork;
}


export interface UserRoleMeta extends metadata.EnumMeta {
	members: {
		"Analyst": metadata.EnumMember;
		"Developer": metadata.EnumMember;
		"LeadDeveloper": metadata.EnumMember;
		"Manager": metadata.EnumMember;
		"Tester": metadata.EnumMember;
	};
}

export enum UserRole {
	Analyst = 2,
	Developer = 4,
	LeadDeveloper = 16,
	Manager = 32,
	Tester = 64,
}
export namespace UserRole {
	export const meta: UserRoleMeta;
}

export interface TypeActionMeta extends metadata.EnumMeta {
	members: {
		"RemoveAct": metadata.EnumMember;
		"AddAct": metadata.EnumMember;
		"UpdateAct": metadata.EnumMember;
	};
}

export enum TypeAction {
	RemoveAct = 2,
	AddAct = 4,
	UpdateAct = 8,
}
export namespace TypeAction {
	export const meta: TypeActionMeta;
}

export interface TaskTypeMeta extends metadata.EnumMeta {
	members: {
		"Task": metadata.EnumMember;
		"Mistake": metadata.EnumMember;
		"Demand": metadata.EnumMember;
	};
}

export enum TaskType {
	Task = 2,
	Mistake = 4,
	Demand = 8,
}
export namespace TaskType {
	export const meta: TaskTypeMeta;
}

export interface StatusMeta extends metadata.EnumMeta {
	members: {
		"REGISTRED": metadata.EnumMember;
		"INPROCESS": metadata.EnumMember;
		"CHECKING": metadata.EnumMember;
		"FIXPROBLEMS": metadata.EnumMember;
		"CLOSED": metadata.EnumMember;
	};
}

export enum Status {
	REGISTRED = 2,
	INPROCESS = 4,
	CHECKING = 8,
	FIXPROBLEMS = 16,
	CLOSED = 32,
}
export namespace Status {
	export const meta: StatusMeta;
}

export interface ProjectRoleMeta extends metadata.EntityMeta {
	props: {
		"userRole": metadata.PropertyMeta;
		"numberProject": metadata.PropertyMeta;
		"projectUser": metadata.PropertyMeta;
	};
}
export type ProjectRoleNames = {
	readonly [P in keyof ProjectRoleMeta["props"] | keyof ProjectRoleMeta["complex"]]: string;
};

export class ProjectRole extends DomainObject {
	static meta: ProjectRoleMeta;
	static NAMES: ProjectRoleNames;
	meta: ProjectRoleMeta;
	"userRole": lang.ObservableProperty<UserRole>;
	"numberProject": lang.ObservableProperty<Project>;
	"projectUser": lang.ObservableProperty<User>;
}

export interface TaskMeta extends metadata.EntityMeta {
	props: {
		"numberTaskInProject": metadata.PropertyMeta;
		"description": metadata.PropertyMeta;
		"status": metadata.PropertyMeta;
		"deadline": metadata.PropertyMeta;
		"startline": metadata.PropertyMeta;
		"wastedTime": metadata.PropertyMeta;
		"changedDate": metadata.PropertyMeta;
		"type": metadata.PropertyMeta;
		"project": metadata.PropertyMeta;
		"author": metadata.PropertyMeta;
		"taskPerformer": metadata.PropertyMeta;
		"lastEditor": metadata.PropertyMeta;
		"lowerPerformentTask": metadata.PropertyMeta;
		"tasks": metadata.PropertyMeta;
		"isCheck": metadata.PropertyMeta;
	};
}
export type TaskNames = {
	readonly [P in keyof TaskMeta["props"] | keyof TaskMeta["complex"]]: string;
};

export class Task extends DomainObject {
	static meta: TaskMeta;
	static NAMES: TaskNames;
	meta: TaskMeta;
	"numberTaskInProject": lang.ObservableProperty<string>;
	"description": lang.ObservableProperty<string>;
	"status": lang.ObservableProperty<Status>;
	"deadline": lang.ObservableProperty<Date>;
	"startline": lang.ObservableProperty<Date>;
	"wastedTime": lang.ObservableProperty<string>;
	"changedDate": lang.ObservableProperty<Date>;
	"type": lang.ObservableProperty<TaskType>;
	"project": lang.ObservableProperty<Project>;
	"author": lang.ObservableProperty<User>;
	"taskPerformer": lang.ObservableProperty<User>;
	"lastEditor": lang.ObservableProperty<User>;
	"lowerPerformentTask": lang.ObservableProperty<Task>;
	"tasks": lang.ObservableGetter<IDomainCollection<Task>>;
	"isCheck": lang.ObservableProperty<boolean>;
}

export interface UserMeta extends metadata.EntityMeta {
	props: {
		"isAdmin": metadata.PropertyMeta;
		"firstName": metadata.PropertyMeta;
		"lastName": metadata.PropertyMeta;
		"middleName": metadata.PropertyMeta;
		"login": metadata.PropertyMeta;
		"password": metadata.PropertyMeta;
		"performentTasks": metadata.PropertyMeta;
		"roleUserProject": metadata.PropertyMeta;
	};
}
export type UserNames = {
	readonly [P in keyof UserMeta["props"] | keyof UserMeta["complex"]]: string;
};

export class User extends DomainObject {
	static meta: UserMeta;
	static NAMES: UserNames;
	meta: UserMeta;
	"isAdmin": lang.ObservableProperty<boolean>;
	"firstName": lang.ObservableProperty<string>;
	"lastName": lang.ObservableProperty<string>;
	"middleName": lang.ObservableProperty<string>;
	"login": lang.ObservableProperty<string>;
	"password": lang.ObservableProperty<string>;
	"performentTasks": lang.ObservableGetter<IDomainCollection<Task>>;
	"roleUserProject": lang.ObservableGetter<IDomainCollection<ProjectRole>>;
}

export interface ProjectMeta extends metadata.EntityMeta {
	props: {
		"description": metadata.PropertyMeta;
		"title": metadata.PropertyMeta;
		"codeProject": metadata.PropertyMeta;
		"taskCounter": metadata.PropertyMeta;
		"projectTasks": metadata.PropertyMeta;
		"crew": metadata.PropertyMeta;
	};
}
export type ProjectNames = {
	readonly [P in keyof ProjectMeta["props"] | keyof ProjectMeta["complex"]]: string;
};

export class Project extends DomainObject {
	static meta: ProjectMeta;
	static NAMES: ProjectNames;
	meta: ProjectMeta;
	"description": lang.ObservableProperty<string>;
	"title": lang.ObservableProperty<string>;
	"codeProject": lang.ObservableProperty<string>;
	"taskCounter": lang.ObservableProperty<number>;
	"projectTasks": lang.ObservableGetter<IDomainCollection<Task>>;
	"crew": lang.ObservableGetter<IDomainCollection<ProjectRole>>;
}

export interface ChangeLogMeta extends metadata.EntityMeta {
	props: {
		"changedDate": metadata.PropertyMeta;
		"typeAction": metadata.PropertyMeta;
		"typeEntity": metadata.PropertyMeta;
		"entityId": metadata.PropertyMeta;
		"author": metadata.PropertyMeta;
	};
}
export type ChangeLogNames = {
	readonly [P in keyof ChangeLogMeta["props"] | keyof ChangeLogMeta["complex"]]: string;
};

export class ChangeLog extends DomainObject {
	static meta: ChangeLogMeta;
	static NAMES: ChangeLogNames;
	meta: ChangeLogMeta;
	"changedDate": lang.ObservableProperty<Date>;
	"typeAction": lang.ObservableProperty<TypeAction>;
	"typeEntity": lang.ObservableProperty<string>;
	"entityId": lang.ObservableProperty<string>;
	"author": lang.ObservableProperty<string>;
}

export interface EditeTaskMeta extends metadata.EntityMeta {
	props: {
		"taskId": metadata.PropertyMeta;
		"description": metadata.PropertyMeta;
		"status": metadata.PropertyMeta;
		"deadline": metadata.PropertyMeta;
		"type": metadata.PropertyMeta;
		"project": metadata.PropertyMeta;
		"taskPerformer": metadata.PropertyMeta;
		"isCheck": metadata.PropertyMeta;
	};
}
export type EditeTaskNames = {
	readonly [P in keyof EditeTaskMeta["props"] | keyof EditeTaskMeta["complex"]]: string;
};

export class EditeTask extends DomainObject {
	static meta: EditeTaskMeta;
	static NAMES: EditeTaskNames;
	meta: EditeTaskMeta;
	"taskId": lang.ObservableProperty<string>;
	"description": lang.ObservableProperty<string>;
	"status": lang.ObservableProperty<string>;
	"deadline": lang.ObservableProperty<Date>;
	"type": lang.ObservableProperty<TaskType>;
	"project": lang.ObservableProperty<Project>;
	"taskPerformer": lang.ObservableProperty<User>;
	"isCheck": lang.ObservableProperty<boolean>;
}

export interface ModelMeta extends metadata.ModelMeta {
	enums: {
		UserRole: UserRoleMeta;
		TypeAction: TypeActionMeta;
		TaskType: TaskTypeMeta;
		Status: StatusMeta;
	};
	complex: {
	};
	entities: {
		ProjectRole: ProjectRoleMeta;
		Task: TaskMeta;
		User: UserMeta;
		Project: ProjectMeta;
		ChangeLog: ChangeLogMeta;
		EditeTask: EditeTaskMeta;
	};
}
export const meta: ModelMeta;
