using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Todo_ASP_NET.Data
{
    public partial class TasksModel : DbContext
    {
        public TasksModel()
            : base("name=TasksModel")
        {
        }

        public virtual DbSet<Tasks_Dto> Tasks_Dto { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
