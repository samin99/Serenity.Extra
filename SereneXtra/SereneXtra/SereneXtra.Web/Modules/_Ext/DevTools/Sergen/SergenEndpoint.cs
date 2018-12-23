
namespace _Ext.DevTools.Endpoints
{
    using Serenity;
    using Serenity.Services;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Web.Hosting;
#if ASPNETCORE
    using Microsoft.AspNetCore.Mvc;
    [Route("Services/DevTools/Sergen/[action]")]
#else
    using System.Web.Mvc;
    [RoutePrefix("Services/DevTools/Sergen"), Route("{action}")]
#endif

    [ServiceAuthorize("DevTools:Sergen")]
    public class SergenController : ServiceEndpoint
    {

        private void CheckAccess()
        {
            //if (!Request.IsLocal)
            //    throw new System.Exception("Sergen can only run for local requests!");
        }

        private void RunSergen(params string[] arguments)
        {
            var process = Process.Start(new ProcessStartInfo
            {
                FileName = "dotnet",
                CreateNoWindow = true,
                Arguments = "sergen " + string.Join(" ", arguments)
            });

            if (!process.WaitForExit(90000) || process.ExitCode != 0)
                throw new ValidationError("Error while running Sergen!");
        }

        private string Escape(string value)
        {
            if (value.IsEmptyOrNull())
                return "\"\"";

            if (value.IndexOf(' ') > 0)
                return "\"" + value + "\"";

            return value;
        }

        private TOut RunSergen<TOut>(params string[] arguments)
        {
            var tempFile = System.IO.Path.GetTempFileName() + ".json";
            try
            {
                var process = Process.Start(new ProcessStartInfo
                {
                    FileName = "dotnet",
                    CreateNoWindow = true,
                    //WorkingDirectory = HostingEnvironment.ApplicationPhysicalPath,
                    Arguments = "sergen " + string.Join(" ", arguments) + " -o " + Escape(tempFile)
                });

                if (!process.WaitForExit(90000) || process.ExitCode != 0)
                    throw new ValidationError("Error while running Sergen!");

                return JSON.ParseTolerant<TOut>(System.IO.File.ReadAllText(tempFile));
            }
            finally
            {
                System.IO.File.Delete(tempFile);
            }
        }

        private class AppSettingsFormat
        {
            public Dictionary<string, ConnectionInfo> Data { get; }

            public class ConnectionInfo
            {
                public string ConnectionString { get; set; }
                public string ProviderName { get; set; }
            }
        }

        [HttpPost, HttpGet]
        public ListResponse<SergenConnection> ListConnections(ServiceRequest request)
        {
            CheckAccess();

            var response = new ListResponse<SergenConnection>();
            response.Entities = RunSergen<List<string>>("g").Select(x => new SergenConnection
            {
                Key = x
            }).ToList();

            return response;
        }

        [HttpPost, HttpGet]
        public ListResponse<SergenTable> ListTables(SergenListTablesRequest request)
        {
            CheckAccess();

            request.CheckNotNull();
            Check.NotNullOrEmpty(request.ConnectionKey, "connectionKey");

            var response = new ListResponse<SergenTable>();
            response.Entities = RunSergen<List<dynamic>>("g", "-c", Escape(request.ConnectionKey))
                .Select(x => new SergenTable
                {
                    Tablename = x.name,
                    Identifier = x.identifier,
                    Module = x.module,
                    PermissionKey = x.permission
                }).ToList();

            return response;
        }

        public ServiceResponse Generate(SergenGenerateRequest request)
        {
            CheckAccess();

            request.CheckNotNull();
            Check.NotNullOrEmpty(request.ConnectionKey, "connectionKey");
            Check.NotNull(request.Table, "table");
            Check.NotNull(request.GenerateOptions, "table");
            Check.NotNullOrWhiteSpace(request.Table.Tablename, "tableName");
            Check.NotNullOrWhiteSpace(request.Table.Identifier, "identifier");
            Check.NotNullOrWhiteSpace(request.Table.Module, "module");

            RunSergen("g",
                "-c", Escape(request.ConnectionKey),
                "-t", Escape(request.Table.Tablename),
                "-m", Escape(request.Table.Module),
                "-i", Escape(request.Table.Identifier),
                "-p", Escape(request.Table.PermissionKey),
                "-w", Escape(
                    (request.GenerateOptions.Row ? "R" : "") +
                    (request.GenerateOptions.Service ? "S" : "") +
                    (request.GenerateOptions.UI ? "U" : "")));

            return new ServiceResponse();
        }
    }
}
