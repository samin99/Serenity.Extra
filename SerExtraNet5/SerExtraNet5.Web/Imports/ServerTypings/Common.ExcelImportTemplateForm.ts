﻿namespace SerExtraNet5.Common {
    export interface ExcelImportTemplateForm {
        TemplateName: Serenity.StringEditor;
        TemplateExcelFile: Serenity.ImageUploadEditor;
        ExcelMetadata: _Ext.JsonViewer;
        ExcelSheet: _Ext.EmptyLookupEditor;
        MasterTableName: Serenity.LookupEditor;
        FieldMappings: ExcelImportFieldMappingEditor;
        Remarks: Serenity.StringEditor;
    }

    export class ExcelImportTemplateForm extends Serenity.PrefixedContext {
        static formKey = 'Common.ExcelImportTemplate';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!ExcelImportTemplateForm.init)  {
                ExcelImportTemplateForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.ImageUploadEditor;
                var w2 = _Ext.JsonViewer;
                var w3 = _Ext.EmptyLookupEditor;
                var w4 = s.LookupEditor;
                var w5 = ExcelImportFieldMappingEditor;

                Q.initFormType(ExcelImportTemplateForm, [
                    'TemplateName', w0,
                    'TemplateExcelFile', w1,
                    'ExcelMetadata', w2,
                    'ExcelSheet', w3,
                    'MasterTableName', w4,
                    'FieldMappings', w5,
                    'Remarks', w0
                ]);
            }
        }
    }
}
