using System;

namespace TodoWebApi
{
    public class TodoItem
    {
        public TodoItem(string title, string text)
        {
            Text = text;
            Title = title;
        }

        public TodoItem() { }
        public string Title { get; set; }
        public string Text { get; set; }

    }
}
