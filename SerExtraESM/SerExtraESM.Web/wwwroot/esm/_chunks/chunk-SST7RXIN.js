import{a as u,b as V,c as b,d as S,f as w,g as ee}from"./chunk-BX2ZHUFS.js";var H=V((qe,K)=>{K.exports=Serenity.Extensions});var J=V((Me,Q)=>{Q.exports=Slick});var o=b(w(),1);var d=b(w(),1);var C=b(w(),1);var A=b(w(),1);var F=b(w(),1);var te=b(w(),1);function q(h,x=!0){h&&(x==!0?h.element.closest(".field").show():h.element.closest(".field").hide())}u(q,"showField");var M=b(w(),1);var W=null,_=!0,G={AutoColumnSize:!0,FadeInEffectWhenInit:!0,ShowAnyInEqualityFilterWithTextValue:!0,ShowInlineActionsColumn:!0,ShowDeleteInlineButtun:!1,ShowEditInlineButtun:!0,ShowPrintInlineButtun:!1,ShowRowNumberColumn:!0,ShowRowSelectionCheckboxColumn:!1,EnableQuickSearch:!0,RowsPerPage:20};var N={AutoFitContentArea:!1,HideCategoyLinksBar:!0,PendingChangesConfirmation:!0,ShowSaveAndNewButtonInToolbar:!1,ShowCloseButtonInToolbar:!1,ShowRefreshButtonInToolbar:!1,ShowChangeLogButtonInToolbar:!0,ShowReplaceRowButtonInToolbar:!1,ShowKeyboardLayoutButtonInToolbar:!1};function p(h,x){var e=(0,A.text)(h);return e==h?x:e}u(p,"text");var k=class extends C.TemplatedDialog{constructor(e){super(e);this.onSuccess=u(e=>{},"onSuccess");try{var t=(0,C.getType)(e.gridType);this.checkGrid=new t(this.byId("RowSelectionCheckGrid"),e),e.preSelectedKeys&&(this.checkGrid.selectedKeys=e.preSelectedKeys),this.dialogTitle=p("Controls.Select","Select")+" - "+this.checkGrid.getTitle(),this.checkGrid.setTitle(null),this.checkGrid.element.height(500),this.checkGrid.pickerDialog=this}catch(r){console.warn("Could not intialize "+e.gridType)}}getTemplate(){return`<div id="~_RowSelectionCheckGrid" 
                class="RowSelectionCheckGrid ${this.options.multiple==!0?"multi-select":"single-select"}" 
                style = "margin: 15px 15px 0 15px;" >
            </div>`}get selectedItems(){return this.checkGrid.selectedItems}getDialogOptions(){let e=super.getDialogOptions();return e.buttons=[{text:(0,C.text)("Dialogs.OkButton"),click:()=>{var t=this.checkGrid.selectedItems;if(!t.length){(0,C.notifyWarning)("Please select some items!");return}this.onSuccess(t),this.dialogClose()}},{text:(0,C.text)("Dialogs.CancelButton"),click:()=>{this.dialogClose()}}],e.height=500,e}};u(k,"GridItemPickerDialog"),k=S([C.Decorators.registerClass()],k);var v=class extends d.Widget{constructor(e,t){super(e,t);this.options=t;this.selectedItemIncludeColumns=[];this.importPagejs(t),this.element.addClass("select2-offscreen"),this.containerDiv=$(`<div class="editor s-GridItemPickerEditor select2-container ${t.multiple?"select2-container-multi":""} has-inplace-button">
                        <div class="${t.multiple?"select2-choices":"select2-choice"}">
                            <div class="display-text" style="user-select: text; padding-right: 20px;${t.multiple?"padding-left: 5px;":""}"></div>
                            <a class="select2-search-choice-close btn-clear-selection" style="margin-top: 2px; cursor: pointer; left: unset;"></a>
                        </div>
                    </div>`).insertBefore(this.element),this.addInplaceButtons(),this.setCascadeFrom(this.options.cascadeFrom)}importPagejs(e){let t=e.pageImportPath;t.startsWith("@/")&&(t="~/esm/Modules/"+t.substring(2),t.endsWith(".js")||(t+=".js")),t=(0,d.resolveUrl)(t),import(t)}addInplaceButtons(){var e=this;this.inplaceSearchButton=$('<a style="padding-top: 2px;"><i class="fa fa-search"></i></a>').addClass("inplace-button inplace-search align-center").attr("title","search").insertAfter(this.containerDiv).click(function(t){e.inplaceSearchClick(t)}),this.inplaceViewButton=$('<a style="padding-top: 2px;"><i class="fa fa-eye"></i></a>').addClass("inplace-button inplace-view align-center").attr("title","view").click(function(t){e.inplaceViewClick(t)}).hide(),this.options.inplaceView!=!1&&!this.options.multiple&&this.inplaceViewButton.insertAfter(this.containerDiv),this.clearSelectionButton=this.containerDiv.find(".select2-search-choice-close").click(t=>{this.value="",this.text="",this._selectedItem=null,this.selectedItems=[],$(t.target).hide(),this.element.trigger("change")}).hide()}inplaceSearchClick(e){this.options.preSelectedKeys=this.values;var t=new k(this.options);t.onSuccess=r=>{this.value=t.checkGrid.rowSelection.getSelectedKeys().join(","),this.text=r.map(l=>l[this.options.nameFieldInGridRow]).join(", "),(0,d.isEmptyOrNull)(this.text)&&console.warn("nameFieldInGridRow might be wrong in "+this.widgetName),this._selectedItem=r[0],this.selectedItems=r,this.element.trigger("change")},t.dialogOpen()}inplaceViewClick(e){var t=this.value;if(!(0,d.isEmptyOrNull)(t)){var r=this.getDialogInstance();r.isReadOnly=!0,r.loadByIdAndOpenDialog(t,!1)}}getDialogInstance(){var e=this.options.dialogType;e.prototype||(e=(0,d.getType)(this.options.dialogType));try{var t=new e;return t}catch(r){console.warn("Could not intialize "+this.options.dialogType)}}get value(){return this.element.val()}set value(e){this.element.val(e),(0,d.isEmptyOrNull)(e)?(this.text="",this.inplaceViewButton.hide(),this.clearSelectionButton.hide()):(this.inplaceViewButton.show(),this.get_readOnly()==!1&&this.clearSelectionButton.show())}get values(){let e=this.value;return(0,d.isEmptyOrNull)(e)?[]:e.split(",")}set values(e){this.value=e.join(",")}get text(){return this.containerDiv.find(".display-text").text()}set text(e){this.containerDiv.find(".display-text").text(e)}getEditValue(e,t){this.options.multiple==!0?t[e.name]=this.values:t[e.name]=this.value}setEditValue(e,t){this.value=e[t.name];let r=e[this.options.nameFieldInThisRow];this.text=r,e[t.name]&&(this._selectedItem={},this._selectedItem[this.options.idFieldInGridRow]=e[t.name],this._selectedItem[this.options.nameFieldInGridRow]=r)}get_value(){return this.value}set_value(e){this.value=e}get_readOnly(){return this.element.hasClass("readonly")}set_readOnly(e){e?(this.element.addClass("readonly"),this.containerDiv.addClass("select2-container-disabled"),this.inplaceSearchButton.addClass("disabled").hide(),this.clearSelectionButton.addClass("disabled").hide()):(this.element.removeClass("readonly"),this.containerDiv.removeClass("select2-container-disabled"),this.inplaceSearchButton.removeClass("disabled").show(),this.clearSelectionButton.removeClass("disabled").show())}get_required(){return this.element.hasClass("required")}set_required(e){e?(this.element.addClass("required"),this.containerDiv.addClass("required"),this.containerDiv.find(".select2-choice, display-text").addClass("required")):(this.element.removeClass("required"),this.containerDiv.removeClass("required"),this.containerDiv.find(".select2-choice, display-text").removeClass("required"))}get selectedItem(){if(this._selectedItem&&this._selectedItem[this.options.nameFieldInGridRow]&&this.selectedItemIncludeColumns.every(e=>this._selectedItem[e]))return this._selectedItem;if(!(0,d.isEmptyOrNull)(this.value))return(0,d.serviceCall)({service:this.serviceUrl+"/Retrieve",request:{EntityId:this.value,ColumnSelection:d.RetrieveColumnSelection.list,IncludeColumns:this.selectedItemIncludeColumns},async:!1,onSuccess:e=>{this._selectedItem=e.Entity}}),this._selectedItem}get serviceUrl(){if((0,d.isEmptyOrNull)(this._serviceUrl)){var e=this.getDialogInstance();this._serviceUrl=e.getService()}return this._serviceUrl}setValueAndText(e,t){this.value=e,this.text=t}getCascadeFromValue(e){return d.EditorUtils.getValue(e)}setCascadeFrom(e){if((0,d.isEmptyOrNull)(e)){this.cascadeLink!=null&&(this.cascadeLink.set_parentID(null),this.cascadeLink=null),this.options.cascadeFrom=null;return}this.cascadeLink=new d.CascadedWidgetLink(d.Widget,this,t=>{this.set_cascadeValue(this.getCascadeFromValue(t))}),this.cascadeLink.set_parentID(e),this.options.cascadeFrom=e}get_cascadeFrom(){return this.options.cascadeFrom}get cascadeFrom(){return this.get_cascadeFrom()}set_cascadeFrom(e){e!==this.options.cascadeFrom&&(this.setCascadeFrom(e),this.updateItems())}set cascadeFrom(e){this.set_cascadeFrom(e)}get_cascadeField(){return(0,d.coalesce)(this.options.cascadeField,this.options.cascadeFrom)}get cascadeField(){return this.get_cascadeField()}set_cascadeField(e){this.options.cascadeField=e}set cascadeField(e){this.set_cascadeField(e)}get_cascadeValue(){return this.options.cascadeValue}get cascadeValue(){return this.get_cascadeValue()}set_cascadeValue(e){this.options.cascadeValue!==e&&(this.options.cascadeValue=e,this.set_value(null),this.updateItems())}set cascadeValue(e){this.set_cascadeValue(e)}get_filterField(){return this.options.filterField}get filterField(){return this.get_filterField()}set_filterField(e){this.options.filterField=e}set filterField(e){this.set_filterField(e)}get_filterValue(){return this.options.filterValue}get filterValue(){return this.get_filterValue()}set_filterValue(e){this.options.filterValue!==e&&(this.options.filterValue=e,this.set_value(null),this.updateItems())}set filterValue(e){this.set_filterValue(e)}updateItems(){}};u(v,"GridItemPickerEditor"),v=S([d.Decorators.registerEditor("_Ext.GridItemPickerEditor",[d.ISetEditValue,d.IGetEditValue,d.IStringValue,d.IReadOnly,d.IValidateRequired]),d.Decorators.element('<input type="text" />')],v);var P=b(w(),1);function z(h){$.ajax({url:h,dataType:"script",async:!1,cache:!0,success:function(){},error:function(){throw new Error("Could not load script "+h)}})}u(z,"loadScript");function L(){window.Slick&&window.Slick.Editors&&window.Slick.Editors.Text||z((0,P.resolveUrl)("~/lib/_Ext/Editors/slick.editors.js"))}u(L,"usingSlickGridEditors");function j(){window.Slick&&window.Slick.AutoColumnSize||z((0,P.resolveUrl)("~/lib/_Ext/CustomSlickGridPlugin/slick.autocolumnsize.js"))}u(j,"usingSlickAutoColumnSize");var R=b(H(),1),U=b(J(),1);var T=class extends o.EntityGrid{constructor(e,t){super(e,t);this.isAutosized=!1;this.isChildGrid=!1;this.nextRowNumber=1;this.get_ExtGridOptions().AutoColumnSize==!0&&this.slickContainer.fadeTo(0,0);let l=this.getGrouping();l.length>0&&this.setGrouping(l)}get_ExtGridOptions(){return(0,o.deepClone)(G)}isPickerMode(){return this.element.hasClass("RowSelectionCheckGrid")}getGrouping(){return[]}createToolbarExtensions(){super.createToolbarExtensions(),this.rowSelection=new o.GridRowSelectionMixin(this)}markupReady(){super.markupReady(),setTimeout(()=>{this.isAutosized==!1&&(this.get_ExtGridOptions().AutoColumnSize==!0&&this.resizeAllCulumn(),this.slickContainer.fadeTo(100,1))},100)}getButtons(){var e=super.getButtons();let t=this.getReportRequest();return t.ListExcelServiceMethodName&&e.push(R.ExcelExportHelper.createToolButton({grid:this,service:this.getService()+"/"+t.ListExcelServiceMethodName,onViewSubmit:()=>this.onViewSubmit(),separator:!0})),t.ReportKey?(e.push({title:p("Controls.ExportToPDF","Export to PDF"),icon:"fa fa-file-pdf-o",onClick:()=>{let r=this.getReportRequest();r&&R.ReportHelper.execute({reportKey:t.ReportKey,params:{request:r}})}}),e.push({title:p("Controls.ViewAsReport","View as Report"),icon:"fa fa-html5",onClick:()=>{let r=this.getReportRequest();r&&R.ReportHelper.execute({reportKey:t.ReportKey,params:{request:r},extension:"html"})}})):t.ReportServiceMethodName&&e.push({title:p("Controls.ViewAsReport","View as Report"),icon:"fa fa-eye",onClick:()=>{let r=this.getReportRequest();r&&(0,o.postToService)({service:(0,o.resolveUrl)(this.getService()+"/"+t.ReportServiceMethodName),request:r,target:"_blank"})}}),e}getReportRequest(){let e=this.getView();var t=(0,o.deepClone)(e?e.params:{});if(t.ReportServiceMethodName=null,t.ReportKey=null,t.ListExcelServiceMethodName=W,t.EqualityFilterWithTextValue={},t.CustomParameters={},e){let l=this.getQuickFilters();for(let i of l){let n=t.EqualityFilter[i.field];if(n&&n.length>0)if(i.options.lookupKey){let c=(0,o.getLookup)(i.options.lookupKey);t.EqualityFilterWithTextValue[i.title]=c.itemById[n][c.textField]}else if(i.options.enumKey){let c=i.options.enumKey,f=(0,o.toId)(n);t.EqualityFilterWithTextValue[i.title]=o.EnumFormatter.format(o.EnumTypeRegistry.get(c),f)}else if(i.type==v){var r=this.findQuickFilter(v,i.field);t.EqualityFilterWithTextValue[i.title]=r.text}else t.EqualityFilterWithTextValue[i.title]=n;else if(i.type==o.DateEditor){let c=this.findQuickFilter(o.DateEditor,i.field),f=c.element.val(),s=c.element.siblings("input").val(),a="";(0,o.isEmptyOrNull)(f)||(a=(0,o.format)(p("Controls.FromDate","From {0}"),f)+" "),(0,o.isEmptyOrNull)(s)||(a=a+(0,o.format)(p("Controls.ToDate","To {0}"),s)),(0,o.isEmptyOrNull)(a)?this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue==!0&&(t.EqualityFilterWithTextValue[i.title]=p("Controls.All","all")):t.EqualityFilterWithTextValue[i.title]=a}else this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue==!0&&(t.EqualityFilterWithTextValue[i.title]=p("Controls.All","all"))}if(this.filterBar){let i=this.filterBar.get_store().get_displayText();(0,o.isEmptyOrNull)(i)||(t.EqualityFilterWithTextValue[(0,o.text)("Controls.FilterPanel.EditFilter")]=i)}}return t}getColumns(){let e=super.getColumns(),t=this.getSlickOptions().editable,r=this.get_ExtGridOptions();if(t==!0&&L(),e.forEach(i=>{let n=i.cssClass||"",c=i.minWidth||i.width||50;if(i.sourceItem){let f=i.sourceItem.formatterType;i.sourceItem.filteringType=="Lookup"?(n=" align-left",c=i.minWidth>100?i.minWidth:100):f=="Enum"?c=i.minWidth>100?i.minWidth:100:f=="Date"?(n=" align-center",c=i.minWidth>99?i.minWidth:99):f=="DateTime"?(n=" align-center",c=i.minWidth>140?i.minWidth:140):f=="Number"?n=" align-right":f=="Checkbox"?n=" align-center":(n=" align-left",c=i.minWidth>99?i.minWidth:99);let s=i.sourceItem.placeholder=="Controls.All"?p("Controls.All","All"):"-";if(i.sourceItem.editorType=="Lookup")i.sourceItem.editorParams.autoComplete||(i.format=a=>{let m=(0,o.getLookup)(i.sourceItem.editorParams.lookupKey);if(a.column.sourceItem.editorParams.multiple==!0){if(a.value){let D=a.value.map(I=>m.itemById[I]).map(I=>I[m.textField]);return D.length>0?D.join(", "):s}}else{let g=m.itemById[a.value];return g?g[m.textField]:s}});else if(i.sourceItem.editorType=="ServiceLookup")i.sourceItem.editorParams.autoComplete||(i.format=a=>{let m=i.sourceItem.editorParams.textFieldInThisRow||i.sourceItem.editorParams.textField;return a.item?a.item[m]:s});else if(i.sourceItem.filteringType=="Lookup")i.format=a=>(0,o.isEmptyOrNull)(a.value)?s:a.value;else if(f=="Enum")i.format=a=>{let m=a.column.sourceItem.editorParams.enumKey;if(a.column.sourceItem.editorParams.multiple==!0){let g="",D=a.value;return D&&D.length>0&&(g=D.map(I=>o.EnumFormatter.format(o.EnumTypeRegistry.get(m),(0,o.toId)(I))).join(", ")),g||s}else{let g=o.EnumFormatter.format(o.EnumTypeRegistry.get(m),(0,o.toId)(a.value));return g||s}};else if(i.sourceItem.editorType=="Decimal"){let a="#,##0.00";if(i.sourceItem.editorParams){let m=i.sourceItem.editorParams.decimals;if(m){a="#,##0.";for(let g=0;g<m;g++)a+="0"}else if(i.sourceItem.editorParams.minValue){let g=i.sourceItem.editorParams.minValue.split(".");g.length>1?a="#,##0."+g[1]:a="#,##0"}}i.format=m=>o.NumberFormatter.format(m.value,a)}if(t==!0&&i.sourceItem.readOnly!=!0)if(_)i.editor=SerenityInlineEditor;else{let a=i.sourceItem.editorType;a=="Lookup"||a=="Enum"?(i.editor=Slick.Editors.Select2,c=i.minWidth>160?i.minWidth:160):a=="Date"?i.editor=Slick.Editors.Date:a=="Boolean"?i.editor=Slick.Editors.Checkbox:a=="Integer"?i.editor=Slick.Editors.Integer:a=="Decimal"?i.editor=Slick.Editors.Float:a=="YesNoSelect"?i.editor=Slick.Editors.YesNoSelect:a=="PercentComplete"?i.editor=Slick.Editors.PercentComplete:a=="LongText"?i.editor=Slick.Editors.LongText:i.editor=Slick.Editors.Text}}i.cssClass+=n,this.get_ExtGridOptions().AutoColumnSize==!0&&(i.width=c)}),e.unshift({field:"RowNum",name:"#",cssClass:"rownum-column",headerCssClass:"align-center",width:40,minWidth:40,maxWidth:40,visible:r.ShowRowNumberColumn,format:i=>(i.item.RowNum||(i.item.RowNum=this.nextRowNumber++),String(i.item.RowNum))}),r.ShowInlineActionsColumn==!0){let i=0,n="";if(r.ShowEditInlineButtun==!0){i+=32;var l=this.isReadOnly?p("Controls.View","View Details"):p("Controls.Edit","Edit");n+=`<a class="inline-actions view-details" title="${l}" style="font-size: 1.2em;"><i class="view-details fa fa-pencil-square-o"></i></a>`}r.ShowDeleteInlineButtun==!0&&(i+=22,n+=`<a class="inline-actions delete-row" title="${p("Controls.Delete","Delete")}" style="padding-left: 5px;"><i class="delete-row fa fa-trash-o text-red"></i></a>`),r.ShowPrintInlineButtun==!0&&(i+=25,n+=`<a class="inline-actions print-row" title="${p("Controls.Print","Print")}" style="padding-left: 5px;"><i class="print-row fa fa-print"></i></a>`),e.unshift({field:"inline-actions",name:"",cssClass:"inline-actions-column",width:i,minWidth:i,maxWidth:i,formatter:(c,f,s,a,m)=>n})}if(r.ShowRowSelectionCheckboxColumn==!0){let i=o.GridRowSelectionMixin.createSelectColumn(()=>this.rowSelection);i.width=i.minWidth=i.maxWidth=27,e.unshift(i)}if(this.isPickerMode()){let i=this.options;if(!i.multiple&&!i.gridType&&(0,o.notifyWarning)("Could not determine multiple/single. Probably there is no 'options' parameter in grid's constructor."),e.forEach(n=>{n.sourceItem&&n.sourceItem.editLink&&(n.format=void 0)}),i.multiple==!0){let n=o.GridRowSelectionMixin.createSelectColumn(()=>this.rowSelection);n.width=n.minWidth=n.maxWidth=27,e.unshift(n)}else e.unshift({field:"row-selection",name:"",cssClass:"inline-actions-column",width:66,minWidth:66,maxWidth:66,format:n=>'<a class="inline-actions select-row"><i class="select-row fa fa-check"></i> Select</a>'})}return e}createSlickGrid(){var e=super.createSlickGrid();return j(),Slick.AutoColumnSize&&(this.autoColumnSizePlugin=new Slick.AutoColumnSize,e.registerPlugin(this.autoColumnSizePlugin)),e.registerPlugin(new U.GroupItemMetadataProvider),e}resetColumns(e){this.slickContainer.fadeTo(0,0),this.slickGrid.setColumns(e),setTimeout(()=>{this.get_ExtGridOptions().AutoColumnSize==!0&&this.resizeAllCulumn(),this.slickContainer.fadeTo(100,1)},100)}resizeAllCulumn(){this.isAutosized=!0;let e=this.slickContainer.width();e>0||(e=this.element.closest(".s-Dialog").width()-55),e>0||(e=this.element.closest(".s-Panel").width()-55),e>0||(e=$("section.content").width()-75),this.slickGrid.setOptions({forceFitColumns:!1});let t=this.autoColumnSizePlugin.resizeAllColumns().filter(l=>l.visible!=!1),r=0;if(t.map(l=>l.width).forEach(l=>r+=l),r>e)this.autoColumnSizePlugin.resizeAllColumns();else if(r<e){this.autoColumnSizePlugin.resizeAllColumns();let l=[],i=[];t.forEach(s=>{s.minWidth==s.maxWidth?(l.push(s),s.width=s.maxWidth):s.cssClass&&s.cssClass.indexOf("no-auto-size")>=0?l.push(s):s.sourceItem?s.sourceItem.formatterType==String("Number")?l.push(s):s.sourceItem.filteringType==String("Enum")||s.sourceItem.formatterType==String("Date")?(l.push(s),s.width<80&&(s.width=80)):s.sourceItem.formatterType==String("DateTime")?(l.push(s),s.width<150&&(s.width=150)):s.sourceItem.formatterType==String("Checkbox")?l.push(s):i.push(s):i.push(s)}),i.length==0&&(l=[],i=[],t.forEach(s=>{s.minWidth==s.maxWidth?(l.push(s),s.width=s.maxWidth):i.push(s)}));let n=0;l.map(s=>s.width).forEach(s=>n+=s);let c=e-n-(this.isChildGrid?48:18),f=0;i.map(s=>s.width).forEach(s=>f+=s),i.forEach(s=>{let a=c/f,m=s.width*a,g=m-s.width;s.width=m}),this.slickGrid.setColumns(t),this.slickGrid.onColumnsResized.notify()}this.setItems(this.getItems())}getSlickOptions(){let e=super.getSlickOptions();return this.get_ExtGridOptions().AutoColumnSize==!0&&(e.forceFitColumns=!0),e.enableTextSelectionOnCells=!0,e.enableCellNavigation=!0,e.asyncEditorLoading=!1,e.autoEdit=!0,e.rowHeight=27,e}getViewOptions(){let e=super.getViewOptions();return this.usePager()&&(e.rowsPerPage=G.RowsPerPage),e}getPrintRowServiceMethod(){return"Print"}onClick(e,t,r){if(super.onClick(e,t,r),e.isDefaultPrevented())return;var l=this.itemAt(t);let i=l[this.getIdProperty()];var n=$(e.target);(n.parent().hasClass("inline-action")||n.parent().hasClass("inline-actions")||n.parent().hasClass("inline-btn"))&&(n=n.parent()),(n.hasClass("inline-action")||n.hasClass("inline-actions")||n.hasClass("inline-btn"))&&this.onInlineActionClick(n,i,l)}onInlineActionClick(e,t,r){if(e.hasClass("delete-row"))this.isReadOnly==!0?(0,o.notifyWarning)("Read only records could not be deleted!"):(0,o.confirmDialog)(p("Db.Administration.Translation.DeleteWarning","Delete record?"),()=>{let l=this;l.deleteEntity?l.deleteEntity(t):(0,o.serviceRequest)(this.getService()+"/Delete",{EntityId:t},i=>{this.refresh()})});else if(e.hasClass("view-details"))this.slickGrid.getEditController().commitCurrentEdit(),this.editItem(t);else if(e.hasClass("print-row")){let l={EntityId:t};(0,o.postToService)({service:(0,o.resolveUrl)(this.getService()+"/"+this.getPrintRowServiceMethod()),request:l,target:"_blank"})}else e.hasClass("select-row")&&(this.rowSelection.setSelectedKeys([t]),this.pickerDialog.onSuccess(this.selectedItems),this.pickerDialog.dialogClose())}resetRowNumber(){this.nextRowNumber=1;let e=this.getItems(),t=this.view.getGrouping();if(t.length==0)for(let r=0;r<e.length;r++)e[r].RowNum=r+1;else if(t.length>0){let r=u(i=>{for(let n=0;n<i.length;n++){let c=i[n].groups;if(c)r(c);else{let f=i[n].rows;for(let s=0;s<f.length;s++)f[s].RowNum=s+1}}},"generateRowNumber"),l=this.view.getGroups();r(l)}this.setItems(e)}setGrouping(e){this.view.setGrouping(e),this.resetRowNumber()}getIncludeColumns(e){super.getIncludeColumns(e);let t=this.getGrouping();t.length>0&&t.forEach(r=>e[r.getter]=!0)}getDefaultSortBy(){let e=super.getDefaultSortBy(),t=this.getGrouping();return t.length>0&&t.forEach(r=>e.unshift(r.getter)),e}onViewProcessData(e){let t=super.onViewProcessData(e);return this.get_ExtGridOptions().ShowRowNumberColumn==!0&&setTimeout(()=>{this.resetRowNumber()}),t}initDialog(e){super.initDialog(e),e.parentGrid=this}get selectedItems(){return this.rowSelection.getSelectedKeys().map(e=>{let t=this.view.getItemById(e);return t||(t={},t[this.getIdProperty()]=e),t})}set selectedKeys(e){this.options.multiple==!0&&this.rowSelection.setSelectedKeys(e)}onViewSubmit(){if(!super.onViewSubmit())return!1;var e=this.view.params;let t=this.options;t.filteringCriteria&&(e.Criteria=o.Criteria.and(e.Criteria,t.filteringCriteria)),t.filterField&&(0,o.isValue)(t.filterValue)&&(e.EqualityFilter=e.EqualityFilter||{},e.EqualityFilter[t.filterField]=t.filterValue);let r=t.cascadeField||t.cascadeFrom;return r&&(0,o.isValue)(t.cascadeValue)&&(e.EqualityFilter=e.EqualityFilter||{},e.EqualityFilter[r]=t.cascadeValue),!0}};u(T,"GridBase"),T=S([o.Decorators.filterable()],T);var y=b(w(),1);var E=b(w(),1);function Y(h,x){h.on("dialogbeforeclose panelbeforeclose",function(e){!E.WX.hasOriginalEvent(e)||!x()||(e.preventDefault(),(0,E.confirmDialog)(p("Controls.EntityDialog.PendingChangesConfirmation","You have pending changes. Save them?"),()=>h.find("div.save-and-close-button").click(),{onNo:function(){h.hasClass("ui-dialog-content")?h.dialog("close"):h.hasClass("s-Panel")&&E.TemplatedDialog.closePanel(h)}}))})}u(Y,"pendingChangesConfirmation");var X=b(ee(),1);function se(){return(0,X.getRemoteData)("UserData")}u(se,"userDefinition");function Z(h){let x=se();return x.Username==="admin"||!!x.Permissions[h]}u(Z,"hasPermission");var O=class extends y.EntityDialog{constructor(e){super(e);this.isReadOnly=!1;this.get_ExtDialogOptions().PendingChangesConfirmation==!0&&Y(this.element,()=>this.getSaveState()!=this.loadedState)}get_ExtDialogOptions(){return(0,y.deepClone)(N)}getTenantIdEditor(){return this.form.TenantId}updateInterface(){super.updateInterface(),this.setReadOnly(this.isReadOnly),q(this.getTenantIdEditor(),Z("Administration:Tenant:Update"))}onDialogOpen(){super.onDialogOpen();let e=this.get_ExtDialogOptions();if(e.AutoFitContentArea==!0&&this.fullContentArea(),e.HideCategoyLinksBar==!0){this.element.find(".category-links").hide();let t=this.element.find(".first-category > .category-title");(0,y.isEmptyOrNull)(t.find(".category-anchor").text())&&t.hide()}if(e.ShowKeyboardLayoutButtonInToolbar==!0){let t=this.element}setTimeout(()=>{this.onAfterSetDialogSize()},200)}onDialogClose(){super.onDialogClose(),this.onAfterDialogClose(this.getSaveEntity())}setReadOnly(e){if(this.readOnly=e,this.isReadOnly=e,this.isReadOnly==!0){this.saveAndCloseButton.toggleClass("disabled",this.isReadOnly),this.applyChangesButton.toggleClass("disabled",this.isReadOnly),this.deleteButton.toggleClass("disabled",this.isReadOnly),this.cloneButton.toggleClass("disabled",this.isReadOnly),this.undeleteButton.toggleClass("disabled",this.isReadOnly),this.toolbar.findButton("btn-save-and-close").addClass("disabled"),this.toolbar.findButton("btn-save-and-new").addClass("disabled"),this.toolbar.findButton("btn-replace-row").addClass("disabled"),this.toolbar.findButton("btn-history").addClass("disabled"),this.toolbar.findButton("btn-custom").addClass("disabled"),this.element.find("sup").toggle(this.isReadOnly);for(let t in this.form)if(this.form[t].widgetName)try{y.EditorUtils.setReadOnly(this.form[t],this.isReadOnly)}catch(r){}}}getToolbarButtons(){let e=super.getToolbarButtons(),t=this.get_ExtDialogOptions();t.ShowSaveAndNewButtonInToolbar==!0&&e.push({title:p("Controls.EntityDialog.SaveAndNew","Save & New"),icon:"fa fa-save",cssClass:"btn-save-and-new",onClick:()=>{this.onSaveAndNewButtonClick()}}),t.ShowCloseButtonInToolbar==!0&&e.push({title:p("Controls.EntityDialog.Close","Close"),icon:"fa fa-close",cssClass:"btn-close",onClick:()=>{this.dialogClose()}}),t.ShowRefreshButtonInToolbar==!0&&e.push({title:p("Controls.EntityDialog.Refresh","Refresh"),icon:"fa fa-refresh",onClick:()=>{this.onRefreshClick()}});try{let r=(0,y.tryFirst)(e,l=>l.cssClass=="clone-button");r.onClick=()=>{if(this.isEditMode()){var l=this.getCloningEntity();y.Widget.create({type:(0,y.getInstanceType)(this),init:i=>{this.parentGrid.initDialog(i),i.loadEntityAndOpenDialog(l,null)}}),this.dialogClose()}}}catch(r){}return e}onRefreshClick(){this.reloadById()}onSaveAndNewButtonClick(){this.save(e=>{this.loadEntity({})})}getSaveState(){try{return $.toJSON(this.getSaveEntity())}catch(e){return null}}onSaveSuccess(e){super.onSaveSuccess(e)}loadResponse(e){super.loadResponse(e),this.get_ExtDialogOptions().PendingChangesConfirmation==!0&&(this.loadedState=this.getSaveState())}maximize(){this.element.closest(".ui-dialog").find(".ui-dialog-titlebar-maximize").click(),setTimeout(()=>{let e=this.element?this.element.closest(".ui-dialog"):$(".ui-dialog"),t=e.height(),r=e.find(".ui-dialog-title").height()||20,l=this.element.find(".categories"),i=l.position().top;l.height(t-r-i-20)},100)}fullContentArea(){window.innerWidth>768&&this.setDialogSize()}setDialogSize(e,t,r,l,i){i||(i=$("section.content")),i.length==0&&(i=$(".content-wrapper"));let n=this.element?this.element.closest(".ui-dialog"):$(".ui-dialog");if(i.length>0&&n.length>0){let c=i.width()+28+(e||0),f=i.height()+(t||30);this.element.dialog("option","width",c),this.element.dialog("option","height",f);let s=n.find(".ui-dialog-title").height()||20,a=this.element.find(".categories"),m=a.position().top;a.height(f-s-m-20),n.css({left:i.position().left+(l||2),top:r||50})}setTimeout(()=>{this.onAfterSetDialogSize()},200)}onAfterSetDialogSize(){}onAfterDialogClose(e){}};u(O,"DialogBase"),O=S([y.Decorators.responsive(),y.Decorators.maximizable()],O);export{O as a,T as b};
//# sourceMappingURL=chunk-SST7RXIN.js.map