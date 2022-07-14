﻿using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;

namespace SerExtraNet5.Common.Forms
{
    [FormScript("Common.ExcelImport")]
    [BasedOnRow(typeof(ExcelImportRow), CheckNames = true)]
    public class ExcelImportForm
    {
        public Int32 TemplateId { get; set; }
        public String MasterTableName { get; set; }
        public String FieldMappings { get; set; }
        public String ImportedExcelFile { get; set; }
        public String ImportedExcelSheet { get; set; }
        public Int32 ExcelImportStatus { get; set; }
        public String ImportedData { get; set; }
        public String Remarks { get; set; }
    }
}