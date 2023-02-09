import{a as x}from"../../../_chunks/chunk-4J4TDGWB.js";import{k as v,n as D,o as P,p as d,q as e,r as c}from"../../../_chunks/chunk-PEBSLWIM.js";import{a,c as o,d as u,f as p,g as h}from"../../../_chunks/chunk-FEDAVPE7.js";var b=o(p(),1);var f=o(h(),1),U=o(p(),1);var C=o(h(),1),t=o(p(),1);var m=class extends C.TemplatedDialog{constructor(r){super(r);this.permissions=new x(this.byId("Permissions"),{showRevoke:!0}),d.List({UserID:this.options.userID,Module:null,Submodule:null},s=>{this.permissions.value=s.Entities}),d.ListRolePermissions({UserID:this.options.userID,Module:null,Submodule:null},s=>{this.permissions.rolePermissions=s.Entities}),this.permissions.implicitPermissions=(0,t.getRemoteData)("Administration.ImplicitPermissions"),this.dialogTitle=(0,t.format)((0,t.localText)("Site.UserPermissionDialog.DialogTitle"),this.options.username)}getDialogButtons(){return[{text:(0,t.localText)("Dialogs.OkButton"),cssClass:"btn btn-primary",click:r=>{d.Update({UserID:this.options.userID,Permissions:this.permissions.value,Module:null,Submodule:null},s=>{this.dialogClose(),window.setTimeout(()=>(0,t.notifySuccess)((0,t.localText)("Site.UserPermissionDialog.SaveSuccess")),0)})}},{text:(0,t.localText)("Dialogs.CancelButton"),click:()=>this.dialogClose()}]}getTemplate(){return'<div id="~_Permissions"></div>'}};a(m,"UserPermissionDialog");var g=o(h(),1),I=o(p(),1);var i=class extends g.EntityDialog{constructor(){super();this.form=new P(this.idPrefix);this.form.Password.addValidationRule(this.uniqueName,r=>{if(this.form.Password.value.length<7)return"Password must be at least 7 characters!"}),this.form.PasswordConfirm.addValidationRule(this.uniqueName,r=>{if(this.form.Password.value!=this.form.PasswordConfirm.value)return"The passwords entered doesn't match!"})}getFormKey(){return P.formKey}getIdProperty(){return e.idProperty}getIsActiveProperty(){return e.isActiveProperty}getLocalTextPrefix(){return e.localTextPrefix}getNameProperty(){return e.nameProperty}getService(){return c.baseUrl}getToolbarButtons(){let r=super.getToolbarButtons();return r.push({title:(0,I.localText)("Site.UserDialog.EditPermissionsButton"),cssClass:"edit-permissions-button",icon:"fa-lock text-green",onClick:()=>{new m({userID:this.entity.UserId,username:this.entity.Username}).dialogOpen()}}),r}updateInterface(){super.updateInterface(),this.toolbar.findButton("edit-permissions-button").toggleClass("disabled",this.isNewOrDeleted())}afterLoadEntity(){super.afterLoadEntity(),this.form.Password.element.toggleClass("required",this.isNew()).closest(".field").find("sup").toggle(this.isNew()),this.form.PasswordConfirm.element.toggleClass("required",this.isNew()).closest(".field").find("sup").toggle(this.isNew())}};a(i,"UserDialog"),i=u([g.Decorators.registerClass()],i);var n=class extends f.EntityGrid{getColumnsKey(){return D.columnsKey}getDialogType(){return i}getIdProperty(){return e.idProperty}getIsActiveProperty(){return e.isActiveProperty}getLocalTextPrefix(){return e.localTextPrefix}getService(){return c.baseUrl}constructor(l){super(l)}getDefaultSortBy(){return[e.Fields.Username]}getColumns(){var l=super.getColumns(),r=(0,U.tryFirst)(l,s=>s.field==e.Fields.Roles);return r&&(r.format=s=>{var w=(s.value||[]).map(S=>(v.getLookup().itemById[S]||{}).RoleName||"");return w.sort(),w.join(", ")}),l}};a(n,"UserGrid"),n=u([f.Decorators.registerClass()],n);$(function(){(0,b.initFullHeightGridPage)(new n($("#GridDiv")).element)});
//# sourceMappingURL=UserPage.js.map
