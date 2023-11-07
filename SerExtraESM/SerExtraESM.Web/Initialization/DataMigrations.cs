using System;
using System.Data.Common;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Conventions;
using FluentMigrator.Runner.Initialization;
using FluentMigrator.Runner.Processors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Serenity.Abstractions;
using Serenity.Data;
using Serenity.Extensions;

namespace SerExtraESM
{
    public class DataMigrations : IDataMigrations
    {
        private static readonly string[] databaseKeys = new[] {
            "Default"
            , "Northwind"
        };

        private readonly ITypeSource typeSource;
        private readonly ISqlConnections sqlConnections;
        private readonly IWebHostEnvironment hostEnvironment;

        public DataMigrations(ITypeSource typeSource,
            ISqlConnections sqlConnections,
            IWebHostEnvironment hostEnvironment)
        {
            this.typeSource = typeSource ?? throw new ArgumentNullException(nameof(typeSource));
            this.sqlConnections = sqlConnections ?? throw new ArgumentNullException(nameof(sqlConnections));
            this.hostEnvironment = hostEnvironment ?? throw new ArgumentNullException(nameof(hostEnvironment));
        }

        public void Initialize()
        {
            foreach (var databaseKey in databaseKeys)
            {
                EnsureDatabase(databaseKey);
                RunMigrations(databaseKey);
            }
        }

        /// <summary>
        /// Automatically creates a database for the template if it doesn't already exists.
        /// You might delete this method to disable auto create functionality.
        /// </summary>
        private void EnsureDatabase(string databaseKey)
        {
            MigrationUtils.EnsureDatabase(databaseKey,
                hostEnvironment.ContentRootPath, sqlConnections);
            Microsoft.Data.SqlClient.SqlConnection.ClearAllPools();
        }

        private void RunMigrations(string databaseKey)
        {
            var cs = sqlConnections.TryGetConnectionString(databaseKey) ??
                throw new ArgumentOutOfRangeException(nameof(databaseKey));
            string serverType = cs.Dialect.ServerType;
            bool isOracle = serverType.StartsWith("Oracle", StringComparison.OrdinalIgnoreCase);
            bool isFirebird = serverType.StartsWith("Firebird", StringComparison.OrdinalIgnoreCase);

            string databaseType = isOracle ? "OracleManaged" : serverType;

            var conventionSet = new DefaultConventionSet(defaultSchemaName: null,
                Path.GetDirectoryName(typeof(DataMigrations).Assembly.Location));

            var serviceProvider = new ServiceCollection()
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .AddFluentMigratorCore()
                .AddSingleton<IConventionSet>(conventionSet)
                .Configure<ProcessorOptions>(options =>
                {
                    options.Timeout = TimeSpan.FromSeconds(90);
                })
                .Configure<RunnerOptions>(options =>
                {
                    options.Tags = new[] { databaseKey + "DB" };
                    options.IncludeUntaggedMigrations = databaseKey == "Default";
                })
                .ConfigureRunner(builder =>
                {
                    if (databaseType == OracleDialect.Instance.ServerType)
                        builder.AddOracleManaged();
                    else if (databaseType == SqliteDialect.Instance.ServerType)
                        builder.AddSQLite();
                    else if (databaseType == FirebirdDialect.Instance.ServerType)
                        builder.AddFirebird();
                    else if (databaseType == MySqlDialect.Instance.ServerType)
                        builder.AddMySql5();
                    else if (databaseType == PostgresDialect.Instance.ServerType)
                        builder.AddPostgres();
                    else
                        builder.AddSqlServer();

                    builder.WithGlobalConnectionString(cs.ConnectionString);
                    builder.ScanIn(((IGetAssemblies)typeSource).GetAssemblies().ToArray()).For.Migrations();
                })
                .BuildServiceProvider();

            var culture = CultureInfo.CurrentCulture;
            try
            {
                if (isFirebird)
                    Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;

                using var scope = serviceProvider.CreateScope();
                var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
                runner.MigrateUp();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error executing migration!", ex);
            }
            finally
            {
                if (isFirebird)
                    Thread.CurrentThread.CurrentCulture = culture;
            }
        }
    }
}