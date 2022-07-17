﻿using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;

namespace SerExtraNet5.Common.Columns
{
    [ColumnsScript("Common.ExcelImport")]
    [BasedOnRow(typeof(ExcelImportRow), CheckNames = true)]
    public class ExcelImportColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public Int32 Id { get; set; }
        [EditLink]
        public String TemplateTemplateName { get; set; }
        public String MasterTableName { get; set; }
        //public String FieldMappings { get; set; }
        //public String ImportedExcelFile { get; set; }
        public Int32 ExcelImportStatus { get; set; }
        //public String ImportedData { get; set; }
        //public String Remarks { get; set; }
    }
}