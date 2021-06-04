using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TodoWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListController : ControllerBase
    {
        private static List<TodoItem> TodoItems = new List<TodoItem>
        {
            new TodoItem("TestTitle", "test text for the message"),
            new TodoItem("A second test item", "test text for the message")
        };

        private readonly ILogger<TodoListController> _logger;

        public TodoListController(ILogger<TodoListController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<TodoItem> Get()
        {
            Thread.Sleep(3000);
            return TodoItems;
        }

        [HttpPost]
        public ActionResult PostTodo([FromBody]TodoItem todoItem)
        {
            Thread.Sleep(3000);
            if (string.IsNullOrEmpty(todoItem.Title))
            {
                return BadRequest("Needs a title mate");
            }
            if (string.IsNullOrEmpty(todoItem.Text)) { return BadRequest("Add text"); }
            TodoItems.Add(todoItem);
            return Ok(TodoItems);
        }
    }
}
