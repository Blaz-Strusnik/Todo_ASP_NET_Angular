using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Todo_ASP_NET.Data;

namespace Todo_ASP_NET.Controllers
{
    public class Tasks_DtoController : ApiController
    {
        private TasksModel db = new TasksModel();

        // GET: api/Tasks_Dto
        public IQueryable<Tasks_Dto> GetTasks_Dto()
        {
            return db.Tasks_Dto;
        }

        // GET: api/Tasks_Dto/5
        [ResponseType(typeof(Tasks_Dto))]
        public async Task<IHttpActionResult> GetTasks_Dto(long id)
        {
            Tasks_Dto tasks_Dto = await db.Tasks_Dto.FindAsync(id);
            if (tasks_Dto == null)
            {
                return NotFound();
            }

            return Ok(tasks_Dto);
        }

        // PUT: api/Tasks_Dto/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTasks_Dto(long id, Tasks_Dto tasks_Dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tasks_Dto.id)
            {
                return BadRequest();
            }

            db.Entry(tasks_Dto).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Tasks_DtoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tasks_Dto
        [ResponseType(typeof(Tasks_Dto))]
        public async Task<IHttpActionResult> PostTasks_Dto(Tasks_Dto tasks_Dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tasks_Dto.Add(tasks_Dto);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Tasks_DtoExists(tasks_Dto.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tasks_Dto.id }, tasks_Dto);
        }

        // DELETE: api/Tasks_Dto/5
        [ResponseType(typeof(Tasks_Dto))]
        public async Task<IHttpActionResult> DeleteTasks_Dto(long id)
        {
            Tasks_Dto tasks_Dto = await db.Tasks_Dto.FindAsync(id);
            if (tasks_Dto == null)
            {
                return NotFound();
            }

            db.Tasks_Dto.Remove(tasks_Dto);
            await db.SaveChangesAsync();

            return Ok(tasks_Dto);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Tasks_DtoExists(long id)
        {
            return db.Tasks_Dto.Count(e => e.id == id) > 0;
        }
    }
}